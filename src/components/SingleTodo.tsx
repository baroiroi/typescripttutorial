import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { Todo } from '../model';
import { CiEdit } from "react-icons/ci"
import { AiFillDelete } from "react-icons/ai";
import { MdFileDownloadDone } from "react-icons/md";
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    index: number;
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const SingleTodo = ({index, todo, todos, setTodos}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id:number) => {
  setTodos(todos.map((todo) => todo.id===id?{...todo, isDone: !todo.isDone}:todo))
}  
  const handleDelete = (id:number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const handleEdit = (e:React.FormEvent,id:number) => {
    e.preventDefault();

    setTodos(todos.map((todo) => (todo.id === id?{...todo, todo:editTodo}:todo)));
    setEdit(false);
  }

  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
        <form className={`todos_single ${snapshot.isDragging? 'dragging' : ''}`}
        onSubmit = {(e) => handleEdit(e,todo.id)}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>
      {
        edit ? (
          <input
          ref={inputRef}           
          value={editTodo}
          onChange = {(e) => setEditTodo(e.target.value)}
          className='todosText'/>
        ) :
      todo.isDone ?
      (<s className="todosText">{todo.todo}</s> ): (<span className="todosText">{todo.todo}</span>)
      }
      <div>
        <span className="icon" onClick = {
          () => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }
        }>
          <CiEdit />
        </span>
        <span className="icon" onClick = {
          () => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick = {() => handleDone(todo.id)}>
          <MdFileDownloadDone />
        </span>
      </div>
    </form>
        )
      }
    </Draggable>
    )
}

export default SingleTodo