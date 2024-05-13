import React from 'react';
import { useState } from 'react';
import pageIcon from "./images/iconoir_book.svg";
import "./App.css";
// import axios from 'axios';

const App = () => {

  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("sansSerif");


  const handleFontSelectChange = (event) => {
    setFont(event.target.value);
  }
  const handleThemeChangeClick = (event) => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }

  return (
    <div className={`App ${theme} ${font}`}>
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
              <div className={`themeButtonContainer ${theme==="dark" ? "purpleBG" : ''}`} onClick={handleThemeChangeClick}>
                <p className={`themeText`}>{theme === "light" ? "Light" : "Dark"}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke={theme==='light' ? `#838383`: `#A445ED`} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/></svg>              </div>
            </div>
          </div>
        </div>
        <div className="searchBarContainer"></div>
        <div className="resultBody"></div>
      </div>
    </div>
  )
}

export default App
