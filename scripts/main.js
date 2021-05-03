var todos = [];
var counter;

window.addEventListener('keypress', function(e) {
    text = document.getElementsByClassName("textBox")[0].value;
    if (e.key === 'Enter' && text != "") {
        addTodo(text);
        document.getElementsByClassName("textBox")[0].value = "";
    }
});

function switchDisplayMode() {
    var todos;
    if (document.getElementById("modeIcon").getAttribute('src') === "./images/icon-moon.svg") {
        //From light To dark
        document.getElementById("modeIcon").setAttribute('src', "./images/icon-sun.svg");
        document.getElementsByClassName("mainContainer")[0].style.background = "url('./images/bg-desktop-dark.jpg') top / contain no-repeat, hsl(235, 21%, 11%)";
        document.getElementsByClassName("typeBox")[0].style.backgroundColor = "hsl(235, 24%, 19%)";
        document.getElementsByClassName("textBox")[0].style.color = "rgb(215, 215, 215)";
        document.getElementsByClassName("todoBox")[0].style.backgroundColor = "hsl(235, 24%, 19%)";
        todos = document.getElementsByClassName("todo");
        for (i = 0; i < todos.length; i++) {
            todos[i].style.borderBottom = "1px solid  rgb(125, 125, 125)";
        }
    } else {
        //From dark to light
        document.getElementById("modeIcon").setAttribute('src', "./images/icon-moon.svg");
        document.getElementsByClassName("mainContainer")[0].style.background = "url('./images/bg-desktop-light.jpg') top / contain no-repeat, hsl(0, 0%, 98%)";
        document.getElementsByClassName("typeBox")[0].style.backgroundColor = "white";
        document.getElementsByClassName("textBox")[0].style.color = "black";
        document.getElementsByClassName("todoBox")[0].style.backgroundColor = "white";
        todos = document.getElementsByClassName("todo");
        for (i = 0; i < todos.length; i++) {
            todos[i].style.borderBottom = "1px solid  rgb(218, 217, 217)";
        }
    }
}

function todoHover(index) {
    for (i=0; i<todos.length; i++) {
        if(todos[i].index === index) {
            tableIndex = i;
        }
    }
    if (!todos[tableIndex].completed) {
        var circle = document.getElementById(index).getElementsByClassName("circleTodo")[0]
        circle.style.backgroundImage = "linear-gradient(white, white), radial-gradient(circle at top left, hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
        circle.style.cursor = "pointer";
        circle.setAttribute('onclick', `completeTodo(${index})`)
    }
        var cross = document.createElement('img');
        cross.setAttribute('src', './images/icon-cross.svg');
        cross.style.marginRight = "1.5rem";
        cross.style.marginLeft = "auto";
        cross.style.cursor = "pointer";
        cross.setAttribute('onclick', `removeTodo(${index})`);
        document.getElementById(index).appendChild(cross);
}

function todoOut(index) {
    for (i=0; i<todos.length; i++) {
        if(todos[i].index === index) {
            tableIndex = i;
        }
    }
    if (!todos[tableIndex].completed) {
        document.getElementById(index).getElementsByClassName("circleTodo")[0].style.backgroundImage = "linear-gradient(white, white), radial-gradient(circle at top left, rgb(149, 149, 149), rgb(149, 149, 149))";
    }
    document.getElementById(index).removeChild(document.getElementById(index).childNodes[document.getElementById(index).childNodes.length - 1]);
}

function addTodo(text) {
    var newTodo = {
        index: 0,
        label: text,
        completed: false,
    }
    if (todos.length === 0) {
        document.getElementById("todoBox").style.display = "block";
        newTodo.index = 0;
        counter = 1;
    } else {
        /*Set index of todo */
        maxIndex = 0;
        counter = 1;
        for (var i=0; i<todos.length; i++) {
            if (todos[i].index >= maxIndex) {
                maxIndex = todos[i].index;
            }
            if (!todos[i].completed) {
                counter++;
            }
        }
       newTodo.index = maxIndex + 1;
    }
    

    todos.push(newTodo);

    todoElement = document.createElement("div");
    todoElement.classList.add("todo");
    todoElement.setAttribute('id', newTodo.index);
    todoElement.setAttribute('onmouseover', `todoHover(${newTodo.index})`);
    todoElement.setAttribute('onmouseout', `todoOut(${newTodo.index})`);

    circleElement = document.createElement("div");
    circleElement.classList.add("circleTodo");
    todoElement.appendChild(circleElement);

    labelElement = document.createElement("div");
    labelElement.classList.add("todoLabel");

    label = document.createTextNode(newTodo.label);
    labelElement.appendChild(label);
    todoElement.appendChild(labelElement);

    if (document.getElementById("completed").classList.contains("active")) {
        todoElement.style.display = "none";
    }

    document.getElementById("todoBox").appendChild(todoElement);

    /* increment counter */
    document.getElementsByClassName("leftItems")[0].innerHTML = counter + " items left";

}
//linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))
//

function completeTodo(index) {
    for (i=0; i<todos.length; i++) {
        if(todos[i].index === index) {
            tableIndex = i;
        }
    }
    if (!todos[tableIndex].completed) {
        todos[tableIndex].completed = true;
        document.getElementById(index).getElementsByClassName("circleTodo")[0].style.backgroundImage = "radial-gradient(circle at top left, hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
        document.getElementById(index).getElementsByClassName("circleTodo")[0].style.backgroundClip = "border-box";
        var tick = document.createElement("img");
        tick.setAttribute('src', './images/icon-check.svg')
        document.getElementById(index).getElementsByClassName("circleTodo")[0].appendChild(tick);
        counter--;
        document.getElementsByClassName("leftItems")[0].innerHTML = counter + " items left";
        document.getElementById(index).getElementsByClassName("todoLabel")[0].style.textDecoration = "line-through";
        document.getElementById(index).getElementsByClassName("todoLabel")[0].style.color = "rgb(163, 162, 162)";
        if (document.getElementById("active").classList.contains("active")) {
            document.getElementById(index).style.display = "none";
        }
    }
}

function removeTodo(index) {
    for (i=0; i<todos.length; i++) {
        if(todos[i].index === index) {
            tableIndex = i;
        }
    }
    if (!todos[tableIndex].completed) {
        counter--;
        document.getElementsByClassName("leftItems")[0].innerHTML = counter + " items left";
    }
    todos.splice(tableIndex, 1);
    document.getElementById("todoBox").removeChild(document.getElementById(index));
    if (!document.getElementById("todoBox").hasChildNodes) {
        document.getElementById("todoBox").style.display = "none";
    } 
}

function showActive() {
    document.getElementById("all").classList.remove("active");
    document.getElementById("active").classList.add("active");
    document.getElementById("completed").classList.remove("active");
    for (i=0; i<todos.length; i++) {
        if (todos[i].completed) {
            document.getElementById(todos[i].index).style.display = "none";
        } else {
            document.getElementById(todos[i].index).style.display = "flex";
        }
    }
}

function showCompleted () {
    document.getElementById("all").classList.remove("active");
    document.getElementById("active").classList.remove("active");
    document.getElementById("completed").classList.add("active");
    for (i=0; i<todos.length; i++) {
        if (todos[i].completed) {
            document.getElementById(todos[i].index).style.display = "flex";
        } else {
            document.getElementById(todos[i].index).style.display = "none";
        }
    }
}

function showAllItems() {
    document.getElementById("all").classList.add("active");
    document.getElementById("active").classList.remove("active");
    document.getElementById("completed").classList.remove("active");
    for (i=0; i<todos.length; i++) {
        document.getElementById(todos[i].index).style.display = "flex";
    }
}

function clearCompleted() {
    i=0;
    while (i<todos.length) {
        if (todos[i].completed) {
            document.getElementById("todoBox").removeChild(document.getElementById(todos[i].index));
            todos.splice(i, 1);
            if (!document.getElementById("todoBox").hasChildNodes) {
                document.getElementById("todoBox").style.display = "none";
            }
        } else {
            i++;
        }
    }
}