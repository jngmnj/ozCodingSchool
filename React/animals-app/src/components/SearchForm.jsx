import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue("");
    navigate(`/search?animal=${inputValue}`);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default SearchForm;
