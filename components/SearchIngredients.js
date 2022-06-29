import React from "react";

export default function SearchIngredients() {
  return (
    <div className="searchIngredients">
      <form>
        <input type="text" name="name" className="search" />

        <input type="submit" value="SEARCH" className="submit" />
      </form>
    </div>
  );
}

// search by titleMatch - include selectrd diet
