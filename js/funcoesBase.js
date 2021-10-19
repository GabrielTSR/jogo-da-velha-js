'use strict'

//** INICIO --> USO DO EVENT LISTENER **//

modosDeJogo.addEventListener('input', desabilitarDificuldadeDaMaquina)

//** FIM --> USO DO EVENT LISTENER **//

desabilitarDificuldadeDaMaquina()
//Função chamada para o caso de a página carregar com jogador vs jogador habilitado

//** INICIO --> FUNÇÕES **//

const inserirElemento = (campoSelecionado, elementoInserido) =>
    (campoSelecionado.innerHTML = `<img src="./img/${elementoInserido}.png" alt="${elementoInserido}">`)

const atualizarMatrizJogo = (indice, simbolo) => {
    matrizJogo[indice] = simbolo

    possibilidadesVitoriaMatriz = [
        [matrizJogo[0], matrizJogo[1], matrizJogo[2]],
        [matrizJogo[3], matrizJogo[4], matrizJogo[5]],
        [matrizJogo[6], matrizJogo[7], matrizJogo[8]],
        [matrizJogo[0], matrizJogo[3], matrizJogo[6]],
        [matrizJogo[1], matrizJogo[4], matrizJogo[7]],
        [matrizJogo[2], matrizJogo[5], matrizJogo[8]],
        [matrizJogo[0], matrizJogo[4], matrizJogo[8]],
        [matrizJogo[2], matrizJogo[4], matrizJogo[6]],
    ]
}

const atualizarCamposVagos = () => (camposVagos = camposVagos.filter(retornarCamposVazios))

const passarAVez = (simboloVezDe) => (EAVezDe.innerHTML = `É a vez de <br>"${simboloVezDe}"`)

function checarSeOJogoAcabou() {
    return (vencedorDaPartida = verSeGanhou('x')
        ? 'x'
        : verSeGanhou('fantasma')
        ? 'fantasma'
        : verSeEmpatou()
        ? 'empate'
        : 0)
}

function exibirReta() {
    retaVitoria.style.transition = 'width 1s ease-in-out'
    if (vencedorDaPartida === 'x') {
        retaVitoria.style.backgroundColor = '#BD00FF'
    } else {
        retaVitoria.style.backgroundColor = '#FF0000'
    }

    switch (indiceRetaVencedora) {
        case 0:
            retaVitoria.className = 'reta-horizontal primeira-horizontal'
            break

        case 1:
            retaVitoria.className = 'reta-horizontal'
            break

        case 2:
            retaVitoria.className = 'reta-horizontal ultima-horizontal'
            break

        case 3:
            retaVitoria.className = 'reta-vertical primeira-vertical'
            break

        case 4:
            retaVitoria.className = 'reta-vertical'
            break

        case 5:
            retaVitoria.className = 'reta-vertical ultima-vertical'
            break

        case 6:
            retaVitoria.className = 'reta-diagonal diagonal-inicio'
            break

        default:
            retaVitoria.className = 'reta-diagonal diagonal-fim'
            break
    }
    if (retaVitoria.classList.contains('reta-diagonal')) {
        retaVitoria.style.width = '130%'
    } else {
        retaVitoria.style.width = '100%'
    }
}

function exibirResultado() {
    if (vencedorDaPartida !== 0) {
        if (vencedorDaPartida === 'empate') {
            mensagem = `O jogo está empatado!`
            escreverResultado(mensagem)
            abrirModalResultado()
        } else {
            mensagem = `"${vencedorDaPartida}" venceu!`
            atrasarExibicaoResultado()
        }
    }
}

function atrasarExibicaoResultado() {
    exibirReta()

    setTimeout(function () {
        escreverResultado(mensagem)
        abrirModalResultado()
    }, 1100)
}

function desabilitarDificuldadeDaMaquina() {
    if (modosDeJogo.value == 'jvsj') {
        dificuldadeDaMaquina.disabled = true
    } else {
        dificuldadeDaMaquina.disabled = false
    }
}

function retornarCamposVazios(campo) {
    if (campoEstaVazio(campo)) {
        return campo
    }
}

const resetarCadaCampo = (cadaCampo, contador) => (cadaCampo[contador].innerHTML = '')

function aplicarAlteracoesConfig() {
    modoDeJogoSelecionado = modosDeJogo.value
    xSera = document.getElementById('xSera').value
    dificuldadeDaMaquinaSelecionada = dificuldadeDaMaquina.value

    resetarJogo()
}

function limparTabuleiro() {
    for (var contador = cadaCampo.length - 1; contador >= 0; contador--) {
        resetarCadaCampo(cadaCampo, contador)
    }
}

const resetarMatrizJogo = () => {
    matrizJogo = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    possibilidadesVitoriaMatriz = [
        [matrizJogo[0], matrizJogo[1], matrizJogo[2]],
        [matrizJogo[3], matrizJogo[4], matrizJogo[5]],
        [matrizJogo[6], matrizJogo[7], matrizJogo[8]],

        [matrizJogo[0], matrizJogo[3], matrizJogo[6]],
        [matrizJogo[1], matrizJogo[4], matrizJogo[7]],
        [matrizJogo[2], matrizJogo[5], matrizJogo[8]],

        [matrizJogo[0], matrizJogo[4], matrizJogo[8]],
        [matrizJogo[2], matrizJogo[4], matrizJogo[6]],
    ]
}

const resetarCamposVagos = () =>
    (camposVagos = [campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9])

const fecharModal = () => window.location.replace('#')

const maquinaComeca = () => xSera === 'outro'

function resetarJogo() {
    tagDaDivulgacao.innerText = 'Jogo inacabado'

    EAVezDe.innerHTML = 'É a vez de <br>"X"'

    resetarMatrizJogo()

    resetarCamposVagos()

    vencedorDaPartida = 0

    eX = true

    limparTabuleiro()

    fecharModal()

    maquinaComeca() && maquinaPodeJogar() ? aplicarPrimeiraJogadaMaquina() : false

    retaVitoria.style.transition = ''
    retaVitoria.className = ''
    retaVitoria.style.width = '0'
}

const encontrouSimbolo = () => (simboloEncontrado += simboloJogador === cadaCampo && 1)

function verSeGanhou(simboloJogador) {
    let contadorSimbolo = 0
    possibilidadesVitoriaMatriz.forEach((cadaReta, indiceCadaReta) => {
        if (contadorSimbolo < 3) {
            contadorSimbolo = 0
            cadaReta.forEach((cadaCampo) => {
                contadorSimbolo += simboloJogador === cadaCampo && 1
                contadorSimbolo === 3 ? (indiceRetaVencedora = indiceCadaReta) : false
            })
        }
    })

    if (contadorSimbolo === 3) {
        return true
    } else {
        return false
    }
}

function verSeEmpatou() {
    return camposVagos.length === 0 ? true : false
}

const escreverResultado = (mensagem) => {
    tagDaDivulgacao.innerText = mensagem
    EAVezDe.innerText = mensagem
}

const abrirModalResultado = () => window.location.replace('#resultado-container')

function aplicarJogada(campoSelecionado, indice, simbolo, adversarioSimbolo) {
    inserirElemento(campoSelecionado, simbolo)
    atualizarMatrizJogo(indice, simbolo)
    atualizarCamposVagos()
    eX = !eX
    passarAVez(adversarioSimbolo)
    checarSeOJogoAcabou()
    exibirResultado()
}
