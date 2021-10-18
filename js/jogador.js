"use strict"

const campoEstaVazio = (campoSelecionado) => campoSelecionado.children.length == 0

const maquinaPodeJogar = () => modoDeJogoSelecionado === 'jvsm' && checarSeOJogoAcabou() === 0

function aplicarJogadaDoJogador(campo, indiceCampoSelecionado) {

    campoSelecionado = document.getElementById(campo)

    let simbolo
    let adversarioSimbolo

    if (campoEstaVazio(campoSelecionado) &&
        vencedorDaPartida === 0) {

        if (eX) {

            simbolo = 'x'
            adversarioSimbolo = 'fantasma'


        } else if (!eX) {

            simbolo = 'fantasma'
            adversarioSimbolo = 'x'


        }

        aplicarJogada(campoSelecionado, indiceCampoSelecionado, simbolo, adversarioSimbolo)

        maquinaPodeJogar() ? aplicarJogadaDaMaquina(simbolo, adversarioSimbolo) : false
    } else {
        exibirResultado()
        return false
    }
}