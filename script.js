let addToDoButton = document.getElementById("add");
// console.log(addToDoButton);
let toDoContainer = document.getElementById("todoscontainer");
let inputField = document.getElementById("inputbox");
let removeAll = document.getElementById("remall");
let todos = new Array();
let completed = new Array();
let taskArr = [];
function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function desktopcheck() {
    var check = false;
    if (window.innerWidth > 768) {
        check = true;
    }
    return check;
}



function addToContainer(value, flag) {
    var tickMark = document.createElement('span');
    var paragraph = document.createElement('span');
    var remove = document.createElement('span');
    var lnbr = document.createElement('br');
    tickMark.innerHTML = "✔";
    remove.innerHTML = "&#128465;"
    paragraph.className = "paragraph-styling";
    paragraph.innerText = value;
    
    toDoContainer.appendChild(paragraph);
    toDoContainer.appendChild(remove);
    toDoContainer.appendChild(tickMark);
    toDoContainer.appendChild(lnbr);
    
    let obj ={
    };
    obj.task = inputField.value.trim();
    obj.check = false;
    taskArr.push(obj); 
    console.log(taskArr);
    
    if (!desktopcheck()) {
        tickMark.classList = "tick-styling";
        remove.classList = "remove-styling";
    }
    else {
        tickMark.classList = "tick-styling tick-hover";
        remove.classList = "remove-styling remove-hover";
    }
    tickMark.addEventListener('click', function () {
        paragraph.style.textDecoration = "line-through";

        let getString = paragraph.innerText;
        let index = taskArr.findIndex((e) => e.task == getString);
        taskArr[index].check = true;
        // console.log(index);
        console.log(taskArr);

        if (!isInArray(paragraph.innerText, completed)) { completed.push(paragraph.innerText); }
        paragraph.addEventListener('click', function () {
            paragraph.style.textDecoration = "none";
            var index = completed.indexOf(paragraph.innerText);
            completed.splice(index, 1);
            taskArr[index].check=false;
        })
    })
    if (!flag) {
        // paragraph.style.textDecoration="line-through";
        tickMark.click();
    }
    remove.addEventListener('click', function () {
        toDoContainer.removeChild(paragraph);
        toDoContainer.removeChild(remove);
        toDoContainer.removeChild(tickMark);
        toDoContainer.removeChild(lnbr);

        let remIndex = taskArr.findIndex((e)=> e.task == paragraph.innerText);
        taskArr.splice(remIndex,1);

        var index1 = todos.indexOf(paragraph.innerText);
        var index2 = completed.indexOf(paragraph.innerText);
        todos.splice(index1, 1);
        if (isInArray(paragraph.innerText, completed)) {
            completed.splice(index2, 1);
        }
        
    })
}

window.onload = function () {
    var pendingTasks = JSON.parse(localStorage.todos);
    var completedTasks = JSON.parse(localStorage.completed);
    todos = pendingTasks;
    completed = completedTasks;
    
    if (!desktopcheck()) {
        addToDoButton.className = "addMobile";
        removeAll.className = "removeMobile";
    }
    for (i = 0; i < todos.length; i++) {
        if (isInArray(todos[i], completed)) {
            addToContainer(todos[i], false);
        }
        else {
            addToContainer(todos[i], true);
        }
    }
    inputField.focus();
}


addToDoButton.addEventListener('click', function () {
    var inputstr = inputField.value.split(' ').join('');
    if (inputstr == "") {
        alert("Field Empty");
    }
    else {
        if (!isInArray(inputField.value, todos)) {
            todos.push(inputField.value);
            addToContainer(inputField.value, true);
        }
        inputField.value = ""

    }
})

removeAll.addEventListener('click', function () {
    
    toDoContainer.innerHTML = "";
    todos = [];
    completed = [];
    taskArr=[];
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completed", JSON.stringify(completed));
})

document.addEventListener('keypress', (e) => {
    inputField.focus();
    if (e.key == "Enter"){
        addToDoButton.click();
    }
})
window.onbeforeunload = function () {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completed", JSON.stringify(completed));
}