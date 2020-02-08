let LivingCreature = require("./LivingCreature")
module.exports = class Xotaker extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 15;
        this.directions = []
    }

    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(character) {
        this.getNewDirections()

        return super.chooseCell(character)

    }
    mul() {
        var emptyCells = super.chooseCell(0)
        var empty = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (empty && this.energy > 30) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            var xt = new Xotaker(newX, newY, this.index)
            xotakerArr.push(xt)
            this.energy = 5;
        }
    }

    move() {
        var emptyCells = this.chooseCell(0)
        var empty = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = this.index
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
            this.energy--
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1)
        var food = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0

            for (var i in grassArr) {
                if (grassArr[i].x === newX && grassArr[i].y === newY) {
                    grassArr.splice(i, 1)
                }
            }

            this.x = newX
            this.y = newY
            this.energy += 2
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in xotakerArr) {
                if (xotakerArr[i].x === this.x && xotakerArr[i].y === this.y) {
                    xotakerArr.splice(i, 1)
                }
            }
        }
    }
}