var canvas;
var context;
var keysPressed = [];

window.onload = function(){
    startUp();
}

$(document).keydown(function(e){
    var haskey = keysPressed[e.keyCode];
    if(!haskey){
        keysPressed[e.keyCode] = true;
    }
});

$(document).keyup(function(e){
    keysPressed[e.keyCode] = false;
});

function startUp(){
    canvas = document.getElementById('game_canvas');
    context = canvas.getContext('2d');
    window.setInterval( function(){
        gameLoop();
    }, 15);
}

function gameLoop(){
}

//function drawObj(context, obj){
//    context.drawImage(obj.sprite, obj.x, obj.y);
//}

function clearCanvas(canvas){
    canvas.width = canvas.width;
}
