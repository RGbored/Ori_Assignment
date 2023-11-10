import { useState } from "react";

const Search = ({ searchText, setSearchText, search, setSearchRestriction }) => {
  return (
    <div className="SearchBar">
      <div className="searchWrapper">
        <div
        
        >
          <input
            placeholder="Search"
            id="searchBox"
            // value={searchText}
            onChange={(e) => {
              // setSearchText(e.target.value);
              // search()
            }}
            onFocus={(e)=>{
              let box = document.getElementById("suggestionBox");
              box.style.visibility = "visible";
              }}
            onBlur={(e)=>{
              setTimeout(()=>{
                let box = document.getElementById("suggestionBox");
                box.style.visibility = "hidden";
              }, 200);
              }}
          ></input>

          <button onClick={
            ()=>{
              setSearchText(document.getElementById("searchBox").value)
            }
            // search
            }>Search</button>
          <br></br>
          <div className="suggestions" id="suggestionBox" >
            {(localStorage.prevSearches)?JSON.parse(localStorage.prevSearches).map(text =><div
            onClick={()=>{
              setSearchText((text), ()=>{console.log(searchText)});
              // console.log(searchText);
              // search(text);
            }}
            >{text}</div>):null}
          </div>
        </div>
        <div>
          <input type="radio" id="safe" name="fav_language" value="safe" onClick={setSearchRestriction(1)} />
          <label for="safe">safe</label> <input type="radio" id="moderate" name="fav_language" value="moderate" onClick={setSearchRestriction(2)} />
          <label for="moderate">moderate</label>

          <input
            type="radio"
            id="restricted"
            name="fav_language"
            value="restricted"
            onClick={setSearchRestriction(3)}
          />
          <label for="restricted">restricted</label>
        </div>

      </div>
    </div>
  );
};

export default Search;
