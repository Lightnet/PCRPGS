


pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);
        
        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        document.body.appendChild(splash); //default
        //wrapper.appendChild(splash);
        //splash.style.display = 'none';
        
        var logo = document.createElement('img');
        // replace with your logo
        logo.src = 'http://static.playcanvas.com/images/logo/play.png';
        splash.appendChild(logo);

        // progress bar
        var container = document.createElement('div');
        container.id = 'progress-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);
        //console.log(splash);
    };

    var hideSplash = function () {
        //trigger 100% any way to make sure it seen loading right.
        app.fire("preload:progress",1);
        //delay the remove html
        setTimeout(function(){
            var wrapper = document.getElementById('application-splash-wrapper');
            if(wrapper != null){
                wrapper.parentElement.removeChild(wrapper);
            }

            //console.log("hideSplash");
            var splash = document.getElementById('application-splash');
            if(splash != null){
                splash.parentElement.removeChild(splash);
            }
        },50);
    };

    var setProgress = function (value) {
        //console.log("setProgress");
        var bar = document.getElementById('progress-bar');
        if(bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        var css = [
             '#application-splash-wrapper {',
                    '    position: absolute;',
                    '    top: 0;',
                    '    left: 0;',
                    '    height: 100%;',
                    '    width: 100%;',
                    '    background-color: #283538;',
                    '}',
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
    };

    createCss();
    showSplash();
    
    app.on("preload:start", function(){
        //createCss();
        showSplash();
        console.log("start showSplash");
    });
    
    app.on("preload:screen", function(){
        //createCss();
        showSplash();
        //console.log("start showSplash");
        app.fire("preload:progress",1);
        setTimeout(function(){
            app.fire("loadingscreen:end");
        },100);
        
    });
    

    app.on("preload:end", function () {
        app.off("preload:progress");
        console.log("preload:progress");
    });
    app.on("preload:progress", setProgress);
    //app.on("start", hideSplash);
    app.on("start", hideSplash);
    app.on("loadingscreen:end", hideSplash);
        
});


/*
pc.script.createLoadingScreen(function (app) {
    var showSplashScreen = function () {
        console.log("showSplashScreen");
    };
    var hideSplashScreen = function () {
        console.log("hideSplashScreen");
    };
    var showProgress = function (progress) {
        console.log("showProgress");
    };
    app.on("preload:start", showSplashScreen);
    app.on("preload:progress", showProgress);
    app.on("start", hideSplashScreen);
});
*/