import "./styles.css";
import { Project } from "./project.js";

const contentDiv = document.querySelector("#content");
const list = document.querySelector("#todo-list");
const projectList = document.querySelector("#project-list");
const addBtn = document.querySelector("#add-btn");

let projects = [];
let currentProject;

function displayList(project){
    list.innerHTML = "";

    let todoList = project.getList();

    todoList.forEach(element => {
        const todoItem = document.createElement("li");
        todoItem.innerHTML = element;
        list.appendChild(todoItem);
    });
}

function saveList(){
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadList(){
    let savedProjectsString = localStorage.getItem("projects");
    let savedProjects = JSON.parse(savedProjectsString);
    
    savedProjects.forEach(element => {
        let savedProject = new Project(element.name);
        console.log(savedProject.name);
        element.todoList.forEach(element => {
            savedProject.addToList(element);
        });
        projects.push(savedProject);
    });

    projects.forEach(element => {
        const projectItem = document.createElement("li");
        const projectButton = document.createElement("button");
        projectButton.innerHTML = element.name;
    
        projectButton.addEventListener("click", () => {
            displayList(element);
            currentProject = element;
        });
    
        projectItem.appendChild(projectButton);
        projectList.appendChild(projectItem);
    });

    if(projects.length > 0)
        currentProject = projects[0];
        displayList(currentProject);
    
}

addBtn.addEventListener("click", () => {
    currentProject.addToList(document.querySelector("#task-input").value);
    displayList(currentProject);
    document.querySelector("#task-input").value = "";
    saveList();
});

loadList();
