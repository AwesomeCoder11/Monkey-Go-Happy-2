
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var jungle, jungleImage
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 jungleImage = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(600,600);
    
  jungle = createSprite(500,300,10000000,600);
  jungle.addImage(jungleImage);
  
  monkey = createSprite(100,500);
  monkey.addAnimation("running", monkey_running);
  
  ground = createSprite(100,590,5000,10);
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
}


function draw() {
  background(600,600);
  
  monkey.scale = 0.2;
  
  if (keyDown("space")) {
    monkey.velocityY = -5;   
  }
  if (ground.x < 0){
     ground.x = ground.width/2;
  }
  
  jungle.velocityX = -1;
  
  if (jungle.x < 0){
     jungle.x = 500;
  }
  
  
  if (monkey.isTouching(bananaGroup)) {
    
    score = score+1;
    bananaGroup.destroyEach();
  }

  if (monkey.isTouching(obstacleGroup)) {
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    jungle.velocityX = 0;
    ground.velocityX = 0;
    monkey.veloccityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    
    
  }
  
  
  
  ground.visibility = false;
  
  monkey.velocityY = monkey.velocityY + 0.1
  
  ground.velocityX = -100000;
  
  monkey.collide(ground);
  
  spawnBananas();
  spawnObstacles();
  drawSprites();
text("Score = " + score,100,100);
}


function spawnBananas() {
  if (frameCount % 200 === 0) {
    var banana = createSprite(600,400,40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //add each cloud to the group
    bananaGroup.add(banana);


  }
  
}

function spawnObstacles() {
   if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,590,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.3;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);

  
}
}