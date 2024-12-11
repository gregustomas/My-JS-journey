const addTask = document.getElementById("add-task");
const cardContainer = document.getElementById("task-container");


addTask.addEventListener("click", () => {

    //input a validace
    const taskInput = document.getElementById("input");
    const task = taskInput.value.trim();

    //vytvoření task karty
    const card = document.createElement('div');
    card.className = "card";
    const newTask = document.createElement("p");
    newTask.className = "task";
    //validace vstupu a přidání karty
    if(task){
        newTask.textContent = task;
        card.appendChild(newTask);
        cardContainer.appendChild(card);
    }
    else{
        window.alert("Task input is empty!");
    }
    
    //delete funkce
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    card.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        card.remove();
    })

    //reset inputu
    taskInput.value = "";
    
})

function saveTasks(){
    let tasks = [];
    cardContainer.querySelectorAll('div').forEach(function(card){
        tasks.push(card.textContent);
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

