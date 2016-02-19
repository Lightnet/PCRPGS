pc.script.create('LocalStoargeTest', function (app) {
    // Creates a new LocalStoargeTest instance
    var LocalStoargeTest = function (entity) {
        this.entity = entity;
    };

    LocalStoargeTest.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            if(localStorage.demo1234 === undefined){
                localStorage.demo1234 = 0;
            }
            
            //Assigns a temporary value that can be read by the program.
            var item = parseInt(localStorage.demo1234);
            console.log(item);
            //localStorage.demo1234 = 1;
            
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return LocalStoargeTest;
});