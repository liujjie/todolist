//todoitem对象类型
export interface ITodo {
    id: number,
    title: string;
    content: string;
    tags:string[];
    completed:Boolean
}

// 数组类型
export interface ITodoList{
    todoList: ITodo[]
}

export enum ACTION_TYPE{
    ADD_TODO = 'addTodo',
    REMOVE_TODO = 'removeTodo',
    TOGGLE_TODO = 'toggleTodo',
    INIT_TODOLIST = 'initTodoList'
}

export interface IAction{
    type: ACTION_TYPE,
    payload: ITodo | ITodo[] | number 
}