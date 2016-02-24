
pc.script.attribute('spritefield', 'entity');
pc.script.attribute('characterlimited', 'number',16);
pc.script.attribute('timemax', 'number',30);

pc.script.create('fontinput', function (app) {
    // Creates a new Fontinput instance
    var Fontinput = function (entity) {
        this.entity = entity;
        this.isFocus = false;
        this.spritefield = null;
        this.stringtext = "";
        this.stringtextindicator = "";
        this.characterlimited = 16;
        this.time = 0;
        this.timemax = 10;
        this.indicatorcount = 0;
        this.oldtext = "";
    };

    Fontinput.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.script.font_renderer.onEnable();
            //this.entity.script.font_renderer.on('click', this.onClick, this);
            //Need the back image to able to be click but font_renderer is hard to detect click using this script when using the indicator
            if(this.spritefield !== null){
                this.spritefield.script.sprite.on('click', this.onClick, this);  
            }
            app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
            app.keyboard.on(pc.EVENT_KEYUP, this.onKeyUp, this);
        },
        
        onClick: function () {
            console.log('Click');
            this.isFocus = true;
        },
        
        /*
        * Event handler called when key is pressed
        */
        onKeyDown: function (event) {
            if(this.isFocus === false){
                return;
            }
            // Check event.key to detect which key has been pressed
            //console.log(event.key);
            //console.log(event);
            var keystring = event.event.code;
            
            console.log(event.event.shiftKey);
            //console.log(keystring);
            //console.log(keystring.search('Key'));
            if(keystring.search('Key') === 0){
                //console.log(this.stringtext.length);
                if(this.stringtext.length < this.characterlimited){
                    var letter = keystring.substr(3, 1);
                    if(event.event.shiftKey === true){
                       this.stringtext +=  letter;
                    }else{
                       this.stringtext += letter.toLowerCase();    
                    }
                    this.entity.script.font_renderer.text = this.stringtext;
                }
            }
            
            if(keystring == 'Backspace'){
                //console.log("back key");
                this.stringtext = this.stringtext.substring(0,this.stringtext.length-1);
                this.entity.script.font_renderer.text = this.stringtext;
                //this.entity.script.font_renderer.updateText();
            }
            
            if(keystring == 'Enter'){
                //console.log("Enter key");
                this.entity.script.font_renderer.text = this.stringtext;
                this.isFocus = false;
            }
            console.log(this.stringtext);
            
            // When the space bar is pressed this scrolls the window.
            // Calling preventDefault() on the original browser event stops this.
            event.event.preventDefault();
        },

        /*
        * Event handler called when key is released
        */
        onKeyUp: function (event) {
            
        },
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if(this.isFocus){
                this.time += 1;
                if(this.time > this.timemax){
                    this.time = 0;
                    this.indicatorcount += 1;

                    this.indicatorcount = this.indicatorcount % 2;

                    if(this.indicatorcount === 0){
                        this.entity.script.font_renderer.text = this.stringtext + "_";
                    }else{
                        this.entity.script.font_renderer.text = this.stringtext;
                    }

                    //console.log("...");
                }
            }else{
                //make sure that it doesn't need to update text render again
                if(this.oldtext !== this.stringtext){
                    this.entity.script.font_renderer.text = this.stringtext;
                    this.oldtext = this.stringtext;
                }
                
            }
        }
    };

    return Fontinput;
});