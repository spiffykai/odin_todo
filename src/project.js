class Project {
    constructor(){
        this.items = 0;
        this.todoList = [];
    }

    addToList(task){
        this.todoList.push(task);
        this.items++;
    }

    getList(){
        return this.todoList;
    }
};

export {Project};