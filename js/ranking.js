'use strict'

function atualizarTabelaRanking() {
    let matrizJogadores = JSON.parse(localStorage.getItem('matrizJogadores'))

    rankingCampoJogadores.innerHTML = ''

    let contador = 1
    matrizJogadores.forEach((jogador) => {
        const cadaLinha = document.createElement('tr')

        cadaLinha.className =
            contador > 3 ? '' : contador === 3 ? 'fonte-bronzeada' : contador === 2 ? 'fonte-prateada' : 'fonte-dourada'

        cadaLinha.innerHTML = `
        <td>
            ${contador}°
        </td>
        <td>
            Nome: ${jogador.nome}
            </br></br>
            Fácil: ${jogador.pontosFacil}
            </br></br>
            Médio: ${jogador.pontosMedio}
            </br></br>
            Difícil: ${jogador.pontosDificil}
        </td>`
        contador++

        rankingCampoJogadores.appendChild(cadaLinha)
    })
}