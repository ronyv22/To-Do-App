/*Build a ToDo App*/

/*
Step 1: Create an html doc with an input field, an add button for tasks, a ul elememt for list and a reset button.
Step 2: Style html doc with css, adding visual elements to demonstrate user completed task list elements and removal.
Step 3: Create functions that will allow the user to add and remove todo tasks to and from the list as well as saving listed items
to local storage. Add a new function that will intially load data from an API endpoint to the taskContainer UI.
*/


/* 

Javascript

In line 46 and 47,the first thing I did was declared two variables that reference the input field for the user input's new tasks and storing them to a list from the DOM.

Before assigning each new todo item as an object, I defined a function that will generate a unique Id number using the date.now, math.random and floor methods in line 50.

After that, I declared a variable that will be assigned to an array that will be holding the todo items on line 55.

In line 59, I then defined another function allowing the user to add a todo item to the task-container from the input-box field. Condition statments were added if the 
user did not type anything into the input field before adding, an alert with a message will inform them to do so. Else, a new object from said todo task is created with 
an id number and put into to the tasks array. The todo item will also add a span element serving as a delete button to remove todo item from the container. 
The new todo item will be saved in local storage.

In line 82, I setup a eventListener for the task-container, when the user clicks on the listed todo item toggling the completed todo item marked checked/unchecked and or removing them by the task objects by id.

In line 99, defined another function that will convert the todo items in the tasks array into a JSON string because the local storage can only store strings. The localStorage.setItem is 
used to store the JSON string in local storage ensuring the latest state of tasks is always stored.

Next, I define another function that retrieves the todo task data from local storage, parsing, populating and displaying the task list into the DOM in line 107.

To fetch todos from the API, I defined a function that will be making a GET request from an API endpoint url, extracting each title from there. I created the taskObject variable with a generated ID and task title
that was looped, pushing it to the tasks array and then calling the saveTodoData function to update the locale storage on line 128.

I then defined a function that allows user to clear the list of todo task items array and clear the local storage on line 153.

Finally, on lines 160 and 162, I call the showTodoTask and apiTodos functions to recall the todos from the arrays from local storage and to pre populate the task container with the data from the API when the page
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
	}
	inputBox.value = "";
	saveTodoTaskData();
}



taskContainer.addEventListener("click", function(e) {
	if(e.target.tagName === "LI") {
		e.target.classList.toggle("checked");
		saveTodoTaskData();

	}else if(e.target.tagName === "SPAN"){
		const taskId = e.target.dataset.id;
		const taskIndex = tasks.findIndex((task) => task.id === taskId);
		tasks.splice(taskIndex, 1);
		e.target.parentElement.remove();
		saveTodoTaskData();	
	}
	
}, false);



function saveTodoTaskData() {
	localStorage.setItem("tasks", JSON.stringify(tasks));

}




function showTodoTask() {
	
		let tasksJson = localStorage.getItem("tasks");
		if(tasksJson) {
			tasks = JSON.parse(tasksJson);
			tasks.forEach(function(task) {
				let li = document.createElement("li");
				li.textContent = task.text;
				li.dataset.id = task.id;
				taskContainer.appendChild(li);
				let span = document.createElement("span");
				span.textContent = "\u00d7";
				li.appendChild(span);
			});	
		}
	
	}




function apiTodos() {
	
	axios.get('https://jsonplaceholder.typicode.com/todos')
			.then(response => {
				let todos = response.data;
					for(let i= 0; i < 4; i++) {
					let taskObject = {
						id: generateId(),
						text: todos[i].title
					};

					tasks.push(taskObject);

					saveTodoTaskData();

				}
				
			});
	}
		
			




function resetTasks() {
	localStorage.removeItem("tasks");
	tasks = [];
	taskContainer.textContent = '';
}


showTodoTask();

apiTodos();