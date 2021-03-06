var $kenImage = $("#ken-image");
var $sakuraImage = $("#sakura-image");
var $chibiImage = $("#chibi-image");
var $ryuImage = $("#ryu-image");
var $attackBtn = $("#attack-btn");
var $playerHp
var $computerHp
var $playerXp
var $computerXp
var $playerHpDiv;
var $playerXpDiv;
var $computerHpDiv;
var $computerXpDiv;

var game = {
    player: "",
    computerPlayer: "",
    playerHp: 0,
    computerHp: 0,
    playerAtk: 0,
    counterAtk: 0,
    activeOpponents: [],

    characters: {
        "ken": {
            name: "Ken",
            hp: 125,
            atk: 8,
            counterAtk: 20,
            avatar: "assets/images/ken.png"
        },
        "sakura": {
            name: "Sakura",
            hp: 100,
            atk: 4,
            counterAtk: 10,
            avatar: "assets/images/sakura.png"
        },
        "chibi": {
            name: "Chibi",
            hp: 115,
            atk: 6,
            counterAtk: 15,
            avatar: "assets/images/chibi.png"
        },
        "ryu": {
            name: "Ryu",
            hp: 150,
            atk: 10,
            counterAtk: 25,
            avatar: "assets/images/ryu.png"

        }
    },

    //select player
    selectPlayer: function (player) {
        if (this.player === "") {
            this.player = player;
            this.playerHp = this.characters[this.player].hp;
            this.playerAtk = this.characters[this.player].atk;
            var $attacker = $("<img>");
            $attacker.attr("src", this.characters[this.player].avatar);
            $attacker.addClass(player)
            $("#attacker").html($attacker);

            this.opponent();

        }
        this.startGame();
    },
    opponent: function () {
        for (var defender in this.characters) {
            if (defender !== this.player) {
                this.computerPlayer = defender;
                console.log("Defender: " + defender);

                var $defender = $("<img>");
                $defender.attr("src", this.characters[defender].avatar);
                $defender.addClass(defender);
                $("#defender").append($defender);
                this.activeOpponents.push(this.characters[defender]);

            }
        }

        this.computerHp = this.characters[this.computerPlayer].hp;
        this.counterAtk = this.characters[this.computerPlayer].counterAtk;
        console.log(this.computerPlayer);
        $("#opponent").html(this.computerPlayer);
        $("#player").html(this.player);
    },

    //set-up of game
    setUp: function () {
        this.playerHpSetup();
        this.ComputerHpSetup();
        this.playerXpSetup();
        this.computerXpSetup();

    },
    playerHpSetup: function () {
        $playerHpDiv = $("<div>");
        $playerHpDiv.addClass('progress');
        $playerHp = $('<div role="progressbar" aria-valuemin="0" style="width: 0%;">');
        $playerHp.attr('width', this.playerHp + '%');
        $playerHpDiv.addClass('progress-bar bg-danger');
        $('.playerHP').append($playerHpDiv.append($playerHp));

    },
    ComputerHpSetup: function () {
        $('.computerHP').empty();
        $computerHpDiv = $("<div>");
        $computerHpDiv.addClass('progress');
        $computerHp = $('<div role="progressbar"  aria-valuemin="0" style="width: 0%;">');
        $computerHp.attr('width', this.computerHp + '%');
        $computerHp.text(this.computerHp);
        $computerHpDiv.addClass('progress-bar bg-danger');
        $('.computerHP').append($computerHpDiv.append($computerHp));

    },
    playerXpSetup: function () {
        $playerXpDiv = $("<div>");
        $playerXpDiv.addClass('progress');
        $playerXp = $('<div role="progressbar" aria-valuemin="0" style="width: 0%;">');
        $playerXp.attr('width', this.playerAtk + '%');
        $playerXpDiv.addClass('progress-bar bg-info');
        $('.playerXP').append($playerXpDiv.append($playerXp));
    },
    computerXpSetup: function () {
        $('.computerXP').empty();
        $computerXpDiv = $("<div>");
        $computerXpDiv.addClass('progress');
        $computerXp = $('<div role="progressbar"  aria-valuemin="0" style="width: 0%;">');
        $computerXp.attr('width', this.counterAtk + '%');
        $computerXp.text(this.computerHp);
        $computerXpDiv.addClass('progress-bar bg-info'); 
        $('.computerXP').html($computerXpDiv.append($computerXp));
       
    },

    startGame: function () {
        this.setUp();
        $attackBtn.addClass('btn btn-danger btn-lg');
        $attackBtn.html("Attack!");
        $("#attack-btn").append($attackBtn);
    },
    //attack function
    fight: function () {

        this.playerAtk = this.playerAtk * 2;
        this.computerHp = this.computerHp - this.playerAtk;
        this.playerHp = this.playerHp - this.counterAtk;

        console.log("Computer Health: " + this.computerHp);
        console.log("Player Health: " + this.playerHp);

    },

    //update players
    update: function () {
        $computerHp.attr('width', this.computerHp + '%');
        $playerHp.html(this.playerHp + 'HP');
        $playerHp.attr('width', this.playerHp + '%');
        $computerHp.html(this.computerHp + 'HP');
        $playerXp.html(this.playerAtk + 'XP');
        $playerXp.attr('width', this.playerAtk + '%');
        $computerXp.html(this.counterAtk + 'XP');
        $computerXp.attr('width', this.counterAtk + '%');

        this.checkForWinner();

    },

    //check for winner
    checkForWinner: function () {
        if (this.computerHp <= 0)  {
            //you win
            alert('You beat ' + this.computerPlayer + " !");

            this.decreaseOpponent();

        } else if (this.playerHp <= 0) {
            //you lose
            alert('You Lose!');

        }
    },
    decreaseOpponent: function(){
           //check if there is still more opponents left
           if (this.activeOpponents.length >= 2) {
            var nextOpponent = this.activeOpponents.length - 2;
            this.computerPlayer = this.activeOpponents[nextOpponent].name;
            this.computerHp = this.activeOpponents[nextOpponent].hp;
            this.computerXp = this.activeOpponents[nextOpponent].xp;
            this.activeOpponents.pop();
            console.log(this.activeOpponents);
            $("#opponent").html(this.computerPlayer);
            this.ComputerHpSetup();
            this.computerXpSetup();
            console.log(this.computerHp);
    
    }

} 
};

// playing the actual game

$(document).ready(function () {


    $kenImage.on('click', function () {
        var data = $(this).data("name");
        game.selectPlayer(data);
        console.log(data);

    });

    $ryuImage.on('click', function () {
        var data = $(this).data("name");
        game.selectPlayer(data);
        console.log(data);

    });

    $sakuraImage.on('click', function () {
        var data = $(this).data("name");
        game.selectPlayer(data)
        console.log(data);

    });
    $chibiImage.on('click', function () {
        var data = $(this).data("name");
        game.selectPlayer(data)
        console.log(data);

    });

    $attackBtn.on('click', function () {
        game.fight();
        game.update();
    });
});