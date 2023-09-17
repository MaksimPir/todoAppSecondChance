import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { changeFilter, deleteCompleted } from "../../store/reducers/TodoReducer";
import { enumFilter } from "../../types/types";

const FilteringButtons = () => {
    const dispatch=useAppDispatch()
    const {filter}=useAppSelector(state=>state.todos)
    return (
        <div className='flex-class p-4'>
        <button onClick={()=>{dispatch(changeFilter(enumFilter.ALL))}} className={filter===enumFilter.ALL?"btn btn-primary":"btn"}>All</button>
        <button onClick={()=>{dispatch(changeFilter(enumFilter.COMPLETED))}} className={filter===enumFilter.COMPLETED?"btn btn-primary":"btn"}>Completed</button>
        <button onClick={()=>{dispatch(changeFilter(enumFilter.ACTIVE))}}  className={filter===enumFilter.ACTIVE?"btn btn-primary":"btn"}>Active</button>
        <button data-testId='clearCompleted' onClick={()=>{dispatch(deleteCompleted())}}  className="btn flex-self">Clear Completed</button>
      </div>
    );
};

export default FilteringButtons;