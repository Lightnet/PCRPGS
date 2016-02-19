pc.script.create('ui_menu', function (app) {
    // Creates a new Ui_menu instance
    var Ui_menu = function (entity) {
        this.entity = entity;
    };

    Ui_menu.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },

        onEnable: function () {
            // Listen for clicks on the play button
            app.mouse.on("mouseup", this.start, this);
            if (app.touch) {
                app.touch.on("touchend", this.start, this);
            }
        },

        onDisable: function () {
            // Stop listening to events
            app.mouse.off("mouseup", this.start, this);
            if (app.touch) {
                app.touch.off("touchend", this.start, this);
            }
        },

        start: function (e) {
            app.fire("ui:start");
            // prevent touch and mouse events
            e.event.preventDefault();
        }
    };

    return Ui_menu;
});