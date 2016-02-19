pc.script.attribute('placeholder', 'entity');

pc.script.create('UI_Spawn', function (app) {
    // Creates a new UI_Spawn instance
    var UI_Spawn = function (entity) {
        this.entity = entity;
        this.placeholder = null;
    };

    UI_Spawn.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return UI_Spawn;
});