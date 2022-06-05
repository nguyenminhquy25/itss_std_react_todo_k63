/* 
  【TodoItemコンポーネント】
　・Todoアイテムを表示する
　・チェックボックスにチェックが入っているか管理する
　・チェックボックスにチェックが入っているかアイテムをグレーアウトする
// */
// import { useState } from "react";

function TodoItem({ text, done, handleChangeDone }) {
  return (
    <label
      className="panel-block"
      onClick={handleChangeDone}
      style={done ? { color: "gray" } : {}}
    >
      <input type="checkbox" defaultChecked={done ? true : false} />
      {text}
    </label>
  );
}

export default TodoItem;
