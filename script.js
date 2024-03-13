/*Build a ToDo App*/

/*
Step 1: Create an html doc with an input field, an add button for tasks, a ul elememt for list and a reset button.
Step 2: Style html doc with css, adding visual elements to demonstrate user completed task list elements and removal.
Step 3: Create functions that will allow the user to add and remove todo tasks to and from the list as well as saving listed items
to local storage.
*/


/* 

Javascript

In line 43-44,the first thing I did was declared two variables that reference the input field for the user input's new tasks and storing them to a list from the DOM.

Before assigning each new todo item as an object, I defined a function that will generate a unique Id number using the date.now, math.random and floor methods in line 47.

After that, I declared a variable that will be assigned to an array that will be holding the todo items on line 52.

In line 56, I then defined another function allowing the user to add a todo item to the task-container from the input-box field. Condition statments were added if the 
user did not type anything into the input field before adding, an alert with a message will inform them to do so. Else, a new object from said todo task is created with 
an id number and put into to the tasks array. The todo item will also add a span element serving as a delete button to remove todo item from the container. 
The new todo item will be saved in local storage.

In line 84, I setup an eventListener for the task-container, when the user clicks on the listed todo item toggling the completed todo item marked checked/unchecked and or removing them by the task objects by id.

In line 97, I declared a function that will remove a todo item from the tasks array based of its id, using the findIndex method to search it and using the splice method to removing it.

In line 107, defined another function that will convert the todo items in the tasks array into a JSON string because the local storage can only store strings. The localStorage.setItem is 
used to store the JSON string in local storage ensuring the latest state of tasks array is always stored.

Next, I define another function that retrieves the todo task data from local storage, parsing, populates and displays the task list into the DOM in line 115.

I defined a function that allows user to clear the list of todo task items array for the UI and clear the local storage in line 144.

Finally, in line 151, I defined a function to recall the todos from the arrays from local storage and display them on the UI.
*/




const inputBox = document.getElementById('input-box');
const taskContainer = document.getElementById('task-container');


function generateId() {
	return Math.floor(Math.random() * Date.now());
}


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];



function addTodoTask() {
	if(inputBox.value === '') {
		alert("Please write something!");
	}else{
		let taskObject = {
			id: generateId(),
			text: inputBox.value
		};
		let li = document.createElement("li");
		li.textContent = taskObject.text;
		taskContainer.appendChild(li);
		let span = document.createElement("span");
		span.textContent = "\u00d7";
		li.appendChild(span);
		li.dataset.id = taskObject.id;
		tasks.push(taskObject);
		span.addEventListener("click", function() {
        li.remove(); 
        removeTodoById(taskObject.id);
        saveTodoTaskData(); 
        });
	}
	inputBox.value = "";
	saveTodoTaskData();
}



taskContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-button")) { 
    e.target.parentElement.remove(); 
    removeTodoById(e.target.parentElement.dataset.id); 
    saveTodoTaskData(); 
  } else if (e.target.tagName === "LI") { 
    e.target.classList.toggle("checked"); 
    saveTodoTaskData();
  }
}, false);



function removeTodoById(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
}




function saveTodoTaskData() {
	localStorage.setItem("tasks", JSON.stringify(tasks));

}




function showTodoTask() {
		let tasksJson = localStorage.getItem("tasks");
		if(tasksJson) {
			tasks = JSON.parse(tasksJson);
			tasks.forEach(task => {
				let li = document.createElement("li");
				li.textContent = task.text;
				li.dataset.id = task.id;
				taskContainer.appendChild(li);
				let span = document.createElement("span");
				span.textContent = "\u00d7";
				span.classList.add("remove-button");
				li.appendChild(span);
				span.addEventListener("click", function () {
                li.remove(); 
                removeTodoById(task.id); 
                saveTodoTaskData(); 
            });
		});	
	}
	
}







function resetTasks() {
	localStorage.removeItem("tasks");
	taskContainer.textContent = '';
}



showTodoTask();
