import React from 'react';
import AnimalItem from './AnimalItem';

const AnimalList = ({data}) => {
  return (
    <ul className="animal-list">
      {data.map((item) => (
        <AnimalItem key={item.id} animal={item} />
      ))}
    </ul>
  );
}

export default AnimalList