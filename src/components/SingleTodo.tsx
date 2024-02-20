import React from 'react';
import './styles.css';
import { Todo } from '../model';
import { CiEdit } from "react-icons/ci"
import { AiFillDelete } from "react-icons/ai";
import { MdFileDownloadDone } from "react-icons/md";

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}


const SingleTodo = ({todo, todos, setTodos}: Props) => {
  return (
    <form className="todos_single">
      <span className="todosText">{todo.todo}</span>
      <div>
        <span className="icon">
          <CiEdit />
        </span>
        <span className="icon">
          <AiFillDelete />
        </span>
        <span className="icon">
          <MdFileDownloadDone />
        </span>
      </div>
    </form>
  )
}

export default SingleTodo