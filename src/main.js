var screepy = require("screepy");

module.exports.loop = function () {
    // Initialize screepy
    screepy.init((spawnName = "SpawnyMcSpawnerson"));

    // Manage existing assets
    screepy.manageCreeps();
    screepy.manageTowers();

    // screepy.towers.manage();
    // screepy.creeps.manage();
    // screepy.spawns.manage();

    // Spawn new assets
    screepy.spawnCreeps();
};
