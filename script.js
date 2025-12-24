const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const startPauseBt = document.querySelector('#start-pause')
const imagePlayPause = document.querySelector('#start-pause img')
const tempoNaTela = document.querySelector('#timer')
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/sons/beep.mp3')
const imagePlay = ('/imagens/play_arrow.png')
const imagePause = ('/imagens/pause.png')

let tempoDecorridoEmSegundos = 1500 // 25 minutos
let intervaloContagemRegresiva = null

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.loop = true
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500 // 25 minutos
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300 // 5 minutos
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900 // 15 minutos
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempoNaTela()
    botoes.forEach((botao) => {
        botao.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto) // Alterar atributo data-contexto no elemento <html>
    banner.setAttribute('src', `/imagens/${contexto}.png`)// o src é alterado conforme o contexto
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = 'Otimize sua produtividade,\nmergulhe no que importa'
            break
        case 'descanso-curto':
            titulo.innerHTML = 'Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>'
            break
        case 'descanso-longo':
            titulo.innerHTML = 'Hora de voltar à superfície.<br> <strong class="app__title-strong">Faça uma pausa longa.</strong>'
            break
        default:
            break
    }
}

const contagemRegresiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempoNaTela()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloContagemRegresiva) {
        audioPausa.play()
        imagePlayPause.src = imagePlay
        zerar()
        return
    }
    audioPlay.play()
    imagePlayPause.src = imagePause
    intervaloContagemRegresiva = setInterval(contagemRegresiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
}

function zerar() {
    clearInterval(intervaloContagemRegresiva)
    iniciarOuPausarBt.textContent = 'Começar'
    intervaloContagemRegresiva = null
}

function mostrarTempoNaTela() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit'
    })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempoNaTela()
