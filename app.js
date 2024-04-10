const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
let snake = [{x:200, y:200}];
let food = {x:0, y:0};
let dx = 0;
let dy = 0;
let ateFood = false; // Initialize ateFood

function drawSnake(){
  ctx.fillStyle = 'green';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, box, box);
  });
}

function moveSnake(){
  const head = {x:snake[0].x + dx, y:snake[0].y + dy};
  snake.unshift(head);
  if (!ateFood) {
    snake.pop();
  } else {
    ateFood = false;
    generateFood();
  }
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Corrected canvas.height
  drawSnake();
  drawFood();
  moveSnake();
  eatFood();
  check();
}

function generateFood(){
  food.x = Math.floor(Math.random() * 20) * box;
  food.y = Math.floor(Math.random() * 20) * box;
}

function eatFood(){
  if (snake[0].x === food.x && snake[0].y === food.y){
    ateFood = true;
  }
}

function check(){
  if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height){
    clearInterval(game);
    alert("Game Over");
  }
}

function changeDirection(event){
  const keyPressed = event.keyCode;
  if (keyPressed === 37 && dx !== box){
    dx = -box;
    dy = 0;
  }
  if (keyPressed === 38 && dy !== box){
    dx = 0;
    dy = -box;
  }
  if (keyPressed === 39 && dx !== -box){
    dx = box;
    dy = 0;
  }
  if (keyPressed === 40 && dy !== -box){
    dx = 0;
    dy = box;
  }
}

function drawFood(){
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);
}

generateFood(); // Generate initial food
document.addEventListener('keydown', changeDirection);
const game = setInterval(draw, 100); // Start the game loop
