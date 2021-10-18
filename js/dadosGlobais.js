"use strict"

//** INICIO --> PEGANDO ELEMENTOS ATRAVÉS DO ID E CLASSE **//

const cadaCampo = document.getElementsByClassName("cada-campo")

const tagDaDivulgacao = document.getElementById("quem-venceu")

const EAVezDe = document.getElementById("quem-e-a-vez-mensagem")

const campo1 = document.getElementById("campo-1")
const campo2 = document.getElementById("campo-2")
const campo3 = document.getElementById("campo-3")
const campo4 = document.getElementById("campo-4")
const campo5 = document.getElementById("campo-5")
const campo6 = document.getElementById("campo-6")
const campo7 = document.getElementById("campo-7")
const campo8 = document.getElementById("campo-8")
const campo9 = document.getElementById("campo-9")

const retaVitoria = document.getElementById("reta-vitoria")

let campoSelecionado

//** FIM --> PEGANDO ELEMENTOS ATRAVÉS DO ID E CLASSE **/


//** INICIO --> DECLARANDO VARIAVEIS GLOBAIS **//

var modosDeJogo = document.getElementById("quemContraQuem")
var modoDeJogoSelecionado = modosDeJogo.value

var xSera = document.getElementById("xSera").value

var dificuldadeDaMaquina = document.getElementById("dificuldadeMaquina")
var dificuldadeDaMaquinaSelecionada = dificuldadeDaMaquina.value

var vencedorDaPartida = 0 //entre 0, 'x', e 'fantasma'

var indiceRetaVencedora = 0
    /*Valor em que armazenaremos uma reta vinda de 
"possibilidadesVitoriaMatriz" (correspondente a vitória)*/

var matrizJogo = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ] //0 = vazio

var camposVagos = [
    campo1, campo2, campo3,
    campo4, campo5, campo6,
    campo7, campo8, campo9
]

var possibilidadesVitoriaMatriz = [
    [matrizJogo[0], matrizJogo[1], matrizJogo[2]],
    [matrizJogo[3], matrizJogo[4], matrizJogo[5]],
    [matrizJogo[6], matrizJogo[7], matrizJogo[8]],

    [matrizJogo[0], matrizJogo[3], matrizJogo[6]],
    [matrizJogo[1], matrizJogo[4], matrizJogo[7]],
    [matrizJogo[2], matrizJogo[5], matrizJogo[8]],

    [matrizJogo[0], matrizJogo[4], matrizJogo[8]],
    [matrizJogo[2], matrizJogo[4], matrizJogo[6]]
]

var possibilidadesVitoriaCampo = [
    [campo1, campo2, campo3],
    [campo4, campo5, campo6],
    [campo7, campo8, campo9],

    [campo1, campo4, campo7],
    [campo2, campo5, campo8],
    [campo3, campo6, campo9],

    [campo1, campo5, campo9],
    [campo3, campo5, campo7]
]

var eX = true //true para primeiro jogador, false para segundo jogador

var campoQueSeraMarcado

var indiceCampoQueSeraMarcado

//** FIM --> DECLARANDO VARIAVEIS GLOBAIS **//