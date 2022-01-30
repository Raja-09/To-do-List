// var taskArr= JSON.parse(localStorage.tasks); 
let addToDoButton = document.getElementById("add");
let toDoContainer = document.getElementById("todoscontainer");
let inputField = document.getElementById("inputbox");
let removeAll = document.getElementById("remall");
let taskArr = new Array();
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

    let obj = {
    };
    obj.task = value.trim();
    obj.check = false;
    taskArr.push(obj);

    tickMark.classList = "tick-styling";
    remove.classList = "remove-styling";
    if (desktopcheck()) {
        tickMark.classList.toggle('tick-hover');
        remove.classList.toggle('remove-hover');
    }
    tickMark.addEventListener('click', function () {
        paragraph.style.textDecoration = "line-through";

        let getString = paragraph.innerText;
        let index = taskArr.findIndex((e) => e.task == getString);
        taskArr[index].check = true;
        tickMark.innerHTML = "&#x238C";
        if (desktopcheck()) {
            tickMark.classList.toggle('undoButton');
        }

        tickMark.addEventListener('click', function () {
            paragraph.style.textDecoration = "none";
            tickMark.innerHTML = "✔";
            taskArr[index].check = false;
        })
    })
    if (flag) {
        tickMark.click();
    }
    remove.addEventListener('click', function () {
        toDoContainer.removeChild(paragraph);
        toDoContainer.removeChild(remove);
        toDoContainer.removeChild(tickMark);
        toDoContainer.removeChild(lnbr);

        let remIndex = taskArr.findIndex((e) => e.task == paragraph.innerText);
        taskArr.splice(remIndex, 1);
    })
}

window.onload = function () {
    let pendingTasks = JSON.parse(localStorage.tasks);
    // taskArr=pendingTasks; //infinite loop pls dont try 
    if (!desktopcheck()) {
        addToDoButton.className = "addMobile";
        removeAll.className = "removeMobile";
    }
    for (i = 0; i < pendingTasks.length; i++) {
        addToContainer(pendingTasks[i].task, pendingTasks[i].check);
    }
    inputField.focus();
}


addToDoButton.addEventListener('click', function () {
    var inputstr = inputField.value.split(' ').join('');
    if (inputstr == "") {
        alert("Field Empty");
    }
    else {
        let string = inputField.value.trim();
        let ind = taskArr.findIndex((a) => a.task == string);
        if (ind < 0) {
            let obj = {};
            obj.task = inputField.value.trim();
            obj.check = false;
            addToContainer(inputField.value.trim(), false);
        }
        else {
            alert("Task Already added");
        }
        inputField.value = ""

    }
})

removeAll.addEventListener('click', function () {
    if (confirm("Remove all tasks ?")) {
        toDoContainer.innerHTML = "";
        taskArr = [];
        localStorage.setItem("tasks", JSON.stringify(taskArr));
    }
})

document.addEventListener('keypress', (e) => {
    inputField.focus();
    if (e.key == "Enter") {
        addToDoButton.click();
    }
})
window.onbeforeunload = function () {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}