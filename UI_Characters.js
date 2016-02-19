



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

pc.script.create('UI_Characters', function (app) {
    // Creates a new UI_Characters instance
    var UI_Characters = function (entity) {
        this.entity = entity;
    };
    
    pc.ui.registerFont('http://fonts.googleapis.com/css?family=Indie+Flower');
    pc.ui.registerFont('http://fonts.googleapis.com/css?family=Audiowide');

    UI_Characters.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var toSpawn = app.root.findByName('Spawn');
            
            var root = pc.ui.section('root');
            
            //Standard settings
            root
                .fontFamily('Arial')
                .fontSize(30)
                .color('white');
            
            //Title group above cube
            var title = root
                .group()
                .follow('Box', { x: 0, y: 1, z: 0 });
            
            //Title text
            var titletext = title
                .text()
                .offset(0, -20)
                .fontSize(50)
                .value("Enter Your Name");
            
             //Health bar
            this.pb = pc.ui.healthBar(title, 100, 8, 10);
            this.value = 0;
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            this.value += dt;
            this.pb.update(this.value % 10, 10);
            //this.score ++;
            //this.scoreText.value(this.score);
        }
    };

    return UI_Characters;
});