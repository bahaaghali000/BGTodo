import { useState, useEffect, Fragment } from "react";
import "../styles/todos.css";
import {
  MdOutlineModeEditOutline,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
} from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";

import EmptImg from "../assets/Detective-check-footprint 1.png";

import Popup from "./Popup";
import { ITodo } from "../model";

interface ITodos {
  searchInput: string;
  selectOption: string;
}

const Todos: React.FC<ITodos> = ({ searchInput, selectOption }) => {
  const [taskValueToEdit, setTaskValueToEdit] = useState<ITodo>();
  const [popup, setPopup] = useState<string>("add");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todosData, setTodosData] = useState<ITodo[]>(todos);

  useEffect(() => {
    // Add to localStorage
    if (todos.length > 0) {
      localStorage.setItem("bgtodo-todos", JSON.stringify(todos));
    }
    setTodosData(todos);
  }, [todos]);

  useEffect(() => {
    // get from localStorage
    const storedTodos = JSON.parse(localStorage.getItem("bgtodo-todos")!) || [];
    setTodos(storedTodos);
  }, []);

  // Edit / Delete / Complete
  const handleDone = (id: number) => {
    setTodos((todos) => {
      const newData = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
      setTodosData(newData);
      return newData;
    });
  };

  const handleEdit = (t: ITodo) => {
    setPopup("edit");
    setShowPopup(true);
    const task: ITodo[] = todos.filter((todo) => todo === t);
    setTaskValueToEdit(task[0]);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // handle Filters
  useEffect(() => {
    if (selectOption === "complete") {
      const filteredTodos = todos.filter((todo) => todo.isCompleted === true);
      setTodosData(filteredTodos);
    } else if (selectOption === "inomplete") {
      const filteredTodos = todos.filter((todo) => todo.isCompleted === false);
      setTodosData(filteredTodos);
    } else {
      setTodosData(todos);
    }
  }, [selectOption]);

  // handle Search Results
  useEffect(() => {
    if (searchInput) {
      const searchResults = todosData.filter((t) =>
        t.taskTitle.toLowerCase().includes(searchInput)
      );
      setTodosData(searchResults);
    } else {
      setTodosData(todos);
    }
  }, [searchInput]);

  return (
    <div className="todos">
      <ul>
        {todosData.length > 0 ? (
          todosData.map((todo: ITodo) => (
            <Fragment key={todo.id}>
              <li className="task">
                <div>
                  <span
                    className="checkbox"
                    onClick={() => handleDone(todo.id)}
                  >
                    {todo.isCompleted ? (
                      <MdCheckBox />
                    ) : (
                      <MdCheckBoxOutlineBlank />
                    )}
                  </span>

                  <h4
                    className={`task-title ${
                      todo.isCompleted ? "task-done" : ""
                    }`}
                  >
                    {todo.taskTitle}
                  </h4>
                </div>

                <div className="task-actions">
                  <span onClick={() => handleEdit(todo)}>
                    <MdOutlineModeEditOutline />
                  </span>
                  <span onClick={() => handleDelete(todo.id)}>
                    <FaRegTrashCan />
                  </span>
                </div>
              </li>
              <hr />
            </Fragment>
          ))
        ) : (
          <div className="empty-tasks">
            <img src={EmptImg} alt="" />
            <h3>Empty...</h3>
          </div>
        )}
      </ul>

      <div
        className="add-task"
        onClick={() => {
          setShowPopup(true);
          setPopup("add");
        }}
      >
        <AiOutlinePlus />
      </div>

      {showPopup && (
        <Popup
          mode={popup}
          setShowPopup={setShowPopup}
          todos={todos}
          setTodos={setTodos}
          task={taskValueToEdit}
        />
      )}

      <div
        className="popup-backdrop"
        onClick={() => setShowPopup(false)}
        style={showPopup ? { visibility: "visible", opacity: "1" } : {}}
      ></div>
    </div>
  );
};

export default Todos;
