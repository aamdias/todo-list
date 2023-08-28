// Adiciona uma nova tarefa na lista de tarefas
const todoListContainer = document.querySelector(".todo-list");
const todoListInput = document.querySelector("#todoInput");
const todoListButton = document.querySelector("#add-button");
const clearButton = document.querySelector("#clear-button");
const todoListPlaceholder = document.querySelector("#todo-list-placeholder");
const pageTitle = document.querySelector("#title");
const currentDate = new Date();

let timerInterval;
let timerRunning = false;

let seconds = 0;
let minutes = 0;

const startTimer = (timerDisplay,startButton,newToDo) => {
    timerInterval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }

        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
    }, 1000);

    timerRunning = true;
    startButton.textContent = 'Pausar';
    newToDo.classList.add('active-todo');
};

const stopTimer = (startButton, newToDo) => {
    clearInterval(timerInterval);

    // Remove the active-todo class from any active ToDo items
    const activeTodos = document.querySelectorAll('.active-todo');
    activeTodos.forEach((todo) => {
        todo.classList.remove('active-todo');
    });

    timerRunning = false;
    startButton.textContent = 'Continuar';
    newToDo.classList.remove('active-todo');
};

const addToDo = () => {
    //Pega o texto inserido no input
    const inputText = todoListInput.value;

    if(inputText.length > 0){
        // Verifica se já existe algum ToDo
        if(todoListContainer.firstChild){
            todoListPlaceholder.style.display = "none";
        }
        
        // Cria uma nova div de To Do
        const newToDo = document.createElement("div");
        newToDo.className = 'todo-item';

        // Cria um novo checkbox para o todo
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';

        //Cria uma span vazia para o texto
        const textSpan = document.createElement('span');
        textSpan.textContent = inputText;

        // Cria um botão de início em cada item no To Do
        const startButton = document.createElement('button');
        startButton.textContent = 'Começar';
        startButton.className = 'start-button';

        // Cria um mostrador do tempo transcorrido
        const timerDisplay = document.createElement('span');
        timerDisplay.className = 'timer-display';
        timerDisplay.textContent = '00:00';
        timerDisplay.style.opacity = 0;  // Set initial opacity to 0

        // Adiociona um event listnever no checkbox
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                textSpan.classList.add('todo-completed');
                timerDisplay.style.opacity = 0;
                startButton.style.opacity = 0;
            } else {
                textSpan.classList.remove('todo-completed');
            }
        });

        // Adiciona um event listener para o butão do timer
        startButton.addEventListener('click', function() {
            // Remove active-todo class from any other active ToDo items
            const activeTodos = document.querySelectorAll('.active-todo');
            activeTodos.forEach((todo) => {
                todo.classList.remove('active-todo');
            });

            if (timerRunning) {
                stopTimer(startButton, newToDo);
            } else {
                startTimer(timerDisplay, startButton, newToDo);
            }

            // Muda a opacidade do time
            timerDisplay.style.opacity = 1;

            // Mudar texto para parar
            button.innerText = 'Parar';

            //Mudar formatação da div para dar mais destaque
            newToDo.classList.add('active-todo');
        });

        //Prepara a nova div
        newToDo.appendChild(checkbox);
        newToDo.appendChild(textSpan);
        newToDo.appendChild(timerDisplay);
        newToDo.appendChild(startButton);

        //Adiciona a nova div para o componente pai
        todoListContainer.appendChild(newToDo);

        // Limpa o campo de input
        todoListInput.value = '';
    }

}

const clearToDos = () => {
    while (todoListContainer.firstChild) {
        todoListContainer.removeChild(todoListContainer.firstChild);
    }
}

const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

pageTitle.textContent = formatDate(currentDate);
todoListButton.addEventListener("click",addToDo);
clearButton.addEventListener("click",clearToDos);
todoListInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addToDo();
  }
});