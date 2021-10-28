'use strict'

let nomeJogador = ''

let houveNomeRepetido = false

const escreverSaudacoes = (nomeJogador) => (textoSaudacoes.innerText = `Olá! ${nomeJogador}`)

function armazenarJogador() {
    nomeJogador = document.getElementById('input-nome-jogador').value
    houveNomeRepetido = false

    if (nomeJogador.trim() !== '') {
        if (matrizJogadoresEstaVazia()) {
            criarMatrizJogadores()
        }

        if (!resgatarJogadorDaMatriz()) {
            const novoJogador = criarNovoJogador()
            inserirNovoJogadorNaMatriz(novoJogador)
        }

        escreverSaudacoes(nomeJogador)
    }
}

function inserirNovoJogadorNaMatriz(novoJogador) {
    let matrizJogadores = JSON.parse(localStorage.getItem('matrizJogadores'))

    matrizJogadores.push(novoJogador)
    localStorage.setItem('matrizJogadores', JSON.stringify(matrizJogadores))
}

function criarNovoJogador() {
    const novoJogador = new Object()
    novoJogador.nome = nomeJogador
    novoJogador.pontosFacil = 0
    novoJogador.pontosMedio = 0
    novoJogador.pontosDificil = 0

    localStorage.setItem('jogadorAtual', JSON.stringify(novoJogador))

    return novoJogador
}

function criarMatrizJogadores() {
    const matrizJogadores = []
    localStorage.setItem('matrizJogadores', JSON.stringify(matrizJogadores))
}

const matrizJogadoresEstaVazia = () => JSON.parse(localStorage.getItem('matrizJogadores')) === null

function criarObjetoJogador() {}

function resgatarJogadorDaMatriz() {
    const matrizJogadores = JSON.parse(localStorage.getItem('matrizJogadores'))

    matrizJogadores.forEach(verificarSeNomeExisteNaMatriz)

    if (houveNomeRepetido === true) return true
    else return false
}

function verificarSeNomeExisteNaMatriz(jogador) {
    if (jogador.nome === nomeJogador) {
        localStorage.setItem('jogadorAtual', JSON.stringify(jogador))
        houveNomeRepetido = true
        return true
    }
}

function acrescentarPontuacao(dificuldade) {
    let jogadorAtual = JSON.parse(localStorage.getItem('jogadorAtual'))

    switch (dificuldade) {
        case 'facil':
            jogadorAtual.pontosFacil += 10
            break

        case 'medio':
            jogadorAtual.pontosMedio += 40
            break

        case 'dificil':
            jogadorAtual.pontosDificil += 1000
            break

        default:
            return false
    }

    localStorage.setItem('jogadorAtual', JSON.stringify(jogadorAtual))
    atualizarMatrizLocalStorage(jogadorAtual)
}

function atualizarMatrizLocalStorage(jogadorAtual) {
    let matrizJogadores = JSON.parse(localStorage.getItem('matrizJogadores'))

    matrizJogadores.forEach((jogador, indice, matrizJogadores) => {
        jogador.nome === jogadorAtual.nome ? (matrizJogadores[indice] = jogadorAtual) : false

        localStorage.setItem('matrizJogadores', JSON.stringify(matrizJogadores))
    })
}

function limparDadosJogador() {
    localStorage.removeItem('jogadorAtual')

    textoSaudacoes.innerText = 'Olá!'
}