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


pc.script.attribute('selectedentitly', 'entity');

pc.script.create('sprite_toggleentity', function (app) {
    // Creates a new Spritetoggleentitly instance
    var Sprite_toggleentity = function (entity) {
        this.entity = entity;
        this.selectedentitly = null;
        this.istoggle = true;
    };

    Sprite_toggleentity.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.script.sprite.on('click', this.onClickPress, this);
        },
        
        onClickPress: function () {
            if(this.istoggle){
                this.istoggle = false;
                if(this.selectedentitly !== null){
                    this.selectedentitly.enabled = false;
                    //console.log("false");
                }
            }else{
                if(this.selectedentitly !== null){
                    this.selectedentitly.enabled = true;
                    //console.log("true");
                }
                this.istoggle = true;
            }
            //console.log(this.selectedentitly);
        }

        // Called every frame, dt is time in seconds since last update
        //update: function (dt) {
        //}
    };

    return Sprite_toggleentity;
});