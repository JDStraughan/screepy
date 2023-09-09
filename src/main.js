var screepy = require("screepy");

module.exports.loop = function () {
    // Initialize screepy
    screepy.init((spawnName = "SpawnyMcSpawnerson"));

    // Manage existing assets
    screepy.manageCreeps();

    // Manage Defenses
    // screepy.manageDefenses();

    // Build Roads (TODO - FIX THIS SHIT)
    screepy.constructMainRoads();

    // Run the Queue
    screepy.runQueue();

    // Run them creeps
    screepy.runCreeps();
};
