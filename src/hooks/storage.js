import { useState, useEffect } from "react";

/* 
  【Storageフック】
　・TodoをlocalStorageを使って保存する
　・以下機能をサポートする
　  - localstrageに保存されているすべてのTodoの読み出し機能
　  - Todoをlocalstrageに保存する
　  - localstrageにあるTodoを削除する
*/

// const STORAGE_KEY = 'itss-todo';

function getSavedTodo(initialValue) {
  const savedTodo = JSON.parse(localStorage.getItem("savedTodo"));
  if (savedTodo && savedTodo.length !== 0) return savedTodo;

  return initialValue;
}

function useStorage(initialValue) {
  const [items, putItems] = useState(
    getSavedTodo(initialValue)
  ); /* 副作用を使う */

  useEffect(() => {
    localStorage.setItem("savedTodo", JSON.stringify(items));
  }, [items]);

  const clearItems = () => {
    putItems([]);
  };

  return [items, putItems, clearItems];
}

export default useStorage;
