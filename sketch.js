var rocket, rocketImg;
var meteor, meteorImg, meteorGroup;
var space, backImg
var star, starImg, starGroup;
var gameState = "play";
var score = 0;


function preload(){
rocketImg = loadImage("rocket.png");
meteorImg = loadImage("meteor.png");
backImg = loadImage("space_bg.png")
starImg = loadImage("star.png")
}

function setup() {
 createCanvas(500, 400);

  space = createSprite(200, 200,500,400);
  space.addImage("space", backImg);
  space.scale = 2.3;

  rocket = createSprite(120, 300, 70, 70);
  rocket.addImage("rocket", rocketImg);
  rocket.scale = 0.35;

  //rocket.debug = true;
  rocket.setCollider("circle",0,-0,135)
  meteorGroup = createGroup();
  starGroup = createGroup();

}

function draw() {
background(200);



if(gameState === "play"){

  if(rocket.x < 40){
    rocket.x = 40
  }

  if(frameCount % 60 === 0){
    var rand = Math.round(random(1,2));
      if(rand === 1){
        spawnStars();
      }
      else{
        spawnMeteor();
      }
  }
 
  space.velocityY = 2
  if(space.y > 200){
    space.y = 130
  }

  if(keyDown("right_arrow")){
    rocket.x = rocket.x + 5
  };

  if(keyDown("left_arrow")){
    rocket.x = rocket.x - 5
  };

  if(keyDown("up_arrow")){
    rocket.y = rocket.y - 5
  };

  if(keyDown("down_arrow")){
    rocket.y = rocket.y + 5
  };

  if(rocket.isTouching(starGroup)){
    starGroup.destroyEach()
    score++
  }

  if(rocket.isTouching(meteorGroup) || rocket.y >= 600){
    rocket.velocityY = 0
    rocket.destroy();
    gameState = "end"
  }
  drawSprites();

}

 

  else if (gameState === "end"){
    stroke("yellow")
    fill("yellow");
    textSize(30)
    text ("Game Over", 170, 200)
  }
 

    fill("white");
    textSize(20);
  text("Stars: " +score, 50,100);
  

}



function spawnStars(){
  //if(frameCount % 250 === 0){
    star = createSprite(240, -30, 30, 30);
  star.addImage("star", starImg);
  star.scale = 0.19;
  //star.debug= true
  star.setCollider("circle",0,0,70)
  star.x = Math.round(random(150, 400));
  star.velocityY = 1
  star.lifetime = 800
  starGroup.add(star)
  star.depth = rocket.depth
  rocket.depth = rocket.depth +1
 // }

 
}

function spawnMeteor(){
  //if(frameCount % 170 === 0){
    meteor = createSprite(200, -20, 50, 50);
    meteor.addImage("meteorite", meteorImg);  
   // meteor.debug = true;

    meteor.setCollider("circle",10,10,30)

  meteor.x = Math.round(random(150, 400));
  meteor.velocityY = 5 + score / 2
  meteor.lifetime = 900
  meteorGroup.add(meteor)
  meteor.depth = rocket.depth
  rocket.depth = rocket.depth +1
  //}
}


  
