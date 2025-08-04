import React from "react";

function FilterInput({ filter, onFilterChange }) {
  return (
    <div className="filter">
      <input
        type="text"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="filter coins by name or symbol"
      />
    </div>
  );
}

export default FilterInput;
