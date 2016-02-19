
pc.extend(pc.ui, { healthBar: function healthBar(container, width, height, max, color) {
    max = max || 1;
    var template = container.group().offset(-width/2, 0);
    var bg = template.rectangle().width(width).height(height).color('rgba(0,0,0,0.4)').offset(0,0);
    var fg = template.rectangle().width(0).height(height).color(color || 'green').offset(0,0);
    template.update = function(value) {
        fg.width(Math.max(0,Math.min(1, value/max)) * width);
    };
    return template;
}});

pc.extend(pc.ui, { button: function button(container, x, y, width, height, text, color, background) {
    width = width || 100;
    height = height || 32;
    var template = container.group().offset(x-width/2, y-height/2);
    var bg = template.rectangle('background').width(width).height(height).color(background || 'rgb(200,200,200)').attr({rx: '5', ry: 5});
    var text = template.text('caption').offset(width/2,height/2 + 2).baseLine('middle').color(color || 'black').fontSize(height * 0.7 | 0).value(text||'Button');
    return template;
}});


pc.script.create('test', function (app) {
    // Creates a new Test instance
    var Test = function (entity) {
        this.entity = entity;
        
    };
    
    pc.ui.registerFont('http://fonts.googleapis.com/css?family=Indie+Flower');
    pc.ui.registerFont('http://fonts.googleapis.com/css?family=Audiowide');

    Test.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            var toSpawn = app.root.findByName('Spawn');
            
            var root = pc.ui.section('root');
            
            //Standard settings
            root
                .fontFamily('Arial')
                .fontSize(30)
                .color('white');
                
                
            //Moving label
            var label = root
                .text()
                .fontSize(25)
                .color('black')
                .value('Type Your Name')
                .anchor('start')
                .offset(32,30);
            
            function move() {
                label
                    .moveTo(80,30,2)
                    .then(function() {
                        this.moveTo(32,30,2)
                            .then(function() {
                                move();
                            })
                    })
            }
            move();
                
            //Input box
            root
                .input()
                .fontSize(25)
                .offset(30,50)
                .value("Enter Your Name")
                .on('click', function() {
                    this.setSelectionRange(0, (this.value||0).length)
                    
                })
                .on('keyup', function() {
                    titletext.value(this.value);
                })
                
            //Title group above cube
            var title = root
                .group()
                .follow('Box', { x: 0, y: 1, z: 0 })
            
            //Title text
            var titletext = title
                .text()
                .offset(0, -20)
                .fontSize(50)
                .value("Enter Your Name")
                
            //Health bar
            this.pb = pc.ui.healthBar(title, 100, 8, 10);
            this.value = 0;
            
            //Click Me button
            root
                .text()
                .fontSize(80)
                .fontFamily('Indie Flower')
                .offset(640,600)
                .value("Click Me")
                .on('mouseup', function() {
                    var s;
                    app.root.addChild(s = toSpawn.clone());
                    s.setPosition(new pc.Vec3(Math.random() * 4 - 2, 1, Math.random() * 4 -2));
                    s.enabled = true;
                });
                
            //WhyDoIDoIt
            var img = root
                .image()
                .width(200)
                .height(66)
                .url(imageData.logo)
                .offset(1000,320);
                
            //On/off button
            var onOff = pc.ui.button(root, 1100, 440, 60, 60, "Off")
                .on('mouseup', function() {
                    if(img.moved) {
                        onOff.caption.value("Off");
                        img.moveTo(1000,320);
                    } else {
                        onOff.caption.value("On");
                        img.moveTo(1000,40); 
                    }
                    img.moved = !img.moved;
                });
            onOff.caption.fontSize(23);
            
            //Simple Text Block
            var block = root
                .text()
                .color('darkgrey')
                .lineLength(40)
                .value("This is some really long text that will automatically split across lines as well as supporting \\n!\n\nSee!")
                .anchor('start')
                .fontWeight('bold')
                .offset(30,300)
                
                
            //Basic score
            this.scoreText = root
                .text('score')
                .color('red')
                .stroke('darkred')
                .strokeWidth(2)
                .fontSize(60)
                .offset(640, 80)
                .value(0);
                
                
            this.score = 0;
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            this.value += dt;
            this.pb.update(this.value % 10, 10);
            this.score ++;
            this.scoreText.value(this.score);
        }
    };

    return Test;
});