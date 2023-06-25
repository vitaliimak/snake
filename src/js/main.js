const canvas = document.getElementById("board");
const score = document.getElementById("score");
const speed = document.getElementById("speed");
const leaderBoard = document.getElementById("leaderBoard");
const ctx = canvas.getContext("2d");
const SIZE = 25;
const BOARD = canvas.width;

let interval;
let direction = "right";
let intervalTime = 500;

const apple = {
  x: randomCoordinate(),
  y: randomCoordinate(),
}
let snake = [{
  x: BOARD / 2,
  y: BOARD / 2,
}];

function main() {
  
  window.addEventListener("keydown", (e) => {
    changeDirection(e);
  })
  
  interval = setInterval(drawSnake, calculateTimeInterval(speed));
}

function calculateTimeInterval() {
  return 1 / Number.parseInt(speed.innerText) * 500;
}

function calculateSpeed(timeout) {
  return 1 / timeout * 500;
}
function changeDirection(event) {
  if (event.keyCode === 39) {
    if (direction === "left") {
      console.error("Error!");
      clearInterval(interval);
      return;
    }
    direction = "right";
  } else if (event.keyCode === 37) {
    if (direction === "right") {
      console.error("Error!");
      clearInterval(interval);
      return;
    }
    direction = "left";
  } else if (event.keyCode === 38) {
    if (direction === "down") {
      console.error("Error!");
      clearInterval(interval);
      return;
    }
    direction = "up";
  } else if (event.keyCode === 40) {
    if (direction === "up") {
      console.error("Error!");
      clearInterval(interval);
      return;
    }
    direction = "down";
  }
}

function collision(box, limit) {
  return (box.x < 0 || box.y < 0) || (box.x + SIZE > limit || box.y + SIZE > limit);
}

function drawSnake() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      if (Number.parseInt(score.innerText) !== 0) {
        const item = document.createElement("p");
        item.innerText = score.innerText;
        score.innerText = "0";
        speed.innerText = "1";
        leaderBoard.appendChild(item);
      }
      console.error("Error!");
      clearInterval(interval);
      return;
    }
  }
  ctx.clearRect(0, 0, BOARD, BOARD);
  let x = snake[0].x;
  let y = snake[0].y;
  let newX;
  let newY;
  for (let i = 0; i < snake.length; i++) {
    if (i > 0) {
      newX = snake[i].x;
      newY = snake[i].y;
      snake[i].x = x;
      snake[i].y = y;
      x = newX;
      y = newY;
    } else {
      if (direction === "right") {
        snake[i].x += SIZE;
      } else if (direction === "left") {
        snake[i].x -= SIZE;
      } else if (direction === "up") {
        snake[i].y -= SIZE;
      } else if (direction === "down") {
        snake[i].y += SIZE;
      }
      eatApple(apple, snake[0]);
    }
    
    drawApple();
    
    if (collision(snake[i], BOARD)) {
      if (Number.parseInt(score.innerText) !== 0) {
        const item = document.createElement("p");
        item.innerText = score.innerText;
        score.innerText = "0";
        speed.innerText = "1";
        leaderBoard.appendChild(item);
      }
      console.error("Error!");
      clearInterval(interval);
      return;
    }
  }
  snake.forEach(box => drawSnakeBox(box));
}

function eatApple(apple, snakeBox) {
  if (apple.x === snakeBox.x && apple.y === snakeBox.y) {
    score.innerText = Number.parseInt(score.innerText) + 1;
    snake.push({x: apple.x, y: apple.y});
    moveApple();
    intervalTime = calculateTimeInterval();
    if (score.innerText % 10 === 0 && intervalTime > 70) {
      speed.innerText = Number.parseInt(speed.innerText) + 1;
      clearInterval(interval);
      interval = setInterval(drawSnake, intervalTime);
    }
  }
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, SIZE, SIZE);
}

function moveApple() {
  let x = randomCoordinate();
  let y = randomCoordinate();
  let flag = true;
  while (flag) {
    for (const box of snake) {
      flag = false;
      if (box.x === x && box.y === y) {
        x = randomCoordinate();
        y = randomCoordinate();
        flag = true;
        break;
      }
    }
  }
  apple.x = x;
  apple.y = y;
}

function randomCoordinate() {
  return Math.floor(Math.random() * BOARD / SIZE) * SIZE;
}

function drawSnakeBox(box) {
  ctx.fillStyle = "green";
  ctx.fillRect(box.x , box.y, SIZE, SIZE);
}

function restart() {
  clearInterval(interval);
  snake = [{
    x: BOARD / 2,
    y: BOARD / 2,
  }];
  score.innerText = "0";
  speed.innerText = "1";
  direction = "right";
  moveApple();
  interval = setInterval(drawSnake, calculateTimeInterval(speed));
}

main();
