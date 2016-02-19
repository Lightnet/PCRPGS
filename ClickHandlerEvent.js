pc.script.create('ClickHandlerEvent', function (app) {
    // Creates a new ClickHandlerEvent instance
    var ClickHandlerEvent = function (entity) {
        this.entity = entity;
    };

    ClickHandlerEvent.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.script.font_renderer.on('click', this.onClick, this);
        },
        
        onClick: function () {
            console.log('Click');
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return ClickHandlerEvent;
});