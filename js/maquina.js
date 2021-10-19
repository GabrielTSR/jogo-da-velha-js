'use strict'

function abrirModalCarregamento() {
    window.location.replace('#carregamento-container')
    setTimeout(function () {
        window.location.replace('#')
    }, 500)
}

const jogarAleatoriamente = (matrizCampos) => {
    const jogadaAleatoria = Math.floor(Math.random() * matrizCampos.length)
    return (campoSelecionado = matrizCampos[jogadaAleatoria])
}

function haCheque(simbolo) {
    let contadorSimbolo = 0
    let contadorVazio = 0
    let retornoDaFuncao = false

    possibilidadesVitoriaMatriz.forEach((cadaReta, indiceCadaReta) => {
        // if (contadorSimbolo !== 2 && contadorVazio !== 1) {
        contadorVazio = 0
        contadorSimbolo = 0

        cadaReta.forEach((cadaCampo, indiceCadaCampo) => {
            contadorSimbolo += simbolo === cadaCampo && 1
            contadorVazio += 0 === cadaCampo && 1
            0 === cadaCampo ? (indiceCampoQueSeraMarcado = indiceCadaCampo) : false
        })

        if (contadorSimbolo === 2 && contadorVazio === 1) {
            campoQueSeraMarcado = possibilidadesVitoriaCampo[indiceCadaReta][indiceCampoQueSeraMarcado]

            retornoDaFuncao = true
        }
    })
    return retornoDaFuncao
}

function resgatarIndexDoCampoEmMatrizJogo(campo) {
    switch (campo.id) {
        case 'campo-1':
            return 0

        case 'campo-2':
            return 1

        case 'campo-3':
            return 2

        case 'campo-4':
            return 3

        case 'campo-5':
            return 4

        case 'campo-6':
            return 5

        case 'campo-7':
            return 6

        case 'campo-8':
            return 7

        case 'campo-9':
            return 8

        default:
            return false
    }
}

function aplicarJogadaDaMaquina(adversarioSimbolo, simbolo) {
    let campoSelecionado

    if (dificuldadeDaMaquinaSelecionada === 'facil') {
        campoSelecionado = jogarAleatoriamente(camposVagos)
    } else if (dificuldadeDaMaquinaSelecionada === 'medio') {
        if (haCheque(adversarioSimbolo) === true) {
            campoSelecionado = campoQueSeraMarcado //var vindo da função ha cheque
        } else {
            campoSelecionado = jogarAleatoriamente(camposVagos)
        }
    } else if ('dificil') {
        abrirModalCarregamento()

        if (haCheque(simbolo)) {
            campoSelecionado = campoQueSeraMarcado //var vindo da função ha cheque
        } else if (haCheque(adversarioSimbolo)) {
            campoSelecionado = campoQueSeraMarcado //var vindo da função ha cheque
        } else if (matrizJogo[4] === 0) {
            campoSelecionado = campo5
        } else if (
            matrizJogo[4] === adversarioSimbolo &&
            matrizJogo[0] === 0 &&
            matrizJogo[2] === 0 &&
            matrizJogo[6] === 0 &&
            matrizJogo[8] === 0
        ) {
            console.log('tenho q jogar na ponta')

            const pontasTabuleiro = [campo1, campo3, campo7, campo9]
            campoSelecionado = jogarAleatoriamente(pontasTabuleiro)
        } else {
            campoSelecionado = jogarAleatoriamente(camposVagos)
        }
    }

    const indexDoCampo = resgatarIndexDoCampoEmMatrizJogo(campoSelecionado)
    aplicarJogada(campoSelecionado, indexDoCampo, simbolo, adversarioSimbolo, eX)
}

function aplicarPrimeiraJogadaMaquina() {
    aplicarJogadaDaMaquina('fantasma', 'x')
}
