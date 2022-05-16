var gameState = "play"
var obstaclesGroup

function preload(){
  pistaImg = loadImage("3203599.png");
  carplayimg  = loadImage("car1.png");
  spookySound = loadSound("spooky.wav");
  obstacle1 = loadImage("car2.png")
  obstacle2 = loadImage("obstacle1.png") 
  obstacle3 = loadImage("obstacle2.png")
}

function setup() {
  createCanvas(600, 600);
  pista = createSprite(300,300);
  pista.addImage("tower",pistaImg);
  pista.velocityY = 6 ;
  pista.scale = 1.5

  carplay = createSprite(150,500,50,50);
  carplay.scale = 0.07;
  carplay.addImage("carplay ", carplayimg );

  obstaclesGroup = new Group()
    
}

function draw() {
  background(200);
  
  if(pista.y > 400){
    pista.y = 300
    }

    if (gameState === "play") {
      if(keyDown("left_arrow")){
        carplay.x = carplay.x -(5 + frameCount/100);
      }
      
      //fazer o carro se mexer para o lado direito

      spawnObstacles() 

      if(obstaclesGroup.isTouching(carplay)){
        gameState = "end"
      }
      
      
      drawSprites();
}

if (gameState === "end"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Fim de Jogo", 230,250)
}
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(random(50,550),0,20,30);
    obstacle.setCollider('circle',0,0,70)
     obstacle.debug = true
  
    obstacle.velocityY = 6 + frameCount/100;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = 0.08;
              break;
      //criar o caso 2 e 3 para o obstaculo 2 e 3 com a escala em 0.05
      default: break;
    }
    
              
    //fazer o lifetime
    obstacle.lifetime = 300;
    obstacle.depth = carplay.depth;
    carplay.depth +=1;
    obstaclesGroup.add(obstacle);
  }
}