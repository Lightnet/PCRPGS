

pc.script.create('loadingscreen', function (app) {
    // Creates a new Loadingscreen instance
    var Loadingscreen = function (entity) {
        this.entity = entity;
        this.splash = null;
        this.logo = null;
        this.container = null;
        this.bar = null;
    };

    Loadingscreen.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.createCss();
            this.showSplash();
            //app.on("preload:end", function () {
                //app.off("preload:progress");
                //console.log("preload:progress");
            //});
            //app.on("preload:progress", this.setProgress);
            //app.on("Splash:HideLoading", this.hideSplash);
            //app.on("Splash:ShowLoading", this.showSplash);
        },
        
        showSplash: function () {
            if(this.splash == null){
                this.splash = document.createElement('div');
                this.splash.id = 'application-splash';
                document.body.appendChild(this.splash);

                this.logo = document.createElement('img');
                // replace with your logo
                this.logo.src = 'http://static.playcanvas.com/images/logo/play.png';
                this.splash.appendChild(this.logo);

                // progress bar
                this.container = document.createElement('div');
                this.container.id = 'progress-container';
                this.splash.appendChild(this.container);

                this.bar = document.createElement('div');
                this.bar.id = 'progress-bar';
                this.container.appendChild(this.bar);
            }else{
                console.log(this.splash);
                document.body.appendChild(this.splash);
            }
        },
        
        hideSplash: function () {
            console.log("hideSplash");
            var splash = document.getElementById('application-splash');
            if(splash !==null){
                splash.parentElement.removeChild(splash);    
            }
            console.log(splash);
            //console.log("HIDE?");
        },
        setProgress: function (value) {
            var bar = document.getElementById('progress-bar');
            if(bar) {
                value = Math.min(1, Math.max(0, value));
                bar.style.width = value * 100 + '%';
            }
        },
        createCss: function () {
            console.log("createCss");
            var css = [
                '#application-splash {',
                '    position: absolute;',
                '    top: 42%;',
                '    width: 10%;',
                '    left: 45%;',
                '}',

                '#application-splash img {',
                '    width: 100%;',
                '}',

                '#progress-container {',
                '    width: 100%;',
                '    height: 2px;',
                '    position: absolute;',
                '    background-color: #444;',
                '}',

                '#progress-bar {',
                '    width: 0%;',
                '    height: 100%;',
                '    background-color: white;',
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
        }

        // Called every frame, dt is time in seconds since last update
        //update: function (dt) {
        //}
    };
    
    return Loadingscreen;
});