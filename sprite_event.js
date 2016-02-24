/*
    Project Name: PCRPGS
    Created by: Lightnet
    License: Creative Commons (CC) license
    Not there are multiples licenses.
    
    Information: To build the UI components and farm game.
    
 */

/*
 * Script usable type:
 * Script Information:
 * 
 */

pc.script.attribute("eventname","string","");

pc.script.create('sprite_event', function (app) {
    // Creates a new Sprite_event instance
    var Sprite_event = function (entity) {
        this.entity = entity;
        this.eventname = null;
    };

    Sprite_event.prototype = {
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
        }

        // Called every frame, dt is time in seconds since last update
        //update: function (dt) {
        //}
    };

    return Sprite_event;
});