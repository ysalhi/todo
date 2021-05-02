var todos = [];

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
        for (i=0; i < todos.length; i++) {
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
        for (i=0; i < todos.length; i++) {
            todos[i].style.borderBottom = "1px solid  rgb(218, 217, 217)";
        }
    }

}

function todoHover(index) {
    var circle = document.getElementById(index).getElementsByClassName("circleTodo")[0]
    circle.style.backgroundImage = "linear-gradient(white, white), radial-gradient(circle at top left, hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
    circle.style.cursor = "pointer";
    circle.setAttribute('onclick', `completeTodo(${index})`)
    var cross = document.createElement('img');
    cross.setAttribute('src', './images/icon-cross.svg');
    cross.style.marginRight = "1.5rem";
    cross.style.marginLeft = "auto";
    cross.style.cursor = "pointer";
    cross.setAttribute('onclick', `removeTodo(${index})`);
    document.getElementById(index).appendChild(cross);
}

function todoOut(index) {
    document.getElementById(index).getElementsByClassName("circleTodo")[0].style.backgroundImage = "linear-gradient(white, white), radial-gradient(circle at top left, rgb(149, 149, 149), rgb(149, 149, 149))";
    document.getElementById(index).removeChild(document.getElementById(index).childNodes[document.getElementById(index).childNodes.length - 1]);
}

function addTodo(text) {
    var newTodo = {
        label: text,
        status: "ongoing"
    }
    if (todos.length === 0) {
        document.getElementById("todoBox").style.display = "block";
    }
    todos.push(newTodo);
    
    document.getElementById("todoBox").innerHTML = ""

    for (i=0; i<todos.length; i++) {
        document.getElementById("todoBox").innerHTML += `
        <div class='todo' id='${i}' onmouseover='todoHover(this.id)' onmouseout='todoOut(this.id)'>
        <div class='circleTodo'></div>
        <div class='todoLabel'>${todos[i].label}</div>
        </div>
        `;
    }
}
//linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))
//

function completeTodo(index) {
    
}

function removeTodo(index) {
    todos.splice(index, 1);
    document.getElementById("todoBox").removeChild(document.getElementById(index));
    if (!document.getElementById("todoBox").hasChildNodes) {
        document.getElementById("todoBox").style.display = "none";
    }
}