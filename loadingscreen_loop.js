pc.script.create('loadingscreen_loop', function (app) {
    // Creates a new Loadingscreen_loop instance
    var Loadingscreen_loop = function (entity) {
        this.entity = entity;
        this.count = 0;
    };

    Loadingscreen_loop.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            this.count += 0.01 % 1;
            if(this.count >= 1){
                this.count = 0;
            }
            
            if(this.entity.script.loadingscreen !== null){
                this.entity.script.loadingscreen.setProgress(this.count);
            }
            //if(this.entity.script.sprite_progressbar !== null){
                //this.entity.script.sprite_progressbar.setProgress(this.count);
            //}
        }
    };

    return Loadingscreen_loop;
});