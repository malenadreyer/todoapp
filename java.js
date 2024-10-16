let taskIdCounter = 0;
let tasks = [];

function addTask() {
    const description = document.getElementById('taskDescription').value;
    const quantity = document.getElementById('taskQuantity').value;

    if (description.trim() === '') {
        console.log('mangler opgave');
        alert('Udfyld beskrivelse af opgaven');
        return;
    }

    const task = {
        id: taskIdCounter++,
        description: description,
        quantity: quantity || null,  // Sæt til null hvis tom
        isCompleted: false
    };

    tasks.push(task);
    console.log('task udfyldt', task);


    document.getElementById('taskDescription').value = '';
    document.getElementById('taskQuantity').value = '';
    renderTasks();
}

function renderTasks() {
    const todoList = document.getElementById('todo-list');
    const completedList = document.getElementById('completed-list');
    todoList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.style.display = "grid"; 
        listItem.style.alignItems = "right";
        listItem.style.gridTemplateColumns = "auto 1fr auto auto";
        

        const completeButton = document.createElement('button');
        completeButton.textContent = '';
        completeButton.classList.add(task.isCompleted ? 'undo' : 'complete');
        completeButton.onclick = () => {
            if (task.isCompleted) {
                undoTask(task.id);
            } else {
                completeTask(task.id);
            }
        };
        listItem.appendChild(completeButton);

        // Tilføj beskrivelsen af opgaven
        const taskDescription = document.createElement('span');
        taskDescription.innerHTML = task.description; // Kun beskrivelsen
        listItem.appendChild(taskDescription);

        // Opret delete/fortryd knap til sidst
      
        if (task.quantity) {
            const quantityDisplay = document.createElement('span');
            quantityDisplay.innerHTML = `${task.quantity}x`; // Vis antal med 'x'
            quantityDisplay.style.marginLeft = '10px'; // Giv lidt afstand mellem fortryd knappen og antallet
            listItem.appendChild(quantityDisplay);
        }
  const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Fortryd';
        deleteButton.onclick = () => deleteTask(task.id);
        listItem.appendChild(deleteButton);

        // Tilføj elementerne til den rette liste
        if (task.isCompleted) {
            listItem.classList.add('completed');
            completedList.appendChild(listItem);
        } else {
            todoList.appendChild(listItem);
        }
    });
}

function deleteTask(taskId) {
    const taskToDelete = tasks.find(task => task.id === taskId);
    console.log('fjernet', taskToDelete);
    
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

function completeTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    task.isCompleted = true;
    console.log('dones', task);
    
    renderTasks();
}

function undoTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    task.isCompleted = false;
    console.log('den er ikke færdig', task);
    
    renderTasks();
}
