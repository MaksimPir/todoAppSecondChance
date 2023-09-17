import { enumFilter } from '../../../types/types';
import { ITodo } from './../../../models/models';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialStateTodos{
    todos:ITodo[],
    filter:enumFilter
}
const initialState:IInitialStateTodos={
    todos:[],
    filter:enumFilter.ALL
}
type TypeActionTodo=Omit<ITodo,'id'>
type TypeActionCompleteTodo=Pick<ITodo,'id'>
export const todoSlice=createSlice(
    {
        name:'todos',
        initialState:initialState,
        reducers:{
            addTodo:(state, action:PayloadAction<TypeActionTodo>)=>{
                state.todos.push({id:Number(new Date()), ...action.payload})
            },
            deleteTodo:(state, action:PayloadAction<number>)=>{
                state.todos=[...state.todos.filter((el)=>{
                    if(el.id!==action.payload)
                    {
                        return el
                    }
                })]
            },
            editTodo:(state, action:PayloadAction<ITodo>)=>{
                state.todos=state.todos.map((el)=>{
                    if(el.id===action.payload.id)
                    {
                        el={...action.payload}
                    }
                    return el
                })
            },
            completeTodo:(state, action:PayloadAction<TypeActionCompleteTodo>)=>{
                state.todos.map((el)=>{
                    if(el.id===action.payload.id)
                    {
                        return el.isDone=!el.isDone
                    }
                    return el
                })
            },
            changeFilter(state,action:PayloadAction<enumFilter>)
            {
                state.filter=action.payload
            },
            deleteCompleted(state)
            {
              state.todos=state.todos.filter((el)=>{
                    if(!el.isDone)
                    {
                        return el
                    }
                })
            },
            setInitialState(state){
                state=initialState
            }
        }
    }
)
export const {addTodo,deleteTodo,editTodo,changeFilter,completeTodo,deleteCompleted,setInitialState}=todoSlice.actions
export default todoSlice.reducer