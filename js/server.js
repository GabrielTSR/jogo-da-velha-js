'use strict'

//CONTATO COM JSON HOSPEDADO EXTERNAMENTE
const getJogador = (url) => fetch(url).then((res) => res.json())

const showJogadores = async() => {
    const url = 'http://testeleonid.herokuapp.com/jogadores'
    const jogadores = await getJogador(url)
    return jogadores
}

function criarMatrizJogadores() {
    const matrizJogadores = []
    localStorage.setItem('matrizJogadores', JSON.stringify(matrizJogadores))
    return matrizJogadores
}

const resgatarMatrizJogadores = async() => {
    let matrizJogadores = await showJogadores()
        // JSON.parse(localStorage.getItem('matrizJogadores'))

    if (eNulo(matrizJogadores)) {
        matrizJogadores = criarMatrizJogadores()
    }
    return matrizJogadores
}

function createJogadorNaMatriz(jogador) {
    console.log(jogador)
    const url = 'http://testeleonid.herokuapp.com/jogadores/'
    const options = {
        method: 'POST',
        body: JSON.stringify(jogador),
    }

    fetch(url, options)
}

function deleteJogador(jogadorId) {
    const url = `http://testeleonid.herokuapp.com/jogadores/${jogadorId}`
    const options = {
        method: 'DELETE',
    }

    fetch(url, options)
}

// deleteJogador(3)