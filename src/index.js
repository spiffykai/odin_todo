import "./styles.css";
import testJson from "./test.json";
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

console.log(testJson.projects);

testJson.projects.forEach(element => {
    console.log(element.name);
    let testProject = new Project(element.name);
    element.tasks.forEach(element => {
        testProject.addToList(element);
    });

    projects.push(testProject);
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

displayList(projects[0]);

if(projects.length > 0)
    currentProject = projects[0];

addBtn.addEventListener("click", () => {
    currentProject.addToList(document.querySelector("#task-input").value);
    displayList(currentProject);
    document.querySelector("#task-input").value = "";
});