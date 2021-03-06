'use strict'

function criarDelay(campoSelecionado, indexDoCampo, simbolo, adversarioSimbolo, eX) {
    setTimeout(() => {
        document.getElementById('maquina-pensando').style.display = 'none'
        aplicarJogada(campoSelecionado, indexDoCampo, simbolo, adversarioSimbolo, eX)
        camposSaoClicaveis = true
    }, 750)
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
        contadorVazio = 0
        contadorSimbolo = 0

        cadaReta.forEach((cadaCampo, indiceCadaCampo) => {
            contadorSimbolo += simbolo === cadaCampo && 1
            contadorVazio += 0 === cadaCampo && 1
            0 === cadaCampo ? (indiceCampoQueSeraMarcado = indiceCadaCampo) : false
        })

        if (contadorSimbolo === 2 && contadorVazio === 1) {
            campoQueFuncaoEscolheuMarcar = possibilidadesVitoriaCampo[indiceCadaReta][indiceCampoQueSeraMarcado]

            retornoDaFuncao = true
        }
    })
    return retornoDaFuncao
}

function haCaminhoLivre(simbolo) {
    let contadorSimbolo = 0
    let contadorVazio = 0
    let retornoDaFuncao = false

    possibilidadesVitoriaMatriz.forEach((cadaReta, indiceCadaReta) => {
        contadorVazio = 0
        contadorSimbolo = 0
        let indicesCamposVaziosDeCadaReta = []

        cadaReta.forEach((cadaCampo, indiceCadaCampo) => {
            contadorSimbolo += simbolo === cadaCampo && 1
            contadorVazio += 0 === cadaCampo && 1
            0 === cadaCampo ? indicesCamposVaziosDeCadaReta.push(indiceCadaCampo) : false
        })

        if (contadorSimbolo === 1 && contadorVazio === 2) {
            const indiceAleatorio = Math.floor(Math.random() * indicesCamposVaziosDeCadaReta.length)
            const indiceCampoAleatorio = indicesCamposVaziosDeCadaReta[indiceAleatorio]
            campoQueFuncaoEscolheuMarcar = possibilidadesVitoriaCampo[indiceCadaReta][indiceCampoAleatorio]

            retornoDaFuncao = true
        }
    })
    return retornoDaFuncao
}

function haBloqueioDiagonalInicial(adversarioSimbolo, simbolo) {
    //Verificando se o advers??rio da m??quina ?? x
    //se x marcou no meio,
    //e se h?? uma marca????o aliada em uma das pontas.
    if (
        (adversarioSimbolo === 'x' && matrizJogo[4] === adversarioSimbolo && matrizJogo[0] === simbolo) ||
        matrizJogo[2] === simbolo ||
        matrizJogo[6] === simbolo ||
        matrizJogo[8] === simbolo
    ) {
        //Verificando se h?? alguma ponta livre.
        if (matrizJogo[0] === 0 || matrizJogo[2] === 0 || matrizJogo[6] === 0 || matrizJogo[8] === 0) {
            jaReagiuADiagonalInicialBloqueada = true

            const pontasTabuleiro = [campo1, campo3, campo7, campo9]
            do {
                campoQueFuncaoEscolheuMarcar = jogarAleatoriamente(pontasTabuleiro)
            } while (campoQueFuncaoEscolheuMarcar.innerHTML !== '')

            return true
        }
    }

    return false
}

function haDiagonalCurta(adversarioSimbolo, simbolo) {
    if (
        adversarioSimbolo === 'x' &&
        matrizJogo[4] === simbolo &&
        matrizJogo[0] === 0 &&
        matrizJogo[2] === 0 &&
        matrizJogo[6] === 0 &&
        matrizJogo[8] === 0
    ) {
        if (
            matrizJogo[1] === adversarioSimbolo &&
            matrizJogo[5] === adversarioSimbolo &&
            matrizJogo[3] === 0 &&
            matrizJogo[7] === 0
        ) {
            campoQueFuncaoEscolheuMarcar = campo3
            jaReagiuADiagonalCurta = true
            return true
        } else if (
            matrizJogo[3] === adversarioSimbolo &&
            matrizJogo[7] === adversarioSimbolo &&
            matrizJogo[1] === 0 &&
            matrizJogo[5] === 0
        ) {
            campoQueFuncaoEscolheuMarcar = campo7
            jaReagiuADiagonalCurta = true
            return true
        }
    }
    return false
}

function haGambitoDoCanto(adversarioSimbolo, simbolo) {
    if (adversarioSimbolo === 'x' && matrizJogo[4] === simbolo) {
        if (
            matrizJogo[1] === 0 &&
            matrizJogo[3] === 0 &&
            matrizJogo[8] === 0 &&
            matrizJogo[6] === 0 &&
            matrizJogo[5] === 0 &&
            matrizJogo[7] === adversarioSimbolo
        ) {
            if (matrizJogo[0] === adversarioSimbolo && matrizJogo[2] === 0) {
                campoQueFuncaoEscolheuMarcar = campo9
                return true
            }

            if (matrizJogo[0] === 0 && matrizJogo[2] === adversarioSimbolo) {
                campoQueFuncaoEscolheuMarcar = campo7
                return true
            }
        }

        if (
            matrizJogo[0] === 0 &&
            matrizJogo[2] === 0 &&
            matrizJogo[3] === 0 &&
            matrizJogo[5] === 0 &&
            matrizJogo[7] === 0 &&
            matrizJogo[1] === adversarioSimbolo
        ) {
            if (matrizJogo[6] === 0 && matrizJogo[8] === adversarioSimbolo) {
                campoQueFuncaoEscolheuMarcar = campo3
                return true
            }

            if (matrizJogo[6] === adversarioSimbolo && matrizJogo[8] === 0) {
                campoQueFuncaoEscolheuMarcar = campo1
                return true
            }
        }

        if (
            matrizJogo[0] === 0 &&
            matrizJogo[1] === 0 &&
            matrizJogo[5] === 0 &&
            matrizJogo[6] === 0 &&
            matrizJogo[7] === 0 &&
            matrizJogo[3] === adversarioSimbolo
        ) {
            if (matrizJogo[2] === adversarioSimbolo && matrizJogo[8] === 0) {
                campoQueFuncaoEscolheuMarcar = campo1
                return true
            }

            if (matrizJogo[2] === 0 && matrizJogo[8] === adversarioSimbolo) {
                campoQueFuncaoEscolheuMarcar = campo1
                return true
            }
        }

        if (
            matrizJogo[1] === 0 &&
            matrizJogo[2] === 0 &&
            matrizJogo[3] === 0 &&
            matrizJogo[7] === 0 &&
            matrizJogo[8] === 0 &&
            matrizJogo[5] === adversarioSimbolo
        ) {
            if (matrizJogo[0] === adversarioSimbolo && matrizJogo[6] === 0) {
                campoQueFuncaoEscolheuMarcar = campo3
                return true
            }

            if (matrizJogo[0] === 0 && matrizJogo[6] === adversarioSimbolo) {
                campoQueFuncaoEscolheuMarcar = campo9
                return true
            }
        }
    }
    return false
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
    camposSaoClicaveis = false

    let campoSelecionado

    if (dificuldadeDaMaquinaSelecionada === 'facil') {
        campoSelecionado = jogarAleatoriamente(camposVagos)
    } else if (dificuldadeDaMaquinaSelecionada === 'medio') {
        if (haCheque(adversarioSimbolo) === true) {
            campoSelecionado = campoQueFuncaoEscolheuMarcar //var vindo da fun????o ha cheque
        } else {
            campoSelecionado = jogarAleatoriamente(camposVagos)
        }
    } else if (dificuldadeDaMaquinaSelecionada === 'dificil') {
        document.getElementById('maquina-pensando').style.display = 'flex'
        document.getElementById('maquina-pensando').style.transform += 'rotate(90deg)'

        if (haCheque(simbolo)) {
            console.log('ganhando')
            campoSelecionado = campoQueFuncaoEscolheuMarcar //var vindo da fun????o ha cheque
        } else if (haCheque(adversarioSimbolo)) {
            console.log('bloqueando adversario')
            campoSelecionado = campoQueFuncaoEscolheuMarcar //var vindo da fun????o ha cheque
        } else if (
            //Jogada nas bordas
            matrizJogo[0] === 0 &&
            matrizJogo[1] === 0 &&
            matrizJogo[2] === 0 &&
            matrizJogo[3] === 0 &&
            matrizJogo[4] === 0 &&
            matrizJogo[5] === 0 &&
            matrizJogo[6] === 0 &&
            matrizJogo[7] === 0 &&
            matrizJogo[8] === 0
        ) {
            console.log('Selecionando qualquer campo na beirada')
            const bordasTabuleiro = [campo1, campo2, campo3, campo4, campo6, campo7, campo8, campo9]
            campoSelecionado = jogarAleatoriamente(bordasTabuleiro)
        } else if (!jaReagiuADiagonalInicialBloqueada && haBloqueioDiagonalInicial(adversarioSimbolo, simbolo)) {
            console.log('bloqueando estrategia da diagonal')
            campoSelecionado = campoQueFuncaoEscolheuMarcar
        } else if (!jaReagiuADiagonalCurta && haDiagonalCurta(adversarioSimbolo, simbolo)) {
            console.log('bloqueando diagonal curta')
            campoSelecionado = campoQueFuncaoEscolheuMarcar
        } else if (haGambitoDoCanto(adversarioSimbolo, simbolo)) {
            console.log('bloqueando Gambito do canto')
            campoSelecionado = campoQueFuncaoEscolheuMarcar
        } else if (
            matrizJogo[4] === adversarioSimbolo &&
            matrizJogo[0] === 0 &&
            matrizJogo[2] === 0 &&
            matrizJogo[6] === 0 &&
            matrizJogo[8] === 0
        ) {
            console.log('Selecionando qualquer ponta')
                //jogada nas pontas
            const pontasTabuleiro = [campo1, campo3, campo7, campo9]
            campoSelecionado = jogarAleatoriamente(pontasTabuleiro)
        } else if (matrizJogo[4] === 0) {
            console.log('marcando no meio')
            campoSelecionado = campo5
        } else if (haCaminhoLivre(simbolo)) {
            console.log('usando caminho livre')
            campoSelecionado = campoQueFuncaoEscolheuMarcar //var vindo da fun????o haCaminhoLivre
        } else {
            console.log('jogada aleatoria')
            campoSelecionado = jogarAleatoriamente(camposVagos)
        }
    }

    const indexDoCampo = resgatarIndexDoCampoEmMatrizJogo(campoSelecionado)
    criarDelay(campoSelecionado, indexDoCampo, simbolo, adversarioSimbolo, eX)
}

function aplicarPrimeiraJogadaMaquina() {
    aplicarJogadaDaMaquina('fantasma', 'x')
}