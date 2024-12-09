const addTodoBtn = document.getElementById("add-todo-btn");
let todoList = []; // array

// event for adding new todo list 
addTodoBtn.addEventListener("click", () => {
  try {
    renderTodoList();
    console.log(todoList);
    console.log(todoList.length);
  } 
  catch (error) {
    console.error('Error adding input.', error);  
  }
});

function renderTodoList() {
  const listName = document.querySelector('.input-todo-name').value;
  const dueDate = document.querySelector('.todo-add-due-date').value;
  const listContainer = document.querySelector('.list');

  // Clear containers
  listContainer.innerHTML = '';
  
  if (listName.trim() !== '') {
    // add input value to the array
    todoList.push({ listName, dueDate}); 
  }

  todoList.forEach((todo, i) => {
    // Create a new container for each row
    const itemRow = document.createElement('div');
    itemRow.classList.add('date-and-name-list');

    const nameListElement = document.createElement('span');
    nameListElement.classList.add('todo-name-list');
    nameListElement.innerText = `${i + 1}. ${todo.listName}`;

    const dueDateElement = document.createElement('span');
    dueDateElement.classList.add('todo-due-date-list');
    dueDateElement.innerText = todo.dueDate.length > 0 ? `Due: ${todo.dueDate}` : ``;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete-list-btn');

    // delete event for btn
    deleteButton.addEventListener('click', () => {
      
      todoList.splice(i, 1);
      renderTodoList(); // Re-render the list
    });

    // Append children to add parent class
    itemRow.appendChild(nameListElement);
    itemRow.appendChild(dueDateElement);
    itemRow.appendChild(deleteButton);

    listContainer.appendChild(itemRow);
  });

  listContainer.style.visibility = todoList.length > 0 ? "visible" : "hidden";
}
