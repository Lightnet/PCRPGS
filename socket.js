pc.script.create('socket', function (app) {
    // Creates a new Socket instance
    var Socket = function (entity) {
        this.entity = entity;
    };

    Socket.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Socket;
});