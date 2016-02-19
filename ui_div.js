//http://answers.playcanvas.com/questions/15/how-can-i-add-a-hud-to-my-playcanvas-game
//var uiEntity = app.root.findByName('UI');
//uiEntity.script.ui.setText('LEVEL CLEARED');

pc.script.create('ui_div', function (app) {
    // Creates a new Ui_div instance
    var Ui_div = function (entity) {
        this.entity = entity;
    };

    Ui_div.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            // Create a div centred inside the main canvas
            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.width = '500px';
            div.style.top = '50%';
            div.style.left = '50%';
            div.style.marginLeft = '-250px';            
            div.style.textAlign = 'center';
            div.style.color = 'white';
            div.style.fontSize = 'xx-large';
            div.style.visibility = 'hidden';

            // Add the div to the DOM as a child of the document's body element
            document.body.appendChild(div);

            this.div = div;

            // Set some default state on the UI element
            this.setText('GAME OVER');
            this.setVisibility(true);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },
        
        // Some utility functions that can be called from other game scripts
        setVisibility: function (visible) {
            this.div.style.visibility = visible ? 'visible' : 'hidden';
        },

        setText: function (message) {
            this.div.innerHTML = message;
        }
    };

    return Ui_div;
});