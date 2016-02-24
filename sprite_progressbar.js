pc.script.attribute('initialWidth', 'number',100);

pc.script.attribute('initialLeft', 'number',100);

pc.script.attribute('progress', 'number',0);

pc.script.create('sprite_progressbar', function (app) {
    // Creates a new Sprite_progressbar instance
    var Sprite_progressbar = function (entity) {
        this.entity = entity;
        this.progress = 1;
        this.oldprogress = 1;
        this.foreground = 1;
        this.initialWidth = 0;
        this.initialLeft = 0;
    };

    Sprite_progressbar.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.foreground = this.entity.script.sprite;
            this.initialWidth = this.foreground.width;
            this.initialLeft = this.foreground.x;
            //listen to pc.script.attribute('','',''); changes
            this.on('set', this.onAttributeChanged, this);
        },

        /**
         * Re-render the text if necessary
         */
        onAttributeChanged: function (name, oldValue, newValue) {
            if (name === 'progress' ) {
                //console.log("oldValue:"+oldValue +" newValue:"+newValue);
                if (oldValue !== newValue) {
                    //this.updateProgress();
                    this.setProgress(newValue);
                }
            }
        },

        setProgress: function (progress) {
            progress = pc.math.clamp(progress, 0, 1);
            if (this.oldprogress !== progress) {
                this.oldprogress = progress;
                this.progress = progress;
                this.foreground.width = pc.math.lerp(0, this.initialWidth, progress);
                this.foreground.uPercentage = progress;
                //console.log(this.foreground);
                this.foreground.updateSprite();
            }
        }
        
        //updateProgress: function() {
            //this.foreground.width = pc.math.lerp(0, this.initialWidth, this.progress);
            //this.foreground.uPercentage = this.progress;
            //this.foreground.updateSprite();
        //}
        
        // Called every frame, dt is time in seconds since last update
        //update: function (dt) {
        //},
        
    };

    return Sprite_progressbar;
});