//pc.script.attribute('key', 'string');

pc.script.attribute('eventname', 'string', null);

pc.script.attribute('hotkey', 'string', 'KEY_SPACE');

pc.script.attribute('bhotkey', 'boolean', true);

pc.script.attribute('key', 'enumeration', 32, {
    enumerations: [{
       name: "KEY_0",
       value: 48
    }, {
       name: "KEY_1",
       value: 49
    }, {
       name: "KEY_2",
       value: 50
    }, {
       name: "KEY_3",
       value: 51
    }, {
       name: "KEY_4",
       value: 52
    }, {
       name: "KEY_5",
       value: 53
    }, {
       name: "KEY_6",
       value: 54
    }, {
       name: "KEY_7",
       value: 55
    }, {
       name: "KEY_8",
       value: 56
    }, {
       name: "KEY_9",
       value: 57
    }, {
       name: "KEY_A",
       value: 65
    }, {
       name: "KEY_ADD",
       value: 107
    }, {
       name: "KEY_ALT",
       value: 18
    }, {
       name: "KEY_B",
       value: 66
    }, {
       name: "KEY_BACKSPACE",
       value: 8
    }, {
       name: "KEY_BACK_SLASH",
       value: 220
    }, {
       name: "KEY_C",
       value: 67
    }, {
       name: "KEY_CAPS_LOCK",
       value: 20
    }, {
       name: "KEY_CLOSE_BRACKET",
       value: 221
    }, {
       name: "KEY_COMMA",
       value: 188
    }, {
       name: "KEY_CONTEXT_MENU",
       value: 93
    }, {
       name: "KEY_CONTROL",
       value: 17
    }, {
       name: "KEY_D",
       value: 68
    }, {
       name: "KEY_DECIMAL",
       value: 110
    }, {
       name: "KEY_DELETE",
       value: 46
    }, {
       name: "KEY_DIVIDE",
       value: 111
    }, {
       name: "KEY_DOWN",
       value: 40
    }, {
       name: "KEY_E",
       value: 69
    }, {
       name: "KEY_END",
       value: 35
    }, {
       name: "KEY_ENTER",
       value: 13
    }, {
       name: "KEY_EQUAL",
       value: 64
    }, {
       name: "KEY_ESCAPE",
       value: 27
    }, {
       name: "KEY_F",
       value: 70
    }, {
       name: "KEY_F1",
       value: 112
    }, {
       name: "KEY_F2",
       value: 113
    }, {
       name: "KEY_F3",
       value: 114
    }, {
       name: "KEY_F4",
       value: 115
    }, {
       name: "KEY_F5",
       value: 116
    }, {
       name: "KEY_F6",
       value: 117
    }, {
       name: "KEY_F7",
       value: 118
    }, {
       name: "KEY_F8",
       value: 119
    }, {
       name: "KEY_F9",
       value: 120
    }, {
       name: "KEY_F10",
       value: 121
    }, {
       name: "KEY_F11",
       value: 122
    }, {
       name: "KEY_F12",
       value: 123
    }, {
       name: "KEY_G",
       value: 71
    }, {
       name: "KEY_H",
       value: 72
    }, {
       name: "KEY_HOME",
       value: 36
    }, {
       name: "KEY_I",
       value: 73
    }, {
       name: "KEY_INSERT",
       value: 45
    }, {
       name: "KEY_J",
       value: 74
    }, {
       name: "KEY_K",
       value: 75
    }, {
       name: "KEY_L",
       value: 76
    }, {
       name: "KEY_LEFT",
       value: 37
    }, {
       name: "KEY_M",
       value: 77
    }, {
       name: "KEY_META",
       value: 224
    }, {
       name: "KEY_MULTIPLY",
       value: 106
    }, {
       name: "KEY_N",
       value: 78
    }, {
       name: "KEY_NUMPAD_0",
       value: 96
    }, {
       name: "KEY_NUMPAD_1",
       value: 97
    }, {
       name: "KEY_NUMPAD_2",
       value: 98
    }, {
       name: "KEY_NUMPAD_3",
       value: 99
    }, {
       name: "KEY_NUMPAD_4",
       value: 100
    }, {
       name: "KEY_NUMPAD_5",
       value: 101
    }, {
       name: "KEY_NUMPAD_6",
       value: 102
    }, {
       name: "KEY_NUMPAD_7",
       value: 103
    }, {
       name: "KEY_NUMPAD_8",
       value: 104
    }, {
       name: "KEY_NUMPAD_9",
       value: 105
    }, {
       name: "KEY_O",
       value: 79
    }, {
       name: "KEY_OPEN_BRACKET",
       value: 219
    }, {
       name: "KEY_P",
       value: 80
    }, {
       name: "KEY_PAGE_DOWN",
       value: 34
    }, {
       name: "KEY_PAGE_UP",
       value: 33
    }, {
       name: "KEY_PAUSE",
       value: 19
    }, {
       name: "KEY_PERIOD",
       value: 190
    }, {
       name: "KEY_PRINT_SCREEN",
       value: 44
    }, {
       name: "KEY_Q",
       value: 81
    }, {
       name: "KEY_R",
       value: 82
    }, {
       name: "KEY_RETURN",
       value: 13
    }, {
       name: "KEY_RIGHT",
       value: 39
    }, {
       name: "KEY_S",
       value: 83
    }, {
       name: "KEY_SEMICOLON",
       value: 59
    }, {
       name: "KEY_SEPARATOR",
       value: 108
    }, {
       name: "KEY_SHIFT",
       value: 16
    }, {
       name: "KEY_SLASH",
       value: 191
    }, {
       name: "KEY_SPACE",
       value: 32
    }, {
       name: "KEY_SUBTRACT",
       value: 109
    }, {
       name: "KEY_T",
       value: 84
    }, {
       name: "KEY_TAB",
       value: 9
    }, {
       name: "KEY_U",
       value: 85
    }, {
       name: "KEY_UP",
       value: 38
    }, {
       name: "KEY_V",
       value: 86
    }, {
       name: "KEY_W",
       value: 87
    }, {
       name: "KEY_WINDOWS",
       value: 91
    }, {
       name: "KEY_X",
       value: 88
    }, {
       name: "KEY_Y",
       value: 89
    }, {
       name: "KEY_Z",
       value: 90
    }]
 });

pc.script.create('Keyboard_HotKey', function (app) {
    // Creates a new Keyboard_HotKey instance
    var Keyboard_HotKey = function (entity) {
        this.entity = entity;
        this.key = null;
        this.eventname = null;
        this.bhotkey = true;
    };

    Keyboard_HotKey.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
            app.keyboard.on(pc.EVENT_KEYUP, this.onKeyUp, this);
        },
        
        /*
        * Event handler called when key is pressed
        */
        onKeyDown: function (event) {
            //console.log(event.key);
            //console.log(pc);
            if(this.bhotkey == true){
                if(pc[this.hotkey] == event.key){
                    console.log("hit");
                    if(this.eventname != null){
                        app.fire(this.eventname);
                    }
                }
            }else{
                if(this.key == event.key){
                    console.log("hit");
                    if(this.eventname != null){
                        app.fire(this.eventname);
                    }
                }
            }
            //console.log(this.key);
            
            // Check event.key to detect which key has been pressed
            //if (event.key === pc.KEY_A) {
                //this.entity.model.materialAsset = this.redMaterial;
            //}

            // When the space bar is pressed this scrolls the window.
            // Calling preventDefault() on the original browser event stops this.
            event.event.preventDefault();
        },

        /*
        * Event handler called when key is released
        */
        onKeyUp: function (event) {
            
            // Check event.key to detect which key has been pressed
            //if (event.key === pc.KEY_A) {
                //this.entity.model.materialAsset = this.whiteMaterial;
            //}
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Keyboard_HotKey;
});