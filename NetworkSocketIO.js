pc.script.create('NetworkSocketIO', function (app) {
    // Creates a new NetworkSocketIO instance
    var NetworkSocketIO = function (entity) {
        this.entity = entity;
    };

    NetworkSocketIO.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
             //first called
            this.socket = io.connect('http://127.0.0.1:3000/');
            
            this.socket.on('success', function(dataFromServer) {
                console.log(dataFromServer);
                //this.socket.emit('onConnect', { data : 'key down' });
            }.bind(this));
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return NetworkSocketIO;
});