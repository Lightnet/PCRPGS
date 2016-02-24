pc.script.attribute('tagname', 'string');
pc.script.attribute('eventname', 'string');

pc.script.create('tagevent_trigger', function (app) {
    // Creates a new Loadingscreen_trigger instance
    var Tagevent_trigger = function (entity) {
        this.entity = entity;
        this.tagname = null;
        this.eventname = null;
    };

    Tagevent_trigger.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var self = this;
            console.log(pc.script);
            if( this.tagname !== null){
                app.on(this.tagname,function(){ 
                    self.triggerevent();
                });
            }
        },
        
        triggerevent: function(){
            console.log("tag trigger");
            console.log(this.eventname);
            console.log(this);
            //console.log(app.scene.root.script.loadingscreen);
            app.fire(this.eventname);
        }        
        // Called every frame, dt is time in seconds since last update
        //update: function (dt) {
        //}
    };

    return Tagevent_trigger;
});