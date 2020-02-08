var socket = io();

var side = 15
var leng = 40
socket.on("weather", function (data) {
    weath = data;
})

function setup() {
    createCanvas(leng * side, leng * side);
    background('#acacac');
}

function nkarel(matrix) {
    for (var y = 0; y <= leng; y++) {
        for (var x = 0; x <= leng; x++) {
            if (matrix[y][x] == 1) {
                fill("green");

                if (weath == "summer") {
                    fill("green");
                } else if (weath == "autumn") {
                    fill("#333300");
                } else if (weath == "winter") {
                    fill("white");
                } else if (weath == "spring") {
                    fill("#4dffa6");
                }
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");

            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");

            }
            else if (matrix[y][x] == 3) {
                fill("red");

            }
            else if (matrix[y][x] == 4) {
                fill("orange");

            }
            else if (matrix[y][x] == 5) {
                fill('#616CC3')
            }
            rect(y * side, x * side, side, side)
        }
    }
}



setInterval(
    function () {
        socket.on('send matrix', nkarel)
    }, 1000
)
function Dragon() {

    socket.emit("Dragonlive")

}
function Dragondie() {

    socket.emit("Dragondie")

}

function addGrass() {

    socket.emit("addGrass")


}
function addbalans() {
    
    socket.emit("addbalans")
}