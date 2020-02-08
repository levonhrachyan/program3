var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


matrix = []
grassArr = [];
xotakerArr = [];
vagrArr = [];
lionArr = [];
dragonArr = [];

var leng = 40

var randoma = [0, 0, 1, 1, 1, 0, 1, 0, 1, 2, 2, 1, 0,1, 2, 3, 0, 2, 1 ,1, 0,0, 1, 0, 1, 2, 1, 0, 0, 1, 1, 3, 0, 0, 1, 0, 1, 0, 2,0, 1, 0, 2, 0, 1, 2, 0, 1, 1, 2, 0, 0, 0, 0, 0, 1, 2,]
for (var z = 0; z <= leng; z++) {
    matrix[z] = [];
    for (k = 0; k <= leng; k++) {
        matrix[z][k] = random(randoma)
    }
}

function random(items) {

    return items[Math.floor(Math.random() * items.length)];

}
weath = "winter";
io.sockets.emit("send matrix", matrix);

Grass = require("./class Grass");
Xotaker = require("./class Xotaker");
Vagr = require("./class Vagr");
Lion = require("./class Lion");
Dragon = require("./class Dragon");

function createOBject(matrix) {
    for (var y = 0; y <= leng; y++) {
        for (var x = 0; x <= leng; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1)
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var xt = new Xotaker(x, y, 2)
                xotakerArr.push(xt)
            }
            else if (matrix[y][x] == 3) {
                var vr = new Vagr(x, y, 3)
                vagrArr.push(vr)
            }
            else if (matrix[y][x] == 4) {
                var ar = new Lion(x, y, 4)
                lionArr.push(ar)
            }
            else if (matrix[y][x] == 5) {
                var dr = new Dragon(x, y, 5)
                dragonArr.push(dr)
            }
        }
        io.sockets.emit('send matrix', matrix)
    }
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul();

    }
    for (var i in xotakerArr) {
        xotakerArr[i].move();
        xotakerArr[i].eat();
        xotakerArr[i].mul();
        xotakerArr[i].die()
    }
    for (var i in vagrArr) {
        vagrArr[i].move();
        vagrArr[i].eat();
        vagrArr[i].mul();
        vagrArr[i].die()
    }
    for (var i in lionArr) {
        lionArr[i].move()
        lionArr[i].eat();
        lionArr[i].mul();
        lionArr[i].die()
    }
    for (var i in dragonArr) {
        dragonArr[i].move();
        dragonArr[i].move2();
        dragonArr[i].eat();
        dragonArr[i].eat1();
        dragonArr[i].mul();
        dragonArr[i].die()
    }

    io.sockets.emit("send matrix", matrix)
}


setInterval(game, 1000)


function Dragonlive() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                var Dem = new Dragon(x, y, 5);
                dragonArr.push(Dem);
                matrix[y][x] = 5;
                break;
            }
        }
    }
    io.sockets.emit("send matrix", matrix);


}

function Dragondie() {
    dragonArr = []
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 5) {
                matrix[y][x] = 0
            }
        }
    }
    io.sockets.emit("send matrix", matrix);


}

function balans() {
    if (vagrArr.length > 80) {
        for (var i = 0; i < 30; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 4
                var gr = new Lion(x, y, 4)
                lionArr.push(gr)
            }
        }


    }
    if (vagrArr.length == 0) {
        for (var i = 0; i < 30; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 3
                var vag = new Vagr(x, y, 3)
                vagrArr.push(vag)
            }
        }


    }

    if (xotakerArr.length == 0) {
        for (var i = 0; i < 50; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 2
                var xotak = new Xotaker(x, y, 2)
                xotakerArr.push(xotak)
            }
        }


    }



    io.sockets.emit("send matrix", matrix);

}



function addGrass() {
    for (var i = 0; i < 10; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


io.on("connection", function (socket) {
    createOBject(matrix)
    socket.on("Dragonlive", Dragonlive);
    socket.on("Dragondie", Dragondie);
    socket.on("addGrass", addGrass);
    socket.on("addbalans", balans);
})




var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.xotakerArr = xotakerArr.length;
    statistics.Vagr = vagrArr.length;
    statistics.Lion = lionArr.length;
    statistics.Dragon = dragonArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("send")
    })
}, 1000)
