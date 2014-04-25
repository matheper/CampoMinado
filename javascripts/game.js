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
            context.strokeStyle = "blue";
            context.strokeRect(j*tamanho, i*tamanho, tamanho, tamanho);
            if (matrizCampos[i][j] instanceof Bomba){
                drawObj(matrizCampos[i][j]);
            }
            else{
                context.fillStyle = "rgb(255,255,255)";
                context.fillText(matrizCampos[i][j], j*tamanho + tamanho/2, i*tamanho + tamanho/2);
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

function Bomba(linha, coluna){
    var sprite = new Image();
    sprite.src = "images/bomba.png";
    this.sprite = sprite;
    this.x = linha * tamanho;
    this.y = coluna * tamanho;
//    return{
//        x:linha * tamanho,
//        y:coluna * tamanho,
//        sprite:sprite,
//    }
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
            bombas_criadas ++;
        }
    }

    for(var i=0; i<num_linhas; i++) {
        for(var j=0; j<num_colunas; j++){
            if(!matrizCampos[i][j]){
                matrizCampos[i][j] = contarBombas(i,j);
            }
        }
    }

}


function contarBombas(linha, coluna){
    bomba = 0;

    if (matrizCampos[linha][coluna -1] instanceof Bomba)
        bomba ++;
    if (matrizCampos[linha][coluna +1] instanceof Bomba)
        bomba ++;

    if ( matrizCampos[linha -1]){
        if (matrizCampos[linha -1][coluna -1] instanceof Bomba)
            bomba ++;
        if (matrizCampos[linha -1][coluna] instanceof Bomba)
            bomba ++;
        if (matrizCampos[linha -1][coluna +1] instanceof Bomba)
            bomba ++;
    }

    if (matrizCampos[linha +1]){
        if (matrizCampos[linha +1][coluna -1] instanceof Bomba)
            bomba ++;
        if (matrizCampos[linha +1][coluna] instanceof Bomba)
            bomba ++;
        if (matrizCampos[linha +1][coluna +1] instanceof Bomba)
            bomba ++;
    }
    return bomba;
}
