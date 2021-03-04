var ball;
var database;
var position, ballPosition;

function setup(){
    database = firebase.database();
    //console.log(database);
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    
    ballPosition = database.ref('ball/position')
    //console.log(ballPosition);

    ballPosition.on("value", readPosition, showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-50,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(50,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-50);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+50);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x + x,
        'y':position.y + y
    });
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readPosition(data) {
    position = data.val()
    console.log(position);
    ball.x = position.x;
    ball.y = position.y;
}

function showError() {
    console.log("Cannot read the data");
}