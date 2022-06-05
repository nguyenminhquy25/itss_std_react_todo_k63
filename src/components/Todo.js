import React, { useState } from "react";

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from "./TodoItem";
// import Input from "./Input";
// import Filter from "./Filter";

// /* カスタムフック */
import useStorage from "../hooks/storage";

/* ライブラリ */
import { getKey } from "../lib/util";

function Todo() {
  // const [items, putItems] = React.useState([
  //   /* テストコード 開始 */
  //   { key: getKey(), text: "日本語の宿題", done: false },
  //   { key: getKey(), text: "reactを勉強する", done: false },
  //   { key: getKey(), text: "明日の準備をする", done: false },
  //   /* テストコード 終了 */
  // ]);

  const [items, putItems, clearItems] = useStorage([
    { key: getKey(), text: "日本語の宿題", done: false },
    { key: getKey(), text: "reactを勉強する", done: false },
    { key: getKey(), text: "明日の準備をする", done: false },
  ]);

  const [newItem, setNewItem] = React.useState({
    key: getKey(),
    text: "",
    done: false,
  });

  const [filterItems, setFilterItems] = useState(items);
  const handleChangeDone = (key) => {
    putItems(
      items.map((item) => {
        if (item.key === key) {
          item.done = !item.done;
        }

        return item;
      })
    );
  };

  const handleFilter = (event) => {
    putItems(
      filterItems.filter(
        (filterItem) => filterItem.text.indexOf(event.target.value) !== -1
      )
    );
  };

  const handleAddNewItem = () => {
    if (newItem.text.trim() === "") return;

    putItems([...items, newItem]);
    setFilterItems([...items, newItem]);
    setNewItem({
      key: getKey(),
      text: "",
      done: false,
    });
  };

  // const deleteAll = () => {
  //   putItems([]);
  // };

  const handleNewItemNameChange = (event) => {
    setNewItem({ ...newItem, text: event.target.value });
  };

  const handleSelectAll = () => {
    putItems(filterItems);
  };

  const handleSelectDoneOnly = () => {
    putItems(filterItems.filter((filterItem) => filterItem.done === true));
  };

  const handleSelectNotDoneOnly = () => {
    putItems(filterItems.filter((filterItem) => filterItem.done === false));
  };

  return (
    <>
      <div style={{ paddingBottom: "20px" }}>
        <input
          type="text"
          onChange={handleFilter}
          name="filter"
          className="input"
          placeholder="Filter"
        />
      </div>
      <div style={{ display: "flex", paddingBottom: "20px" }}>
        <div style={{ marginRight: "10px", width: "100%" }}>
          <input
            type="text"
            onChange={handleNewItemNameChange}
            className="input"
            value={newItem.text}
            placeholder="Add new item"
            onBlur={handleAddNewItem}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          paddingBottom: "20px",
          justifyContent: "center",
        }}
      >
        <button className="button" onClick={handleSelectAll}>
          すべて
        </button>
        <button className="button" onClick={handleSelectNotDoneOnly}>
          未完了
        </button>
        <button className="button" onClick={handleSelectDoneOnly}>
          完了済み
        </button>
      </div>
      <div className="panel">
        <div className="panel-heading">ITSS ToDoアプリ</div>
        {items.map((item) => (
          <TodoItem
            key={item.key}
            text={item.text}
            done={item.done}
            handleChangeDone={() => handleChangeDone(item.key)}
          />
        ))}

        <div className="panel-block">{items.length} items</div>
      </div>
      <button className="button" onClick={clearItems} style={{ width: "100%" }}>
        の全てのToDoを消除
      </button>
    </>
  );
}

export default Todo;
