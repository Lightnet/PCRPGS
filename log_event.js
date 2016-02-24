pc.script.attribute('tagname', 'string', null);
pc.script.attribute('textstring', 'string', "log test");


pc.script.create('log_event', function (app) {
    // Creates a new Log_event instance
    var Log_event = function (entity) {
        this.entity = entity;
        this.tagname = null;
        this.textstring = "";
    };

    Log_event.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            if(this.tagname !=null){
                app.on(this.tagname,this.tagevent,this);
            }
        },
        
        tagevent:function(){
            console.log(this.textstring);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Log_event;
});