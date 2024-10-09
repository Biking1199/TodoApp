import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState<string>("");
  const [todo, setTodo] = useState<string[]>([]);
  const [compTodo, setCompTodo] = useState<string[]>([]);

  // 追加
  const onClickAdd = () => {
    setTodo([...todo, text]);
    setText("");
  };

  // 完了
  const onClickComplete = (text: string) => {
    setCompTodo([...compTodo, text]);
    const upDateTodo = todo.filter((todo) => todo !== text);
    setTodo(upDateTodo);
  };

  // 削除
  const onClickDelete = (text: string) => {
    const upDateTodo = todo.filter((todo) => todo !== text);
    setTodo(upDateTodo);
  };

  // 戻す
  const onClickReturn = (text: string) => {
    const upDateTodo = compTodo.filter((todo) => todo !== text);
    setCompTodo(upDateTodo);
    setTodo([...todo, text]);
  };
  return (
    <div className="App">
      <p>Todoアプリ</p>
      <div className="addTodo">
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => onClickAdd}>追加</button>
      </div>
      <div className="incompleteContainer">
        <p>未完了</p>
        {todo.map((text, index) => (
          <ul key={index}>
            <li>
              {index + 1} : {text}
            </li>
            <button onClick={() => onClickComplete(text)}>完了</button>
            <button onClick={() => onClickDelete(text)}>削除</button>
          </ul>
        ))}
      </div>
      <div className="completeContainer">
        <p>完了</p>
        {compTodo.map((text, index) => (
          <ul>
            <li>{text}</li>
            <button onClick={() => onClickReturn(text)}>戻す</button>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
