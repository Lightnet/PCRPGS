pc.script.create('character', function (app) {
    // Creates a new Character instance
    var Character = function (entity) {
        this.entity = entity;
    };

    Character.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Character;
});