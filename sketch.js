
var trex, trex_running, trex_collided,gameState,PLAY,END;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6,GameIm,ReIm,GameOver,Restart

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  bg1= loadImage("bg4.jpg")
  
  ReIm= loadImage("restart.png")
  GameIm= loadImage("gameOver.png")
}

function setup() {
  createCanvas(1200, 200);
  
  PLAY=0
  END=1
  gameState= PLAY
  trex = createSprite(20,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("over", trex_collided)
  trex.scale = 0.7;
  
  ground = createSprite(800,180,1600,20);
  ground.addImage("ground",groundImage);
  ground.width= 2000
  //ground.x = ground.width /2;
  
  invisibleGround = createSprite(800,190,1600,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  GameOver= createSprite(300,100)
  Restart= createSprite( 300,140)
  
  GameOver.addImage("over", GameIm)
  GameOver.scale=0.7
  Restart.addImage("restart", ReIm)
  Restart.scale=0.7
  GameOver.visible= false
  Restart.visible=false
  
  score = 0;
}

function draw() {
  background(bg1);
  
  textSize(30)
  text("Score: "+ score, 300,50);
  trex.collide(invisibleGround);

  camera.position.x= trex.x
  //camera.y= trex.y
  
  if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
  
    if(keyDown("space")&& trex.velocityY===0) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.6
  
    // if (ground.x < 0){
    //   ground.x = ground.width/2;
    // }
  
   //ground.velocityX = -(6 + 3*score/100);
    
    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gameState=END
       }
  }
  //PLAY State over
  
  else if(gameState===END){
    ground.velocityX=0
    trex.velocityY=0
    GameOver.visible=true
    Restart.visible= true
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setLifetimeEach(-1)
    obstaclesGroup.setLifetimeEach(-1)
    trex.changeAnimation("over",trex_collided)
  }
  
  if(mousePressedOver(Restart)) {
    reset()
  }
  drawSprites();
}

// draw function OVER

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(camera.position.x+1000,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.7;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(camera.position.x+1000,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.7;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  gameState = PLAY;
  
  GameOver.visible = false;
  Restart.visible = false;
  
  score = 0;
  trex.changeAnimation("running", trex_running);
}


