//this script work in some ways
//Assign the controller is not yet work on. It will set the current controller.
//Note if the controller is not plugin it will not detect bluetooth controller if there plugin control it will detect.

pc.script.attribute('deadzone_min', 'number',-0.02);
pc.script.attribute('deadzone_max', 'number',0.027);

pc.script.create('gamepad_browser', function (app) {
    // Creates a new Browsergamepad instance
    var Gamepad_browser = function (entity) {
        this.entity = entity;
        this.gamepads = null;
        this.controllercurrentcount = 0;
        this.controller = null;        
        this.key = [];//store boolean and axes for state and old state
        this.deadzone_min = 0; //this make sure the stick spam when it not needed. Since there is event trigger
        this.deadzone_max = 0; //this make sure the stick spam when it not needed. Since there is event trigger
        
        this.htmlcontrollercount  = null;
        this.htmlid = null; //display html controller gamepad id
        this.htmlcontrol = null;//display controller gamepad names and values
        
    };

    Gamepad_browser.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.gamepads = new pc.GamePads();
            
            var wrapper = this.wrapper = document.createElement('div');
            wrapper.id = 'application-debug-wrapper';
            document.body.appendChild(wrapper);
            
            this.htmlcontrollercount = document.createElement('div');
            this.htmlcontrollercount.innerHTML  = "Controllers:0";
            wrapper.appendChild(this.htmlcontrollercount);
            
            this.htmlcontrolleroptions = document.createElement('select');
            //this.htmlcontrolleroptions.innerHTML  = "Controllers:0";
            wrapper.appendChild(this.htmlcontrolleroptions);
            
            //this deal with option event change value listen
            var self = this;
            this.htmlcontrolleroptions.addEventListener("change", function() {
                //console.log(self.htmlcontrolleroptions.value);
                self.selectcontroller(self.htmlcontrolleroptions.value);
            });
            //this show the controller gamepad id
            var htmlid = this.htmlid = document.createElement('div');
            htmlid.innerHTML  = "ID:unknown";
            wrapper.appendChild(htmlid);
            
            //this display controller list as well to clean the list when select the gamepad controller
            this.htmlcontrol = document.createElement('div');
            this.htmlcontrol.innerHTML  = "controller";
            wrapper.appendChild(this.htmlcontrol);
                        
            var css = [
             '#application-debug-wrapper {',
                    '    position: absolute;',
                    '    top: 0;',
                    '    left: 0;',
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
        
        //this assign the game controller gamepad to display in html
        selectcontroller:function(index){
            this.htmlcontrol.innerText = "";
            this.controller = this.gamepads.poll()[index]; 
            //console.log(this.controller);
            this.htmlid.innerHTML = "ID:"+ this.controller.pad.id;

            for( i = 0;i < this.controller.pad.axes.length;i++){
                var axes = document.createElement('div');
                axes.id = "axes" + i;
                axes.innerHTML  =  "Axes " + this.controller.map.axes[i] + ":0";
                this.htmlcontrol.appendChild(axes);

                //this is joy stick value change in real time whie this update area
                this.key[this.controller.map.axes[i]] = this.controller.pad.axes[i];
                this.key["old" + this.controller.map.axes[i]] = this.controller.pad.axes[i];

            }

            for( i = 0;i < this.controller.pad.buttons.length;i++){
                var button = document.createElement('div');
                button.id = "button" + i;
                button.innerHTML  = "button_" + i + " " + this.controller.map.buttons[i] + " :false" + " value:0";
                this.htmlcontrol.appendChild(button);
                //this deal with the pressure trigger as well boolean
                namestate = this.controller.map.buttons[i];
                this.key[namestate] = (this.controller.pad.buttons[i].value);
                oldnamestate = 'old'+ namestate;
                this.key[oldnamestate] = (this.controller.pad.buttons[i].value);

            }
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var namestate;
            var oldnamestate;
            //var i = 0;
            //get how many gamepad controllers
            var controllers = this.gamepads.poll();
            var controllercount = controllers.length;
            //check if controller is there note it will not detect wireless from ps4 bluetooth. Must be plug in computer to work to be detected.
            if(this.controllercurrentcount != controllercount){
                this.controllercurrentcount = controllercount;
                this.htmlcontrollercount.innerHTML = "Controllers:"+ controllers.length;
                //this.htmlcontrol.innerText = "";
                //if controller exist
                if(controllercount > 0){
                    //display controller count 
                    //console.log("add?");
                    //console.log(controllers.length);
                    //clear controller display list
                    this.htmlcontrolleroptions.innerHTML = "";
                    for(var i=0; i< controllers.length;i++){
                        var option  = document.createElement('option');
                        option.setAttribute('value',controllers[i].pad.index);
                        option.innerText = controllers[i].pad.id;
                        //console.log(option);
                        this.htmlcontrolleroptions.appendChild(option);
                        //console.log(controllers[i].pad.id);
                    }
                    //console.log(controllers);
                    //by default if controller is plug in to detect to display it
                    this.selectcontroller(0);
                    //console.log(this.htmlcontrollercount);
                    //set currrent controller
                    //console.log(this.key);
                    //console.log(this.controller);
                    //console.log("Controller set!");
                }else{
                    //console.log(this.htmlcontrol);
                    //clear html text to set it to none
                    this.htmlid.innerHTML = "ID:None";
                    this.htmlcontrolleroptions.innerHTML = "";
                    this.htmlcontrol.innerText = "";
                }
            }
            
            //make sure the controler exist to display change of values
            if(this.controller != null){
                //loop axes to display and state boolean 
                for(var i =0;i < this.controller.pad.axes.length;i++){
                    var axesid = document.getElementById('axes'+i);
                    if(axesid){
                        //assign name string id
                        namestate = this.controller.map.axes[i];
                        oldnamestate = 'old'+ namestate;
                        //get display axes and assign value
                        axesid.innerHTML = "Axes " + this.controller.map.axes[i] + ":" + this.controller.pad.axes[i];
                        //check if the dead zone when the stick is Idle
                        if( (this.deadzone_min < this.controller.pad.axes[i]) && (this.controller.pad.axes[i] < this.deadzone_max) ){
                            //console.log("dead zone");
                        }else{
                            this.key[namestate] = this.controller.pad.axes[i];
                            //console.log("update");
                        }

                        //this will make sure it not spam only check state is used or not
                        if(this.key[namestate] != this.key[oldnamestate]){
                            //console.log("axes change?");
                            this.key[oldnamestate] = this.key[namestate];
                            app.fire("gamepad:"+this.controller.pad.index, {pad:this.controller.map.axes[i],value: this.controller.pad.axes[i]});
                        }
                    }
                }
                
                //loop the button as well trigger pressure value
                for(var i =0; i < this.controller.pad.buttons.length;i++){
                    var buttonid = document.getElementById('button'+i);
                    if(buttonid){
                        //assign name string id
                        namestate = this.controller.map.buttons[i];
                        oldnamestate = 'old'+ namestate;
                        //get display button and assign value
                        buttonid.innerHTML = "button_" + i + " " + this.controller.map.buttons[i] + " :" + this.controller.pad.buttons[i].pressed + " value:" + this.controller.pad.buttons[i].value;
                        this.key[namestate] = (this.controller.pad.buttons[i].value);
                        //this will make sure it not spam only check state is used or not
                        if(this.key[namestate] != this.key[oldnamestate]){
                            this.key[oldnamestate] = this.key[namestate];
                            //console.log("button change?");
                            app.fire("gamepad:"+this.controller.pad.index, {pad:this.controller.map.buttons[i],value: this.controller.pad.buttons[i].value});
                        }
                    }
                }
                
            }
            namestate = null;
            oldnamestate = null;
        }
    };
    return Gamepad_browser;
});