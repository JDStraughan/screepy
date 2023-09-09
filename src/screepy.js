var roleBuilder = require("role.builder");
var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
let screepyQueue = require("screepy.queue");
const screepyFactory = require("./screepy.factory");

var screepy = {
    // Set Prefix for Spawns
    spawnName: "ScreepyDoobieDoo-",
    creepBuildOrder: ["harvester", "upgrader", "builder"],
    maxHarvesters: 2,
    maxUpgraders: 5,
    maxBuilders: 5,

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
        /*  
            Set Par Levels
        */

        // Harvesters
        screepyQueue.add(
            "setParLevel",
            "harvester",
            this.spawnName,
            [WORK, CARRY, MOVE],
            this.maxHarvesters
        );

        // Upgraders
        screepyQueue.add(
            "setParLevel",
            "upgrader",
            this.spawnName,
            [WORK, CARRY, MOVE],
            this.maxUpgraders
        );

        // Builders
        screepyQueue.add(
            "setParLevel",
            "builder",
            this.spawnName,
            [WORK, CARRY, MOVE],
            this.maxBuilders
        );
    },

    // Run dem Creeps, oh yeah!
    runCreeps: function () {
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

    // Main Road
    constructMainRoad: function () {
        screepyFactory.constructRoadFromSpawnToController(this.spawnName);
    },

    // Run the Queue
    runQueue: function () {
        screepyQueue.run();
    },
};

module.exports = screepy;
