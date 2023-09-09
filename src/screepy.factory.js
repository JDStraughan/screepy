var screepyFactory = {
    parLevelCreeps: function (role, spawn, body, max) {
        var creepies = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == role
        );
        console.log(role + "s: " + creepies.length);

        if (creepies.length < creepies.max) {
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
};

module.exports = screepyFactory;
