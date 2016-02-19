

pc.script.create('ButtonHandler', function (app) {
    // Creates a new ButtonHandler instance
    var ButtonHandler = function (entity) {
        this.entity = entity;
        this.eventname = null;
       
    };

    ButtonHandler.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.script.sprite.on('click', this.onClick, this);
        },
        
        onClick: function () {
            //console.log('Click Button Handler');
            //var toSpawn = app.root.findByName('UIMainMenu');
            //console.log(toSpawn);
            if(this.eventname !== null ){
                app.fire( this.eventname);
            }
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return ButtonHandler;
});