'use strict'

const inputNome = document.getElementById('input-nome')
const inputSenha = document.getElementById('input-senha')
const inputSenhaConfirmacao = document.getElementById('input-senha-confirmacao')
let jogadorLogado = JSON.parse(localStorage.getItem('jogadorAtual'))
let nomeJogador = ''
let senhaJogador = ''

let houveNomeRepetido = false

let loginFoiRealizado = false

const escreverSaudacoes = (nomeJogador) => {
    if (!eNulo(textoSaudacoes)) {
        textoSaudacoes.innerText = `Olá! ${nomeJogador}`
    }
}

const erroContainer = document.getElementById('erros-container')

const eNulo = (elemento) => elemento === null

function validarCadastro(nomeJogador, senha, senhaConfirmacao) {
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

const esseNomeJaExiste = async() => {
    const matrizJogadores = await resgatarMatrizJogadores()
    erroContainer.innerHTML = ''

    houveNomeRepetido = false
    matrizJogadores.forEach(await verificarSeNomeExiste)

    if (houveNomeRepetido) {
        const mensagemErro = `"${nomeJogador}" já está sendo utilizado. <br/><br/>`
        acrescentarTopicoErro(mensagemErro)

        houveNomeRepetido = true
    }
    return houveNomeRepetido
}

async function validarEAplicarCadastro() {
    if (validarCadastro(inputNome, inputSenha, inputSenhaConfirmacao) && !houveNomeRepetido) {
        createJogadorNaMatriz(criarNovoJogador())
    }
}

function cadastrarJogador() {
    nomeJogador = inputNome.value
    senhaJogador = inputSenha.value

        !esseNomeJaExiste(inputNome.value).then(validarEAplicarCadastro)
}

async function realizarLogin() {
    if (!eNulo(textoSaudacoes)) {
        if (!eNulo(jogadorLogado)) {
            nomeJogador = jogadorLogado.nome
            senhaJogador = jogadorLogado.senha
            escreverSaudacoes(nomeJogador)
            fecharModal()
            return true
        } else {
            nomeJogador = inputNome.value
            senhaJogador = inputSenha.value
        }

        if (validarLogin(inputNome, inputSenha)) {
            if (await resgatarJogadorDaMatriz()) {
                escreverSaudacoes(nomeJogador)
                fecharModal()
                return true
            } else {
                const mensagemErro = `O nome de usuário ou senha está incorreto! <br/><br/>`
                acrescentarTopicoErro(mensagemErro)
                return false
            }
        }
    }
}

if (!eNulo(jogadorLogado) && !eNulo(textoSaudacoes)) {
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

async function inserirNovoJogadorNaMatriz(novoJogador) {
    let matrizJogadores = await resgatarMatrizJogadores()

    matrizJogadores.push(novoJogador)

    createJogador(aluno)
}

function criarNovoJogador() {
    const novoJogador = {
        nome: nomeJogador,
        senha: senhaJogador,
        pontosFacil: 0,
        pontosMedio: 0,
        pontosDificil: 0,
    }

    localStorage.setItem('jogadorAtual', JSON.stringify(novoJogador))
    jogadorLogado = JSON.parse(localStorage.getItem('jogadorAtual'))

    return novoJogador
}

function criarObjetoJogador() {}

const resgatarJogadorDaMatriz = async() => {
    const matrizJogadores = await resgatarMatrizJogadores()

    loginFoiRealizado = false

    matrizJogadores.forEach(verificarSeNomeExisteEAtribuir)

    return loginFoiRealizado
}

function verificarSeNomeExisteEAtribuir(jogador) {
    if (jogador.nome.toLowerCase() === nomeJogador.toLowerCase() && jogador.senha === senhaJogador) {
        localStorage.setItem('jogadorAtual', JSON.stringify(jogador))
        jogadorLogado = JSON.parse(localStorage.getItem('jogadorAtual'))

        loginFoiRealizado = true
        return loginFoiRealizado
    }
}

function verificarSeNomeExiste(jogador) {
    if ((jogador.nome !== undefined && jogador.nome.toLowerCase()) === nomeJogador.toLowerCase()) {
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
    updateJogador(jogadorLogado)
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