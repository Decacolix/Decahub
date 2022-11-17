const taskListElement = document.querySelector('.task-list')
const taskInputElement = document.querySelector('.task-input')
const taskAddButtonElement = document.querySelector('.add-task-btn')

//Add task to local storage.
function addTask() {
    if (taskInputElement.value == '' || !taskInputElement.value.trim().length) {
        return
    }
    
    localStorage.setItem('task' + new Date().getTime(), taskInputElement.value)
    taskInputElement.value = ''
    loadTasks()
}

//Load tasks from local storage.
function loadTasks() {
    taskListElement.innerHTML = ''

    const localStorageItems = { ...localStorage }
    const taskKeys = []

    //Get items from local storage and filter tasks.
    for (let i = 0; i < Object.keys(localStorageItems).length; i++) {
        if (Object.keys(localStorageItems)[i].includes('task')) {
            taskKeys.push(Object.keys(localStorageItems)[i])
        }
    }

    //Sort tasks by when they were created.
    taskKeys.sort()

    //Create elements for tasks.
    for (let i = 0; i < taskKeys.length; i++) {
        const taskElement = document.createElement('div')
        taskElement.classList.add('task', 'my-4', 'px-2', 'pb-4')
        taskElement.id = taskKeys[i]

        const taskContentElement = document.createElement('div')
        taskContentElement.classList.add('task-content')
        taskContentElement.innerText = localStorage.getItem(taskKeys[i])

        const taskDeleteElement = document.createElement('div')
        taskDeleteElement.classList.add('task-delete')

        taskDeleteElement.addEventListener('click', (e) => {
            localStorage.removeItem(e.target.parentElement.id)
            loadTasks()
        })

        taskElement.appendChild(taskContentElement)
        taskElement.appendChild(taskDeleteElement)

        taskListElement.appendChild(taskElement)
    }
}

taskAddButtonElement.addEventListener('click', addTask)
taskInputElement.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        addTask()
    }
})
window.addEventListener('onload', loadTasks())