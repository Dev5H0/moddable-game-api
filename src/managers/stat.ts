export class Stats {
    constructor(
        public values:Record<string,number> = {},
        public owned:Set<string> = new Set()
    ) {}

    static empty(variables:string[]):Stats {
        const values:Record<string,number> = {}
        for (const id of variables) values[id] = 0
        return new Stats(values)
    }

    export():any {
        return {
            values: this.values,
            owned: Array.from(this.owned)
        }
    }

    static import(data:any):Stats {
        return new Stats(data.values ?? {}, new Set(data.owned ?? []))
    }
}