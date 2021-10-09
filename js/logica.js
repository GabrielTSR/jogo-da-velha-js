"use strict"

const cadaCampo = document.getElementsByClassName("cada-campo")

const tagDaDivulgacao = document.getElementById("quem-venceu")

const h2EAVezDe = document.getElementById("quem-e-a-vez-mensagem")

const campo1 = document.getElementById("campo-1")
const campo2 = document.getElementById("campo-2")
const campo3 = document.getElementById("campo-3")
const campo4 = document.getElementById("campo-4")
const campo5 = document.getElementById("campo-5")
const campo6 = document.getElementById("campo-6")
const campo7 = document.getElementById("campo-7")
const campo8 = document.getElementById("campo-8")
const campo9 = document.getElementById("campo-9")

var modoDeJogo = document.getElementById("quemContraQuem").value

var xSera = document.getElementById("xSera").value

var dificuldadeDaMaquina = document.getElementById("dificuldadeMaquinaSelect").value

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

var eX = true //true para primeiro jogador, false para segundo jogador

function retornarCamposVazios(campo) {
    if (campoEstaVazio(campo)) {
        return campo
    }
}

const atualizarCamposVagos = () => camposVagos = camposVagos.filter(retornarCamposVazios)

const resetarCadaCampo = (cadaCampo, i) => cadaCampo[i].innerHTML = ''

function aplicarAlteracoesConfig() {
    modoDeJogo = document.getElementById("quemContraQuem").value
    xSera = document.getElementById("xSera").value
    dificuldadeDaMaquina = document.getElementById("dificuldadeMaquinaSelect").value

    resetarJogo()
}

function limparTabuleiro() {
    for (var i = cadaCampo.length - 1; i >= 0; i--) {
        resetarCadaCampo(cadaCampo, i)
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

    h2EAVezDe.innerHTML = 'É a vez de <br>"X"'

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

const atualizarMatrizJogo = (indice, simbolo) => matrizJogo[indice] = simbolo

function verSeGanhou(simboloJogador) {
    if (
        matrizJogo[0] === simboloJogador && matrizJogo[3] === simboloJogador && matrizJogo[6] === simboloJogador ||
        matrizJogo[1] === simboloJogador && matrizJogo[4] === simboloJogador && matrizJogo[7] === simboloJogador ||
        matrizJogo[2] === simboloJogador && matrizJogo[5] === simboloJogador && matrizJogo[8] === simboloJogador ||
        matrizJogo[2] === simboloJogador && matrizJogo[4] === simboloJogador && matrizJogo[6] === simboloJogador ||
        matrizJogo[0] === simboloJogador && matrizJogo[4] === simboloJogador && matrizJogo[8] === simboloJogador ||
        matrizJogo[0] === simboloJogador && matrizJogo[1] === simboloJogador && matrizJogo[2] === simboloJogador ||
        matrizJogo[3] === simboloJogador && matrizJogo[4] === simboloJogador && matrizJogo[5] === simboloJogador ||
        matrizJogo[6] === simboloJogador && matrizJogo[7] === simboloJogador && matrizJogo[8] === simboloJogador
    ) {
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

const passarAVez = (simboloVezDe) => h2EAVezDe.innerHTML = `É a vez de <br>"${simboloVezDe}"`

const exibirVencedor = (tagDaMensagem) => {
    const mensagem = `"${vencedorDaPartida}" venceu!`
    tagDaMensagem.innerText = mensagem
    h2EAVezDe.innerText = mensagem
}

const divulgarEmpate = (tagDaDivulgacao) => {
    const mensagem = `O jogo está empatado!`
    tagDaDivulgacao.innerText = mensagem
    h2EAVezDe.innerText = mensagem
}

function exibirResultado() {
    if (vencedorDaPartida !== 0) {

        if (vencedorDaPartida === 'empate') {
            divulgarEmpate(tagDaDivulgacao)
        } else {
            exibirVencedor(tagDaDivulgacao)
        }

        window.location.replace('#resultado-container')
    }
}

function resgatarindexDoCampoEmMatrizJogo(campo) {
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

function aplicarJogada(campoSelecionado, indice, simbolo, proximoSimbolo) {
    inserirElemento(campoSelecionado, simbolo)
    atualizarMatrizJogo(indice, simbolo)
    atualizarCamposVagos()
    eX = !eX
    passarAVez(proximoSimbolo)
    checarSeOJogoAcabou()
    exibirResultado()
}

function aplicarJogadaDaMaquina(proximoSimbolo, simbolo) {
    let campoSelecionado

    if (dificuldadeDaMaquina === 'facil') {
        const jogada = Math.floor(Math.random() * camposVagos.length)
        campoSelecionado = camposVagos[jogada]
    }
    const indexDoCampo = resgatarindexDoCampoEmMatrizJogo(campoSelecionado)
    aplicarJogada(campoSelecionado, indexDoCampo, simbolo, proximoSimbolo, eX)
}

const maquinaPodeJogar = () => modoDeJogo === 'jvsm' && checarSeOJogoAcabou() === 0


function aplicarJogadaDoJogador(campo, indiceCampoSelecionado) {

    let simbolo
    let proximoSimbolo
    const campoSelecionado = document.getElementById(campo)

    if (campoEstaVazio(campoSelecionado) &&
        vencedorDaPartida === 0) {

        if (eX) {

            simbolo = 'x'
            proximoSimbolo = 'fantasma'

        } else if (!eX) {

            simbolo = 'fantasma'
            proximoSimbolo = 'x'

        }

        aplicarJogada(campoSelecionado, indiceCampoSelecionado, simbolo, proximoSimbolo)

        maquinaPodeJogar() ? aplicarJogadaDaMaquina(simbolo, proximoSimbolo) : false
    } else {
        exibirResultado()
        return false
    }
}