// CRUD (Create, Read, Update, Delete) operations for the Pomodoro timer application
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formeAdicionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const urlTarefas = document.querySelector('.app__section-task-list') // lista onde as tarefas serão exibidas
const paragrafoDaDescricaoTarefa = document.querySelector('.app__section-active-task-description')
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [] // recupera as tarefas do localStorage ou inicializa um array vazio

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')

let tarefaSelecionada = null // variável para rastrear a tarefa atualmente selecionada
let liTarefaSelecionada = null // variável para rastrear o elemento de lista da tarefa selecionada
function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) // salva o array de tarefas no localStorage
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li') // cria um elemento de lista
    li.classList.add('app__section-task-list-item') // adiciona a classe CSS ao elemento de lista
    
    const svg = document.createElement('svg')// cria um elemento SVG para o ícone de tarefa
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>` // define o conteúdo SVG para o ícone de tarefa concluída

  const paragrafo = document.createElement('p') // cria um elemento de parágrafo para a descrição da tarefa.
  paragrafo.textContent = tarefa.descricao // define o texto do parágrafo como a descrição da tarefa
  paragrafo.classList.add('app__section-task-list-item-description') // adiciona a classe CSS ao parágrafo

  const botao = document.createElement('button') // cria um botão para marcar a tarefa como concluída
  botao.classList.add('app_button-edit') // adiciona a classe CSS ao botão
  botao.onclick = () => {
    //debugger
    const novaDescricao = prompt('Qual é o nome da tarefa?', tarefa.descricao) // exibe um prompt para editar a descrição da tarefa
    //console.log("nova Descricao da tarefa" + novaDescricao);
    if (novaDescricao) {
        paragrafo.textContent = novaDescricao // atualiza o texto do parágrafo com a nova descrição
        tarefa.descricao = novaDescricao // atualiza a descrição da tarefa no objeto
        atualizarTarefas() // salva as alterações no localStorage
    }
  }

  const imgDoBotao = document.createElement('img') // cria uma imagem para o botão

  imgDoBotao.setAttribute('src', './imagens/edit.png') // define o atributo src da imagem
  botao.appendChild(imgDoBotao) // adiciona a imagem ao botão

  li.append(paragrafo, svg, botao) // adiciona o parágrafo, o SVG e o botão ao elemento de lista

  if (tarefa.completa) {
    li.classList.add('app__section-task-list-item-complete')// adiciona a classe CSS para tarefas concluídas
    botao.setAttribute('disabled', 'dissabled')// desabilita o botão de edição para tarefas concluídas
  } else {
      li.onclick = () => {
      const itensAtivos = document.querySelectorAll('.app__section-task-list-item-active') // seleciona todos os itens ativos
      itensAtivos.forEach(item => item.classList.remove('app__section-task-list-item-active')) // remove a classe de todos os itens ativos
      if (tarefaSelecionada == tarefa) {
        paragrafoDaDescricaoTarefa.textContent = '' // limpa a descrição da tarefa ativa na interface
        tarefaSelecionada = null // desmarca a tarefa ativa
        liTarefaSelecionada = null // limpa o elemento de lista da tarefa ativa
        return
      }
      tarefaSelecionada = tarefa // marca a tarefa como ativa
      liTarefaSelecionada = li // armazena o elemento de lista da tarefa ativa
      paragrafoDaDescricaoTarefa.textContent = tarefa.descricao // atualiza a descrição da tarefa ativa na interface
      li.classList.add('app__section-task-list-item-active') // adiciona a classe CSS para destacar a tarefa ativa
  }
  }

  return li // retorna o elemento de lista criado
}

btnAdicionarTarefa.addEventListener('click', () => {
    formeAdicionarTarefa.classList.toggle('hidden')// mostra ou esconde o formulário
})


formeAdicionarTarefa.addEventListener('submit', (event) => {
    event.preventDefault() // previne o comportamento padrão do formulário (recarregar a página)
    const tarefa = {// cria um objeto tarefa com a descrição e o status
        descricao: textArea.value,// obtém a descrição da tarefa do textarea
        concluida: false // nova tarefa começa como não concluída
    }
    tarefas.push(tarefa) // adiciona a nova tarefa ao array
    const elementoTarefa = criarElementoTarefa(tarefa) // cria o elemento de tarefa
    urlTarefas.append(elementoTarefa) // adiciona o elemento de tarefa à lista de tarefas na interface
    atualizarTarefas() // salva o array atualizado no localStorage
    textArea.value = '' // limpa o textarea
    formeAdicionarTarefa.classList.add('hidden') // esconde o formulário após adicionar a tarefa
})

tarefas.forEach(tarefa => {
   const elementoTarefa = criarElementoTarefa(tarefa)// cria o elemento de tarefa
    urlTarefas.append(elementoTarefa) // adiciona o elemento de tarefa à lista de tarefas na interface
});

document.addEventListener('focoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'dissabled')
        tarefaSelecionada.completa = true
        atualizarTarefas()
    }
})

const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => tarefa.completa) : tarefas.filter(tarefa => !tarefa.completa)
    atualizarTarefas()
}

btnRemoverConcluidas.onclick = () => removerTarefas(true)
btnRemoverTodas.onclick = () => removerTarefas(false)
