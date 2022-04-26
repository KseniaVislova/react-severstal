import React, { useState, useReducer, useEffect } from "react";
import styles from "./App.module.css";

const temp = localStorage.getItem("data");
const getSaveData = () => {
  const temp = localStorage.getItem("data");
  const initialValue = temp ? JSON.parse(temp) : { items: [{id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", canChange: false}], };
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
    default:
      return state;
  }
}

const App = () => {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [newItem, setNewItem] = useState("");
  const [value, setValue] = useState('');
  const [inputError, setInputError] = useState(false);
  const [errorText, setErrorText] = useState('');

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
      canChange: false
    }
    if (newItem !== '') {
      dispatch({
        type: "updateNotes",
        payload: [...data.items, obj]
      });
      setNewItem("");
    }
  }

  const dispatchSaveItem = (id, item) => {
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

  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <form onSubmit={dispatchNewItem}>
        <input type="text" value={newItem} onChange={changeNewItem} />
        <button>Добавить заметку</button>
      </form>
      <ul>
        {data.items.map((item) => (
          <li key={item.id}> 
            {item.canChange 
              ? <div>
                  <input type="text" onChange={changeItem} value={value}/> 
                  {(inputError) && <div>{errorText}</div>} 
                  <button onClick={() => dispatchSaveItem (item.id, item.text)}>Сoхранить</button>  
                </div>
              : <span onDoubleClick={() => dispatchCanChange(item.id)}>{item.text}</span>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
