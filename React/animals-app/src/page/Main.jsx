import React from "react";
import { data } from "../assets/data/data";

const Main = () => {
  return (
    <ul className="animal-list">
      {data.map((item) => (
        <li className="item" key={item.id}>
          <div className="img-box">
            <img src={item.img} alt={item.name} />
          </div>
          <div className="name">{item.name}</div>
        </li>
      ))}
    </ul>
  );
};

export default Main;
