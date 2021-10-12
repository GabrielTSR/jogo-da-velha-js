"use strict"

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

var modosDeJogo = document.getElementById("quemContraQuem")
var modoDeJogoSelecionado = modosDeJogo.value

var xSera = document.getElementById("xSera").value

var dificuldadeDaMaquina = document.getElementById("dificuldadeMaquina")
var dificuldadeDaMaquinaSelecionada = dificuldadeDaMaquina.value

var vencedorDaPartida = 0 //entre 0, 'x', e 'fantasma'

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

var possibilidadesVitoria = [
    [matrizJogo[0], matrizJogo[1], matrizJogo[2]],
    [matrizJogo[3], matrizJogo[4], matrizJogo[5]],
    [matrizJogo[6], matrizJogo[7], matrizJogo[8]],

    [matrizJogo[0], matrizJogo[3], matrizJogo[6]],
    [matrizJogo[1], matrizJogo[4], matrizJogo[7]],
    [matrizJogo[2], matrizJogo[5], matrizJogo[8]],

    [matrizJogo[0], matrizJogo[4], matrizJogo[8]],
    [matrizJogo[2], matrizJogo[4], matrizJogo[6]]
]

var eX = true //true para primeiro jogador, false para segundo jogador

modosDeJogo.addEventListener('input', desabilitarDificuldadeDaMaquina)

desabilitarDificuldadeDaMaquina()
    //Função chamada para o caso de a página carregar com jogador vs jogador habilitado

function desabilitarDificuldadeDaMaquina() {
    if (modosDeJogo.value == "jvsj") {
        dificuldadeDaMaquina.disabled = true
    } else {
        dificuldadeDaMaquina.disabled = false
    }
}

function retornarCamposVazios(campo) {
    if (campoEstaVazio(campo)) {
        return campo
    }
}

const atualizarCamposVagos = () => camposVagos = camposVagos.filter(retornarCamposVazios)

const resetarCadaCampo = (cadaCampo, contador) => cadaCampo[contador].innerHTML = ''

function aplicarAlteracoesConfig() {
    modoDeJogoSelecionado = modosDeJogo.value
    xSera = document.getElementById("xSera").value
    dificuldadeDaMaquinaSelecionada = dificuldadeDaMaquina.value

    resetarJogo()
}

function limparTabuleiro() {
    for (var contador = cadaCampo.length - 1; contador >= 0; contador--) {
        resetarCadaCampo(cadaCampo, contador)
    }
}

const resetarMatrizJogo = () => matrizJogo = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]

const resetarCamposVagos = () => camposVagos = [
    campo1, campo2, campo3,
    campo4, campo5, campo6,
    campo7, campo8, campo9
]

const fecharModal = () => window.location.replace('#')

const maquinaComeca = () => xSera === 'outro'

function aplicarPrimeiraJogadaMaquina() {

    aplicarJogadaDaMaquina('fantasma', 'x')

}

function resetarJogo() {

    tagDaDivulgacao.innerText = 'Jogo inacabado'

    EAVezDe.innerHTML = 'É a vez de <br>"X"'

    resetarMatrizJogo()

    resetarCamposVagos()

    vencedorDaPartida = 0

    eX = true

    limparTabuleiro()

    fecharModal()

    maquinaComeca() && maquinaPodeJogar() ? aplicarPrimeiraJogadaMaquina() : false

}

const campoEstaVazio = (campoSelecionado) => campoSelecionado.children.length == 0

const inserirElemento = (campoSelecionado, elementoInserido) => campoSelecionado.innerHTML = `<img src="./img/${elementoInserido}.png" alt="${elementoInserido}">`

const atualizarMatrizJogo = (indice, simbolo) => {
    matrizJogo[indice] = simbolo

    possibilidadesVitoria = [
        [matrizJogo[0], matrizJogo[1], matrizJogo[2]],
        [matrizJogo[3], matrizJogo[4], matrizJogo[5]],
        [matrizJogo[6], matrizJogo[7], matrizJogo[8]],
        [matrizJogo[0], matrizJogo[3], matrizJogo[6]],
        [matrizJogo[1], matrizJogo[4], matrizJogo[7]],
        [matrizJogo[2], matrizJogo[5], matrizJogo[8]],
        [matrizJogo[0], matrizJogo[4], matrizJogo[8]],
        [matrizJogo[2], matrizJogo[4], matrizJogo[6]]
    ]
}

const encontrouSimbolo = (elemento) => simboloEncontrado += simboloJogador === cadaCampo && 1

// cadaCampo => {

//     simboloEncontrado += simboloJogador === cadaCampo && 1
// }

function verSeGanhou(simboloJogador) {

    let contadorSimbolo = 0
    possibilidadesVitoria.forEach(cadaReta => {

        if (contadorSimbolo < 3) {
            contadorSimbolo = 0
            cadaReta.forEach(cadaCampo => {
                contadorSimbolo += simboloJogador === cadaCampo && 1
            });
        }
    });

    if (contadorSimbolo === 3) {
        return true
    } else {
        return false
    }
}

function verSeEmpatou() {
    return camposVagos.length === 0 ? true : false
}

function checarSeOJogoAcabou() {

    return vencedorDaPartida = verSeGanhou('x') ? 'x' : verSeGanhou('fantasma') ? 'fantasma' : verSeEmpatou() ? 'empate' : 0
}

const passarAVez = (simboloVezDe) => EAVezDe.innerHTML = `É a vez de <br>"${simboloVezDe}"`

const escreverResultado = (mensagem) => {
    tagDaDivulgacao.innerText = mensagem
    EAVezDe.innerText = mensagem
}

const abrirModalResultado = () => window.location.replace('#resultado-container')

function exibirResultado() {
    let mensagem
    if (vencedorDaPartida !== 0) {

        if (vencedorDaPartida === 'empate') {
            mensagem = `O jogo está empatado!`
        } else {
            mensagem = `"${vencedorDaPartida}" venceu!`
        }
        escreverResultado(mensagem)
        abrirModalResultado()
    }
}

function resgatarIndexDoCampoEmMatrizJogo(campo) {
    switch (campo.id) {

        case 'campo-1':
            return 0

        case 'campo-2':
            return 1


        case 'campo-3':
            return 2

        case 'campo-4':
            return 3

        case 'campo-5':
            return 4

        case 'campo-6':
            return 5

        case 'campo-7':
            return 6

        case 'campo-8':
            return 7

        case 'campo-9':
            return 8

        default:
            return false
    }
}

function aplicarJogada(campoSelecionado, indice, simbolo, adversarioSimbolo) {
    inserirElemento(campoSelecionado, simbolo)
    atualizarMatrizJogo(indice, simbolo)
    atualizarCamposVagos()
    eX = !eX
    passarAVez(adversarioSimbolo)
    checarSeOJogoAcabou()
    exibirResultado()
}

function bloquearVitoria(adversarioSimbolo) {

    let contadorSimbolo = 0
    let contadorVazio = 0
    possibilidadesVitoria.forEach(cadaReta => {

        if (contadorSimbolo !== 2 && contadorVazio !== 1) {
            contadorVazio = 0
            contadorSimbolo = 0

            cadaReta.forEach(cadaCampo => {
                contadorSimbolo += adversarioSimbolo === cadaCampo && 1
                contadorVazio += 0 === cadaCampo && 1
            });
        }
        console.log(`Esta reta possui ${contadorSimbolo} simbolos inimigos, e ${contadorVazio} campos vazios`)
    });

    if (contadorSimbolo === 2 && contadorVazio === 1) {
        console.log(true)
    } else {
        console.log(false)
    }
}

const jogarAleatoriamente = (campoSelecionado) => {
    const jogadaAleatoria = Math.floor(Math.random() * camposVagos.length)
    return campoSelecionado = camposVagos[jogadaAleatoria]
}

function aplicarJogadaDaMaquina(adversarioSimbolo, simbolo) {
    let campoSelecionado

    if (dificuldadeDaMaquinaSelecionada === 'facil') {
        campoSelecionado = jogarAleatoriamente(campoSelecionado)

    } else if (dificuldadeDaMaquinaSelecionada === 'medio') {
        campoSelecionado = jogarAleatoriamente(campoSelecionado)
        bloquearVitoria(adversarioSimbolo)

    } else {
        console.log("dificil")
    }


    const indexDoCampo = resgatarIndexDoCampoEmMatrizJogo(campoSelecionado)
    aplicarJogada(campoSelecionado, indexDoCampo, simbolo, adversarioSimbolo, eX)
}

const maquinaPodeJogar = () => modoDeJogoSelecionado === 'jvsm' && checarSeOJogoAcabou() === 0


function aplicarJogadaDoJogador(campo, indiceCampoSelecionado) {

    let simbolo
    let adversarioSimbolo
    const campoSelecionado = document.getElementById(campo)

    if (campoEstaVazio(campoSelecionado) &&
        vencedorDaPartida === 0) {

        if (eX) {

            simbolo = 'x'
            adversarioSimbolo = 'fantasma'

        } else if (!eX) {

            simbolo = 'fantasma'
            adversarioSimbolo = 'x'

        }

        aplicarJogada(campoSelecionado, indiceCampoSelecionado, simbolo, adversarioSimbolo)

        maquinaPodeJogar() ? aplicarJogadaDaMaquina(simbolo, adversarioSimbolo) : false
    } else {
        exibirResultado()
        return false
    }
}