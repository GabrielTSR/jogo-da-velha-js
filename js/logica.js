"use strict"

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

var totalCamposPreenchidos

var eJogadorInicial = true //true para primeiro jogador, false para segundo jogador

const resetarCadaCampo = (cadaCampo, i) => cadaCampo[i].innerHTML = ''

function aplicarAlteracoesConfig() {
    modoDeJogo = document.getElementById("quemContraQuem").value
    jogador1Sera = document.getElementById("jogadorPrincipalComeca").value
    dificuldadeDaMaquina = document.getElementById("dificuldadeMaquinaSelect").value

    resetarJogo()
}

function limparTabuleiro() {
    const cadaCampo = document.getElementsByClassName("cada-campo")
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

    resetarMatrizJogo()

    vencedorDaPartida = 0

    eJogadorInicial = true

    limparTabuleiro()

    fecharModal()

}

const campoEstaVazio = (campoSelecionado) => campoSelecionado.children.length == 0

const inserirElemento = (campoSelecionado, elementoInserido) => campoSelecionado.innerHTML = `<img src="./img/${elementoInserido}.png" alt="${elementoInserido}">`

const atualizarMatriz = (indice, simbolo) => matrizJogo[indice] = simbolo

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

function encontrouCampoVazio(cadaCampo) {
    cadaCampo !== 0 ? totalCamposPreenchidos += 1 : false
}

function verSeEmpatou() {
    totalCamposPreenchidos = 0
    matrizJogo.forEach(encontrouCampoVazio);
    return totalCamposPreenchidos === 9 ? true : false
}

function checarSeOJogoAcabou() {

    vencedorDaPartida = verSeGanhou('x') ? 'x' : verSeGanhou('fantasma') ? 'fantasma' : verSeEmpatou() ? 'empate' : 0
}

function indicarDeQuemEAVez(simboloVezDe) {
    const h2EAVezDe = document.getElementById("quem-e-a-vez-mensagem")
    h2EAVezDe.innerText = `É a vez de "${simboloVezDe}"`

}

const exibirVencedor = (tagDaMensagem) => tagDaMensagem.innerText = `"${vencedorDaPartida}" venceu!`

const divulgarEmpate = (tagDaDivulgacao) => tagDaDivulgacao.innerText = `Ops! deu ${vencedorDaPartida}!`

function exibirResultado() {
    if (vencedorDaPartida !== 0) {
        const tagDaDivulgacao = document.getElementById("quem-venceu")

        if (vencedorDaPartida === 'empate') {
            divulgarEmpate(tagDaDivulgacao)
        } else {
            exibirVencedor(tagDaDivulgacao)
        }

        window.location.replace('#resultado-container')
    }
}

function inserirOpcao(campo, indice) {

    const campoSelecionado = document.getElementById(campo)
    let simbolo
    let simboloVezDe

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
        inserirElemento(campoSelecionado, simbolo)
        atualizarMatriz(indice, simbolo)
        eJogadorInicial = true
        indicarDeQuemEAVez(simboloVezDe)
    } else {
        return false
    }

    inserirElemento(campoSelecionado, simbolo)
    atualizarMatriz(indice, simbolo)
    indicarDeQuemEAVez(simboloVezDe)
    checarSeOJogoAcabou()
    exibirResultado()
}