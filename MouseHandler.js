pc.script.create('MouseHandler', function (app) {
    // Creates a new MouseHandler instance
    var MouseHandler = function (entity) {
        this.entity = entity;
        this.pos = new pc.Vec3();
        
        // Disabling the app menu stops the browser displaying a menu when
        // you right-click the page
        app.mouse.disableContextMenu();

        // Use the on() method to attach event handlers.
        // The mouse object supports events on move, button down and
        // up, and scroll wheel.
        app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    };

    MouseHandler.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            //this.redMaterial = app.assets.getAssetByResourceId(this.materials[0]).resource;
            //this.greenMaterial = app.assets.getAssetByResourceId(this.materials[1]).resource;
            //this.blueMaterial = app.assets.getAssetByResourceId(this.materials[2]).resource;
            console.log("mouse init..");
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },

        onMouseMove: function (event) {
            // Use the camera component's screenToWorld function to convert the
            // position of the mouse into a position in 3D space
            var depth = 10;
            var cameraEntity = app.root.findByName('Camera');
            cameraEntity.camera.screenToWorld(event.x, event.y, depth, this.pos);

            // Finally update the cube's world-space position
            //this.entity.setPosition(this.pos);
        },

        onMouseDown: function (event) {
            // If the left mouse button is pressed, change the cube color to red
            if (event.button === pc.MOUSEBUTTON_LEFT) {
                //this.entity.model.model.meshInstances[0].material = this.redMaterial;
            }

            // If the left mouse button is pressed, change the cube color to green
            if (event.button === pc.MOUSEBUTTON_MIDDLE) {
                //this.entity.model.model.meshInstances[0].material = this.greenMaterial;
            }

            // If the left mouse button is pressed, change the cube color to blue
            if (event.button === pc.MOUSEBUTTON_RIGHT) {
                //this.entity.model.model.meshInstances[0].material = this.blueMaterial;
            }
        }
    };

    return MouseHandler;
});