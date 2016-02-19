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

pc.script.attribute('BTN_StartGame', 'entity');
pc.script.attribute('BTN_NewGame', 'entity');
pc.script.attribute('BTN_OptionsGame', 'entity');


pc.script.attribute('option_panel', 'entity');
pc.script.attribute('newgame_panel', 'entity');

pc.script.create('UIMainMenu', function (app) {
    // Creates a new UIMainMenu instance
    var UIMainMenu = function (entity) {
        this.entity = entity;
        this.BTN_StartGame = null;
        this.BTN_NewGame = null;
        this.BTN_OptionsGame = null;
        
        this.option_panel  = null;
        this.newgame_panel = null;
        
    };
    
    pc.ui.registerFont('http://fonts.googleapis.com/css?family=Indie+Flower');
    pc.ui.registerFont('http://fonts.googleapis.com/css?family=Audiowide');

    UIMainMenu.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var swidth = window.screen.width;
            var sheight = window.screen.height;
            
            var toSpawn = app.root.findByName('Spawn');
            
            var root = pc.ui.section('root');
            
            //Standard settings
            root
                .fontFamily('Arial')
                .fontSize(30)
                .color('white');
            
            swidth =  swidth/2;
            sheight = sheight/2;
            var self = this;
            
            
            app.on("ui:start", this.game_start, this);
            app.on("ui:new", this.game_new, this);
            app.on("ui:options", this.game_options, this);
            
            app.on("ui:backnewgame", this.hide_newgamepanel, this);
            app.on("ui:backoption", this.hide_optionpanel, this);
            
            
            //this.BTN_StartGame;
            //this.BTN_NewGame;
            //this.BTN_OptionsGame;
            //console.log(this.BTN_StartGame.script.sprite.x);
            //
            var screen_width =  app.graphicsDevice.canvas.clientWidth;
            var screen_height =  app.graphicsDevice.canvas.clientHeight;
            
            this.UIMainMenu = app.root.findByName('UIMainMenu');
            
            this.BTN_StartGame.script.sprite.x = screen_width/2;
            this.BTN_StartGame.script.sprite.y = (screen_height/2  + 55 * 0) * -1;
            //console.log(window.screen.width);
            //console.log(window.screen.height);
            
            this.BTN_NewGame.script.sprite.x = screen_width/2;
            this.BTN_NewGame.script.sprite.y = (screen_height / 2 + 55 * 1) * -1;
            
            this.BTN_OptionsGame.script.sprite.x = screen_width / 2;
            this.BTN_OptionsGame.script.sprite.y = (screen_height / 2 + 55 * 2) * -1;
            
            
            this.Lablel_StartGame = app.root.findByName('Label Start Game');
            this.Lablel_StartGame.script.font_renderer.x = screen_width/2 + 20;
            this.Lablel_StartGame.script.font_renderer.y = (screen_height/2 + 12 * 1) * -1;            
            
            this.Lablel_NewGame = app.root.findByName('Label New Game');
            this.Lablel_NewGame.script.font_renderer.x = screen_width/2 + 20;
            this.Lablel_NewGame.script.font_renderer.y = (screen_height/2 +55 * 1 + 5 * 2) * -1;
            
            this.Lablel_OptionsGame = app.root.findByName('Label Options');
            this.Lablel_OptionsGame.script.font_renderer.x = screen_width/2 + 20;
            this.Lablel_OptionsGame.script.font_renderer.y = (screen_height/2 +55 * 2 + 5 * 2) * -1;
            //console.log(Lablel_StartGame);
            //console.log( window.screen.width);
            //window.screen.height

            
            
        },
        
        game_start: function () {
            console.log("start game...");
            app.root.destroy();
            //var self = this;
            this.loadLevel('409471', function (entity) {
                //this.loaded[0] = entity;
                pc.scene = entity;
                //console.log(pc.scene);
                //self.destroy();
            }.bind(this));    
        },
        
        game_new: function () {
            //console.log("new game");
            this.hide_mainmenu();
            this.newgame_panel.enabled = true;
        },
        
        game_options: function () {
            //console.log("game options");
            this.hide_mainmenu();
            this.option_panel.enabled = true;
        },
        
        // Main Menu
        hide_mainmenu: function(){
            this.UIMainMenu.enabled = false;
        },
        
        show_mainmenu:function(){
            this.UIMainMenu.enabled = true;
        },
        
        // New Game Panel hide        
        hide_newgamepanel:function(){
            this.show_mainmenu();
            this.newgame_panel.enabled = false;  
        },
        //option panel hide
        hide_optionpanel:function(){
            this.show_mainmenu();
            this.option_panel.enabled = false;
        },
        
        // load the scene `id` then call the callback
        loadLevel: function (id, callback) {
            var self = this;
            var url = id  + ".json";
            app.loadSceneHierarchy(url, function (err, parent) {
                if (!err) {
                    callback(parent);
                }    
            });
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return UIMainMenu;
});

