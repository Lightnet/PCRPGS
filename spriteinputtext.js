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

pc.script.attribute('textfield', 'string','Enter here');
pc.script.attribute('x', 'number');
pc.script.attribute('y', 'number');

pc.script.attribute('isvisible', 'boolean');


pc.script.create('spriteinputtext', function (app) {
    // Creates a new Spriteinputtext instance
    var Spriteinputtext = function (entity) {
        this.entity = entity;
        this.textfield = "none";
        this.inputfield =null;
        this.x = 0;
        this.y = 0;
        this.fontsize = 25;
        this.visible = true;
    };
    
    pc.ui.registerFont('http://fonts.googleapis.com/css?family=Indie+Flower');
    pc.ui.registerFont('http://fonts.googleapis.com/css?family=Audiowide');

    Spriteinputtext.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var root = pc.ui.section('root');
            
            //Standard settings
            root
                .fontFamily('Arial')
                .fontSize(28)
                .color('white');
            
            
            //Input box
            this.inputfield = root
                .input()
                .fontSize(this.fontsize)
                .offset(this.x, this.y)
                .value(this.textfield)
                .on('click', function() {
                    //this.setSelectionRange(0, (this.value||0).length)
                    console.log("key input click");
                })
                .on('keyup', function() {
                    //titletext.value(this.value);
                    console.log("key input press up");
                });
            
            console.log(this.inputfield);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Spriteinputtext;
});