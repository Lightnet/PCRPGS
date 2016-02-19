

pc.script.attribute('isvisible', 'boolean',true);
pc.script.attribute('inputtext', 'string');

pc.script.attribute('x', 'number');
pc.script.attribute('y', 'number');

pc.script.create('inputtexthtml', function (app) {
    // Creates a new Inputtexthtml instance
    var Inputtexthtml = function (entity) {
        this.entity = entity;
        this.inputtext = "";
        this.isvisible = true;
        this.x = 0;
        this.y = 0;
    };

    Inputtexthtml.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            // Create a div centred inside the main canvas
            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.width = '500px';
            div.style.top = this.y + 'px';
            div.style.left = this.x + 'px';
            div.style.marginLeft = '-250px';            
            div.style.textAlign = 'center';
            div.style.color = 'white';
            div.style.fontSize = 'xx-large';
            div.style.visibility = 'hidden';

            // Add the div to the DOM as a child of the document's body element
            document.body.appendChild(div);

            this.div = div;

            // Set some default state on the UI element
            this.setText(this.inputtext);
            this.setVisibility(this.isvisible);
        },
        
        // Some utility functions that can be called from other game scripts
        setVisibility: function (visible) {
            this.div.style.visibility = visible ? 'visible' : 'hidden';
        },

        setText: function (message) {
            this.div.innerHTML = message;
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Inputtexthtml;
});