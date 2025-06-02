import { getRegExp } from "korean-regexp";
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { data } from "../assets/data/data";
import AnimalList from "../components/AnimalList";

const Search = () => {
    const [searchParams]= useSearchParams();
    const param = searchParams.get("animal");
    const reg = getRegExp(param);

    const filteredData = data.filter((item) => item.name.match(reg));

  return (
    <AnimalList data={filteredData} />
  )
}

export default Search