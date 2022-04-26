import React, { useState, useReducer, useEffect } from "react";
import styles from "./App.module.css";

const initialState = {
  items: [
    {id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
  ], 
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "updateNotes": 
      console.log(action.payload)
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

const App = () => {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [newItem, setNewItem] = React.useState("");

  const changeNewItem = (e) => {
    setNewItem(e.target.value);
  }

  const dispatchNewItem = (e) => {
    e.preventDefault();
    const obj = {
      id: Math.floor(new Date().getTime() + (Math.random() * 10)),
      text: newItem
    }
    if (newItem !== '') {
      dispatch({
        type: "updateNotes",
        payload: [...data.items, obj]
      });
      setNewItem("");
    }
  }

  console.log(data.items)

  return (
    <div>
      <form onSubmit={dispatchNewItem}>
        <input type="text" value={newItem} onChange={changeNewItem} />
        <button>Добавить заметку</button>
      </form>
      <ul>
        {data.items.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
