import React from 'react';
import AnimalItem from './AnimalItem';

const AnimalList = ({data}) => {
    console.log(data)
  if( data === null || data.length === 0) {
    return <div>아무것도 조회되지 않아요!</div>
  }
  return (
    <ul className="animal-list">
      {data.map((item) => (
        <AnimalItem key={item.id} animal={item} />
      ))}
    </ul>
  );
}

export default AnimalList