pc.script.attribute('propertyScript', 'string', 'controls');
pc.script.attribute('propertyName', 'string', 'health');
//pc.script.attribute('propertyName', 'number', 'health');
pc.script.attribute('maxValue', 'number', 100);
pc.script.attribute('widthFactor', 'number', 1);
pc.script.attribute('heightFactor', 'number', 1);
pc.script.attribute('backcolor', 'string', 'white');
pc.script.attribute('frontcolor', 'string', 'red');
pc.script.attribute('bordercolor', 'string', 'black');
pc.script.attribute('borderstyle', 'string', 'solid');
pc.script.attribute('borderwidth', 'number', 1);


pc.script.create('bar', function (app) {
    // Creates a new Bar instance
    var Bar = function (entity) {
        this.entity = entity;
    };

    Bar.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.hF = this.entity.script.htmlFollow;
            this.c = this.hF.c;
            
            this.width = this.widthFactor*2000/this.hF.camDistStart;
            this.height = this.heightFactor*200/this.hF.camDistStart;
            
            
            this.bar = document.createElement('div');
            this.back = document.createElement('div');
            this.front = document.createElement('div');
            this.back.style.borderColor = this.bordercolor;
            this.back.style.borderStyle = this.borderstyle;
            this.back.style.borderWidth = this.borderwidth + 'px';
            this.back.style.backgroundColor = this.backcolor;
            this.front.style.backgroundColor = this.frontcolor;
            this.back.style.position = 'inherit';
            this.front.style.position = 'absolute';
            this.back.style.width = this.width + 'px';
            this.back.style.height = this.height + 'px';
            this.front.style.width = this.width + 'px';
            this.front.style.height = this.height + 'px';
            this.bar.appendChild(this.back);
            this.back.appendChild(this.front);
            this.c.appendChild(this.bar);
            this.pS = this.entity.script[this.propertyScript];
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            this.back.style.width = this.width * this.hF.ratio + 'px';
            this.back.style.height = this.height * this.hF.ratio + 'px';
            this.front.style.height = this.height * this.hF.ratio + 'px';
            //console.log(this.bar.style.width);
            var val = Math.min(this.pS[this.propertyName],this.maxValue);
            //var val = Math.min(100,this.maxValue);
            var w = val/this.maxValue * this.width * this.hF.ratio;
            this.front.style.width = w + 'px';
        }
    };

    return Bar;
});