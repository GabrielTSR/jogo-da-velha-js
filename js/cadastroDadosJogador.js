'use strict'

const inputNome = document.getElementById('input-nome')
const inputSenha = document.getElementById('input-senha')
const inputSenhaConfirmacao = document.getElementById('input-senha-confirmacao')
let nomeJogador = ''
let senhaJogador = ''

let houveNomeRepetido = false

let loginFoiRealizado = false

let jogadorLogado = JSON.parse(localStorage.getItem('jogadorAtual'))

const escreverSaudacoes = (nomeJogador) => (textoSaudacoes.innerText = `Olá! ${nomeJogador}`)

const erroContainer = document.getElementById('erros-container')

const eNulo = (elemento) => elemento === null

function validarCadastro(nomeJogador, senha, senhaConfirmacao) {
    erroContainer.innerHTML = ''

    let cadastroEValido = true
    if (!campoFoiPreenchido(nomeJogador, 'nome')) {
        cadastroEValido = false
    }
    if (!campoFoiPreenchido(senha, 'senha')) {
        cadastroEValido = false
    }
    if (!campoFoiPreenchido(senhaConfirmacao, 'Confirmação de senha')) {
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
    if (!campoFoiPreenchido(nomeJogador, 'nome')) {
        cadastroEValido = false
    }
    if (!campoFoiPreenchido(senha, 'senha')) {
        cadastroEValido = false
    }

    return cadastroEValido
}

function nomeUltrapassa10Caracteres(nomeJogador) {
    let erroEncontrado = ''

    if (nomeJogador.length > 10) {
        const mensagemErro = `O nome não pode ultrapassar 10 dígitos. <br/><br/>`
        acrescentarTopicoErro(mensagemErro)
        return false
    }
    return true
}

const senhasCoincidem = (senha, senhaConfirmacao) => {
    if (senha !== senhaConfirmacao) {
        const mensagemErro = `As senhas devem ser iguais. <br/><br/>`
        acrescentarTopicoErro(mensagemErro)
        return false
    }
    return true
}

function campoFoiPreenchido(campo, nomeDoCampo) {
    if (campo.value.trim() === '') {
        const mensagemErro = `O campo de "${nomeDoCampo}" é obrigatório. <br/><br/>`
        acrescentarTopicoErro(mensagemErro)
        return false
    }

    return true
}

function esseNomeJaExiste() {
    const matrizJogadores = resgatarMatrizJogadores()

    houveNomeRepetido = false
    matrizJogadores.forEach(verificarSeNomeExiste)

    if (houveNomeRepetido) {
        const mensagemErro = `"${nomeJogador}" já está sendo utilizado. <br/><br/>`
        acrescentarTopicoErro(mensagemErro)

        return true
    }
    return false
}

function cadastrarJogador() {
    nomeJogador = inputNome.value
    senhaJogador = inputSenha.value

    if (validarCadastro(inputNome, inputSenha, inputSenhaConfirmacao) && !esseNomeJaExiste(inputNome.value)) {
        console.log('passou da validacao')
        const novoJogador = criarNovoJogador()
        inserirNovoJogadorNaMatriz(novoJogador)

        window.location.replace('../index.html')
    }
}

function realizarLogin() {
    if (!eNulo(jogadorLogado)) {
        nomeJogador = jogadorLogado.nome
        senhaJogador = jogadorLogado.senha
        escreverSaudacoes(nomeJogador)
        atualizarTabelaRanking()
        fecharModal()
        return true
    } else {
        nomeJogador = inputNome.value
        senhaJogador = inputSenha.value
    }

    if (validarLogin(inputNome, inputSenha)) {
        if (resgatarJogadorDaMatriz()) {
            escreverSaudacoes(nomeJogador)
            atualizarTabelaRanking()
            fecharModal()
            return true
        } else {
            const erro = `O nome de usuário ou senha estão incorretos! <br/><br/>`
            acrescentarTopicoErro(mensagemErro)
            return false
        }
    }
}
if (jogadorLogado !== null) {
    realizarLogin()
}

function acrescentarTopicoErro(mensagemErro) {
    let erroEncontrado = ''

    erroEncontrado = document.createElement('li')
    erroEncontrado.classList.add('texto-erro')
    erroEncontrado.innerHTML = mensagemErro

    erroContainer.appendChild(erroEncontrado)

    return true
}

function inserirNovoJogadorNaMatriz(novoJogador) {
    let matrizJogadores = resgatarMatrizJogadores()

    matrizJogadores.push(novoJogador)
    localStorage.setItem('matrizJogadores', JSON.stringify(matrizJogadores))
}

function criarNovoJogador() {
    const matrizJogadores = resgatarMatrizJogadores()

    const novoJogador = new Object()
    novoJogador.id = matrizJogadores.length + 1
    novoJogador.nome = nomeJogador
    novoJogador.senha = senhaJogador
    novoJogador.pontosFacil = 0
    novoJogador.pontosMedio = 0
    novoJogador.pontosDificil = 0

    localStorage.setItem('jogadorAtual', JSON.stringify(novoJogador))
    jogadorLogado = JSON.parse(localStorage.getItem('jogadorAtual'))

    return novoJogador
}

function criarMatrizJogadores() {
    const matrizJogadores = []
    localStorage.setItem('matrizJogadores', JSON.stringify(matrizJogadores))
    return matrizJogadores
}

function criarObjetoJogador() {}

function resgatarJogadorDaMatriz() {
    const matrizJogadores = resgatarMatrizJogadores()

    loginFoiRealizado = false

    matrizJogadores.forEach(verificarSeNomeExisteEAtribuir)

    return loginFoiRealizado
}

function resgatarMatrizJogadores() {
    let matrizJogadores = JSON.parse(localStorage.getItem('matrizJogadores'))

    if (eNulo(matrizJogadores)) {
        matrizJogadores = criarMatrizJogadores()
    }
    return matrizJogadores
}

function verificarSeNomeExisteEAtribuir(jogador) {
    if (
        jogador.nome.toLowerCase() === nomeJogador.toLowerCase() &&
        jogador.senha.toLowerCase() === senhaJogador.toLowerCase()
    ) {
        localStorage.setItem('jogadorAtual', JSON.stringify(jogador))
        jogadorLogado = JSON.parse(localStorage.getItem('jogadorAtual'))

        return (loginFoiRealizado = true)
    }
}

function verificarSeNomeExiste(jogador) {
    if (jogador.nome.toLowerCase() === nomeJogador.toLowerCase()) {
        houveNomeRepetido = true
        return true
    }
}

function alterarPontuacao(situacao) {
    switch (situacao) {
        case 'ganhou do facil':
            jogadorLogado.pontosFacil += 10
            break

        case 'ganhou do medio':
            jogadorLogado.pontosMedio += 40
            break

        case 'ganhou do dificil':
            jogadorLogado.pontosDificil += 1000
            break

        case 'perdeu para o facil':
            jogadorLogado.pontosFacil -= 45
            break

        case 'perdeu para o medio':
            jogadorLogado.pontosMedio -= 20
            break

        case 'perdeu para o dificil':
            jogadorLogado.pontosDificil -= 10
            break

        default:
            return false
    }

    localStorage.setItem('jogadorAtual', JSON.stringify(jogadorLogado))
    atualizarMatrizLocalStorage(jogadorLogado)
    atualizarTabelaRanking()
}

function atualizarMatrizLocalStorage() {
    let matrizJogadores = resgatarMatrizJogadores()

    matrizJogadores.forEach((jogador, indice, matrizJogadores) => {
        if (jogador.nome === jogadorLogado.nome) {
            matrizJogadores[indice] = jogadorLogado
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
    jogadorLogado = null

    textoSaudacoes.innerText = 'Olá!'
}