var roleBuilder = require("role.builder");
var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var screepyFactory = require("screepy.factory");

var screepy = {
    // Set Prefix for Spawns
    spawnName: "ScreepyDoobieDoo-",
    maxHarvesters: 2,

    // Initialize Screepy
    init: function (spawnName) {
        this.spawnName = spawnName;
    },

    // Manage some Towers
    manageTowers: function () {
        var tower = Game.getObjectById("TOWER_ID");

        if (tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(
                FIND_STRUCTURES,
                {
                    filter: (structure) => structure.hits < structure.hitsMax,
                }
            );
            if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            var closestHostile =
                tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }

        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log("Clearing non-existing creep memory:", name);
            }
        }
    },

    // Manage them Creeps, yo
    manageCreeps: function () {
        // Set Par Levels
        // Harvesters
        screepyFactory.parLevelCreeps(
            "harvester",
            this.spawnName,
            [WORK, CARRY, MOVE],
            2
        );
        // Upgraders
        screepyFactory.parLevelCreeps(
            "upgrader",
            this.spawnName,
            [WORK, CARRY, MOVE],
            2
        );

        // var harvesters = _.filter(
        //     Game.creeps,
        //     (creep) => creep.memory.role == "harvester"
        // );
        // console.log("Harvesters: " + harvesters.length);

        // if (harvesters.length < harvesters.maxHarvesters) {
        //     var newName = "Harvester" + Game.time;
        //     console.log("Spawning new harvester: " + newName);
        //     Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], newName, {
        //         memory: { role: "harvester" },
        //     });
        // }

        // if (Game.spawns[spawnName].spawning) {
        //     var spawningCreep =
        //         Game.creeps[Game.spawns[spawnName].spawning.name];
        //     Game.spawns[spawnName].room.visual.text(
        //         "🛠️" + spawningCreep.memory.role,
        //         Game.spawns[spawnName].pos.x + 1,
        //         Game.spawns[spawnName].pos.y,
        //         { align: "left", opacity: 0.8 }
        //     );
        // }
    },

    // Spawn dem Creeps, oh yeah!
    spawnCreeps: function () {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == "harvester") {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == "upgrader") {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == "builder") {
                roleBuilder.run(creep);
            }
        }
    },
};

module.exports = screepy;
