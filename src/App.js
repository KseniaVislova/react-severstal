import React, { useState, useReducer, useEffect } from "react";
import styles from "./App.module.css";

const initialState = {
  items: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."], 
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "updateNotes": 
      return { ...state, items: action.payload };
      /*const newItem = {
        id: Math.floor(new Date().getTime() + (Math.random() * 10)),
        text: action.payload
      }
      console.log(state)*/
      //state.items.push(newItem)
      //console.log(state)*/

    default:
      return state;
  }
}

const App = () => {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(false);
  const [newItem, setNewItem] = React.useState("");

  /*const onClickAdd = (value) => {
    if (value !== '') {
      setError(false);
      dispatch({ type: "new-note", payload: value });
    } else {
      setError(true);
    }
  };*/

  const changeNewItem = (e) => {
    setNewItem(e.target.value);
  }

  const dispatchNewItem = (e) => {
    e.preventDefault();
    if (newItem !== '') {
      dispatch({
        type: "updateNotes",
        payload: [...data.items, newItem]
      });
      setNewItem("");
    }
  }


  console.log(data.items)
  console.log(error)

  return (
    <div>
      <form onSubmit={dispatchNewItem}>
        <input type="text" value={newItem} onChange={changeNewItem} />
        <button>Create</button>
      </form>
      <ul>
        {data.items.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
