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

/*
pc.script.attribute('image_release', 'asset', [], {
    type: 'texture',
    max: 1
});
*/

pc.script.attribute('image_hover', 'asset', [], {
    type: 'texture',
    max: 1
});

pc.script.attribute('image_press', 'asset', [], {
    type: 'texture',
    max: 1
});

pc.script.attribute('image_out', 'asset', [], {
    type: 'texture',
    max: 1
});

pc.script.create('sprite_buttonstate', function (app) {
    // Creates a new SpriteChangeIcon instance
    var Sprite_buttonstate = function (entity) {
        this.entity = entity;
        this.image_hover = null;
        this.image_out = null;
        this.image_press = null;
        //this.image_release = null;
    };

    Sprite_buttonstate.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.script.sprite.on('click', this.onClickPress, this);
            this.entity.script.sprite.on('clickrelease', this.onClickRelease, this);
            this.entity.script.sprite.on('hover', this.onHover, this);
            this.entity.script.sprite.on('out', this.onOut, this);
        },
        
        onClickPress: function () {
            //console.log('Hover Handler');
            if(this.image_press !== null){
                //this.entity.script.sprite.textureAsset =this.image_out;
                var asset = app.assets.get(this.image_press);
                this.entity.script.sprite.texture = asset.resource;
            }
        },
        
        onClickRelease: function () {
            //console.log('Hover Handler');
            if(this.image_release !== null){
                //this.entity.script.sprite.textureAsset =this.image_out;
                //var asset = app.assets.get(this.image_release);
                var asset = app.assets.get(this.image_hover);
                this.entity.script.sprite.texture = asset.resource;
            }
        },
        
        onHover: function () {
            //console.log('Hover Handler');
            if(this.image_hover !== null){
                var asset = app.assets.get(this.image_hover);
                this.entity.script.sprite.texture = asset.resource;
            }
        },
        
        onOut: function () {
            //console.log('Hover Handler');
            //this.entity.script.sprite.textureAsset =this.image_out;
            if(this.image_out !== null){
                var asset = app.assets.get(this.image_out);
                this.entity.script.sprite.texture = asset.resource;
            }
        },
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Sprite_buttonstate;
});