import React, { useEffect } from 'react';
import { useState } from 'react';
import pageIcon from "./images/iconoir_book.svg";
import "./App.css";
// import axios from 'axios';

const App = () => {

  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("sansSerif");
  const [error, setError] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const searchInput = document.querySelector(".searchInput");
    if (error === true) {
      searchInput.blur();
    }
  }, [error])

  useEffect(() => {
    setFont(localStorage.getItem('font'));
  }, [])

  useEffect(() => {
    setTheme(localStorage.getItem('theme'));
  }, [])

  const handleFontSelectChange = (event) => {
    setFont(event.target.value);
    localStorage.setItem('font', event.target.value);
  }
  const handleThemeChangeClick = (event) => {
    if (theme === "light") {
      setTheme("dark")
      localStorage.setItem('theme', "dark")
    }
    else {
      setTheme("light")
      localStorage.setItem('theme', "light");
    }
  }

  const handleSearchInputClick = () => {
    setError(false)
  }

  const handleWordSearch = () => {
    if (searchWord === "") {
      setError(true);
    }
  }

  const handleInputChange = (event) => {
    setError(false);
    setSearchWord(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleWordSearch();
    }
  }

  return (
    <div className={`App ${theme} ${font}`} onClick={() => setError(false)}>
      <div className="mainDictionaryContainer">
        <div className="navBarContainer">
          <div className="bookIconContainer">
            <img className="pageIcon" src={pageIcon} alt="Book Icon" />
          </div>
          <div className="togglesContainer">
            <div className="fontSelectContainer">
              <div className="fontSelectDropDown">
                <select name="fontSelect" id="fontSelect" className="fontSelect" value={font} onChange={handleFontSelectChange}>
                  <option value="sansSerif">Inter</option>
                  <option value="serif">Lora</option>
                  <option value="mono">Mono</option>
                </select>
              </div>
            </div>
            <div className="separationContainer"></div>
            <div className="themeSelectContainer">
              <div className={`themeButtonContainer ${theme === "dark" ? "purpleBG" : ''}`} onClick={handleThemeChangeClick}>
                <p className={`themeText`}>{theme === "light" ? "Light" : "Dark"}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke={theme === 'light' ? `#838383` : `#A445ED`} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z" /></svg>              </div>
            </div>
          </div>
        </div>
        <div className="searchBar">
          <div className={`searchBarContainer ${error ? "error" : ""}`}>
            <input type="text" className={`searchInput ${error ? "errorPlaceholder" : ""}`} placeholder='Search for any word...' value={searchWord} onChange={handleInputChange} onKeyDown={handleKeyDown} onClick={handleSearchInputClick} />
            <svg className="searchIcon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="none" stroke={error ? "#FF5252" : "#A445ED"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"/></svg>
          </div>
          <p className={`errorMessage ${error ? "" : "noDisplay"} ${error ? "errorFont" : ""}`}>Whoops, can't be empty...</p>
        </div>
        <div className="resultBody"></div>
      </div>
    </div>
  )
}

export default App
