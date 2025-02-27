import "./styles.css";
import { Project } from "./project.js";

const contentDiv = document.querySelector("#content");
const list = document.querySelector("#todo-list");
const projectList = document.querySelector("#project-list");
const displayedProjectName = document.querySelector("#projectname");
const addTaskSection = document.querySelector("#addtask-section");
const addBtn = document.querySelector("#add-btn");
const createProjectBtn = document.querySelector("#createproject-btn");
const newProjectDialog = document.querySelector("#newproject-dialog");
const newProjectForm = newProjectDialog.querySelector("#newproject-form");
const dialogProjectName = newProjectDialog.querySelector("#newproject-name");
const cancelNewProjectBtn = newProjectDialog.querySelector("#cancelnewproject-btn");

let projects = [];
let currentProject = null;

function saveList(){
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadList(){
    let savedProjectsString = localStorage.getItem("projects");
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
        addTaskSection.hidden = true;
        return;
    }

    displayedProjectName.innerHTML = project.name;
    addTaskSection.hidden = false;

    let todoList = project.getList();

    todoList.forEach(element => {
        const todoItem = document.createElement("li");
        todoItem.innerHTML = element;

        const removeButton = document.createElement("button");
        removeButton.innerHTML = "remove";
        removeButton.addEventListener("click", () => {
            project.removeFromList(element);
            displayList(project);
            saveList();
        });
        todoItem.appendChild(removeButton);

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

loadList();
