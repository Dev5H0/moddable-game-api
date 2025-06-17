import { Stats } from './stat'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'node:path'
import { mkdir, readdir, rm, rename } from 'node:fs/promises'

export type SaveMeta = {
    slot: string
    description: string
    mods: string[]
    autosave: boolean
}

export class SaveManager {
    private dir_saves = "saves"
    private dir_saves_absolute = path.join(import.meta.dir, '../../', this.dir_saves)

    constructor(private variables:string[]) {}
    async init() {
        await mkdir(this.dir_saves, { recursive:true })
    }


    async list():Promise<SaveMeta[]> {
        const files = await readdir(this.dir_saves)
        return files
            .filter(f => f.endsWith(".json"))
            .map(f => {
                const name = path.basename(f, '.json')
                const file = require(path.join(this.dir_saves_absolute, f))
                return {
                    slot: name,
                    description: file.meta.description ?? '',
                    mods: file.meta.mods ?? [],
                    autosave: file.meta.autosave ?? false
                }
            })
        ;
    }

    async validate(slot:string, active_mods:string[]):Promise<{ compatible:boolean; missing:Record<string, string[]> }> {
        const file = path.join(this.dir_saves, `${slot}.json`)
        try {
            const content = require(path.join(this.dir_saves_absolute, file))
            const missing_variables = this.variables.filter(id => !(id in content.values))
            const missing_owned = (content.owned ?? []).filter((id:string) => typeof id !== "string")
            return {
                compatible: missing_variables.length === 0 && missing_owned.length === 0,
                missing: { variables:missing_variables,owned:missing_owned }
            }
        } catch {
            return { compatible:false, missing:{} }
        }
    }

    async load(slot:string):Promise<Stats> {
        const file = path.join(this.dir_saves, `${slot}.json`)
        const adapter = new JSONFile(file)
        const db = new Low(adapter, {})
        await db.read()
        return Stats.import(db.data)
    }

    async save(slot:string, stats:Stats, meta:Partial<SaveMeta> = {}) {
        const file = path.join(this.dir_saves, `${slot}.json`)
        const adapter = new JSONFile(file)
        const db = new Low(adapter, {})
        db.data = {
            ...stats.export(),
            meta: {
                slot,
                description: meta.description ?? '',
                mods: meta.mods ?? [],
                autosave: meta.autosave ?? false
            }
        }
        await db.write()
    }

    async delete(slot:string) {
        const p = path.join(this.dir_saves, `${slot}.json`)
        await Bun.file(p).delete()
    }

    async rename(slot:string, name:string) {
        const name_old = path.join(this.dir_saves, `${slot}.json`)
        const name_new = path.join(this.dir_saves, `${name}.json`)
        await rename(name_old, name_new)
    }
}
