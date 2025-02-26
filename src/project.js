class Project {
    constructor(name){
        this.name = name;
        this.items = 0;
        this.todoList = [];
    }

    addToList(task){
        this.todoList.push(task);
        this.items++;
    }

    removeFromList(task){
        if(this.todoList.find((element) => element == task)){
            this.todoList[this.todoList.findIndex((element) => element == task)] = null;
            //remove all null elements from the array
            this.todoList = this.todoList.filter((element) => element != null);
        }
    }

    getList(){
        return this.todoList;
    }
};

export {Project};