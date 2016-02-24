





//pc.script.attribute('count', 'number',0);
pc.script.create('sprite_progressbarloop', function (app) {
    // Creates a new Sprite_progressbarloop instance
    var Sprite_progressbarloop = function (entity) {
        this.entity = entity;
        this.count = 0;
    };

    Sprite_progressbarloop.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            this.count += 0.01 % 1;
            if(this.count >= 1){
                this.count = 0;
            }
            if(this.entity.script.sprite_progressbar !== null){
                this.entity.script.sprite_progressbar.setProgress(this.count);
            }
           //this.setProgress(this.count);
        }
    };

    return Sprite_progressbarloop;
});