'use strict'

//CONTATO COM JSON HOSPEDADO EXTERNAMENTE
const getJogador = (url) => fetch(url).then((res) => res.json())

const showJogadores = async() => {
    const url = 'https://testeleonid.herokuapp.com/jogadores'
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

    return matrizJogadores
}

function createJogadorNaMatriz(jogador) {
    const url = 'https://testeleonid.herokuapp.com/jogadores/'

    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jogador),
        })
        .then((response) => response.json())
        .then((data) => {
            window.location.replace('../index.html')
            return true
        })
        .catch((error) => {
            console.error('Error:', error)
            return false
        })
}

function deleteJogador(jogadorId) {
    const url = `https://testeleonid.herokuapp.com/jogadores/${jogadorId}`
    const options = {
        method: 'DELETE',
    }

    fetch(url, options)
}

function updateJogador(jogador) {
    const url = `https://testeleonid.herokuapp.com/jogadores/${jogador.id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jogador),
    }
    fetch(url, options)
}

// deleteJogador(1)