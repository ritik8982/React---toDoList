
import React, { useEffect, useRef, useState } from "react";
import { ITodo } from "../model";
import {AiFillEdit,AiFillDelete} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import "./style.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
    index:number;
    todo:ITodo,
    todos:ITodo[],
    setTodos:React.Dispatch<React.SetStateAction<ITodo[]>>;
}
const SingleTodo:React.FC<Props> = ({index, todo,todos,setTodos}:Props) =>{

    // for edit functionality
    const [edit,setEdit] = useState<boolean>(false);
    const [editTodo,setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id:number) =>{
            setTodos(todos.map((todo) => todo.id === id ? {...todo,isDone:!todo.isDone} : todo))
    }
    const handleDelete = (id:number) =>{
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const handleEdit = (e:React.FormEvent,id:number) =>{
        e.preventDefault();
        setTodos(todos.map((todo) => todo.id === id ? {...todo,todo:editTodo} : todo));
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        inputRef.current?.focus();
    },[edit])
    
    return (
        <>
        {/* jo ek todo hai wo ek form hai jisme edit ke leye onSubmit use kar rahe hai */}
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided) => ( 
                    <form action="" className="todos_single" onSubmit={(e) => handleEdit(e,todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {
                        edit ? (<input className='todos_single-text' value={editTodo} onChange={(e) => setEditTodo(e.target.value)}/>) : (todo.isDone ? (<s className="todo_single-text">{todo.todo}</s>) : (<span className="todo_single-text">{todo.todo}</span>))
                    }
                    
                    <div>
                        <span className="icon" onClick={()=>{
                            if(!edit && !todo.isDone)
                            setEdit(!edit);
        
                        }}><AiFillEdit/></span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete/></span>
                        <span className="icon" onClick={() => handleDone(todo.id)}><MdDone/></span>
                    </div>
                </form>
                )
            }
        </Draggable>
        </>
    );
}
export default SingleTodo;