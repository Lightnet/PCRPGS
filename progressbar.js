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


pc.script.attribute('initialWidth', 'number',100);
pc.script.attribute('initialLeft', 'number',100);

pc.script.attribute('progress', 'number',0);
//pc.script.attribute('foreground', 'number');


pc.script.create('progressbar', function (app) {
    // Creates a new Progressbar instance
    var Progressbar = function (entity) {
        this.entity = entity;
        this.progress = 1;
        this.foreground = 1;
        this.initialWidth = 0;
        this.initialLeft = 0;
        //this.count = 0;
    };

    Progressbar.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.foreground = this.entity.script.sprite;
            this.initialWidth = this.foreground.width;
            this.initialLeft = this.foreground.x;
            this.updateProgress();
            //listen to pc.script.attribute('','',''); changes
            this.on('set', this.onAttributeChanged, this);
        },
        
        /**
         * Re-render the text if necessary
         */
        onAttributeChanged: function (name, oldValue, newValue) {
            //this.eventsEnabled = false;
            //console.log(this.foreground);
            //console.log("name:"+name);
            if (name === 'progress' ) {
                console.log("oldValue:"+oldValue +" newValue:"+newValue);
                if (oldValue !== newValue) {
                    //this.updateProgress(this.foreground);
                    this.updateProgress();
                    //console.log("change?");
                }
            }
            
            //if (name === 'text' ) {
                //if (oldValue !== newValue) {
                    //this.updateText();
                //}
            //} else if (name === 'depth') {
                //this.command.key = newValue;
            //}
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            //this.count += 0.01 % 1;
            //if(this.count >= 1){
                //this.count = 0;
            //}
           //this.setProgress(this.count);
        },

        setProgress: function (progress) {
            progress = pc.math.clamp(progress, 0, 1);
            //console.log("progress:" + progress);
            if (this.progress !== progress) {
                this.progress = progress;
                //console.log(this.progress);
                //console.log("update?");
                this.foreground.width = pc.math.lerp(0, this.initialWidth, progress);
                this.foreground.uPercentage = progress;
                console.log(this.foreground);
                this.foreground.updateSprite();
                
            }
        },
        
        updateProgress: function() {
            //console.log(object);
            //console.log(this.foreground);
            this.foreground.width = pc.math.lerp(0, this.initialWidth, this.progress);
            this.foreground.uPercentage = this.progress;
            //console.log(this);
            //console.log(this.foreground);
            //
            this.foreground.updateSprite();
            //console.log(this.getf());
        }
        
    };

    return Progressbar;
});