# Moddable Game API Project
The idea is to make a game api that can be used locally with any frontend, and can be modded entirely through json.

## A basic explanation
- The game is split into mpas, regions, zones, & encounters. 
- Encounters can modify variables through formulas and give items. 
- Encounters can be locked until you have an item, or have enough of a variable

## Current API endpoint plans
- `/api`
    - `/game`
        - `GET /encounter` # Trigger an encounter. 
        - `GET /stats` # Lists your stats (for example: gold & health). 
        - `GET /items` # Lists your items and their effects. 
        - `/shop`
            - `GET ?unlockable=true&owned=false` # Lists shop items. 
            - `POST /buy?id=example_upgrade` # Buy an item in the shop. 
    - `/save` 
        - `GET` # List your saves. 
        - `POST /create?slot=example_save` # Create a save. 
        - `GET /validate?slot=example_save` # Check whether a save is compatible with your enabled mods. 
        - `POST /switch?slot=example_save` # Switch to a different save. 
        - `POST /description?slot=example_save` # Describe a save. 
            **Body:**  
            ```json
            {
                "description": ""
            }
            ```
        - `GET /download?slot=example_save` # Download a save to your computer. 
        - `POST /rename?slot=example_save&name=test_save` # Rename a save. 
        - `DELETE ?slot=test_save` # Delete a save. 
        - `/autosave`
            - `GET` # Tells you whether autosave is enabled. 
            - `POST /toggle` # Toggles your autosave. 
  - `/mods`
    - `GET ?enabled=true&author=5h0` # Lists your mods. 
    - `POST /toggle?id=example_mod` # Toggle a mod on or off. 

## Mods
Mods are a key feature, allowing you to fully customise the game to your will, from idle games to RPGs, or even a little bit of both. 

Define a variable, an item, and encounters; make the defined item purchasable in the shop for a set amount of your defined variable, unlocking the defined encounters when bought. 


---
