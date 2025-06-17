# Moddable Game API Project
The idea is to make a game api that can be used locally with any frontend, and can be modded entirely through json.

## A basic explanation
- The game is played using encounters. 
- Encounters can modify variables through formulas and give items. 
- Encounters can be locked until you have an item, or have enough of a variable

## Current API endpoint plans
- `/api`
    - `/game`
        - `GET /encounter`
        - `GET /stats`
        - `GET /items`
        - `/shop`
            - `GET ?unlockable=true&owned=false` # Lists shop items; filtered by 
            - `POST /buy?id=example_upgrade`
    - `/save` 
        - `GET` # Lists your saves
        - `POST /create?slot=example_save`
        - `POST /switch?slot=example_save`
        - `POST /description?slot=example_save`  
            **Body:**  
            ```json
            {
                "description": ""
            }
            ```
        - `GET /download?slot=example_save`
        - `POST /reset?slot=example_save`
        - `POST /rename?slot=example_save&name=test_save`
        - `DELETE ?slot=test_save` 
        - `/autosave`
            - `GET` # Tells you whether autosave is enabled
            - `POST /autosave/toggle`
  - `/mods`
    - `GET ?enabled=true&author=5h0`
    - `POST /toggle?id=example_mod`

---
