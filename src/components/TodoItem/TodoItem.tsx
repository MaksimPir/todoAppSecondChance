import { FC, useState } from "react";
import './styles.css'
import { ITodo } from "../../models/models";

interface ITodoProps{
    todo:ITodo;
    deleteTodo:(arg0:number)=>void;
    completeTodo:(arg0:number)=>void;
    changeTodo:(arg0:string,arg1:boolean,arg2:number)=>void
}
export const TodoItem:FC<ITodoProps>=({todo,deleteTodo,completeTodo, changeTodo})=>
{
    const [isEdit, setIsEdit]=useState(false);
    const [newtitle, setNewTitle]=useState('');
    const handleSubmit=(event:React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key=='Enter')
        {
            if(newtitle.trim()!=='')
            {
                changeTodo(newtitle,todo.isDone, todo.id)
                setIsEdit(!isEdit)
            }
            else
            {
                setIsEdit(!isEdit)
            }
 
        }
    }
    const handleTitleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(event.target.value)
    }
    const handleTodoEdit=()=>{
        setNewTitle(todo.title)
        setIsEdit(!isEdit)
    }
    const handleDeleteTodo=()=>{
       deleteTodo(todo.id);  
    }
    const handleCompleteTodo=()=>{
        completeTodo(todo.id);   
     }
    return(
            <li className={
                `todo-item list-group-item d-flex justify-content-between align-items-center 
                ${todo.isDone? ' list-group-item-success':''}`
                }>
            <div 
                className="todo-text"
                onKeyDown={handleSubmit}
            >
                { isEdit ? 
                    <>
                        <input data-testid='titleInput' type='text' onChange={handleTitleChange}  value={newtitle}/>
                        <span>Press Enter to save changes</span>
                    </>
                    :
                    <span data-testid='titleSpan' className={`${todo.isDone? 'title-done':''}`}>
                        {todo.title}
                    </span>
                }
                
            </div>
            <div className="todo-btns">
                <button 
                    onClick={handleTodoEdit}
                    className="btn btn-primary btn-itemTodo">Update
                </button>
                {!todo.isDone &&<button onClick={handleCompleteTodo} className="btn btn-success btn-itemTodo">Done</button>}
                {todo.isDone &&<button onClick={handleCompleteTodo} className="btn btn-success btn-itemTodo">UnDone</button>}
                <button onClick={handleDeleteTodo} className="btn btn-danger btn-itemTodo">Delete</button>
            </div>
        </li>
        
    )
}