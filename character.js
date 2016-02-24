pc.script.attribute('health', 'number',100 );

pc.script.create('character', function (app) {
    // Creates a new Character instance
    var Character = function (entity) {
        this.entity = entity;
    };

    Character.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.health = 100;
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            this.health -= 0.1;
            if(this.health < 0)this.health = 100;
        }
    };

    return Character;
});