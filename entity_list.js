pc.script.attribute('listcount','number',3);





pc.script.create('entity_list', function (app) {
    // Creates a new Entity_list instance
    var Entity_list = function (entity) {
        this.listcount = 3;
        this.entity = entity;
        
        for(var i =0;i > this.listcount;i++){
                pc.script.attribute('entity_'+i,'number',3);
            }
        
    };

    Entity_list.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Entity_list;
});