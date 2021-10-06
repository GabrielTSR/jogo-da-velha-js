"use strict"

//**Pegar os elementos**/
const cadaCampo = document.querySelector(".cada-campo")

var vencedorDaParida = 0 //entre 0, 'x', e 'fantasma'

var matrizJogo = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ] //0 = vazio

var eJogadorInicial = true //true para primeiro jogador, false para segundo jogador

const campoEstaVazio = (campoSelecionado) => campoSelecionado.children.length == 0

const inserirElemento = (campoSelecionado, elementoInserido) => campoSelecionado.innerHTML = `<img src="./img/${elementoInserido}.png" alt="${elementoInserido}">`

const atualizarMatriz = (indice, simbolo) => matrizJogo[indice] = simbolo

function verSeXGanhou() {
    if (
        matrizJogo[0] === 'x' && matrizJogo[3] === 'x' && matrizJogo[6] === 'x' ||
        matrizJogo[1] === 'x' && matrizJogo[4] === 'x' && matrizJogo[7] === 'x' ||
        matrizJogo[2] === 'x' && matrizJogo[5] === 'x' && matrizJogo[8] === 'x' ||
        matrizJogo[2] === 'x' && matrizJogo[4] === 'x' && matrizJogo[6] === 'x' ||
        matrizJogo[0] === 'x' && matrizJogo[4] === 'x' && matrizJogo[8] === 'x' ||
        matrizJogo[0] === 'x' && matrizJogo[1] === 'x' && matrizJogo[2] === 'x' ||
        matrizJogo[3] === 'x' && matrizJogo[4] === 'x' && matrizJogo[5] === 'x' ||
        matrizJogo[6] === 'x' && matrizJogo[7] === 'x' && matrizJogo[8] === 'x'
    ) {
        return true
    } else {
        return false
    }
}

function verSeFantasmaGanhou() {
    if (
        matrizJogo[0] === 'fantasma' && matrizJogo[3] === 'fantasma' && matrizJogo[6] === 'fantasma' ||
        matrizJogo[1] === 'fantasma' && matrizJogo[4] === 'fantasma' && matrizJogo[7] === 'fantasma' ||
        matrizJogo[2] === 'fantasma' && matrizJogo[5] === 'fantasma' && matrizJogo[8] === 'fantasma' ||
        matrizJogo[2] === 'fantasma' && matrizJogo[4] === 'fantasma' && matrizJogo[6] === 'fantasma' ||
        matrizJogo[0] === 'fantasma' && matrizJogo[4] === 'fantasma' && matrizJogo[8] === 'fantasma' ||
        matrizJogo[0] === 'fantasma' && matrizJogo[1] === 'fantasma' && matrizJogo[2] === 'fantasma' ||
        matrizJogo[3] === 'fantasma' && matrizJogo[4] === 'fantasma' && matrizJogo[5] === 'fantasma' ||
        matrizJogo[6] === 'fantasma' && matrizJogo[7] === 'fantasma' && matrizJogo[8] === 'fantasma'
    ) {
        return true
    } else {
        return false
    }
}

function checarSeHaVencedor() {
    verSeXGanhou() ? vencedorDaParida = 'x' : verSeFantasmaGanhou() ? vencedorDaParida = 'fantasma' : false
}

function indicarDeQuemEAVez(simboloVezDe) {
    const h2EAVezDe = document.getElementById("quem-e-a-vez-mensagem")
    h2EAVezDe.innerText = `É a vez de "${simboloVezDe}"`

}

function exibirVencedor() {
    if (vencedorDaParida !== 0) {
        const textoVencedor = document.getElementById("quem-venceu")
        textoVencedor.innerText = `"${vencedorDaParida}" venceu!`
        window.location.replace('#resultado-container')
    }
}

function inserirOpcao(campo, indice) {
    const campoSelecionado = document.getElementById(campo)

    let simbolo
    let simboloVezDe

    if (eJogadorInicial &&
        campoEstaVazio(campoSelecionado) &&
        vencedorDaParida === 0) {
        simbolo = 'x'
        simboloVezDe = 'fantasma'
        eJogadorInicial = false

    } else if (!eJogadorInicial &&
        campoEstaVazio(campoSelecionado) &&
        vencedorDaParida === 0) {

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
    checarSeHaVencedor()
    exibirVencedor()
}