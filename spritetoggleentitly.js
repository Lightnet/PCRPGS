
pc.script.attribute('selectedentitly', 'entity');

pc.script.create('spritetoggleentitly', function (app) {
    // Creates a new Spritetoggleentitly instance
    var Spritetoggleentitly = function (entity) {
        this.entity = entity;
        this.selectedentitly = null;
        this.istoggle = true;
    };

    Spritetoggleentitly.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.script.sprite.on('click', this.onClickPress, this);
        },
        
        onClickPress: function () {
            if(this.istoggle){
                this.istoggle = false;
                if(this.selectedentitly !== null){
                    this.selectedentitly.enabled = false;
                    console.log("false");
                }
            }else{
                if(this.selectedentitly !== null){
                    this.selectedentitly.enabled = true;
                    console.log("true");
                    
                }
                this.istoggle = true;
            }
            console.log(this.selectedentitly);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Spritetoggleentitly;
});