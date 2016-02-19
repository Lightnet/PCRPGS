/*
    Project Name: PCRPGS
    Created by: Lightnet
    License: Creative Commons (CC) license
    
    Information: To build the UI components and farm game.
    
 */



pc.script.attribute('image_uncheck', 'asset', [], {
    type: 'texture',
    max: 1
});

pc.script.attribute('image_check', 'asset', [], {
    type: 'texture',
    max: 1
});

pc.script.attribute('unchecked', 'boolean');

pc.script.create('spritetoggle', function (app) {
    // Creates a new SpriteToggle instance
    var SpriteToggle = function (entity) {
        this.entity = entity;
        this.unchecked = false;
        this.image_uncheck = null;
        this.image_check = null;
        
    };

    SpriteToggle.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var asset;
            this.entity.script.sprite.on('click', this.onClickPress, this);
            if(this.unchecked){
                asset = app.assets.get(this.image_check);
                this.entity.script.sprite.texture = asset.resource;
            }else{
                asset = app.assets.get(this.image_uncheck);
                this.entity.script.sprite.texture = asset.resource;
            }
            asset = null;
        },
        
        onClickPress: function () {
            //console.log('Hover Handler');
            var asset;
            if(this.image_press !== null){
                //this.entity.script.sprite.textureAsset =this.image_out;
                if(this.unchecked){
                    asset = app.assets.get(this.image_uncheck);
                    this.entity.script.sprite.texture = asset.resource;
                    this.unchecked = false;
                }else{
                    asset = app.assets.get(this.image_check);
                    this.entity.script.sprite.texture = asset.resource;
                    this.unchecked = true;
                }
            }
            asset = null;
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return SpriteToggle;
});