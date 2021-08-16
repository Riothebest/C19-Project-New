var runner, runnerImg, runnercloImg;
var chaser, chaserImg, chasercolImg;
var scene,sceneImg;
var obstacle , obstacleImg, obstaclegrp;
gameState = "play";
var score = 0;

function preload()
{
    runnerImg = loadAnimation("playerrunning1.png","playerRunning2.png");
    chaserImg = loadAnimation("rockmon1.png","rockmon2.png");
    sceneImg = loadImage("scene.png");
    obstacleImg = loadImage("obstacle.png")
    runnercloImg = loadImage("playerRunning1.png");
    chasercolImg = loadAnimation("rockmon2.png");
}

function setup() 
{
    createCanvas(1000,400);
    scene = createSprite(410,200);
    scene.addImage(sceneImg);
    scene.scale = 0.5;
    scene.velocityX = -5;

    runner = createSprite(600,400,10,10);
    runner.addAnimation("running",runnerImg);
    runner.addImage("col",runnercloImg);
    runner.scale = 0.3;
    //runner.debug = true;

    chaser = createSprite(100,400,10,10);
    chaser.addAnimation("chasing",chaserImg);
    chaser.addAnimation("coll",chasercolImg);
    chaser.scale = 1.1;

    obstaclegrp =new Group();

}

function draw() 
{
    runner.depth = chaser.depth + 1;


    if(gameState === "play")
    {
        if(scene.x < 30)
        {
            scene.x = 500;
        }

        runner.y = World.mouseY;
        chaser.y = runner.y;
        
        score = score + Math.round(getFrameRate()/60);

        if(frameCount%100 === 0)
        {
            spawnObstacle();
        }
        if(obstaclegrp.isTouching(runner))
        {
            gameState = "level2";
            obstaclegrp.destroyEach();
        }

    }

    if(gameState === "level2")
    {
        runner.x = 200
        if(obstaclegrp.isTouching(runner))
        {
            gameState = "end";
        }
        if(scene.x < 30)
        {
            scene.x = 500;
        }

        runner.y = World.mouseY;
        chaser.y = runner.y;
        
        score = score + Math.round(getFrameRate()/60);

        if(frameCount%100 === 0)
        {
            spawnObstacle();
        }
    }

   

    background("black")
    drawSprites();

    fill("red")
    textSize(20)
    text("Score: "+score,width-130,50);


    if(gameState === "end")
    {
        textSize(40)
        text("You Failed",width/2 - 60,200)
        runner.x = 120; 
        scene.velocityX = 0;
        obstaclegrp.destroyEach();
        runner.changeImage("col",runnercloImg);
        chaser.changeAnimation("coll",chasercolImg);
    }
}

function spawnObstacle()
{
    obstacle = createSprite(width,Math.round(random(50,350)),10,10);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.4;
    obstacle.velocityX = -(5);
    chaser.depth = obstacle.depth + 1;
    //obstacle.debug =true;
    obstacle.setCollider("circle",0,0,100)
    obstacle.lifetime = width/5 + 10;
    obstaclegrp.add(obstacle);
    
}