import { TodoItem } from "../TodoItem/TodoItem"
import { TransitionGroup,CSSTransition} from "react-transition-group"
import './styles.css'
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import {  todoSlice } from "../../store/reducers/TodoReducer"
import { enumFilter } from "../../types/types"

export const TodoList=()=>{
    const {todos,filter}=useAppSelector(state=>state.todos)
    const dispatch=useAppDispatch()
    const {completeTodo,deleteTodo,editTodo}=todoSlice.actions
    const changeTodo=(title:string,isDone:boolean,id:number)=>{
        dispatch(editTodo({id, isDone, title}))
    }
    const removeTodo=(id:number)=>{
        dispatch(deleteTodo(id))
    }
    const completeTodoItem=(id:number)=>{
        dispatch(completeTodo({id}))
    }
    let countTodo=0;
    return(
        <TransitionGroup component='ul' className='list-group'>
            <>
                {todos.map(todo=>
                    {
                        if(!todo.isDone)
                        {
                            countTodo++
                        }
                        return (filter==enumFilter.ALL ||(filter==enumFilter.ACTIVE)&&!(todo.isDone)||(filter==enumFilter.COMPLETED&&todo.isDone)) &&  
                        (
                            <CSSTransition 
                                timeout={800}
                                className={'todo'}
                                key={todo.id}
                            >
                                <TodoItem 
                                deleteTodo={removeTodo}
                                completeTodo={completeTodoItem}
                                todo={todo}
                                changeTodo={changeTodo}
                                />
                            </CSSTransition>
                        )
                    }
                )}
            </>
            {countTodo>0? <span>You need to do {countTodo} task/tasks!</span>:<span>Congratulations! You haven`t tasks.</span>}
           
        </TransitionGroup>
    )
}