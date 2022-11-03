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
    // Add task event
    form.addEventListener('submit', addTask)
    // Clear Task Event
    taskList.addEventListener('click', clearTask)
    // Filter Task
    filter.addEventListener('input', filterTaskList)
}

function addTask(e) {

    if (taskInput.value === '') {
        alert('Please Enter a Task') 
    } else {
    // Create LI with class, innner html and text content
    const li = document.createElement('li'); 
    li.className = 'list-group-item'; 
    li.innerHTML = `${taskInput.value}<a href="#" class="float-end delete-item">
                        <button type="button" class="btn-close" disabled aria-label="Close"></button>
                     </a>`;

    //Apppend to UL
    taskList.appendChild(li); 
    }

    e.preventDefault();
}

function clearTask(e) {
    if (e.target.classList.contains('delete-item')) {
        e.target.parentElement.remove(); 
    }
}

function filterTaskList(e) {
    console.log(e.target.value);
    console.log(taskList.childNodes);
    taskList.childNodes.forEach(task => {

        if (e.target.value === task.innerText ) {
            console.log('WE HAVE A MATCH');
        }
        
    });


    
}