import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState<string>("");
  const [todo, setTodo] = useState<string[]>([]);
  const [compTodo, setCompTodo] = useState<string[]>([]);
  const [is, setIs] = useState<boolean>(false);

  // 追加
  const onClickAdd = () => {
    if (text !== "") {
      setTodo([...todo, text]);
      setText("");
      setIs(false);
    } else {
      setIs(true);
    }
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
      <p className="border-b border-gray-200 w-1/2">Todoアプリ</p>
      {is === true ? (
        <p className="text-rose-600">タスク名を入力してください。</p>
      ) : null}
      <div className="addTodo">
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => onClickAdd()}>追加</button>
      </div>
      <div className="incompleteContainer">
        <p>未完了</p>
        {todo.map((text, index) => (
          <ul key={index}>
            <li>
              <p className="text-gray-500">●{text}</p>
            </li>
            <div className="flex-wrap ">
              <button onClick={() => onClickComplete(text)}>完了</button>
              <button onClick={() => onClickDelete(text)}>削除</button>
            </div>
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
