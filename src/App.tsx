import React, { useState } from "react";
import "./App.css";

function App() {
  interface Task {
    id: number;
    name: string;
  }

  const [text, setText] = useState<string>("");
  const [incompTodo, setIncompTodo] = useState<Task[]>([]);
  const [progress, setProgress] = useState<Task[]>([]);
  const [compTodo, setCompTodo] = useState<Task[]>([]);
  const [is, setIs] = useState<boolean>(false);

  // 未完了に追加
  const onClickAdd = () => {
    if (text !== "") {
      const newTask: Task = {
        id: incompTodo.length + progress.length + compTodo.length + 1,
        name: text,
      };
      setIncompTodo([...incompTodo, newTask]);
      setText("");
      setIs(false);
    }
  };
  // 進行中
  const onClickProgress = (text: string) => {
    const task = incompTodo.find((t) => t.name === text);
    if (task) {
      setProgress([...progress, task]);
      setIncompTodo(incompTodo.filter((t) => t.name !== text));
    }
  };
  // 完了
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

  return (
    <div className="App">
      <div className="header">
        <p className="text-white border-b border-gray-200 ">Todoアプリ</p>
        <div className="addTodo">
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={() => onClickAdd()}>追加</button>
        </div>
      </div>
      <div className="taskContainer">
        <div className="incompleteContainer">
          <p className="status">未完了</p>
          {incompTodo.map((text, index) => (
            <ul key={index} className="incompTag">
              <li>
                <p>
                  {text.id}: {text.name}
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
