let newGameButton = document.getElementById('newGame')
let levelSelectButton = document.getElementById('levelSelect')
let level1SelectButton = document.getElementById('level1Select')

let mainMenu = document.querySelector('.main-menu')
let levelSelectMenu = document.querySelector('.level-select')


levelSelectButton.addEventListener('click', function (){
    mainMenu.style.display = 'none'
    levelSelectMenu.style.display = 'flex'
})

newGameButton.addEventListener('click', runGame)

let levelsDb = {
    level1:{
        levelName: 'Уровень 1',
        brickRowCount: 4,
        brickColumnCount: 6,
        ballRadius: 15,
        paddleWidth: 50
    },
    level2:{
        levelName: 'Уровень 2',
        brickRowCount: 5,
        brickColumnCount: 2,
        ballRadius: 5,
        paddleWidth: 100
    },
}

for (let key in levelsDb)  {
    levelSelectMenu.innerHTML += `<button data-level="${key}">${levelsDb[key].levelName}</button>`
}

let levelsButtons = document.querySelector('level-select button')

for(levelItem of levelsButtons){
    levelItem.addEventListener('click', function(){
        let levelNumber = level.dataset.level
        runGame(levelsDb.levelNumber)
    })
}

function runGame(levelObject){
    let canvas = document.getElementById('canvas')

    mainMenu.style.display = 'none'
    levelSelectMenu.style.display = 'none'

    canvas.style.display = 'block'

canvas.width = 640
canvas.height = 480

// Всякие очень важные переменные
let ctx = canvas.getContext('2d')

let x = canvas.width / 2
let y = canvas.height - 30
let dx = 2
let dy = -2
let ballRadius = 10

let paddleHeight = 10
let paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2

let brickRowCount = 3
let brickColumnCount = 5
let brickWidth = 75
let brickHeight = 20
let brickPadding = 10
let brickOffsetTop = 30
let brickOffsetLeft = 30

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
}
}

let score = 0

let rightPressed = false
let leftPressed = false


// Конец переменных

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
        var b = bricks[c][r];
        if (bricks[c][r].status == 1){
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
        dy = -dy;
        b.status = 0
        score++
        if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
        }
        }
    }
    }
}
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status == 1) {
            let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
            let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } 
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}  
function keyUpHandler(e) {
    if (e.keyCode == 39) { 
        rightPressed = false;
    } 
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}  

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);




function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, 10, ballRadius ,0, Math.PI * 2)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
}

function drawPaddle(){
    ctx.beginPath()

    ctx.rect(paddleX,canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = 'blue'
    ctx.fill()

    ctx.closePath()
}

function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    drawScore();
    drawBricks()
    collisionDetection()
    x += dx
    y += dy

    if(y + dy < ballRadius){
        dy = -dy
    }
    else if (y + dy > canvas.height - ballRadius){

        if(x >paddleX && x < paddleX + paddleWidth){
            dy = -dy
        }
        else { alert("Проиграл!")
        document.location.reload()
        clearInterval(interval)
        }
    }

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }      
    
}

var interval = setInterval(draw, 5)
}