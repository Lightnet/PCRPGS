pc.script.create('charactercontrol', function (app) {
    // Creates a new Charactercontrol instance
    var Charactercontrol = function (entity) {
        this.entity = entity;
        this.force = new pc.Vec3();
        this.torque = 0.5;
        this.power = 10;
    };

    Charactercontrol.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if (app.keyboard.isPressed(pc.input.KEY_LEFT)) {
                this.entity.rigidbody.applyTorque(0, this.torque, 0);
            }
            if (app.keyboard.isPressed(pc.input.KEY_RIGHT)) {
                this.entity.rigidbody.applyTorque(0, -this.torque, 0);
            }
            if (app.keyboard.isPressed(pc.input.KEY_UP)) {
                this.force.copy(this.entity.forward).scale(this.power);
                this.entity.rigidbody.applyForce(this.force);
            }
            if (app.keyboard.isPressed(pc.input.KEY_DOWN)) {
                this.force.copy(this.entity.forward).scale(-this.power);
                this.entity.rigidbody.applyForce(this.force);
            }
        }
    };

    return Charactercontrol;
});