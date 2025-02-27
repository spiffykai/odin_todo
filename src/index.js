import "./styles.css";
import { Project } from "./project.js";

const contentDiv = document.querySelector("#content");
const list = document.querySelector("#todo-list");
const projectList = document.querySelector("#project-list");
const displayedProjectName = document.querySelector("#projectname");
const addTaskBtn = document.querySelector("#newtask-btn");

const createProjectBtn = document.querySelector("#createproject-btn");
const newProjectDialog = document.querySelector("#newproject-dialog");
const newProjectForm = newProjectDialog.querySelector("#newproject-form");
const dialogProjectName = newProjectDialog.querySelector("#newproject-name");
const cancelNewProjectBtn = newProjectDialog.querySelector("#cancelnewproject-btn");

const newTaskBtn = document.querySelector("#newtask-btn");
const newTaskDialog = document.querySelector("#newtask-dialog")
const newTaskForm = newTaskDialog.querySelector("#newtask-form");
const newTaskName = newTaskDialog.querySelector("#newtask-name");
const cancelNewTaskBtn = newTaskDialog.querySelector("#cancelnewtask-btn");

let projects = [];
let currentProject = null;

function saveList(){
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadList(){
    let savedProjectsString = localStorage.getItem("projects");
    if(localStorage.getItem("projects") === null || savedProjectsString == ""){
        displayList(currentProject);
        return;
    }
    let savedProjects = JSON.parse(savedProjectsString);
    
    savedProjects.forEach(element => {
        let savedProject = new Project(element.name);
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

        const removeProjectButton = document.createElement("button");
        removeProjectButton.addEventListener("click", () => {
            removeProject(element);
        });
        removeProjectButton.className = "sidebar-btn";

        const removeProjectIcon = document.createElement("span");
        removeProjectIcon.innerHTML = "remove";
        removeProjectIcon.className = "material-symbols-outlined";
        removeProjectButton.appendChild(removeProjectIcon);

        projectItem.appendChild(removeProjectButton);

        projectList.appendChild(projectItem);
    });
}

//remove projects from the list
function removeProject(projectToRemove){
    projects[projects.findIndex((element) => element == projectToRemove)] = null;
    projects = projects.filter((element) => element != null);

    if(currentProject == projectToRemove){
        if(projects.length > 0){
            currentProject = projects[0];
        } else {
            currentProject = null;
        }
    }

    displayList(currentProject);
    createProjectsList();
    saveList();
}

//creates the todo list for the project
function displayList(project){
    list.innerHTML = "";

    if(project == null){
        displayedProjectName.innerHTML = "Create a project to get started";
        addTaskBtn.hidden = true;
        addTaskBtn.style.display = "none";
        return;
    }

    displayedProjectName.innerHTML = project.name;
    addTaskBtn.hidden = false;
    addTaskBtn.style.display = "block";

    let todoList = project.getList();

    todoList.forEach(element => {
        const todoItem = document.createElement("li");

        const todoItemDiv = document.createElement("div");
        todoItemDiv.innerHTML = element;

        const removeButton = document.createElement("button");
        removeButton.className = "sidebar-btn";
        removeButton.addEventListener("click", () => {
            project.removeFromList(element);
            displayList(project);
            saveList();
        });

        const removeIcon = document.createElement("span");
        removeIcon.innerHTML = "remove";
        removeIcon.className = "material-symbols-outlined"
        removeButton.appendChild(removeIcon);
        todoItemDiv.appendChild(removeButton);
        todoItem.appendChild(todoItemDiv);

        list.appendChild(todoItem);
    });
}

createProjectBtn.addEventListener("click", () => {
    newProjectDialog.showModal();
});

cancelNewProjectBtn.addEventListener("click", () => {
    dialogProjectName.value = "";
    newProjectDialog.close();
});

newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let newProject = new Project(dialogProjectName.value);
    projects.push(newProject);

    if(currentProject == null){
        currentProject = newProject;
        displayList(currentProject);
    }

    createProjectsList();
    saveList();
    dialogProjectName.value = "";
    newProjectDialog.close();
});

newTaskBtn.addEventListener("click", () => {
    newTaskDialog.showModal();
});

cancelNewTaskBtn.addEventListener("click", () => {
    newTaskName.value = "";
    newTaskDialog.close();
});

newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    currentProject.addToList(newTaskName.value);
    displayList(currentProject);
    saveList();
    newTaskName.value = "";
    newTaskDialog.close();
});

loadList();
