Items act like booleans, but are capable of applying effects while owned; variables act like integers. 

# Files
## mod_info.json
```json
{
    "author": { 
        "username": "", // Required [a~z,A~Z,0~9,-,_] // An alphanumerical (+ "-"|"_") username.  
        "name": "", // Optional // The name of the author. 
        "links": [] // Optional // Ex: author contacts, mod github, modding discord; etc.  
    },
    "mod": {
        "id": "username:example_mod", // Required // Reference this in the mod files using "$". 
        "title": "Example Mod", // Required // Mod title. 
        "description": "An example mod. " // Optional // Mod description. 
        "dependencies": [] // Optional // Require other mods via their mod's id. 
    },
}
```
## data/
### file1.json
```json
{
    "variables": [
        {
            "id": "$:variable:health:max", // Required // Equivalent to "thorhalluro:example_mod:variable:health:max"
            "name": "Health", // Required
            "name_plural": "Health", // Required 
            "capacity": -1, // Required integer|string // "-1" means no limit; this value cannot be edited unless you use a string containing an id to another variable. 
            "value": 100 // Required // Default value
        },
        {
            "id": "$:variable:health:now",
            "name": "Health",
            "name_plural": "Health",
            "capacity": "$:variable:health:max",
            "value": 100
        }
    ],
    "encounters": [
        {
            "id": "encounter:health:increase:percent:20:potion",
            "description": "You find a {%random_colour} potion and drink it.",
            "rarity": 800,
            "effects": [
                "@:reusable_data:formula:0"
            ]
        },
        {
            "id": "encounter:health:increase:percent:20:healer:0",
            "description": "You meet a healer; will you pay them 50 gold to heal?",
            "rarity": 2000,
            "options": [
                {
                    "option": "yes",
                    "description": "You pay the healer 50 gold. ",
                    "effects": [
                        "{gold}-50",
                        "@:reusable_data:formula:0"
                    ]
                },
                {
                    "options": "no",
                    "effects": [
                        "$:encounter:health:increase:percent:20:healer:no"
                    ]
                }
            ],
            "effects": [
                "@:reusable_data:formula:0"
            ]
        },
        {
            "id": "encounter:health:increase:percent:20:healer:no",
            "description": "You refuse to pay the healer, and continue on your journey. ",
            "options": [],
            "effects": []
        }
    ],
    "@": [
        {
            "id": "reusable_data",
            "data": [
                {
                    "id": "formula:0",
                    "value": "{$:variable:health:now}+(20%{$:variable:health:max})"
                }
            ]
        }
    ],
    "%": [
        {
            "id": "random_colour",
            "data": [
                "red",
                "green",
                "blue"
            ]
        }
    ]
}

```

You can get variables in formulas using "{$:...}", where the "$" is the mod id; as an example, the following formula adds 20% of max health to your current health: `{$:variable:health:now}+(20%{$:variable:health:max})`
