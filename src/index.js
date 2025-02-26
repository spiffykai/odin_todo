import "./styles.css";
import { Project } from "./project.js";

const contentDiv = document.querySelector("#content");
const list = document.querySelector("#todo-list");
const projectList = document.querySelector("#project-list");
const addBtn = document.querySelector("#add-btn");
const createProjectBtn = document.querySelector("#createproject-btn");
const newProjectDialog = document.querySelector("#newproject-dialog");
const newProjectForm = newProjectDialog.querySelector("#newproject-form");
const dialogProjectName = newProjectDialog.querySelector("#newproject-name");

let projects = [];
let currentProject;

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

    createProjectsList();

    if(projects.length > 0)
        currentProject = projects[0];
        displayList(currentProject);
    
}

//creates the sidebar list with all the projects
function createProjectsList(){
    projectList.innerHTML = "";

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
}

//creates the todo list for the project
function displayList(project){
    list.innerHTML = "";

    let todoList = project.getList();

    todoList.forEach(element => {
        const todoItem = document.createElement("li");
        todoItem.innerHTML = element;
        list.appendChild(todoItem);
    });
}

addBtn.addEventListener("click", () => {
    currentProject.addToList(document.querySelector("#task-input").value);
    displayList(currentProject);
    document.querySelector("#task-input").value = "";
    saveList();
});

createProjectBtn.addEventListener("click", () => {
    newProjectDialog.showModal();
});

newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let newProject = new Project(dialogProjectName.value);
    projects.push(newProject);

    createProjectsList();
    saveList();
    newProjectDialog.close();
});

loadList();
