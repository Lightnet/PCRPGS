


pc.script.attribute('eventname', 'string',"loadingscreen:end");

pc.script.attribute('progresspercent', 'number',100,'progress');

pc.script.create('loadingscreen_end', function (app) {
    // Creates a new Loadingscreen_end instance
    var Loadingscreen_end = function (entity) {
        this.entity = entity;
        this.eventname = null;
        this.progresspercent = 0;
    };

    Loadingscreen_end.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var self = this;
            if(this.eventname != null){
                app.fire(self.eventname);
                //console.log("loading screen end");
            }
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Loadingscreen_end;
});