# simple-idle-game-api
The idea is to make a game api that can be used locally with any frontend, and can be modded entirely through json.

The game would be moddable through: variables, items, encounters, formulas

The current API plan:
- /api
-- /game
--- /encounter
--- /stats
--- /items
--- /shop
---- list?unlockable=true&owned=false
---- buy?id=example_upgrade
-- /save
--- /list
--- /create?slot=example_save
--- /switch?slot=example_save
--- /description?slot=example_save { "description": "" }
--- /download?slot=example_save
--- /reset?slot=example_save
--- /rename?slot=example_save&name=test_save
--- /delete?slot=test_save
--- /autosave
---- /status
---- /toggle
-- /mods
--- /list?enabled=true&author=5h0
--- /toggle?id=example_mod
