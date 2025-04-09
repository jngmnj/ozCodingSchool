import React from "react";
import { useParams } from "react-router-dom";
import { data } from "../assets/data/data";

const Detail = () => {
  const { id } = useParams();
  console.log(id);

  const animalData = data.find((item) => item.id === Number(id));
  console.log(animalData);
  return (
    <div className="detail">
      <div className="img-box">
        <img src={animalData.img} />
      </div>
      <div className="name">{animalData.name}</div>
      <div className="desc">{animalData.description}</div>
    </div>
  );
};

export default Detail;
