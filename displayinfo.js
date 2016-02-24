pc.script.create('displayinfo', function (app) {
    // Creates a new Displayinfo instance
    var Displayinfo = function (entity) {
        this.entity = entity;
    };

    Displayinfo.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            console.log(window.screen.width+":"+window.screen.height);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Displayinfo;
});