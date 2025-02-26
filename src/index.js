import "./styles.css";
import { Project } from "./project.js";

const contentDiv = document.querySelector("#content");
const list = document.querySelector("#todo-list");
const addBtn = document.querySelector("#add-btn");

let newProject = new Project();

function displayList(project){
    list.innerHTML = "";

    let todoList = project.getList();

    todoList.forEach(element => {
        const todoItem = document.createElement("li");
        todoItem.innerHTML = element;
        list.appendChild(todoItem);
    });
}

function retrieveProjects(){
    fetch("./test.json").then(response => {
        return response.json();
    });
}

displayList(newProject);

console.log(retrieveProjects());

addBtn.addEventListener("click", () => {
    newProject.addToList(document.querySelector("#task-input").value);
    displayList(newProject);
    document.querySelector("#task-input").value = "";
});