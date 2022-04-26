var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var score = 0;
var barGroup;
var gameState = PLAY;
var PLAY = 1;
var END = 0;
var bottomObstaclesGroup;
var gameOver
var gameOverImage
var restart
var restartImage
var topObstaclesGroup

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

gameOverImage = loadImage("assets/gameOver.png")
restartImage = loadImage("assets/restart.png")
}

function setup(){

  createCanvas(400,400)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3


//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

barGroup = new Group();

bottomObstaclesGroup = new Group();

topObstaclesGroup = new Group();

gameOver = createSprite(220,200)
gameOver.addImage(gameOverImage)
gameOver.scale = 0.5

restart = createSprite(220,240)
restart.addImage(restartImage)
restart.scale = 0.5

gameOver.visible = false

restart.visible = false

}

function draw() {
  
  background("black");
  console.log(gameState);
  if(gameState === PLAY){
        
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -4 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 0.1;

           
          Bar();

          spawnObstaclesTop();
          spawnObstaclesBottom();

          if(topObstaclesGroup.isTouching(balloon)||
          balloon.isTouching(topGround)||
          balloon.isTouching(bottomGround)||
          bottomObstaclesGroup.isTouching(balloon)){
          gameState = END;
          }


        }


        if(gameState === END){
          gameOver.visible = true

          restart.visible = true

          balloon.velocityX = 0
          balloon.velocityY = 0

          topObstaclesGroup.setVelocityXEach(0);
          bottomObstaclesGroup.setVelocityXEach(0);
          barGroup.setVelocityXEach(0);

          topObstaclesGroup.setLifetimeEach(-1);
          bottomObstaclesGroup.setLifetimeEach(-1);
           balloon.y = 200;

          if(mousePressedOver(restart)){
            reset();
          }
        }
        //score();
        drawSprites();
       
        //spawning top obstacles
          
       

  

      
}

function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  topObstaclesGroup.destroyEach();
  bottomObstaclesGroup.destroyEach();

  score=0;
}


function spawnObstaclesTop() 
{
      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(400,50,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 100;
    
   balloon.depth = balloon.depth + 1;
   topObstaclesGroup.add(obstacleTop);
   
      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
          barGroup.add(bar);
      
         }
}


function spawnObstaclesBottom() 
{
      if(World.frameCount % 60 === 0) {
        obstacleBottom = createSprite(400,350,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleBottom.scale = 0.07;
    obstacleBottom.velocityX = -4;

    //random y positions for top obstacles
   // obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacleBottom.addImage(obsBottom1);
              break;
      case 2: obstacleBottom.addImage(obsBottom2);
              break;
      case 3: obstacleBottom.addImage(obsBottom3);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 100;
    
   balloon.depth = balloon.depth + 1;
   bottomObstaclesGroup.add(obstacleBottom);
   
      }
}

function score(){
  if(balloon.isTouching(barGroup)){
    score = score + 1
  }
  textSize(30)
  fill("black")
  text("Score:" + score, 250, 50)
}
