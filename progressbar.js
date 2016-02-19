
pc.script.attribute('initialWidth', 'number');
pc.script.attribute('initialLeft', 'number');


pc.script.attribute('progress', 'asset', [], {
    type: 'texture',
    max: 1
});

pc.script.attribute('foreground', 'asset', [], {
    type: 'texture',
    max: 1
});

//pc.script.attribute('progress', 'number');
//pc.script.attribute('foreground', 'number');


pc.script.create('progressbar', function (app) {
    // Creates a new Progressbar instance
    var Progressbar = function (entity) {
        this.entity = entity;
        this.progress = 1;
        this.foreground = 1;
        this.initialWidth = 0;
        this.initialLeft = 0;
    };

    Progressbar.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.foreground = this.entity.script.sprite;
            this.initialWidth = this.foreground.width;
            this.initialLeft = this.foreground.x;
            this.setProgress(1);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },

        setProgress: function (progress) {
            progress = pc.math.clamp(progress, 0, 1);
            if (this.progress !== progress) {
                this.progress = progress;
                this.foreground.width = pc.math.lerp(0, this.initialWidth, progress);
                this.foreground.uPercentage = progress;

               
                this.foreground.updateSprite();
            }
        }
    };

    return Progressbar;
});