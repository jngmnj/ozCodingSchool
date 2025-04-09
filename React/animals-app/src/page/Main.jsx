import React from 'react';
import { data } from "../assets/data/data";

const Main = () => {
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
            <img src={item.img} alt={item.name} />
            <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default Main