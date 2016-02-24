pc.script.attribute('sceneid', 'number',409471);
pc.script.attribute('tagname', 'string');

pc.script.create('loadscene_event', function (app) {
    // Creates a new Loadscene_event instance
    var Loadscene_event = function (entity) {
        this.entity = entity;
        this.sceneid = null;
        this.tagname = null;
    };

    Loadscene_event.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var self = this;
            if( this.tagname !== null){
                //app.on(this.tagname,function(){ 
                    //self.triggerevent();
                //});
                app.on(this.tagname,function(){
                    self.loadscene();
                });
            }
        },
        
        loadscene: function () {
            //console.log("start game...");
            app.fire("preload:start");
            app.root.destroy();
            //var self = this;
            this.loadLevel(this.sceneid, function (entity) {
                //this.loaded[0] = entity;
                pc.scene = entity;
                //console.log(pc.scene);
                //self.destroy();
            }.bind(this));    
        },
        
        // load the scene `id` then call the callback
        loadLevel: function (id, callback) {
            var self = this;
            var url = id  + ".json";
            app.loadSceneHierarchy(url, function (err, parent) {
                if (!err) {
                    callback(parent);
                }    
            });
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Loadscene_event;
});