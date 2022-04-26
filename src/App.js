import React, { useState, useReducer, useEffect } from "react";
import styles from "./App.module.css";

const initialState = {
  items: [
    {id: 1,
     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
  ], 
}

function reducer(state, action) {
  switch (action.type) {

  }
}

const App = () => {
  const [data, dispatch] = useReducer(reducer, initialState);

  console.log(data)

  return (
    <div>
      <ul>
        {data.items.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
