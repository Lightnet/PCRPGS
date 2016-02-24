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

pc.script.attribute('BTN_StartGame', 'entity');

pc.script.attribute('BTN_NewGame', 'entity');

pc.script.attribute('BTN_OptionsGame', 'entity');

pc.script.create('UIMainMenu', function (app) {
    // Creates a new UIMainMenu instance
    var UIMainMenu = function (entity) {
        this.entity = entity;
        this.BTN_StartGame = null;
        this.BTN_NewGame = null;
        this.BTN_OptionsGame = null;
    };

    UIMainMenu.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var swidth = window.screen.width;
            var sheight = window.screen.height;
            
            swidth =  swidth/2;
            sheight = sheight/2;
            var self = this;
            
            //var screen_width =  app.graphicsDevice.canvas.clientWidth;
            //var screen_height =  app.graphicsDevice.canvas.clientHeight;
            
            var screen_width =  window.innerWidth;
            var screen_height =  window.innerHeight;
            
            
            this.UIMainMenu = app.root.findByName('UIMainMenu');
            
            this.BTN_StartGame.script.sprite.x = (screen_width/2) - (250/2);
            this.BTN_StartGame.script.sprite.y = (screen_height/2  + 55 * 0) * -1;
            
            this.BTN_NewGame.script.sprite.x = (screen_width/2) - (250/2);
            this.BTN_NewGame.script.sprite.y = (screen_height / 2 + 55 * 1) * -1;
            
            this.BTN_OptionsGame.script.sprite.x = (screen_width / 2) - (250/2);
            this.BTN_OptionsGame.script.sprite.y = (screen_height / 2 + 55 * 2) * -1;
            
            
            this.Lablel_StartGame = app.root.findByName('Label Start Game');
            this.Lablel_StartGame.script.font_renderer.x = (screen_width/2 + 20)- (250/2);
            this.Lablel_StartGame.script.font_renderer.y = (screen_height/2 + 12 * 1) * -1;            
            
            this.Lablel_NewGame = app.root.findByName('Label New Game');
            this.Lablel_NewGame.script.font_renderer.x = (screen_width/2 + 20)- (250/2);
            this.Lablel_NewGame.script.font_renderer.y = (screen_height/2 +55 * 1 + 5 * 2) * -1;
            
            this.Lablel_OptionsGame = app.root.findByName('Label Options');
            this.Lablel_OptionsGame.script.font_renderer.x = (screen_width/2 + 20)- (250/2);
            this.Lablel_OptionsGame.script.font_renderer.y = (screen_height/2 +55 * 2 + 5 * 2) * -1;
            //console.log(Lablel_StartGame);
            //console.log( window.screen.width);
            //window.screen.height
            
            console.log( window.innerWidth+":"+ window.innerHeight);
            
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return UIMainMenu;
});

