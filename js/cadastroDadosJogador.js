'use strict'

function armazenarJogador() {
    const nomeJogador = document.getElementById('input-nome-jogador').value

    if (nomeJogador.trim() !== '') {
        let jogadorAtual = new Object()
        jogadorAtual.nome = nomeJogador
        jogadorAtual.pontosFacil = 0
        jogadorAtual.pontosMedio = 0
        jogadorAtual.pontosDificil = 0

        localStorage.setItem('jogadorAtual', JSON.stringify(jogadorAtual))

        let matrizJogadores = JSON.parse(localStorage.getItem('matrizJogadores'))

        if (JSON.parse(localStorage.getItem('matrizJogadores')) === null) {
            console.log('matriz jogadores estava vazio')
            matrizJogadores = []
            matrizJogadores.push(jogadorAtual)
            localStorage.setItem('matrizJogadores', JSON.stringify(matrizJogadores))
        } else {
            console.log(matrizJogadores)
            matrizJogadores.push(jogadorAtual)
            localStorage.setItem('matrizJogadores', JSON.stringify(matrizJogadores))
        }
    }
}

function acrescentarPontuacao(dificuldade) {
    // acrescentarPontuacao('dificil')
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
}