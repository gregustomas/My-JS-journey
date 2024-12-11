const addTask = document.getElementById("add-task");
const cardContainer = document.getElementById("task-container");

// Funkce pro načtení úkolů z localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskCard(task));
}

// Funkce pro vytvoření karty úkolu
function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = "card";
    
    const newTask = document.createElement("p");
    newTask.className = "task";
    newTask.textContent = task;
    card.appendChild(newTask);
    
    // Přidání tlačítka pro smazání
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    card.appendChild(deleteBtn);
    
    deleteBtn.addEventListener("click", () => {
        card.remove();
        removeTaskFromStorage(task); // Odstranit úkol z localStorage
    });
    
    cardContainer.appendChild(card);
}

// Funkce pro odstranění úkolu z localStorage
function removeTaskFromStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(t => t !== task); // Odstranit úkol
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Při kliknutí na tlačítko přidat úkol
addTask.addEventListener("click", () => {
    const taskInput = document.getElementById("input");
    const task = taskInput.value.trim();
    
    if (task) {
        createTaskCard(task); // Vytvořit kartu úkolu
        
        // Uložit úkol do localStorage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        taskInput.value = ""; // Reset inputu
    } else {
        window.alert("Task input is empty!");
    }
});

// Načíst uložené úkoly při načtení stránky
loadTasks();




