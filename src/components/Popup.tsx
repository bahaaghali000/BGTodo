import { useEffect, useState } from "react";
import "../styles/popup.css";
import { ITodo } from "../model";

interface IPopup {
  mode: string;
  setShowPopup: any;
  todos: ITodo[];
  setTodos: any;
  task?: ITodo;
}

const Popup: React.FC<IPopup> = ({
  mode,
  setShowPopup,
  todos,
  setTodos,
  task,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>("");

  useEffect(() => {
    if (mode === "edit" && task) {
      setTaskTitle(task.taskTitle);
    }
  }, [mode]);

  const addTask = () => {
    if (taskTitle.trim()) {
      setShowPopup(false);
      if (mode === "add") {
        setTodos([
          ...todos,
          {
            id: Date.now(),
            taskTitle: taskTitle,
            isCompleted: false,
          },
        ]);
      } else {
        setTodos((data: ITodo[]) => {
          // Update the task title
          const newData = data.map((t) => {
            if (t === task) {
              return { ...t, taskTitle: taskTitle };
            }
            return t;
          });
          return newData;
        });
      }
    } else {
      alert("Please, Enter the task title");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask();
  };

  return (
    <div className="popup">
      <h2>{mode === "add" ? "New" : "Edit"} Note</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Input your task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          autoFocus
          maxLength={50}
        />
      </form>

      <div className="popup-actions">
        <button onClick={() => setShowPopup(false)}>Cancel</button>
        <button onClick={addTask}>Apply</button>
      </div>
    </div>
  );
};

export default Popup;
