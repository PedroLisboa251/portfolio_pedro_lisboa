const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLista() {
    const li = document.createElement('li');
    return li;
}

function criaBotaoApagar(li) {
    li.innerHTML += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    // botaoApagar.classList.add('apagar');
    // OU
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Clique aqui para apagar');
    li.appendChild(botaoApagar);
}

function createTask(text) {
    const li = criaLista();
    li.innerHTML = `<span>${text}</span>`;       // <-- aqui
    criaBotaoApagar(tarefas.appendChild(li));
    inputTarefa.focus();
    salvarTarefas();
}

inputTarefa.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        if (!inputTarefa.value) return;
        createTask(inputTarefa.value);
        inputTarefa.value = '';
    }
});

btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    createTask(inputTarefa.value);
    inputTarefa.value = '';
})

document.addEventListener('click', function (event) {
    const el = event.target;

    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
})

function salvarTarefas() {
    const liTarefas = document.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    for (let tarefa of listaDeTarefas) {
        createTask(tarefa);
    }
}

adicionaTarefasSalvas()