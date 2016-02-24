pc.script.create('debug_display', function (app) {
    // Creates a new Debug_display instance
    var Debug_display = function (entity) {
        this.entity = entity;
    };

    Debug_display.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.splash = document.createElement('div');
            this.splash.id = 'application-debug';
            document.body.appendChild(this.splash);

            //this.logo = document.createElement('img');
            // replace with your logo
            //this.logo.src = 'http://static.playcanvas.com/images/logo/play.png';
            //this.splash.appendChild(this.logo);
            
            var css = [
                '#application-debug {',
                '    position: absolute;',
                '    top: 0px;',
                //'    width: 10%;',
                '    left: 0px;',
                '}'
            ].join('\n');

            var style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
              style.styleSheet.cssText = css;
            } else {
              style.appendChild(document.createTextNode(css));
            }

            document.head.appendChild(style);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Debug_display;
});