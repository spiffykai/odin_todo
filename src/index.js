import "./styles.css";
import { Project } from "./project.js";

let newProject = new Project();
newProject.addToList("tel");
console.log(newProject.getList());
