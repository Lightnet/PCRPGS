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

pc.script.attribute('min', 'number');
pc.script.attribute('max', 'number');

pc.script.attribute('barsize', 'number');

pc.script.attribute('bartype', 'enumeration', 0, {
    enumerations: [{
       name: "horizontal",
       value: 0
    }, {
       name: "vertical",
       value: 1
    }]
 });

pc.script.create('sprite_scrollbar', function (app) {
    // Creates a new Spritescrollbar instance
    var Sprite_scrollbar = function (entity) {
        this.entity = entity;
        this.offsetx = 0;
        this.offsety = 0;
        this.mousex = 0;
        this.mousey = 0;
        this.bupdateposition = false;
        
        this.setx = 0;
        this.sety = 0;
        
        this.min = 0;
        this.max = 0;
        this.barsize = 0;        
        this.bartype = 0;
        this.slidex = 0;
        this.slidey = 0;
        
        this.percent = 0;
    };

    Sprite_scrollbar.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.script.sprite.on('click', this.onClickPress, this);
            this.entity.script.sprite.on('clickrelease', this.onClickRelease, this);
            app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
            this.setfixedposition(this.entity.script.sprite.x,this.entity.script.sprite.y);
            
            if(this.bartype === 0){//horizontal
                this.slidex = (this.entity.script.sprite.x);
                this.min = this.slidex;
                this.max = this.slidex + this.barsize;
            }
            
            if(this.bartype === 1){//horizontal
                this.slidey = (this.entity.script.sprite.y);
                this.min = this.slidey + (this.barsize * -1);
                this.max =  this.slidey;
                //console.log("horizontal:"+this.max);
            }
        },
        
        setfixedposition:function(x,y){
            this.setx = x;
            this.sety = y;
        },
        
        onMouseMove: function (event) {
            //console.log(this.min + ":" + this.max + " :" + this.mousey);
            this.mousex = event.x;
            this.mousey = event.y;
            
            if( this.bupdateposition){
                if(this.bartype === 0){//horizontal
                    this.slidex = (event.x + this.offsetx);
                    this.entity.script.sprite.x = pc.math.clamp(this.slidex, this.min, this.max);
                    this.percent = (pc.math.clamp(this.slidex, this.min, this.max) - this.min) / this.barsize;
                    //console.log(this.percent);
                }
                if(this.bartype == 1){//vertical
                    this.slidey = (event.y + this.offsety) * -1;
                    this.entity.script.sprite.y = pc.math.clamp(this.slidey,this.min, this.max);
                    
                    
                    this.percent = (this.barsize -  ((pc.math.clamp(this.slidey, this.min, this.max)) - (this.min))) / this.barsize;
                    //console.log(this.percent);
                    
                }
            }
            
            
            //console.log(this.slidex);
            
        },
        
        onClickPress: function () {
            this.bupdateposition = true;
            this.offsetx = this.entity.script.sprite.x - this.mousex;
            this.offsety = (this.entity.script.sprite.y * -1) - this.mousey;//inverted
            //console.log(this.offsety);          
        },
        onClickRelease: function () {
            this.bupdateposition = false;
        }

        // Called every frame, dt is time in seconds since last update
        //update: function (dt) {
        //}
    };

    return Sprite_scrollbar;
});