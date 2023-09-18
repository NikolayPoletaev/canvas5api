let canvas = document.getElementById('canvas')

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

let rightPressed = false;
let leftPressed = false;


// Конец переменных


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