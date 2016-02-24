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

pc.script.attribute('currentturn', 'enumeration', 0, {
    enumerations: [{
       name: "Friend",
       value: 0
    }, {
       name: "Enemy",
       value: 1
    }]
 });

pc.script.attribute('party_friend_1','entity');
pc.script.attribute('party_friend_2','entity');
pc.script.attribute('party_friend_3','entity');
pc.script.attribute('party_friend_4','entity');
pc.script.attribute('party_friend_5','entity');
pc.script.attribute('party_friend_6','entity');
pc.script.attribute('party_friend_7','entity');
pc.script.attribute('party_friend_8','entity');
pc.script.attribute('party_friend_9','entity');

pc.script.attribute('party_enemy_1','entity');
pc.script.attribute('party_enemy_2','entity');
pc.script.attribute('party_enemy_3','entity');
pc.script.attribute('party_enemy_4','entity');
pc.script.attribute('party_enemy_5','entity');
pc.script.attribute('party_enemy_6','entity');
pc.script.attribute('party_enemy_7','entity');
pc.script.attribute('party_enemy_8','entity');
pc.script.attribute('party_enemy_9','entity');


pc.script.create('TurnBaseBattleGame', function (app) {
    // Creates a new TurnBaseBattleGame instance
    var TurnBaseBattleGame = function (entity) {
        this.entity = entity;
        
        this.currentowner = "";
        
        this.party_friendly = [];
        
        this.party_friend_1 = null;
        this.party_friend_2 = null;
        this.party_friend_3 = null;
        this.party_friend_4 = null;
        this.party_friend_5 = null;
        this.party_friend_6 = null;
        this.party_friend_7 = null;
        this.party_friend_8 = null;
        this.party_friend_9 = null;
                
        this.party_enemies = [];
        
        this.party_enemy_1 = null;
        this.party_enemy_2 = null;
        this.party_enemy_3 = null;
        this.party_enemy_4 = null;
        this.party_enemy_5 = null;
        this.party_enemy_6 = null;
        this.party_enemy_7 = null;
        this.party_enemy_8 = null;
        this.party_enemy_9 = null;
        
        
        
        //this.opponents = [];
        //this.orders = [];
        
        this.bcoinflip = false;
        
        this.currentturn = 0;
        this.turns = 0; //number turn battles
        
    };

    TurnBaseBattleGame.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            //console.log("FRIENDLY");
            if(this.party_friend_1 !== null){
                this.party_friendly.push(this.party_friend_1);
            }
            if(this.party_friend_2 !== null){
                this.party_friendly.push(this.party_friend_2);
            }
            if(this.party_friend_3 !== null){
                this.party_friendly.push(this.party_friend_3);
            }
            if(this.party_friend_4 !== null){
                this.party_friendly.push(this.party_friend_4);
            }
            if(this.party_friend_5 !== null){
                this.party_friendly.push(this.party_friend_5);
            }
            if(this.party_friend_6 !== null){
                this.party_friendly.push(this.party_friend_6);
            }
            if(this.party_friend_7 !== null){
                this.party_friendly.push(this.party_friend_7);
            }
            if(this.party_friend_8 !== null){
                this.party_friendly.push(this.party_friend_8);
            }
            if(this.party_friend_9 !== null){
                this.party_friendly.push(this.party_friend_9);
            }
            
            //console.log(this.party_friendly[0]);
            
            
            if(this.party_enemy_1 !== null){
                this.party_enemies.push(this.party_enemy_1);
            }
            if(this.party_enemy_2 !== null){
                this.party_enemies.push(this.party_enemy_2);
            }
            if(this.party_enemy_3 !== null){
                this.party_enemies.push(this.party_enemy_3);
            }
            if(this.party_enemy_4 !== null){
                this.party_enemies.push(this.party_enemy_4);
            }
            if(this.party_enemy_5 !== null){
                this.party_enemies.push(this.party_enemy_5);
            }
            if(this.party_enemy_6 !== null){
                this.party_enemies.push(this.party_enemy_6);
            }
            if(this.party_enemy_7 !== null){
                this.party_enemies.push(this.party_enemy_7);
            }
            if(this.party_enemy_8 !== null){
                this.party_enemies.push(this.party_enemy_8);
            }
            if(this.party_enemy_9 !== null){
                this.party_enemies.push(this.party_enemy_9);
            }
            //console.log("FRIENDLY");
            //console.log(this.party_enemies[0]);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return TurnBaseBattleGame;
});