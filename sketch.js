

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(1000,600);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();

  
 
  score=0;
}


function draw() {
 background("lightblue");
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  SurvivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ SurvivalTime, 100,50);
  var SurvivalTime=0;
  
  score = score + Math.round(getFrameRate()/60);
       
     
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
     
    if(keyDown("space")) {
        monkey.velocityY = -12;
        
   
    
    }
     
  monkey.velocityY= monkey.velocityY+0.8;
   monkey.collide(invisibleGround);
  monkey.collide(ground);
  ground.velocityX=0;
   //spawn the banana
    spawnbanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
     

  drawSprites();
   if(obstaclesGroup.isTouching(monkey)){
      
      monkey.velocityY=0;
      obstaclesGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
    
    } 
      
}

function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(600,330,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacleImage);
   
   
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(200,210));
   banana.addImage(bananaImage);
   banana.scale = 0.08;
   banana.velocityX = -(6 + score/100); 
   bananaGroup.add(banana);
  }
}







