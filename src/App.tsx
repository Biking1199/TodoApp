import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  interface Task {
    id: string;
    name: string;
    term: string | undefined;
    status: "未完了" | "進行中" | "完了";
    isCheck: boolean;
  }

  const [taskName, setTaskName] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [termValue, setTermValue] = useState<string | undefined>("");

  // 未完了に追加
  const addTask = () => {
    if (taskName !== "") {
      const newTask: Task = {
        id: uuidv4(),
        name: taskName,
        term: termValue,
        status: "未完了",
        isCheck: false,
      };
      setTasks([...tasks, newTask]);
      setTaskName("");
      setTermValue("");
    }
  };
  // ステータス変更
  const changeStatus = (
    id: string,
    newStatus: "未完了" | "進行中" | "完了"
  ) => {
    const updateTask = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updateTask);
  };

  // チェックされたタスクのIDを管理
  const selectedTask = (taskID: string) => {
    const updateTask = tasks.map((task) =>
      task.id === taskID ? { ...task, isCheck: !task.isCheck } : task
    );
    setTasks(updateTask);
  };

  // 削除
  const deleteTask = () => {
    const updateTask = tasks.filter((task) => task.isCheck === false);
    setTasks(updateTask);
  };

  // 編集
  const editing = () => {
    const editingTask = tasks.find((task) => task.isCheck === true);
    if (editingTask !== undefined) {
      setTaskName(editingTask.name);
      setTermValue(editingTask.term);
    }
  };

  const incompleteTasks = tasks.filter((task) => task.status === "未完了");
  const progressTasks = tasks.filter((task) => task.status === "進行中");
  const completeTasks = tasks.filter((task) => task.status === "完了");

  return (
    <div className="App">
      <div className="header">
        <p className="text-white border-b border-gray-200 ">Todoアプリ</p>
        <div className="addTodo">
          <input
            placeholder="タスク名: 本を読む"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            placeholder="期限: 2024/10/10"
            type="text"
            value={termValue}
            onChange={(e) => {
              setTermValue(e.target.value);
            }}
          />
          <button onClick={() => addTask()}>追加</button>
        </div>
        <div>
          <button onClick={() => editing()}>編集</button>
          <button onClick={() => deleteTask()}>削除</button>
        </div>
      </div>
      <div className="taskContainer">
        <div className="incompleteContainer">
          <p className="status">未完了</p>
          {incompleteTasks.map((task, index) => (
            <ul key={index} className="incompTag">
              <input
                type="checkbox"
                checked={task.isCheck}
                onChange={() => selectedTask(task.id)}
              />
              <li>
                <p>
                  {task.name} : {task.status} :
                  {task.term !== null ? task.term : "期限未登録"}
                </p>
              </li>
              <div>
                <button onClick={() => changeStatus(task.id, "進行中")}>
                  →
                </button>
              </div>
            </ul>
          ))}
        </div>
        <div className="progressContainer">
          <p className="status">進行中</p>
          {progressTasks.map((task, index) => (
            <ul key={index} className="progressTag">
              <input
                type="checkbox"
                checked={task.isCheck}
                onChange={() => selectedTask(task.id)}
              />
              <li>
                <p>
                  {task.name} : {task.status} :
                  {task.term ? task.term : "期限未登録"}
                </p>
              </li>
              <div>
                <button onClick={() => changeStatus(task.id, "未完了")}>
                  ←
                </button>
                <button onClick={() => changeStatus(task.id, "完了")}>→</button>
              </div>
            </ul>
          ))}
        </div>
        <div className="completeContainer">
          <p className="status">完了</p>
          {completeTasks.map((task, index) => (
            <ul key={index} className="compTag">
              <input
                type="checkbox"
                checked={task.isCheck}
                onChange={() => selectedTask(task.id)}
              />
              <li>
                <p>
                  {task.name} :{task.term ? task.term : "期限未登録"}
                </p>
              </li>
              <div>
                <button onClick={() => changeStatus(task.id, "進行中")}>
                  ←
                </button>
              </div>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
