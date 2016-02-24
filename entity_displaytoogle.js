pc.script.attribute("tagname","string");
pc.script.attribute("objentity1","entity");
pc.script.attribute("objentity2","entity");

pc.script.create('entitly_displaytoogle', function (app) {
    // Creates a new Entitly_displaytoogle instance
    var Entitly_displaytoogle = function (entity) {
        this.entity = entity;
        this.tagname = null;
        this.objentity1 = null;
        this.objentity2 = null;
    };

    Entitly_displaytoogle.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            if(this.tagname != null){
                app.on( this.tagname,this.triggerevent,this);
            }
        },
                       
        triggerevent: function(){
            //console.log(this.objentity1);
            //console.log(this.objentity2);
            
            if(this.objentity1 != null){
                if(this.objentity1._enabled == true){
                    this.objentity1.enabled = false;
                }else{
                    this.objentity1.enabled = true;
                }
            }
            if(this.objentity2 != null){
                if(this.objentity2._enabled == true){
                    this.objentity2.enabled = false;
                }else{
                    this.objentity2.enabled = true;
                }
            }
            //console.log("entity toggle?"); 
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Entitly_displaytoogle;
});