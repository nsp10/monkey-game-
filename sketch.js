var monkey , monkey_animation;
var jungle , jungle_animation;
var banana , banana_animation ;
var stone , stone_animation;
var ground;
var bananaGroup ;
var stoneGroup ;
var score = 0;
var play = 1;
var end = 0;
gameState = play ;
var gameOver , gameOver_animation;

function preload () {
  monkey_animation = loadAnimation("Monkey_01.png" , "Monkey_02.png" , "Monkey_03.png" , "Monkey_04.png" , "Monkey_05.png" , "Monkey_06.png" , "Monkey_07.png" , "Monkey_08.png" , "Monkey_09.png" , "Monkey_10.png");
  
  jungle_animation = loadImage("back.jpg");
  
  banana_animation = loadImage("banana.png");
  
  stone_animation = loadImage("stone.png");
  
  gameOver_animation = loadImage("gameover.jpg");
  
}

function setup () {
  createCanvas(400, 400);
  
  jungle = createSprite(200,200,20,20);
  jungle.addImage(jungle_animation);
  jungle.scale = 0.7;
  
  monkey = createSprite(150,350,20,50);
  monkey.addAnimation("running" , monkey_animation);
  monkey.scale = 0.13;
  
  ground = createSprite(200,390,400,10);
  ground.visible = false ;
  
  bananaGroup = new Group () ;
  stoneGroup = new Group ();
  
  gameOver = createSprite(200,200,20,20);
  gameOver.addImage(gameOver_animation);
  gameOver.scale = 0.5
  
}

function draw() {
  background(180);
  if (gameState === play){
    fill("black");
    score = score + Math.round(frameCount/21);
    monkey.visible = true;
    
    gameOver.visible = false ;
    if (keyDown("space") && monkey.y >= 150){
      monkey.velocityY = -12;
    }
    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
    }
    spawnbanana();
    spawnStone();
    monkey.velocityY = monkey.velocityY + 0.8;
    if (stoneGroup.isTouching(monkey)){
      gameState = end ;
    }
  }
  
  else if (gameState === end) {
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
    monkey.visible = false;
    gameOver.visible = true;
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();
  }
  
  if (keyDown("enter")){
    reset();
  }
  
  monkey.collide(ground);
  drawSprites();
  text("Survival Time: " + score ,200,50);
}

function spawnbanana () {
  if (frameCount % 80 === 0){
    banana = createSprite(400,200,20,20);
    banana.y = Math.round(random(50 , 250));
    banana.addImage(banana_animation);
    banana.scale = 0.08;
    banana.velocityX = -10;
    banana.lifetime = 40 ;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroup.add(banana);
  }
}

function spawnStone () {
  if (frameCount % 60 === 0){
    var stone = createSprite(400,350,20,20);
    stone.addImage(stone_animation);
    stone.scale = 0.15;
    stone.velocityX = -8;
    stone.lifetime = 46 ;
    stone.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    stoneGroup.add(stone);
  }
}

function reset () {
  gameState = play;
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0;
}

