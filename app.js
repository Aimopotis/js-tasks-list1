//DEFINE UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

//Load All Event Listeners
loadEventListeners();
//loadEventListeners Definition
function loadEventListeners() {
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task Event
  form.addEventListener('submit', addTask);
  //Filter Tasks
  filter.addEventListener('input', filterTasks);
  //Remove Task Event
  taskList.addEventListener('click', removeTask);
  //Clear Tasks
  clearBtn.addEventListener('click', clearTasks);
   
}

//Get Tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
     }
    
     tasks.forEach(function(task){
       //Create Li
          const li = document.createElement('li');
          //Add Class
          li.className = 'collection-item';
          //Create Text node and append to lie
          li.appendChild(document.createTextNode(task));
          //Create new link element
          const link = document.createElement('a');
          //Add Class
          link.className = 'delete-item secondary-content';
          //Add Icon html
          link.innerHTML = '<i class="fa fa-remove">';
          //append link to li
          li.appendChild(link);
          //Append li to ul
          taskList.appendChild(li);

     })
     
}

//Add Task Function
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === '') {
    alert('Add a Task');
  }

  //Create Li
  const li = document.createElement('li');
  //Add Class
  li.className = 'collection-item';
  //Create Text node and append to lie
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element
  const link = document.createElement('a');
  //Add Class
  link.className = 'delete-item secondary-content';
  //Add Icon html
  link.innerHTML = '<i class="fa fa-remove">';
  //append link to li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);

  //Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear Input
  taskInput.value = '';

}

//Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  //With DOM Traversing
  // let nodeList = taskList.children;
  // arrayList = Array.from(nodeList);
  // arrayList.forEach(function(arr){
  //   if(arr.firstChild.textContent.includes(text)){
  //     arr.style.display = 'block';
  //   } else {
  //     arr.style.display = 'none';
  //   }
  // })

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent.toLowerCase();
    console.log(item);
    if (item.includes(text)) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}


//Remove Task Using Event Delegation
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Do you want to delete Task')) {
      e.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
     }

     //Using simple IF
    //  tasks.forEach(function(task, index){
    //    if(taskItem.firstChild.textContent === task){
    //      tasks.splice(index, 1);
    //    }
    //  });

    //Using Filter
    let newLs = tasks.filter( function filterFunc(task){
      return task !== taskItem.firstChild.textContent; 
    });
 
   localStorage.setItem('tasks', JSON.stringify(newLs));
   //Use with IF scenario
  //  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear List
function clearTasks() {
  // Hack style taskList.innerHTML = '';
  //Faster look up https://jsperf.com/innerhtml-vs-removechild/47
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //Clear from LS
clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
//  localStorage.clear(); For All
localStorage.removeItem('tasks');

}
