//https://developer.mozilla.org/ko/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Move_the_ball
// #d499d4
// #6f0c4f
// #e85255
// #e3272b
// #7f0909

//1st consts
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//2nd consts
// ball
const ballRadius = 10;
// brick
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30; // distance of canvas to brick
const brickOffsetLeft = 30;


let x = canvas.width /2 ;
let y = canvas.height - 30;
let dx = 2; let dy = -2;

//utils
function randint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

// ----

// stage
var stage = 1;
stageDict = [
    "",
    "#d499d4",
    "#6f0c4f",
    "#e85255",
    "#e3272b",
    "#7f0909"
]


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
//document.addEventListener("mousemove", mouseMoveHandler, false);
// /paddle part


// brick part
var bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: stage };
    }
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if ( bricks[c][r].status > 0) {
                var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = stageDict[bricks[c][r].status];
                ctx.fill();
                ctx.closePath();
               }
          }
    }
}
// brick part end

// Collision Control
function collisionDetection() {
    for (let c=0; c < brickColumnCount; c++) {
        for (let r=0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if ( b.status > 0 && x>b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                bricks[c][r].status--;
                dy = -dy;
                //b.status = 0;
                score++;
                if (score == brickRowCount * brickColumnCount*stage) {
                    if (stage==5) {
                        alert("WIN!");
                        document.location.reload();
                    }
                    stage++;
                    //bricks[:][:].status = stage;
                    for (let c1 = 0; c1 < brickColumnCount; c1++) {
                        for (let r1 = 0; r1 < brickRowCount; r1++) {
                                bricks[c1][r1].status = stage;
                            }
                        }
                    drawBricks();
                    x = canvas.width / 2 + randint(-10, 10);     
                    y = canvas.height -30 + randint(-60, 10);
                    dx = 2 + stage;
                    dy = -2 - stage;
                    paddleX = (canvas.width - paddleWidth) / 2;
                    //alert("WIN!");
                    //document.location.reload();
                 }
            }
        }
    }
}

// scoring
var score = 11;
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20); //(8, 20): coordinate
}
// ---

function drawStage() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText('Stage:' + stage, 85, 20);
}
//life
let lives = 3;
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}
// ---

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
    collisionDetection();
    drawBricks();
    drawScore();
    drawLives();
    drawStage();

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
            lives--;
            //score--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
                //clearInterval(interval);
             }
            else {
                x = canvas.width / 2 + randint(-10, 10);     
                y = canvas.height -30 + randint(-60, 10);
                dx = 2 + stage;
                dy = -2 - stage;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
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
    requestAnimationFrame(draw);
    
}
draw();
//setInterval(draw, 10); //10 ms


