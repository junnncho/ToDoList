
var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

function newToDoItem(itemtext, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemtext);
    toDoItem.appendChild(toDoText);
    if (completed) {
        toDoItem.classList.add("completed");
    }
    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("click", toggleToDoItemState);
    saveList();
}

var addButton = document.getElementById("add2-button");
addButton.addEventListener("click", addToDoItem);
function addToDoItem() {
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
}


function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

var clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearToDoItems);

function clearToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");
    while (completedItems.length > 0){
        completedItems.item(0).remove();
    }
    saveList();
}

var emptyButton = document.getElementById("empty-button");
emptyButton.addEventListener("click", emptyList);

function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0){
        toDoItems.item(0).remove();
    }
    saveList();
}

var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveList);
saveButton.addEventListener("click", communicate);
function communicate(){
    alert("Save Complete");
}

function saveList() {
    var toDos = [];
    for (var i = 0; i < toDoList.children.length; i++){
        var toDo = toDoList.children.item(i);
        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };
        toDos.push(toDoInfo);
    }
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadList() {
    if (localStorage.getItem("toDos") != null){
        var toDos = JSON.parse(localStorage.getItem("toDos"));
        for (var i = 0; i < toDos.length; i++){
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed)
        }
    }
}
loadList();