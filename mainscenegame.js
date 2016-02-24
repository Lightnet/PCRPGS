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

pc.script.create('mainscenegame', function (app) {
    // Creates a new Mainscenegame instance
    var Mainscenegame = function (entity) {
        this.entity = entity;
    };

    Mainscenegame.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            console.log("test init...");
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Mainscenegame;
});