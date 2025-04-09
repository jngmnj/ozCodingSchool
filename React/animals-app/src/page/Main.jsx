import React from "react";
import { data } from "../assets/data/data";
import AnimalList from "../components/AnimalList";

const Main = () => {
  return (
    <AnimalList data={data} />
  );
};

export default Main;
