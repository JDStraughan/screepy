var roleBuilder = require("role.builder");
var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");

var screepy = {
    // Set Prefix for Spawns
    spawnPrefix: "ScreepyDoobieDoo-",

    // Initialize Screepy
    init: function (spawnPrefix) {
        this.spawnPrefix = spawnPrefix;
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
        var harvesters = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == "harvester"
        );
        console.log("Harvesters: " + harvesters.length);

        if (harvesters.length < 2) {
            var newName = "Harvester" + Game.time;
            console.log("Spawning new harvester: " + newName);
            Game.spawns[spawnPrefix].spawnCreep([WORK, CARRY, MOVE], newName, {
                memory: { role: "harvester" },
            });
        }

        if (Game.spawns[spawnPrefix].spawning) {
            var spawningCreep =
                Game.creeps[Game.spawns[spawnPrefix].spawning.name];
            Game.spawns[spawnPrefix].room.visual.text(
                "🛠️" + spawningCreep.memory.role,
                Game.spawns[spawnPrefix].pos.x + 1,
                Game.spawns[spawnPrefix].pos.y,
                { align: "left", opacity: 0.8 }
            );
        }
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
