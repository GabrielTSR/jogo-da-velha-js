'use strict'

const inputNome = document.getElementById('input-nome')
const inputSenha = document.getElementById('input-senha')
const inputSenhaConfirmacao = document.getElementById('input-senha-confirmacao')
let nomeJogador = ''
let senhaJogador = ''

let houveNomeRepetido = false

let loginFoiRealizado = false

const escreverSaudacoes = (nomeJogador) => (textoSaudacoes.innerText = `Olá! ${nomeJogador}`)

const erroContainer = document.getElementById('erros-container')

function validarCadastro(nomeJogador, senha, senhaConfirmacao) {
    erroContainer.innerHTML = ''

    let cadastroEValido = true
    if (!campoFoiPreenchido(nomeJogador)) {
        cadastroEValido = false
    }
    if (!campoFoiPreenchido(senha)) {
        cadastroEValido = false
    }
    if (!campoFoiPreenchido(senhaConfirmacao)) {
        cadastroEValido = false
    }
    if (!nomeUltrapassa10Caracteres(nomeJogador.value)) {
        cadastroEValido = false
    }

    if (!senhasCoincidem(senha.value, senhaConfirmacao.value)) {
        cadastroEValido = false
    }

    return cadastroEValido
}

function validarLogin(nomeJogador, senha) {
    erroContainer.innerHTML = ''

    let cadastroEValido = true
    if (!campoFoiPreenchido(nomeJogador)) {
        cadastroEValido = false
    }
    if (!campoFoiPreenchido(senha)) {
        cadastroEValido = false
    }

    return cadastroEValido
}

function nomeUltrapassa10Caracteres(nomeJogador) {
    let erroEncontrado = ''

    if (nomeJogador.length > 10) {
        erroEncontrado = document.createElement('li')
        erroEncontrado.classList.add('texto-erro')
        erroEncontrado.innerHTML = `O nome não pode ultrapassar 10 dígitos. <br/><br/>`

        erroContainer.appendChild(erroEncontrado)
        return false
    }
    return true
}

const senhasCoincidem = (senha, senhaConfirmacao) => {
    let erroEncontrado = ''

    if (senha !== senhaConfirmacao) {
        erroEncontrado = document.createElement('li')
        erroEncontrado.classList.add('texto-erro')
        erroEncontrado.innerHTML = `As senhas devem ser iguais. <br/><br/>`

        erroContainer.appendChild(erroEncontrado)
        return false
    }
    return true
}

function campoFoiPreenchido(campo) {
    let erroEncontrado = ''

    if (campo.value.trim() === '') {
        erroEncontrado = document.createElement('li')
        erroEncontrado.classList.add('texto-erro')
        erroEncontrado.innerHTML = `"${campo.placeholder}" deve ser preenchido. <br/><br/>`

        erroContainer.appendChild(erroEncontrado)

        return false
    }

    return true
}

function esseNomeJaExiste() {
    let matrizJogadores = []
        //Apenas foi declarada com um valor abstrato, a função checará se está vazia pelo local storage

    if (matrizJogadoresEstaVazia()) {
        matrizJogadores = criarMatrizJogadores()
        return false
    } else {
        matrizJogadores = JSON.parse(localStorage.getItem('matrizJogadores'))

        houveNomeRepetido = false
        matrizJogadores.forEach(verificarSeNomeExiste)

        if (houveNomeRepetido) {
            let erroEncontrado = ''

            erroEncontrado = document.createElement('li')
            erroEncontrado.classList.add('texto-erro')
            erroEncontrado.innerHTML = `"${nomeJogador}" já está sendo utilizado. <br/><br/>`

            erroContainer.appendChild(erroEncontrado)

            return true
        }
        return false
    }
}

function cadastrarJogador() {
    nomeJogador = inputNome.value
    senhaJogador = inputSenha.value

    if (validarCadastro(inputNome, inputSenha, inputSenhaConfirmacao) && !esseNomeJaExiste(inputNome.value)) {
        const novoJogador = criarNovoJogador()
        inserirNovoJogadorNaMatriz(novoJogador)

        window.location.replace('../index.html')
    }
}

function realizarLogin() {
    nomeJogador = inputNome.value
    senhaJogador = inputSenha.value

    if (validarLogin(inputNome, inputSenha)) {
        if (resgatarJogadorDaMatriz()) {
            escreverSaudacoes(nomeJogador)
            atualizarTabelaRanking()
            fecharModal()
        } else {
            divulgarSenhaIncorreta()
        }
    }
}

function divulgarSenhaIncorreta() {
    let erroEncontrado = ''

    erroEncontrado = document.createElement('li')
    erroEncontrado.classList.add('texto-erro')
    erroEncontrado.innerHTML = `O nome de usuário ou senha estão incorretos! <br/><br/>`

    erroContainer.appendChild(erroEncontrado)

    return true
}

function inserirNovoJogadorNaMatriz(novoJogador) {
    let matrizJogadores = JSON.parse(localStorage.getItem('matrizJogadores'))

    matrizJogadores.push(novoJogador)
    localStorage.setItem('matrizJogadores', JSON.stringify(matrizJogadores))
}

function criarNovoJogador() {
    const novoJogador = new Object()
    novoJogador.nome = nomeJogador
    novoJogador.senha = senhaJogador
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
    return matrizJogadores
}

const matrizJogadoresEstaVazia = () => JSON.parse(localStorage.getItem('matrizJogadores')) === null

function criarObjetoJogador() {}

function resgatarJogadorDaMatriz() {
    const matrizJogadores = JSON.parse(localStorage.getItem('matrizJogadores'))

    loginFoiRealizado = false

    matrizJogadores.forEach(verificarSeNomeExisteEAtribuir)

    return loginFoiRealizado
}

function verificarSeNomeExisteEAtribuir(jogador) {
    if (
        jogador.nome.toLowerCase() === nomeJogador.toLowerCase() &&
        jogador.senha.toLowerCase() === senhaJogador.toLowerCase()
    ) {
        localStorage.setItem('jogadorAtual', JSON.stringify(jogador))
        return (loginFoiRealizado = true)
    }
}

function verificarSeNomeExiste(jogador) {
    if (jogador.nome.toLowerCase() === nomeJogador.toLowerCase()) {
        houveNomeRepetido = true
        return true
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
        jogadorComMenosPontos.pontosFacil + jogadorComMenosPontos.pontosMedio + jogadorComMenosPontos.pontosDificil

    const totalJogadorMaisPontos =
        jogadorComMaisPontos.pontosFacil + jogadorComMaisPontos.pontosMedio + jogadorComMaisPontos.pontosDificil

    return totalJogadorMenosPontos - totalJogadorMaisPontos
}

function limparDadosJogador() {
    localStorage.removeItem('jogadorAtual')

    textoSaudacoes.innerText = 'Olá!'
}