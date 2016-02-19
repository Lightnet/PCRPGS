
pc.script.attribute('spritefield', 'entity');
pc.script.attribute('characterlimited', 'number',16);

pc.script.create('fontinput', function (app) {
    // Creates a new Fontinput instance
    var Fontinput = function (entity) {
        this.entity = entity;
        this.isFocus = false;
        this.spritefield = null;
        this.stringtext = "";
        this.characterlimited = 16;
    };

    Fontinput.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            //this.entity.script.font_renderer.on('click', this.onClick, this);
            this.spritefield.script.sprite.on('click', this.onClick, this);
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
            //console.log(keystring);
            //console.log(keystring.search('Key'));
            if(keystring.search('Key') === 0){
                console.log(this.stringtext.length);
                if(this.stringtext.length < this.characterlimited){
                    this.stringtext += keystring.substr(3, 1);
                    this.entity.script.font_renderer.text = this.stringtext;
                    //console.log("low");
                }else{
                    //console.log("too big");
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
        }
    };

    return Fontinput;
});