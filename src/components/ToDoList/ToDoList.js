import { useSelector, useDispatch } from "react-redux";
// import { toggleTodo } from "../../redux/actions/todoActions";
import { actions, fetchTodos, update, deleteTask } from "../../redux/reducers/todoReducer";
import { todoSelector } from "../../redux/reducers/todoReducer";
import styles from "./ToDoList.module.css";
import {useEffect} from "react";

function ToDoList() {

  const todos=useSelector(todoSelector);
  
  const dispatch = useDispatch();
  // const todos= store.getState().todos;
  useEffect(() => {    
    dispatch(fetchTodos());
  }, []);
  
  
  return (
    <div className={styles.container}>
    <ul>
      {todos.map((todo,index) => (
        <li className={styles.item} key={todo.id}>
          <span className={styles.content}>{todo.title}</span>
          <span className={todo.completed ? styles.completed:styles.pending}>{todo.completed ? 'Completed': 'Pending'}</span>
          <button className="btn btn-warning"
          onClick={()=>{
            // console.log("[LOG]: Todo - TOGGLE Action dispatched");
            dispatch(actions.toggle(index))
            dispatch(update({
                id: 1,
                title: todo.title,
                body: 'bar',
                userId: 1,
                completed: true,}
            ))}}
          >Toggle</button>
          <button className="btn btn-warning" onClick={()=>{
          dispatch(deleteTask({id:todo.id}));
          }}>Delete</button>
          </li>
      ))}
    </ul>
    </div>
  );
}

export default ToDoList;