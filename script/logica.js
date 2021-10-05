"use strict"

//**Pegar os elementos**/
const cadaCampo = document.querySelector(".cada-campo")
const campo = []
var eJogadorIncial = true //true para primeiro jogador, false para segundo jogador

const campoEstaVazio = (campo) => campo.children.length == 0


function inserirOpcao(campo) {
    const campoSelecionado = document.getElementById(campo)

    console.log("qqqqq", campoSelecionado.children.length)

    if (eJogadorIncial && campoEstaVazio(campo)) {
        campoSelecionado.innerHTML = `<img src="./img/x.png" alt="">`
        eJogadorIncial = false
    } else if (!eJogadorIncial && campoEstaVazio(campo)) {
        campoSelecionado.innerHTML = `<img src="./img/fantasma.png" alt="">`
        eJogadorIncial = true
    }
}