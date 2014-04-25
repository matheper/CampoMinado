var canvas;
var context;
var keysPressed = [];
var matrizCampos = [];
var tamanho = 32;

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
    num_linhas = 10;
    num_colunas = 20;
    num_bombas = 20;
    criarCampos(num_linhas, num_colunas, num_bombas);
    canvas.setAttribute('height', num_linhas * tamanho);
    canvas.setAttribute('width', num_colunas * tamanho);
    window.setInterval( function(){ gameLoop();}, 15);
}

function gameLoop(){
    drawMatriz();
//    clearCanvas();
}

function drawMatriz(){
    for(i=0; i<matrizCampos.length; i++){
        for(j=0; j<matrizCampos[i].length; j++){
            if(matrizCampos[i][j]){
                drawObj(matrizCampos[i][j]);
            }
        }
    }
}

function drawObj(obj){
    context.drawImage(obj.sprite, obj.x, obj.y, 32, 32);
}

function clearCanvas(){
    canvas.width = canvas.width;
}

Bomba = function(linha, coluna){
    var sprite = new Image();
    sprite.src = "images/bomba.png";
    return{
        x:linha * tamanho,
        y:coluna * tamanho,
        sprite:sprite,
    }
}

function criarCampos(num_linhas, num_colunas, num_bombas){
    matrizCampos = [];
    for(var i=0; i<num_linhas; i++) {
        matrizCampos[i] = new Array(num_colunas);
    }
    
    bombas_criadas = 0;
    while(bombas_criadas < num_bombas) {
        indice_linha = Math.floor(Math.random() * (num_linhas));
        indice_coluna = Math.floor(Math.random() * (num_colunas));
        if(!matrizCampos[indice_linha][indice_coluna]){
            matrizCampos[indice_linha][indice_coluna] = new Bomba(indice_coluna,
                                                                  indice_linha);
            console.log(indice_linha, indice_coluna);
            console.log(bombas_criadas);
            bombas_criadas ++;
        }
    }

    for(var i=0; i<num_linhas; i++) {
        for(var j=0; j<num_colunas; j++){
//            console.log(matrizCampos[i],[j]);
        }
    }

}

