"use strict"

//** INICIO --> USO DO EVENT LISTENER **//

modosDeJogo.addEventListener('input', desabilitarDificuldadeDaMaquina)

//** FIM --> USO DO EVENT LISTENER **//

desabilitarDificuldadeDaMaquina()
    //Função chamada para o caso de a página carregar com jogador vs jogador habilitado


//** INICIO --> FUNÇÕES **//

const inserirElemento =
    (campoSelecionado, elementoInserido) => campoSelecionado.innerHTML =
    `<img src="./img/${elementoInserido}.png" alt="${elementoInserido}">`

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
        [matrizJogo[2], matrizJogo[4], matrizJogo[6]]
    ]
}

const atualizarCamposVagos = () =>
    camposVagos = camposVagos.filter(retornarCamposVazios)

const passarAVez = (simboloVezDe) => EAVezDe.innerHTML = `É a vez de <br>"${simboloVezDe}"`

function checarSeOJogoAcabou() {
    return vencedorDaPartida = verSeGanhou('x') ? 'x' :
        verSeGanhou('fantasma') ? 'fantasma' :
        verSeEmpatou() ? 'empate' :
        0
}

function exibirReta() {
    retaVitoria.style.display = "flex"

    if (vencedorDaPartida !== 0 && vencedorDaPartida == 'x') {

        retaVitoria.src =
            `./img/retaVitoriaX.png`

    } else {
        retaVitoria.src =
            `./img/retaVitoriaFantasma.png`
    }

    if (indiceRetaVencedora === 0) {
        retaVitoria.classList.add("reta-horizontal", "primeira-horizontal")
        retaVitoria.classList.remove("reta-horizontal", "meio-horizontal")
        retaVitoria.classList.remove("reta-horizontal", "ultima-horizontal")
        retaVitoria.classList.remove("reta-vertical", "primeira-vertical")
        retaVitoria.classList.remove("reta-vertical", "meio-vertical")
        retaVitoria.classList.remove("reta-vertical", "ultima-vertical")
        retaVitoria.classList.remove("reta-diagonal", "diagonal-inicio")
        retaVitoria.classList.remove("reta-diagonal", "diagonal-fim")
    } else if (indiceRetaVencedora === 1) {
        retaVitoria.classList.add("reta-horizontal", "meio-horizontal")
        retaVitoria.classList.remove("reta-horizontal", "primeira-horizontal")
        retaVitoria.classList.remove("reta-horizontal", "ultima-horizontal")
        retaVitoria.classList.remove("reta-vertical", "primeira-vertical")
        retaVitoria.classList.remove("reta-vertical", "meio-vertical")
        retaVitoria.classList.remove("reta-vertical", "ultima-vertical")
        retaVitoria.classList.remove("reta-diagonal", "diagonal-inicio")
        retaVitoria.classList.remove("reta-diagonal", "diagonal-fim")
    } else if (indiceRetaVencedora === 2) {
        retaVitoria.classList.add("reta-horizontal", "ultima-horizontal")
        retaVitoria.classList.remove("reta-horizontal", "meio-horizontal")
        retaVitoria.classList.remove("reta-horizontal", "primeira-horizontal")
        retaVitoria.classList.remove("reta-vertical", "primeira-vertical")
        retaVitoria.classList.remove("reta-vertical", "meio-vertical")
        retaVitoria.classList.remove("reta-vertical", "ultima-vertical")
        retaVitoria.classList.remove("reta-diagonal", "diagonal-inicio")
        retaVitoria.classList.remove("reta-diagonal", "diagonal-fim")

    } else if (indiceRetaVencedora === 3) {
        retaVitoria.classList.add("reta-vertical", "primeira-vertical")
        retaVitoria.classList.remove("reta-horizontal", "ultima-horizontal")
        retaVitoria.classList.remove("reta-vertical", "meio-vertical")
        retaVitoria.classList.remove("reta-vertical", "ultima-vertical")
        retaVitoria.classList.remove("reta-horizontal", "primeira-horizontal")
        retaVitoria.classList.remove("reta-horizontal", "meio-horizontal")

        retaVitoria.classList.remove("reta-diagonal", "diagonal-inicio")
        retaVitoria.classList.remove("reta-diagonal", "diagonal-fim")
    } else if (indiceRetaVencedora === 4) {
        retaVitoria.classList.add("reta-vertical", "meio-vertical")
    } else if (indiceRetaVencedora === 5) {
        retaVitoria.classList.add("reta-vertical", "ultima-vertical")
    } else if (indiceRetaVencedora === 6) {
        retaVitoria.classList.add("reta-diagonal", "diagonal-inicio")
    } else if (indiceRetaVencedora === 7) {
        retaVitoria.classList.add("reta-diagonal", "diagonal-fim")
    }
}

function exibirResultado() {

    let mensagem
    if (vencedorDaPartida !== 0) {

        if (vencedorDaPartida === 'empate') {
            mensagem = `O jogo está empatado!`
        } else {
            mensagem = `"${vencedorDaPartida}" venceu!`
        }

        exibirReta()

        escreverResultado(mensagem)
        abrirModalResultado()
    }
}

function desabilitarDificuldadeDaMaquina() {
    if (modosDeJogo.value == "jvsj") {
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

const resetarCadaCampo = (cadaCampo, contador) => cadaCampo[contador].innerHTML = ''

function aplicarAlteracoesConfig() {
    modoDeJogoSelecionado = modosDeJogo.value
    xSera = document.getElementById("xSera").value
    dificuldadeDaMaquinaSelecionada = dificuldadeDaMaquina.value

    resetarJogo()
}

function limparTabuleiro() {
    for (var contador = cadaCampo.length - 1; contador >= 0; contador--) {
        resetarCadaCampo(cadaCampo, contador)
    }
}

const resetarMatrizJogo = () => {
    matrizJogo = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ]

    possibilidadesVitoriaMatriz = [
        [matrizJogo[0], matrizJogo[1], matrizJogo[2]],
        [matrizJogo[3], matrizJogo[4], matrizJogo[5]],
        [matrizJogo[6], matrizJogo[7], matrizJogo[8]],

        [matrizJogo[0], matrizJogo[3], matrizJogo[6]],
        [matrizJogo[1], matrizJogo[4], matrizJogo[7]],
        [matrizJogo[2], matrizJogo[5], matrizJogo[8]],

        [matrizJogo[0], matrizJogo[4], matrizJogo[8]],
        [matrizJogo[2], matrizJogo[4], matrizJogo[6]]
    ]
}

const resetarCamposVagos = () => camposVagos = [
    campo1, campo2, campo3,
    campo4, campo5, campo6,
    campo7, campo8, campo9
]

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

    retaVitoria.style.display = "none"

}

const encontrouSimbolo = () =>
    simboloEncontrado += simboloJogador === cadaCampo && 1

function verSeGanhou(simboloJogador) {

    let contadorSimbolo = 0
    possibilidadesVitoriaMatriz.forEach((cadaReta, indiceCadaReta) => {

        if (contadorSimbolo < 3) {
            contadorSimbolo = 0
            cadaReta.forEach(cadaCampo => {
                contadorSimbolo += simboloJogador === cadaCampo && 1
                contadorSimbolo === 3 ? indiceRetaVencedora = indiceCadaReta : false

            });
        }
    });

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