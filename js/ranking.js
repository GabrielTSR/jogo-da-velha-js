'use strict'

let contadorRanking = 0

const atualizarTabelaRanking = async() => {
    const matrizJogadores = await resgatarMatrizJogadores()

    if (!eNulo(matrizJogadores)) {
        rankingCampoJogadores.innerHTML = ''

        let matrizTop25Jogadores = []
        for (let contador = 0; contador <= 24; contador++) {
            if (matrizJogadores[contador] !== undefined) matrizTop25Jogadores[contador] = matrizJogadores[contador]
            else break
        }

        contadorRanking = 1
        matrizTop25Jogadores.forEach(edificandoLinhasRanking)
    }

    return false
}

function edificandoLinhasRanking(jogador) {
    const cadaLinha = document.createElement('tr')

    cadaLinha.innerHTML = `
        <td>
            ${contadorRanking}°
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

    cadaLinha.className =
        contadorRanking > 3 ?
        '' :
        contadorRanking === 3 ?
        'fonte-bronzeada' :
        contadorRanking === 2 ?
        'fonte-prateada' :
        'fonte-dourada'

    contadorRanking++

    rankingCampoJogadores.appendChild(cadaLinha)
}