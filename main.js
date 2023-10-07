//https://developer.mozilla.org/ko/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Move_the_ball
//1st consts
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//2nd consts
const ballRadius = 10;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30; // 벽돌간에 닿지 않게할 값
const brickOffsetLeft = 30;


let x = canvas.width /2 ;
let y = canvas.height - 30;
let dx = 2; let dy = -2;


// - paddle part
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

// boolean
var rightPressed = false; 
var leftPressed = false;


function keyDownHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = true;
    }
    else if (event.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = false;
    }
    else if (event.keyCode == 37) {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// /paddle part

// brick part
var bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(0, 0, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
          }
    }
}
// brick part end
function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();

    // ball drawing
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if (x > paddleX  &&  x < paddleX + paddleWidth ) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.relaod();
        }
    }
    
    x += dx;
    y += dy;
    // ball drawing end.

    // paddle drawing
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    // paddle drawing end.
    
}
setInterval(draw, 10); //10 ms







































