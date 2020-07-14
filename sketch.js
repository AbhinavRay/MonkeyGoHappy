var monkey, monkeyImage;
var bananaGroup, bananaImage;
var obstacleGroup, objectImage;
var jungle, jungleImage;
var score = 0;
var invGround

function preload() {
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("Banana.png");
  objectImage = loadImage("stone.png");
  jungleImage = loadImage("jungle.jpg");
}
function setup() {
  createCanvas(600, 300);

  jungle = createSprite(300, 80);
  jungle.addImage(jungleImage);
  jungle.x = jungle.width / 2

  invGround = createSprite(300, 295, 600, 50);
  invGround.visible = false;

  monkey = createSprite(80, 240);
  monkey.addAnimation("monkey", monkeyImage);
  monkey.scale = 0.1;

  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(255);

  drawSprites();

  fill("white");
  textFont('Georgia');
  text("🤣 score : " + score, 500, 50);

  jungle.velocityX = -5;

  if (jungle.x < 110) {
    jungle.x = jungle.width / 2;
  }

  if (keyDown("space") && monkey.y >= 180) {
    monkey.velocityY = -10;
  }

  if (monkey.isTouching(bananaGroup)) {

    score = score + 1;

    bananaGroup.destroyEach();

    switch (score) {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14;
        break;
      case 30:
        monkey.scale = 0.16;
        break;
      case 40:
        monkey.scale = 0.18;
        break;
      case 50:
        monkey.scale = 0.2;
        break;
    }
  }

  if (monkey.isTouching(obstacleGroup) && monkey.scale > 0.08) {
    monkey.scale = monkey.scale - 0.02;  
    obstacleGroup.destroyEach();
  }
  
  /*if (monkey.isTouching(obstacleGroup) && monkey.scale === 0.10) {
    monkey.destroy();
    jungle.destroy();
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
  }*/


  monkey.collide(invGround);
  monkey.velocityY = monkey.velocityY + 0.6;


  spawnBanana();
  spawnObstacles();
}

function spawnBanana() {
  if (World.frameCount % 100 === 0) {
    var banana = createSprite(600, random(181, 240));
    banana.addImage("banana", bananaImage);
    bananaGroup.add(banana);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 150;
  }
}

function spawnObstacles() {
  if (World.frameCount % 170 === 0) {
    var obstacle = createSprite(600, 240);
    obstacle.addImage("stone", objectImage);
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    obstacle.lifetime = 150;
  }
}
