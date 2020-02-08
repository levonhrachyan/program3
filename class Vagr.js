let LivingCreature = require("./LivingCreature")
module.exports = class Vagr extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 20;
        this.directions = []
    }


    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 2, this.y + 2],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y],
            [this.x + 2, this.y - 2],
            [this.x + 1, this.y],
            [this.x + 2, this.y + 2],
            [this.x - 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(character) {
        this.getNewDirections()
        return super.chooseCell(character);
    }
    mul() {
        var emptyCells = this.chooseCell(0) 
        var empty = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (empty && this.energy > 30) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            var vr = new Vagr(newX, newY, this.index)
            vagrArr.push(vr)
            this.energy=20
        }
    }

    move() {
        var emptyCells = this.chooseCell(0) 
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
            this.energy --;
        }
    }
    move2() {
        var emptyCells = super.chooseCell(1) 
        var empty = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (empty) {
            var newX = empty[0]
            var newY = empty[1]

            matrix[newY][newX] = this.index
            matrix[this.y][this.x] = 1

            this.x = newX
            this.y = newY
            this.energy--;
        }
    }

    eat() {
        var emptyCells = super.chooseCell(2)
        var empty = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = this.index
            matrix[this.y][this.x] = 0

            for (var i in xotakerArr) {
                if (xotakerArr[i].x === newX && xotakerArr[i].y === newY) {
                    xotakerArr.splice(i, 1)
                }
            }

            this.x = newX
            this.y = newY
            this.energy += 3
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in vagrArr) {
                if (vagrArr[i].x == this.x && vagrArr[i].y == this.y) {
                    vagrArr.splice(i, 1)
                }
            }
        }
    }
}

