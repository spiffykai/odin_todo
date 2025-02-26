class Project {
    Project(){
        this.items = 0;
        this.todoList = [];
    }

    addToList(task){
        this.todoList[this.items] = task;
        this.items++;
    }

    getList(){
        return this.todoList;
    }
};

export {Project};