import React, { useEffect } from 'react';
import { useState } from 'react';
import pageIcon from "./images/iconoir_book.svg";
import "./App.css";
import axios from 'axios';

const App = () => {

  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("sansSerif");
  const [error, setError] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [meaningData, setMeaningData] = useState([]);
  const [playButtonHover, setPlayButtonHover] = useState(false);

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

  const handleWordSearch = async () => {
    if (searchWord === "") {
      setError(true);
    }

    else {
      try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
        setMeaningData(response.data);
      } catch (error) {
        console.log(error);
      }
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

  const handlePlayButtonMouseOver = () => {
    setPlayButtonHover(true);
  }

  const handlePlayButtonMouseLeave = () => {
    setPlayButtonHover(false);
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
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
                  <path fill="none" stroke={theme === 'dark' ? `#838383` : `#A445ED`} stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" d="M 24.984375 3.9863281 A 1.0001 1.0001 0 0 0 24 5 L 24 11 A 1.0001 1.0001 0 1 0 26 11 L 26 5 A 1.0001 1.0001 0 0 0 24.984375 3.9863281 z M 10.888672 9.890625 A 1.0001 1.0001 0 0 0 10.193359 11.607422 L 14.392578 15.806641 A 1.0001 1.0001 0 1 0 15.806641 14.392578 L 11.607422 10.193359 A 1.0001 1.0001 0 0 0 10.888672 9.890625 z M 39.080078 9.890625 A 1.0001 1.0001 0 0 0 38.392578 10.193359 L 34.193359 14.392578 A 1.0001 1.0001 0 1 0 35.607422 15.806641 L 39.806641 11.607422 A 1.0001 1.0001 0 0 0 39.080078 9.890625 z M 25 15 A 1.0001 1.0001 0 0 0 24.591797 15.082031 C 19.260044 15.307579 15 19.611572 15 25 C 15 30.533333 19.466667 35 25 35 C 30.533333 35 35 30.533333 35 25 C 35 19.612238 30.740979 15.308576 25.410156 15.082031 A 1.0001 1.0001 0 0 0 25 15 z M 25 17 C 29.466667 17 33 20.533333 33 25 C 33 29.466667 29.466667 33 25 33 C 20.533333 33 17 29.466667 17 25 C 17 20.533333 20.533333 17 25 17 z M 5 24 A 1.0001 1.0001 0 1 0 5 26 L 11 26 A 1.0001 1.0001 0 1 0 11 24 L 5 24 z M 39 24 A 1.0001 1.0001 0 1 0 39 26 L 45 26 A 1.0001 1.0001 0 1 0 45 24 L 39 24 z M 15.080078 33.890625 A 1.0001 1.0001 0 0 0 14.392578 34.193359 L 10.193359 38.392578 A 1.0001 1.0001 0 1 0 11.607422 39.806641 L 15.806641 35.607422 A 1.0001 1.0001 0 0 0 15.080078 33.890625 z M 34.888672 33.890625 A 1.0001 1.0001 0 0 0 34.193359 35.607422 L 38.392578 39.806641 A 1.0001 1.0001 0 1 0 39.806641 38.392578 L 35.607422 34.193359 A 1.0001 1.0001 0 0 0 34.888672 33.890625 z M 24.984375 37.986328 A 1.0001 1.0001 0 0 0 24 39 L 24 45 A 1.0001 1.0001 0 1 0 26 45 L 26 39 A 1.0001 1.0001 0 0 0 24.984375 37.986328 z"></path>
                </svg>
                <p className={`themeText`}>{theme === "light" ? "Light" : "Dark"}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke={theme === 'light' ? `#838383` : `#A445ED`} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z" /></svg>              </div>
            </div>
          </div>
        </div>
        <div className="searchBar">
          <div className={`searchBarContainer ${error ? "error" : ""}`}>
            <input type="text" className={`searchInput ${error ? "errorPlaceholder" : ""}`} placeholder='Search for any word...' value={searchWord} onChange={handleInputChange} onKeyDown={handleKeyDown} onClick={handleSearchInputClick} />
            <svg className="searchIcon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="none" stroke={error ? "#FF5252" : "#A445ED"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z" /></svg>
          </div>
          <p className={`errorMessage ${error ? "" : "noDisplay"} ${error ? "errorFont" : ""}`}>Whoops, can't be empty...</p>
        </div>
        <div className="resultBodyContainer">
          <div className="resultHeader">
            <div className="headerText">
              <div className="searchWordHeading">
                <p className="searchWordHeadingText">Keyboard</p>
              </div>
              <div className="phoneticSpelling">
                <span className="purpleText"><p className="phoneticSpellingText">/ˈkiːbɔːd/</p></span>
              </div>
            </div>
            <div className="audioButtonContainer" onMouseOver={handlePlayButtonMouseOver} onMouseLeave={handlePlayButtonMouseLeave}>
              <svg className="audioPlayButton" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity={playButtonHover ? "1" : ".25"} /><path d="M29 27v21l21-10.5z" fill={playButtonHover ? "#FFFFFF" : "#A445ED"} /></g></svg>
            </div>
          </div>
          <div className="resultBody">
            <div className="partOfSpeechContainer">
              <div className="partOfSpeechHeaderContainer">
                <div className="partOfSpeechTitle">
                  <i><p className="partOfSpeechTitleText">noun</p></i>
                </div>
                <div className="partOfSpeechInnerRectangle"></div>
              </div>
              <div className="partOfSpeechMeaningContainer">
                <p className="partOfSpeechMeaningTitle">Meaning</p>
                <div className="partOfSpeechMeaningListContainer">
                  <div className="partOfSpeechMeaningListItems">
                    <ul>
                      <li>[etc.] A set of keys used to operate a typewriter, computer, etc</li>
                      <li>A component of many instruments including the piano, organ, and harpsichord consisting of usually black and white keys that cause different tones to be produced when struck.</li>
                      <li>A device with keys of a musical keyboard, used to control electronic sound-producing devices which may be built into or separate from the keyboard device.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="synonymsContainer">
                <p className="synonym"><span className="partOfSpeechMeaningTitle">Synonyms</span></p>
                <div className="synonymList">
                  <span className="purpleText"><p className="synonymText">electronic keyboard</p></span>
                  <span className="purpleText"><p className="synonymText">clavier</p></span>
                  <span className="purpleText"><p className="synonymText">row of keys</p></span>
                  <span className="purpleText"><p className="synonymText">console</p></span>
                </div>
              </div>
              <div className="synonymsContainer">
                <p className="synonym"><span className="partOfSpeechMeaningTitle">Antonyms</span></p>
                <div className="synonymList">
                  <span className="purpleText"><p className="synonymText">club</p></span>
                  <span className="purpleText"><p className="synonymText">cudgel</p></span>
                  <span className="purpleText"><p className="synonymText">interface</p></span>
                </div>
              </div>
            </div>
            <div className="partOfSpeechContainer">
              <div className="partOfSpeechHeaderContainer">
                <div className="partOfSpeechTitle">
                  <i><p className="partOfSpeechTitleText">verb</p></i>
                </div>
                <div className="partOfSpeechInnerRectangle"></div>
              </div>
              <div className="partOfSpeechMeaningContainer">
                <p className="partOfSpeechMeaningTitle">Meaning</p>
                <div className="partOfSpeechMeaningListContainer">
                  <div className="partOfSpeechMeaningListItems">
                    <ul>
                      <li>To type on a computer keyboard</li>
                    </ul>
                  </div>
                  <div className="partOfSpeechMeaningTitle"><p className="exampleText">"Keyboarding is the part of this job I hate the most."</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sourceListingContainer">
          <div className="sourceInnerRectangle"></div>
          <div className="source">
            <div className="sourceTitle">
              <p className="sourceTitleText">Source</p>
            </div>
            <a href={`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`} target='_blank' className="sourceLink">{`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
