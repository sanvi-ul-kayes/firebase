import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "firebase/database";

const App = () => {
  let [task, setTask] = useState("");
  let [todos, setAllTodos] = useState([]);

  let handlesubmit = () => {
    const db = getDatabase();
    set(push(ref(db, "todos/")), {
      name: task,
    }).then(() => {
      setTask("");
      alert("Task Added");
    });
  };

  let handleTask = (e) => {
    setTask(e.target.value);
  };
  let handleDelete = (id) => {
    const db = getDatabase();
    remove(ref(db, "todos/" + id));
  };

  useEffect(() => {
    const db = getDatabase();
    const getTodos = ref(db, "todos/");
    let array = [];
    onValue(getTodos, (snapshot) => {
      snapshot.forEach((item) => {
        array.push({ ...item.val(), id: item.key });
      });
      setAllTodos(array);
    });
  }, []);

  return (
    <>
      <div className="w-[227px] mx-auto border-4 text-center p-4 mt-10">
        <h2>TODO LIST</h2>
        <input
          className="border-2"
          type="text"
          placeholder="ENTER YOUR TASK"
          onChange={handleTask}
          value={task}
        />
        <button
          onClick={handlesubmit}
          className=" border-2 border-black p-2 mt-4 rounded-[30%] mb-[10px]"
        >
          Submit
        </button>
        <ul>
          {todos.map((item) => {
            return (
              <li className="mb-[5px]">
                {item.name}
                <button
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                  className="border-2 bg-red-200 px-1 rounded-[20%]"
                >
                  x
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default App;
