var screepyFactory = {
    parLevelCreeps: function (role, spawn, body, max) {
        console.log("Par Leveling: " + role + "s to maximum level of " + max);
        var creepies = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == role
        );
        console.log(role + "s: " + creepies.length);

        if (creepies.length < max) {
            var newName = role + Game.time;
            console.log("Spawning new" + role + ": " + newName);
            Game.spawns[spawn].spawnCreep(body, newName, {
                memory: { role: role },
            });
        }

        if (Game.spawns[spawn].spawning) {
            var spawningCreep = Game.creeps[Game.spawns[spawn].spawning.name];
            Game.spawns[spawn].room.visual.text(
                "🛠️" + spawningCreep.memory.role,
                Game.spawns[spawn].pos.x + 1,
                Game.spawns[spawn].pos.y,
                { align: "left", opacity: 0.8 }
            );
        }
    },
    constructRoadFromSpawnToController: function (spawnName) {
        const spawn = Game.spawns[spawnName];
        const controller = spawn.room.controller;
        const path = spawn.pos.findPathTo(controller.pos, {
            ignoreCreeps: true,
        });
        for (const step of path) {
            const result = spawn.room.createConstructionSite(
                step.x,
                step.y,
                STRUCTURE_ROAD
            );
            if (result === OK) {
                console.log(
                    `Construction site created at (${step.x},${step.y})`
                );
            } else {
                console.log(
                    `Error creating construction site at (${step.x},${step.y}): ${result}`
                );
            }
        }
    },
};

module.exports = screepyFactory;
