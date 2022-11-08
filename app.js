// UI Variables
const form = document.querySelector('#task-form'); 
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('#clearBtn');
const filter = document.querySelector('#filter');

// Load all event listeners
loadEventListeners(); 
// Load all event Listners 
function loadEventListeners() {
    //  DOM Load event
    document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage)
    // Add task
    form.addEventListener('submit', addTask)
    // Delete Task
    taskList.addEventListener('click', deleteTask)
    // Clear task
    clearBtn.addEventListener('click', clearTasks)
    // Filter Task
    filter.addEventListener('keyup', filterTaskList)
}
// Get Task from Local Storage
function getTasksFromLocalStorage() {
    if (localStorage.getItem('tasks') === null) {
        tasks = []; 
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(task => {
        const li = document.createElement('li'); 
        li.className = 'list-group-item'; 
        li.innerHTML = `${task}
                 <a href="#" class="float-end delete-item">
                     <button type="button" class="btn-close" disabled aria-label="Close"></button>
                 </a>`;
        taskList.appendChild(li);         
     }); 
}

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Please Enter a Task') 
    } else {
    // Create LI with class, innner html and text content
    const li = document.createElement('li'); 
    li.className = 'list-group-item'; 
    li.innerHTML = `${taskInput.value}
                    <a href="#" class="float-end delete-item">
                        <button type="button" class="btn-close" disabled aria-label="Close"></button>
                    </a>`;
    //Apppend to UL
    taskList.appendChild(li); 
    }
    //  Store in local storage
    storeTaskInLocalStorage(taskInput.value); 
     
    e.preventDefault();
}
// Store task in local Storage 
function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []; 
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(e) {
    if (e.target.classList.contains('delete-item')) {
        e.target.parentElement.remove(); 
    }
    // Remove from Local Storage
    removefromLocalStorage(e.target.parentElement);
    e.preventDefault();
}

function removefromLocalStorage(taskItem) {
    let tasks; 

    const taskItemtext = taskItem.textContent.trim(); 

    if (localStorage.getItem('tasks') === null) {
        tasks = []; 
    }else{
        console.log('get tasks from local storage');
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index) {
        if (taskItemtext  === task) {
          tasks.splice(index, 1); 
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))
    };

function clearTasks(e) {
    localStorage.clear(); 
    while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
}
}

function filterTaskList(e) {
    const text = e.target.value.toLowerCase(); 
    document.querySelectorAll('.list-group-item').forEach((task)=>{
        const item = task.textContent; 
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }else{
            task.style.display = 'none'; 
        }
    })
}