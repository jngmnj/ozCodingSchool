import React from 'react';
import { Link } from 'react-router-dom';

const AnimalItem = ({animal}) => {
  const {id, img, name} = animal;
  return (
    <li className="item">
      <Link to={`/detail/${id}`}>
        <div className="img-box">
          <img src={img} alt={name} />
        </div>
        <div className="name">{name}</div>
      </Link>
    </li>
  );
}

export default AnimalItem