//https://en.wikipedia.org/wiki/Attribute_(role-playing_games)


pc.script.create('status', function (app) {
    // Creates a new Status instance
    var Status = function (entity) {
        this.entity = entity;
        this.healthpoint = 0;
        this.maxhealthpoint = 0;
        
        this.magicpoint = 0;
        this.maxmagicpoint = 0;
        
        this.satisfypoint = 0;
        this.maxsatisfypoint = 0;
        
        this.hygienepoint = 0;
        this.maxhygienepoint = 0;
        
        this.energypoint = 0;
        this.maxenergypoint = 0;
        
        this.Strength = 0;
        this.Dexterity = 0;
        this.Constitution = 0; //aka Stamina, Endurance, Vitality, ...        
        this.Agility = 0;
        this.Intelligence = 0;
        this.Willpower = 0;
        this.Perception  = 0;
        
        this.Luck = 0;
        this.Charm = 0;
        this.Faith = 0;
        this.Spirit = 0;
        
        this.conditions = [];        
        
        this.titles = [];
        this.skills = [];
        this.trats = [];
        
    };

    Status.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Status;
});