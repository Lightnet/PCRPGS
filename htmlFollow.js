pc.script.attribute('text', 'string', 'Hello World');
pc.script.attribute('color', 'string', 'blue');
pc.script.attribute('fontFamily', 'string', 'Jura');
pc.script.attribute('fontWeight', 'string', 'bold');
pc.script.attribute('fontSize', 'number', 24);
pc.script.attribute('offsetX', 'number', -40);
pc.script.attribute('offsetY', 'number', -45);

pc.script.create('htmlFollow', function (app) {
    // Creates a new HtmlFollow instance
    var HtmlFollow = function (entity) {
        this.entity = entity;
    };

    HtmlFollow.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.c = document.createElement('div');
            var s = document.createElement('script');
            s.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';
            s.onload = this.loadFont.bind(this);
            document.getElementsByTagName('head')[0].appendChild(s);
            
            this.c.style.position = 'absolute';
            
            
            this.label = document.createElement('div');
            this.label.innerHTML = this.text;
            this.label.style.whiteSpace = 'nowrap';
            this.label.style.overflow = 'hidden';
            this.c.appendChild(this.label);
 
            this.cam = app.root.findByName('Camera');
            this.canvas = document.getElementById('application-canvas');
            
            // obtain the starting distance of the camera to the entity
            // used in magnification and offset adjustment
            var screenPos = new pc.Vec3();
            this.cam.camera.worldToScreen(this.entity.getPosition(), screenPos);
            this.camDistStart = screenPos.z;
            this.ratio = 1;
            
            this.fontSize = 6*this.fontSize/this.camDistStart;
            this.offsetX = 0.025*this.offsetX*this.camDistStart - this.fontSize;
            this.offsetY = 0.004*this.offsetY*this.camDistStart - 3.1*this.fontSize;
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var screenPos = new pc.Vec3();
            this.cam.camera.worldToScreen(this.entity.getPosition(), screenPos);
            if(screenPos.z > 0){
                //compute magnification and offset adjustment
                this.c.style.zIndex = Math.round(2000/screenPos.z);
                this.ratio = this.camDistStart/screenPos.z;
                if(this.ratio>10)this.ratio=10;
                this.label.style.fontSize = this.fontSize*this.ratio + 'px';
                var oay = this.offsetY*this.ratio;
                var oax = this.offsetX*this.ratio;
                // get bounding rect for absolute page positioning
                var rect = this.canvas.getBoundingClientRect();
                this.c.style.top = screenPos.y + oay + rect.top + 'px';
                this.c.style.left = screenPos.x + oax + rect.left + 'px';
            }else{
                // move overlay offscreen
                this.c.style.top = '-1000px';
                this.c.style.left = '-1000px';
            }
            
        },
        
        loadFont: function () {
            WebFont.load({
                google: {
                  families: [this.fontFamily]
                }
              });
            this.label.style.color = this.color;
            this.label.style.fontSize = this.fontSize + 'px';
            this.label.style.fontFamily = this.fontFamily;
            this.label.style.fontWeight = this.fontWeight;
            document.body.appendChild(this.c);  
        }
    };

    return HtmlFollow;
});