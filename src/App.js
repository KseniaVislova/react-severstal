import React, { useState, useReducer, useEffect } from "react";
import { format } from 'date-fns'
import styles from "./App.module.css";

const temp = localStorage.getItem("data");
const getSaveData = () => {
  const temp = localStorage.getItem("data");
  const initialValue = temp ? JSON.parse(temp) : { items: [{id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", canChange: false, date: format(new Date(2022, 3, 26), 'dd.MM.yyyy')}], };
  return initialValue;
}

const initialState = getSaveData();

function reducer(state = initialState, action) {
  switch (action.type) {
    case "updateNotes": 
      return { ...state, items: action.payload };
    case "updateCanChange": 
      return { ...state, items: action.payload };
    case "updateItem":
      return { ...state, items: action.payload };
    case "deleteItem": 
      return { ...state, items: action.payload };
    case "deleteAllItems": 
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

const App = () => {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [newItem, setNewItem] = useState("");
  const [value, setValue] = useState('');

  const changeNewItem = (e) => {
    setNewItem(e.target.value);
  }

  const changeItem = (e) => {
    setValue(e.target.value);
  }

  const dispatchNewItem = (e) => {
    e.preventDefault();
    const obj = {
      id: Math.floor(new Date().getTime() + (Math.random() * 10)),
      text: newItem,
      canChange: false,
      date: format(new Date(), 'dd.MM.yyyy')
    }
    if (newItem !== '') {
      dispatch({
        type: "updateNotes",
        payload: [obj, ...data.items]
      });
      setNewItem("");
    }
  }

  const dispatchSaveItem = (id) => {
    const newItemList = data.items.map((item) => {
      const newItem = { ...item };
      if (item.id === id) {
        newItem.text = value;
        newItem.canChange = false;
        setValue('');
      } 
      return newItem;
    });
    dispatch({
      type: "updateItem",
      payload: [...newItemList]
    });
  }

  const cancelEdit = () => {
    const newItemList = data.items.map((item) => {
      const newItem = { ...item };
      newItem.canChange = false;
      return newItem;
    });
    dispatch({
      type: "updateCanChange",
      payload: [...newItemList]
    });
  }

  const dispatchCanChange = (id) => {
    const newItemList = data.items.map((item) => {
      const newItem = { ...item };
      if (item.id === id) {
        newItem.canChange = true;
        setValue(newItem.text);
      } else {
        newItem.canChange = false;
      }
      return newItem;
    });
    dispatch({
      type: "updateCanChange",
      payload: [...newItemList]
    });
  }

  const dispatchDelete = (id) => {
    const newItemList = data.items.filter((item) => item.id !== id);
    dispatch({
      type: "deleteItem",
      payload: [...newItemList]
    });
  }

  const dispatchDeleteAll = () => {
    const newItemList = [];
    dispatch({
      type: "deleteAllItems",
      payload: [...newItemList]
    });
  }

  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>?????????????????????? ??????????????</h1>
      <form className={styles.form} onSubmit={dispatchNewItem}>
        <textarea onChange={changeNewItem} value={newItem}>{newItem}</textarea>
        <div><button>???????????????? ??????????????</button></div>
      </form>
      <button onClick={dispatchDeleteAll}>???????????????? ?????? ??????????????</button>
      <ul className={styles.list}>
        {data.items.map((item) => (
          <li key={item.id} className={styles.item}>
            {item.canChange 
              ? <div className={styles.change}>
                  <textarea onChange={changeItem} value={value}>{value}</textarea>
                  <button onClick={cancelEdit}>????????????</button> 
                  <button onClick={() => dispatchSaveItem (item.id)}>??o??????????????</button>  
                </div>
              : <div className={styles.item_inner}>
                  <div><span className={styles.date}>{item.date}</span>
                  <span onDoubleClick={() => dispatchCanChange(item.id)} className={styles.item_text}>{item.text}</span></div>
                  <button onClick={() => dispatchDelete(item.id)}>X</button>
                </div>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
