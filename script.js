/*Build a ToDo App*/

/*
Step 1: Create an html doc with an input field, an add button for tasks, a ul elememt for list and a reset button.
Step 2: Style html doc with css, adding visual elements to demonstrate user completed task list elements and removal.
Step 3: Create functions that will allow the user to add and remove todo tasks to and from the list as well as saving listed items
to local storage. Add a new function that will intially load data from an API endpoint to the taskContainer UI.
*/


/* 

Javascript

In line 51 and 52,the first thing I did was declared two variables that reference the input field for the user input's new tasks and storing them to a list from the DOM.

Before assigning each new todo item as an object, I defined a function that will generate a unique Id number using the date.now, math.random and floor methods in line 55.

After that, I declared a variable that will be assigned to an array that will be holding the todo items on line 60.

In line 64, I then defined another function allowing the user to add a todo item to the task-container from the input-box field. Condition statments were added if the 
user did not type anything into the input field before adding, an alert with a message will informing them to do so. Else, a new object from said todo task is created with 
an id number and put into to the tasks array. The todo item will also add a span element serving as a delete button to remove todo item from the container. 
I also added an eventlistener with conditional statments that will delete remove the selected todo item from the list. The new todo item will be saved in local storage.

In line 92, I setup a eventListener for the task-container with conditional statments. If the user clicks on the listed todo item toggling, the completed todo item will
be marked checked/unchecked and or removing the task objects by the class from the DOM.

In line 105, I declared a function that will remove a todo item from the tasks array based of its id, using the findIndex method to search it and using the splice method to removing it with splice method.

In line 115, defined another function that will convert the todo items in the tasks array into a JSON string because the local storage can only store strings. The localStorage.setItem is 
used to store the JSON string in local storage ensuring the latest state of tasks is always stored.

Next, I define another function that retrieves the todo task data from local storage, parsing, populating and displaying the task list into the UI in line 123.

In line 149, to fetch todos from the API, I defined a function that will be making a GET request from an API endpoint url, extracting each title from the API endpoint if the tasks array is empty. 
I created the taskObject variable with a generated ID and task title that was looped, pushing it to the tasks array and then calling the saveTodoData function to update the locale storage. A conditional
statement was added after to check if the fetched todo items from the API endpoint do not appear more than once.

I then defined a function that allows user to clear the list of todo task items array and clear the local storage on line 176.

Finally, on lines 182 and 184, I call the apiTodos and showTodoTask functions to recall the todos from the arrays from local storage and to pre populate the task container with the data from the API when the page
loads when the input box is empty.

*/





const inputBox = document.getElementById('input-box');
const taskContainer = document.getElementById('task-container');


function generateId() {
	return Math.floor(Math.random() * Date.now());
}


let tasks = [];



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
});



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




function apiTodos() {
	if (tasks.length === 0) {
	axios.get('https://jsonplaceholder.typicode.com/todos')
			.then(response => {
				let todos = response.data;
					for(let i= 0; i < 5; i++) {
					let taskObject = {
						id: generateId(),
						text: todos[i].title
					};
					 let todoExists = tasks.some(task => task.text === taskObject.text);
                    if (!todoExists) {
						tasks.push(taskObject);
						saveTodoTaskData();

				}
				
			}
		});

	}
		
}			




function resetTasks() {
	localStorage.removeItem("tasks");
	taskContainer.textContent = '';
}


apiTodos();

showTodoTask();