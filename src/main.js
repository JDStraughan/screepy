var screepy = require("screepy");

module.exports.loop = function () {
    // Initialize screepy
    screepy.init((spawnName = "SpawnyMcSpawnerson"));

    // Manage existing assets
    screepy.manageCreeps();
    screepy.manageTowers();

    // Run the Queue
    screepy.runQueue();

    // Run them creeps
    screepy.runCreeps();
};
