let LivingCreature = require("./LivingCreature")
module.exports = class Dragon extends LivingCreature {
    constructor(x, y, index) {
        super(x,y,index)
        this.energy = 20;
        this.directions = []
    }

    getNewDirections() {
        this.directions = [
            [this.x - 3, this.y - 3],
            [this.x - 2, this.y - 3],
            [this.x - 1, this.y - 3],
            [this.x , this.y - 3],
            [this.x +1, this.y - 3],
            [this.x +2, this.y - 3],
            [this.x +3, this.y - 3],
            [this.x -3, this.y - 2],
            [this.x -2, this.y - 2],
            [this.x -1, this.y - 2],
            [this.x , this.y - 2],
            [this.x +1, this.y - 2],
            [this.x +2, this.y - 2],
            [this.x +3, this.y - 2],
            [this.x -3, this.y - 1],
            [this.x -2, this.y - 1],
            [this.x -1, this.y - 1],
            [this.x , this.y - 1],
            [this.x +1, this.y - 1],
            [this.x +2, this.y - 1],
            [this.x +3, this.y - 1],
            [this.x -3, this.y ],
            [this.x -2, this.y ],
            [this.x -1, this.y ],
            [this.x , this.y ],
            [this.x +1, this.y ],
            [this.x +2, this.y ],
            [this.x +3, this.y ],
            [this.x -3, this.y +1],
            [this.x -2, this.y +1],
            [this.x -1, this.y +1],
            [this.x , this.y +1],
            [this.x +1, this.y +1],
            [this.x +2, this.y +1],
            [this.x +3, this.y +1],
            [this.x -3, this.y + 2],
            [this.x -2, this.y + 2],
            [this.x -1, this.y + 2],
            [this.x , this.y + 2],
            [this.x +1, this.y + 2],
            [this.x +2, this.y + 2],
            [this.x +3, this.y + 2],
            [this.x -3, this.y +3],
            [this.x -2, this.y +3],
            [this.x -1, this.y +3],
            [this.x , this.y +3],
            [this.x +1, this.y + 3],
            [this.x +2, this.y + 3],
            [this.x +3, this.y +3],
     
        ]
    }

    
    chooseCell(character) {
  this.getNewDirections()
  return super.chooseCell(character)
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
            this.energy--;
        }
    
    }
    move2() {
        var emptyCells = this.chooseCell(1) 
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
    mul() {
        var emptyCells = this.chooseCell(0) 
        var empty = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (empty && this.energy > 40) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = this.index
            var dr = new Dragon(newX, newY, this.index)
            dragonArr.push(dr)
        }
    }
    eat() {
        var emptyCells = this.chooseCell(4) 
        var food = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = this.index
            matrix[this.y][this.x] = 0

            for (var i in lionArr) {
                if (lionArr[i].x === newX && lionArr[i].y === newY) {
                    lionArr.splice(i, 1)
                }
            }


            this.x = newX
            this.y = newY
            this.energy++
        }
    }

    eat1() {
        var emptyCells = this.chooseCell(3) 
        var food = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = this.index
            matrix[this.y][this.x] = 0

            if(matrix[newY][newX]==3){
            for (var i in vagrArr) {
                if (vagrArr[i].x === newX && vagrArr[i].y === newY) {
                    vagrArr.splice(i, 1)
                }
            }
        }


            this.x = newX
            this.y = newY
            this.energy++
        }
    }







    die() {
        if (this.energy <= (0)) {
            matrix[this.y][this.x] = 0
            for (var i in dragonArr) {
                if (dragonArr[i].x === this.x && dragonArr[i].y === this.y) {
                    dragonArr.splice(i, 1)
                }
            }
        }
    }
}
