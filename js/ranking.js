'use strict'

function atualizarTabelaRanking() {
    let matrizJogadores = JSON.parse(localStorage.getItem('matrizJogadores'))

    rankingCampoJogadores.innerHTML = ''
    let contador = 1
    matrizJogadores.forEach((jogador) => {
        rankingCampoJogadores.innerHTML += `<tr><td>${contador}°</td><td>Nome: ${jogador.nome}</br></br>Fácil: ${jogador.pontosFacil}</br></br>Médio: 1999</br></br>Difícil: 1999</td></tr>`
        contador++
    })
}

atualizarTabelaRanking()