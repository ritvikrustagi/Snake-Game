const gameCanvas = document.getElementById("game");
const gameContext = gameCanvas.getContext("2d");

class SnakeSegment {
  constructor(xPos, yPos) {
    this.x = xPos;
    this.y = yPos;
  }
}

let gameSpeed = 7;

let snakeHeadX = 10;
let snakeHeadY = 10;
let snakeBody = [];
let snakeLength = 2;

let foodX = 5;
let foodY = 5;

let moveX = 0;
let moveY = 0;
let velocityX = 0;
let velocityY = 0;
const gridSize = 20;
const gridTileSize = gameCanvas.width / gridSize - 2;


let playerScore = 0;



function checkGameOver() {
  let isGameOver = false;

  if (velocityY === 0 && velocityX === 0) {
    return false;
  }

  if (snakeHeadX < 0 || snakeHeadX === gridSize || snakeHeadY < 0 || snakeHeadY === gridSize) {
    isGameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    const part = snakeBody[i];
    if (part.x === snakeHeadX && part.y === snakeHeadY) {
      isGameOver = true;
      break;
    }
  }

  if (isGameOver) {
    gameContext.fillStyle = "yellow";
    gameContext.font = "50px Verdana";
    gameContext.fillText("Game Over :(", gameCanvas.width / 6.5, gameCanvas.height / 2);
  }

  return isGameOver;
}

function gameLoop() {
  velocityX = moveX;
  velocityY = moveY;

  updateSnakePosition();
  if (checkGameOver()) return;

  clearCanvas();
  detectFoodCollision();
  renderFood();
  renderSnake();
  displayScore();
  adjustSpeedBasedOnScore();

  setTimeout(gameLoop, 1000 / gameSpeed);
}

function displayScore() {
  gameContext.fillStyle = "yellow";
  gameContext.font = "10px Arial";
  gameContext.fillText("Score is: " + playerScore, gameCanvas.width - 60, 10);
}

function clearCanvas() {
  gameContext.fillStyle = "green";
  gameContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function renderSnake() {
  gameContext.fillStyle = "blue";
  for (let i = 0; i < snakeBody.length; i++) {
    const segment = snakeBody[i];
    gameContext.fillRect(segment.x * gridSize, segment.y * gridSize, gridTileSize, gridTileSize);
  }

  snakeBody.push(new SnakeSegment(snakeHeadX, snakeHeadY));
  while (snakeBody.length > snakeLength) {
    snakeBody.shift();
  }

  gameContext.fillStyle = "orange";
  gameContext.fillRect(snakeHeadX * gridSize, snakeHeadY * gridSize, gridTileSize, gridTileSize);
}

function updateSnakePosition() {
  snakeHeadX += velocityX;
  snakeHeadY += velocityY;
}

function renderFood() {
  gameContext.fillStyle = "red";
  gameContext.fillRect(foodX * gridSize, foodY * gridSize, gridTileSize, gridTileSize);
}

function adjustSpeedBasedOnScore() {
  if (playerScore > 10) {
    gameSpeed = 11;
  } else if (playerScore > 5) {
    gameSpeed = 9;
  }
}

function detectFoodCollision() {
  if (foodX === snakeHeadX && foodY === snakeHeadY) {
    foodX = Math.floor(Math.random() * gridSize);
    foodY = Math.floor(Math.random() * gridSize);
    snakeLength++;
    playerScore++;
  }
}



document.body.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
  if (event.keyCode === 38 || event.keyCode === 87) {
    if (velocityY === 1) return;
    moveY = -1;
    moveX = 0;
  }

  if (event.keyCode === 40 || event.keyCode === 83) {
    if (velocityY === -1) return;
    moveY = 1;
    moveX = 0;
  }

  if (event.keyCode === 37 || event.keyCode === 65) {
    if (velocityX === 1) return;
    moveY = 0;
    moveX = -1;
  }

  if (event.keyCode === 39 || event.keyCode === 68) {
    if (velocityX === -1) return;
    moveY = 0;
    moveX = 1;
  }
}

gameLoop();
