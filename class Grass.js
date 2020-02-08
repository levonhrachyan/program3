var LivingCreature = require("./LivingCreature")

module.exports = class Grass extends LivingCreature {
    constructor(x, y, index) {
      super(x,y,index)
      this.multiply=0
    }
    mul() {
        var emptyCells = super.chooseCell(0) 
        var empty = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        this.multiply++
        if (empty && this.multiply == 8) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 1
            var newGr = new Grass(newX, newY)
            grassArr.push(newGr)
        }
    }
}
