pc.script.attribute('text', 'string', 'Hello World');
pc.script.attribute('color', 'string', 'blue');
pc.script.attribute('fontFamily', 'string', 'Jura');
pc.script.attribute('fontWeight', 'string', 'bold');
pc.script.attribute('size', 'number', 24);
pc.script.attribute('offsetX', 'number', -40);
pc.script.attribute('offsetY', 'number', -45);

pc.script.create('hF2', function (app) {
    // Creates a new HtmlFollow instance
    var HF2 = function (entity) {
        this.entity = entity;
    };

    HF2.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.c = document.createElement('div');
            var s = document.createElement('script');
            s.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';
            s.onload = this.loadFont.bind(this);
            document.getElementsByTagName('head')[0].appendChild(s);
            
            this.c.style.position = 'absolute';
            this.c.innerHTML = this.text;
            this.c.style.color = this.color;
            this.c.style.fontSize = this.size + 'px';
            document.body.appendChild(this.c);  
            this.cam = app.root.findByName('Camera');
            this.canvas = document.getElementById('application-canvas');
            
            // obtain the starting distance of the camera to the entity
            // used in magnification and offset adjustment
            var screenPos = new pc.Vec3();
            this.cam.camera.worldToScreen(this.entity.getPosition(), screenPos);
            this.camDistStart = screenPos.z;
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var screenPos = new pc.Vec3();
            this.cam.camera.worldToScreen(this.entity.getPosition(), screenPos);
            if(screenPos.z > 0){
                this.c.style.zIndex = Math.round(2000/screenPos.z);
                //compute magnification and offset adjustment
                var ratio = this.camDistStart/screenPos.z;
                if(ratio>10)ratio=10;
                this.c.style.fontSize = this.size*ratio + 'px';
                var oay = this.offsetY*ratio;
                var oax = this.offsetX*ratio;
                // get bounding rect for absolute page positioning
                var rect = this.canvas.getBoundingClientRect();
                var x = screenPos.x+oax+rect.left;
                var y = screenPos.y+oay+rect.top;
                this.c.style.transform = 'translate('+x+'px,'+y+'px)';
                //this.c.style.transform = "translate("+screenPos.x+oax+rect.left+"px,"+screenPos.y+oay+rect.top+"px)";
                //console.log(this.c);
            }else{
                // move overlay offscreen
                this.c.style.transform = "translate( -1000px , -1000px)";
            }
            
        },
        
        loadFont: function () {
            WebFont.load({
                google: {
                  families: [this.fontFamily]
                }
              });
            this.c.style.fontFamily = this.fontFamily;
            this.c.style.fontWeight = this.fontWeight;
            document.body.appendChild(this.c);  
        }
    };

    return HF2;
});