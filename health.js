
pc.script.attribute('health', 'number');


pc.script.create('health', function (app) {
    // Creates a new Health instance
    var Health = function (entity) {
        this.entity = entity;
        this.health = 10;
    };

    Health.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            //var move = this.entity.script.move;
            //move.movement = new pc.Vec3(Math.random() * 0.5 - 0.25, 0, Math.random() * 0.5 - 0.25);
            /*
            this.entity.collision.on('collisionstart', function() {
                this.health -= 1;
                this.hb.update(this.health);
            }, this);
            */
            
            var health = pc.ui.section('root')
                .group()
                .follow(this.entity, {x:0, y: 1.3, z: 0});
            this.hb = pc.ui.healthBar(health, 100, 8, 10, 'green');
        }
    };

    return Health;
});