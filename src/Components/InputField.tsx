import React, { useRef } from 'react'
import "./style.css";

interface IProps
{
    todo:string;
    setTodo:React.Dispatch<React.SetStateAction<string>>;
    handleAdd:(e:React.FormEvent) => void;
}


export default function InputField({todo,setTodo,handleAdd}:IProps) {

    const inputRef = useRef<HTMLInputElement>(null);      // it is same as document.getElementbyid/className

    function handleChange(event:React.ChangeEvent<HTMLInputElement>)
    {
        setTodo(event.target.value);
        console.log(todo);
    }
    
  return (
    <form className='input' onSubmit={(e) =>{
      handleAdd(e);
      inputRef.current?.blur();
    }}>
      <input ref={inputRef} type="input" className= 'input_box' value={todo} onChange={handleChange} placeholder='Enter a Task' />
      <button type='submit' className='input_submit'>Go</button>
    </form>
  )
} 
 