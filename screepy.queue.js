let screepyFactory = require("screepy.factory");

let screepyQueue = {
    /*  
        Add a new item to the queue
        type: creep type
        role: creep role
        spawnName: name of the spawn
        body: body parts of the creep
        max: maximum number of creeps (globally)
    */
    add: function (type, role, spawnName, body, max) {
        var creepies = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == role
        );
        if (creepies.length < max) {
            this.queue.push({
                type: type,
                role: role,
                spawnName: spawnName,
                body: body,
                max: max,
            });
            console.log("Added to queue type: " + type + " role: " + role);
        }
    },
    run: function () {
        console.log("Running queue: " + this.queue);
        for (var i = 0; i < this.queue.length; i++) {
            let item = this.queue[i];
            switch (item.type) {
                case "setParLevel":
                    screepyFactory.parLevelCreeps(
                        item.role,
                        item.spawnName,
                        item.body,
                        item.max
                    );
                    break;
                default:
                    console.log("Unknown queue type: " + item.type);
            }
        }
    },
    clear: function () {
        this.queue = [];
    },
    queue: [],
};

module.exports = screepyQueue;
