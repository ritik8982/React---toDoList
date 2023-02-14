
import React from "react";
import "./style.css";
import {ITodo} from "../model"
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
// todos for rendering and setTodos for marking it is complete and delete task

interface IProps
{
    todos:ITodo[];
    setTodos:React.Dispatch<React.SetStateAction<ITodo[]>>;
    completedTodos:ITodo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}
const TodoList:React.FC<IProps> = ({todos,setTodos,completedTodos,setCompletedTodos}:IProps) =>{
    return (

        <div className="container">
            <Droppable droppableId="TodosList">
                {
                    (provided) => (
                        <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos_heading">Active Task</span>
                        {todos.map((todo,index)=> <SingleTodo index = {index} todo={todo} key={todo.id} todos={todos} setTodos = {setTodos}/>)}
                        
                        {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>

            <Droppable droppableId="TodosRemove">
                {
                    (provided) => (
                        <div className="todos remove" ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos_heading">Completed Task</span>
                            {completedTodos.map((todo,index)=> <SingleTodo index = {index} todo={todo} key={todo.id} todos={completedTodos} setTodos = {setCompletedTodos}/>)}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>

    );
}

export default TodoList;