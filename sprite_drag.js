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

pc.script.create('sprite_drag', function (app) {
    // Creates a new Spritedrag instance
    var Sprite_drag = function (entity) {
        this.entity = entity;
        this.offsetx = 0;
        this.offsety = 0;
        this.mousex = 0;
        this.mousey = 0;
        this.bupdateposition = false;
        this.bdragable = true;
    };

    Sprite_drag.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.script.sprite.on('click', this.onClickPress, this);
            this.entity.script.sprite.on('clickrelease', this.onClickRelease, this);
            app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        },
        
        onMouseMove: function (event) {
            // Use the camera component's screenToWorld function to convert the
            // position of the mouse into a position in 3D space
            //var depth = 10;
            //var cameraEntity = app.root.findByName('Camera');
            //cameraEntity.camera.screenToWorld(event.x, event.y, depth, this.pos);
            this.mousex = event.x;
            this.mousey = event.y;
            if(this.bdragable){
                if( this.bupdateposition){
                    this.entity.script.sprite.x = (event.x + this.offsetx);
                    this.entity.script.sprite.y = (event.y + this.offsety) * -1;
                }
            }
        },
        
        onClickPress: function () {
            this.bupdateposition = true;
            this.offsetx = this.entity.script.sprite.x - this.mousex;
            this.offsety = (this.entity.script.sprite.y * -1) - this.mousey;//inverted
            //console.log(this.offsety);          
        },
        onClickRelease: function () {
            this.bupdateposition = false;
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Sprite_drag;
});