// CRUD (Create, Read, Update, Delete) operations for the Pomodoro timer application
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formeAdicionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const urlTarefas = document.querySelector('.app__section-task-list') // lista onde as tarefas serão exibidas

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [] // recupera as tarefas do localStorage ou inicializa um array vazio


function criarElementoTarefa(tarefa) {
    const li = document.createElement('li') // cria um elemento de lista
    li.classList.add('app__section-task-list-item') // adiciona a classe CSS ao elemento de lista
    
    const svg = document.createElement('svg')// cria um elemento SVG para o ícone de tarefa
    svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle app__icon--task" viewBox="0 0 16 16">
    <path d="M2.5 8a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0zm5.354-2.354a.5.5 0 0 0-.708-.708L5.5 7.793 4.854 7.146a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l3-3z"/>
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z"/>
  </svg>`

  const paragrafo = document.createElement('p') // cria um elemento de parágrafo para a descrição da tarefa
  paragrafo.textContent = tarefa.descricao // define o texto do parágrafo como a descrição da tarefa
  paragrafo.classList.add('app__section-task-list-item-description') // adiciona a classe CSS ao parágrafo

  const botao = document.createElement('button') // cria um botão para marcar a tarefa como concluída
  botao.classList.add('app_button-edit') // adiciona a classe CSS ao botão

  const imgDoBotao = document.createElement('img') // cria uma imagem para o botão

  imgDoBotao.setAttribute('src', './imagens/edit.png') // define o atributo src da imagem
  botao.appendChild(imgDoBotao) // adiciona a imagem ao botão

  li.append(paragrafo, svg, botao) // adiciona o parágrafo, o SVG e o botão ao elemento de lista
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
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) // salva o array de tarefas no localStorage
    textArea.value = '' // limpa o textarea
    formeAdicionarTarefa.classList.add('hidden') // esconde o formulário após adicionar a tarefa
})

tarefas.forEach(tarefa => {
   const elementoTarefa = criarElementoTarefa(tarefa)// cria o elemento de tarefa
    urlTarefas.append(elementoTarefa) // adiciona o elemento de tarefa à lista de tarefas na interface
});
