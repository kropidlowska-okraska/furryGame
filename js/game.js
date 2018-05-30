var Furry = require("./furry.js");
var Coin = require("./coins.js");


function Game() {
    var self = this;

    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        self.hideVisibleFurry();

        if (this.board[this.index(this.furry.x, this.furry.y)] !== null && this.board[this.index(this.furry.x, this.furry.y)] !== undefined)
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    var moveCounter = 0;
    this.moveFurry = function () {
        if (self.furry.direction === "right") {
            self.furry.x = self.furry.x + 1;
        } else if (self.furry.direction === "left") {
            self.furry.x = self.furry.x - 1;
        } else if (self.furry.direction === "up") {
            self.furry.y = self.furry.y - 1;
        } else if (self.furry.direction === "down") {
            self.furry.y = self.furry.y + 1;
        }
        self.showFurry();
        self.checkCoinCollision();
        self.gameOver();
        moveCounter++;
        // console.log(moveCounter);
    };

    let SetInerval;
    this.startGame = function () {
        SetInerval = setInterval(function () {
            self.moveFurry();
        }, 250);
    };

    this.hideVisibleFurry = function () {
        let furryToHide = document.querySelector('.furry');
        if (furryToHide !== null && furryToHide !== undefined) {
            furryToHide.classList.remove('furry');
        }
    };

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }

    };

    document.addEventListener('keydown', function (event) {
        self.turnFurry(event);
    });

    this.checkCoinCollision = function () {
        if ((self.furry.x === self.coin.x) && (self.furry.y === self.coin.y)) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
            this.score++;
            var scoreCounter = document.querySelector('#score > div > strong');
            scoreCounter.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(SetInerval);
            self.hideVisibleFurry();
            var lostTime = Math.ceil(250 * moveCounter / 1000);
            //console.log(lostTime);
            alert("Masz problem z prokrastynacja! Stracilas/es " + lostTime + " sek. zycia.");
        }
    };

    self.showFurry(); //czy moge wywolywac te funkcje w obiekcie czy lepiej poza nim?
    self.showCoin();
    self.startGame();
}

module.exports = Game;


