import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { todoSlice } from "../../store/reducers/TodoReducer";


export const TodoForm=()=>{
    const dispatch = useAppDispatch()
    const [title, setTitle]=useState('')
    const {addTodo}=todoSlice.actions
    const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        if(!title.trim())
        {
            return
        }
        dispatch(addTodo({title,isDone:false}))
        setTitle('')
    }
    const handleInputValue=(event:ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.target.value)
    }
    return(
        <div>
             <form onSubmit={handleSubmit} className="mb-3 d-flex align-items-end justify-content-between ">
            <div className="form-group" style={{width: '92%', marginRight:"10px"}}>
                <label className="form-label">Input Todo name</label>
                <input
                    value={title}
                    onChange={handleInputValue}
                    type="text"
                    className="form-control"
                    data-testid='createInput' 
                >
                </input>
            </div>
            <button className="btn btn-success">Create</button>
        </form>
        </div>
       
    )
}