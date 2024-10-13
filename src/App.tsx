import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  interface Task {
    id: string;
    name: string;
    term: Date | null;
  }

  const [taskName, setTaskName] = useState<string>("");
  const [termValue, setTermValue] = useState<string>("");
  const [termDate, setTermDate] = useState<Date | null>(null);
  const [selectedTaskID, setSelectedTaskID] = useState<string | null>(null);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [incompTodo, setIncompTodo] = useState<Task[]>([]);
  const [progress, setProgress] = useState<Task[]>([]);
  const [compTodo, setCompTodo] = useState<Task[]>([]);

  // 未完了に追加
  const onClickAdd = () => {
    setTermDate(changeDate());
    if (taskName !== "") {
      const newTask: Task = {
        id: uuidv4(),
        name: taskName,
        term: termDate,
      };
      setIncompTodo([...incompTodo, newTask]);
      setTaskName("");
      setTermValue("");
    }
  };
  // 進行中に
  const onClickProgress = (text: string) => {
    const task = incompTodo.find((t) => t.name === text);
    if (task) {
      setProgress([...progress, task]);
      setIncompTodo(incompTodo.filter((t) => t.name !== text));
    }
  };
  // 完了に
  const onClickComplete = (text: string) => {
    const task = progress.find((t) => t.name === text);
    if (task) {
      setCompTodo([...compTodo, task]);
      setProgress(progress.filter((t) => t.name !== text));
    }
  };

  // 進行中に戻す
  const returnProgress = (text: string) => {
    const task = compTodo.find((t) => t.name === text);
    if (task) {
      setProgress([...progress, task]);
      setCompTodo(compTodo.filter((t) => t.name !== text));
    }
  };
  // 未完了に戻す
  const returnIncomplete = (text: string) => {
    const task = progress.find((t) => t.name === text);
    if (task) {
      setIncompTodo([...incompTodo, task]);
      setProgress(progress.filter((t) => t.name !== text));
    }
  };

  // チェックされたタスクのIDを管理
  const selectedTask = (taskID: string) => {
    setSelectedTaskID(taskID);
  };
  // 削除
  const onClickDelete = () => {
    if (selectedTask !== null) {
      setIncompTodo(incompTodo.filter((task) => task.id !== selectedTaskID));
      setProgress(progress.filter((task) => task.id !== selectedTaskID));
      setCompTodo(compTodo.filter((task) => task.id !== selectedTaskID));
    }
  };

  // 日付変換
  function changeDate(): Date | null {
    const parts = termValue.split("/");
    if (parts.length === 3 && parts !== null) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date;
    }
    return null;
  }

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
          <button onClick={() => onClickAdd()}>追加</button>
        </div>
        <div>
          <button>編集</button>
          <button onClick={() => onClickDelete()}>削除</button>
        </div>
      </div>
      <div className="taskContainer">
        <div className="incompleteContainer">
          <p className="status">未完了</p>
          {incompTodo.map((text, index) => (
            <ul key={index} className="incompTag">
              <input
                type="checkbox"
                checked={selectedTaskID === text.id}
                onChange={() => selectedTask(text.id)}
              />
              <li>
                <p>
                  {text.id} : {text.name} :
                  {text.term ? text.term.toLocaleDateString() : "期限未登録"}
                </p>
              </li>
              <div>
                <button onClick={() => onClickProgress(text.name)}>→</button>
              </div>
            </ul>
          ))}
        </div>
        <div className="progressContainer">
          <p className="status">進行中</p>
          {progress.map((text, index) => (
            <ul key={index} className="progressTag">
              <input
                type="checkbox"
                checked={selectedTaskID === text.id}
                onChange={() => selectedTask(text.id)}
              />
              <li>
                <p>
                  {text.id}: {text.name}
                </p>
              </li>
              <div>
                <button onClick={() => returnIncomplete(text.name)}>←</button>
                <button onClick={() => onClickComplete(text.name)}>→</button>
              </div>
            </ul>
          ))}
        </div>
        <div className="completeContainer">
          <p className="status">完了</p>
          {compTodo.map((text, index) => (
            <ul key={index} className="compTag">
              <input
                type="checkbox"
                checked={selectedTaskID === text.id}
                onChange={() => selectedTask(text.id)}
              />
              <li>
                <p>
                  {text.id}: {text.name}
                </p>
              </li>
              <div>
                <button onClick={() => returnProgress(text.name)}>←</button>
              </div>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
