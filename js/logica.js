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

/*Declarando variáveis globais*/

var modoDeJogo = document.getElementById("quemContraQuem").value

var jogador1Sera = document.getElementById("jogadorPrincipalComeca").value

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
    campo7, campo8, campo9,
]

var eJogadorInicial = true //true para primeiro jogador, false para segundo jogador

function retornarCamposVazios(campo) {
    if (campoEstaVazio(campo)) {
        return campo
    }
}

const atualizarCamposVagos = () => camposVagos = camposVagos.filter(retornarCamposVazios)

const resetarCadaCampo = (cadaCampo, i) => cadaCampo[i].innerHTML = ''

function aplicarAlteracoesConfig() {
    modoDeJogo = document.getElementById("quemContraQuem").value
    jogador1Sera = document.getElementById("jogadorPrincipalComeca").value
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

const fecharModal = () => window.location.replace('#')

function resetarJogo() {

    tagDaDivulgacao.innerText = 'Jogo inacabado'

    h2EAVezDe.innerHTML = 'É a vez de <br>"X"'

    resetarMatrizJogo()

    vencedorDaPartida = 0

    eJogadorInicial = true

    limparTabuleiro()

    fecharModal()

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

function inserirOpcao(campo, indice) {

    let simbolo
    let simboloVezDe
    const campoSelecionado = document.getElementById(campo)

    if (eJogadorInicial &&
        campoEstaVazio(campoSelecionado) &&
        vencedorDaPartida === 0) {

        simbolo = 'x'
        simboloVezDe = 'fantasma'
        eJogadorInicial = false

    } else if (!eJogadorInicial &&
        campoEstaVazio(campoSelecionado) &&
        vencedorDaPartida === 0) {

        simbolo = 'fantasma'
        simboloVezDe = 'x'
        eJogadorInicial = true

    } else {
        exibirResultado()
        return false
    }

    inserirElemento(campoSelecionado, simbolo)
    atualizarMatrizJogo(indice, simbolo)
    atualizarCamposVagos()
    passarAVez(simboloVezDe)
    checarSeOJogoAcabou()
    exibirResultado()
}