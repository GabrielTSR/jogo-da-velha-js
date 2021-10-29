'use strict'

let nomeJogador = ''

let houveNomeRepetido = false

const escreverSaudacoes = (nomeJogador) => (textoSaudacoes.innerText = `Olá! ${nomeJogador}`)

function armazenarJogador() {
    nomeJogador = document.getElementById('input-nome-jogador').value
    houveNomeRepetido = false

    if (nomeJogador.trim() !== '' && nomeJogador.length <= 10) {
        if (matrizJogadoresEstaVazia()) {
            criarMatrizJogadores()
        }

        if (!resgatarJogadorDaMatriz()) {
            const novoJogador = criarNovoJogador()
            inserirNovoJogadorNaMatriz(novoJogador)
        }

        escreverSaudacoes(nomeJogador)
    }
    atualizarTabelaRanking()
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
    novoJogador.pontosTotal = 0

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

    return houveNomeRepetido
}

function verificarSeNomeExisteNaMatriz(jogador) {
    if (jogador.nome === nomeJogador) {
        localStorage.setItem('jogadorAtual', JSON.stringify(jogador))
        return (houveNomeRepetido = true)
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
    atualizarTabelaRanking()
}

function atualizarMatrizLocalStorage(jogadorAtual) {
    let matrizJogadores = JSON.parse(localStorage.getItem('matrizJogadores'))

    matrizJogadores.forEach((jogador, indice, matrizJogadores) => {
        if (jogador.nome === jogadorAtual.nome) {
            matrizJogadores[indice] = jogadorAtual
            return true
        }
    })

    matrizJogadores = matrizJogadores.sort(deixarEmOrdemDecrescente)

    localStorage.setItem('matrizJogadores', JSON.stringify(matrizJogadores))
}

function deixarEmOrdemDecrescente(jogadorComMaisPontos, jogadorComMenosPontos) {
    const totalJogadorMenosPontos = 
          jogadorComMenosPontos.pontosFacil +
          jogadorComMenosPontos.pontosMedio +
          jogadorComMenosPontos.pontosDificil
    
    const totalJogadorMaisPontos = 
          jogadorComMaisPontos.pontosFacil +
          jogadorComMaisPontos.pontosMedio +
          jogadorComMaisPontos.pontosDificil
    
    return totalJogadorMenosPontos - totalJogadorMaisPontos
}

function limparDadosJogador() {
    localStorage.removeItem('jogadorAtual')

    textoSaudacoes.innerText = 'Olá!'
}
