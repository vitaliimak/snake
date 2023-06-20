const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const SIZE = 25;
const BOARD = canvas.width;

let interval;
let direction = "right";

const apple = {
  x: Math.floor(Math.random() * BOARD / SIZE) * SIZE,
  y: Math.floor(Math.random() * BOARD / SIZE) * SIZE,
}
const snake = [{
  x: BOARD / 2,
  y: BOARD / 2,
}];
snake[1] = {
  x: BOARD / 2 - SIZE,
  y: BOARD / 2,
}
snake[2] = {
  x: BOARD / 2 - 2 * SIZE,
  y: BOARD / 2,
}


function main() {
  
  window.addEventListener("keydown", (e) => {
    changeDirection(e);
  })
  
  // drawApple();
  interval = setInterval(drawSnake, 500);
}

function changeDirection(event) {
  if (event.keyCode === 39) {
    direction = "right";
  } else if (event.keyCode === 37) {
    direction = "left";
  } else if (event.keyCode === 38) {
    direction = "up";
  } else if (event.keyCode === 40) {
    direction = "down";
  }
}

function collision(box, limit) {
  return (box.x < 0 || box.y < 0) || (box.x + SIZE > limit || box.y + SIZE > limit);
}

function drawSnake() {
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

    }
    
  // }
  // for (const box of snake) {
      
    // ctx.save();
    
    // drawApple();
    
    if (collision(snake[i], BOARD)) {
      console.error("Error!");
      clearInterval(interval);
      return;
    }
    // ctx.restore();
  }
  snake.forEach(box => drawSnakeBox(box));
  // eatApple(apple, snake[0]);
}

function eatApple(apple, snakeBox) {
  if (apple.x === snakeBox.x && apple.y === snakeBox.y) {
    snake.unshift(apple);
    moveApple();
    console.log(apple, snake);
  }
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, SIZE, SIZE);
}

function moveApple() {
  apple.x = Math.floor(Math.random() * BOARD / SIZE) * SIZE;
  apple.y = Math.floor(Math.random() * BOARD / SIZE) * SIZE;
}


function drawSnakeBox(box) {
  ctx.fillStyle = "green";
  ctx.fillRect(box.x , box.y, SIZE, SIZE);
}

main();
