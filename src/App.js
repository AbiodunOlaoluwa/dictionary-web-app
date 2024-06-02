import React, { useEffect } from 'react';
import { useState } from 'react';
import pageIcon from "./images/iconoir_book.svg";
import "./App.css";
import newWindowIcon from "./images/icon-new-window.svg";
import { trefoil } from 'ldrs';
import axios from 'axios';

const App = () => {

  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("sansSerif");
  const [error, setError] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [meaningData, setMeaningData] = useState(null);
  const [playButtonHover, setPlayButtonHover] = useState(false);
  const [playButtonWorking, setPlayButtonWorking] = useState(true);
  const [resError, setResError] = useState(false);
  const [loading, setLoading] = useState(false);

  trefoil.register();

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
    setPlayButtonWorking(true);

    if (searchWord === "") {
      setError(true);
      return;
    }
    else {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
        setMeaningData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
        setResError(true);
      }
    }
  }

  const handleInputChange = (event) => {
    setError(false);
    setResError(false);
    const word = event.target.value;
    const wordSetting = word.toLowerCase();
    setSearchWord(wordSetting);
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

  const handleAudioClick = async () => {
    let word = "";
    if (searchWord) {
      word = searchWord;
    }
    else {
      word = "hello";
    }

    const audioUrl = `https://ssl.gstatic.com/dictionary/static/sounds/20200429/${word}--_gb_1.mp3`;
    const audioEl = new Audio(audioUrl);

    audioEl.addEventListener('error', (error) => {
      console.log("Error playing audio file:", error)
      setPlayButtonWorking(false);
    })
    try {
      await audioEl.play();
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className={`App ${theme} ${font}`} onClick={() => setError(false)}>
      {loading &&
        <div className="loaderContainer">
          <l-trefoil
            size="40"
            stroke="4"
            stroke-length="0.15"
            bg-opacity="0.1"
            speed="1.4"
            color={theme === "light" ? "black" : "white"}
          ></l-trefoil>
        </div>
      }
      {!loading &&
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
              <input type="text" className={`searchInput ${error ? "errorPlaceholder" : ""}`} placeholder='Search for any word...' value={searchWord.charAt(0).toUpperCase() + searchWord.slice(1)} onChange={handleInputChange} onKeyDown={handleKeyDown} onClick={handleSearchInputClick} />
              <div className="searchIconContainer" onClick={handleWordSearch}>
                <svg className="searchIcon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="none" stroke={error ? "#FF5252" : "#A445ED"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z" /></svg>
              </div>
            </div>
            <p className={`errorMessage ${error ? "" : "noDisplay"} ${error ? "errorFont" : ""}`}>{resError ? "There seems to be a problem..." : "Whoops, can't be empty..."}</p>
          </div>
          {
            meaningData ?
              <div className="resultBodyContainer">
                <div className="resultHeader">
                  <div className="headerText">
                    <div className="searchWordHeading">
                      <p className="searchWordHeadingText">{meaningData[0].word.charAt(0).toUpperCase() + meaningData[0].word.slice(1)}</p>
                    </div>
                    <div className="phoneticSpelling">
                      <span className="purpleText"><p className="phoneticSpellingText">{meaningData[0].phonetics[0]?.text || "- Not Available -"}</p></span>
                    </div>
                  </div>
                  {
                    playButtonWorking ?
                      <div className={`audioButtonContainer ${playButtonWorking ? "" : "noDisplay"}`} onMouseOver={handlePlayButtonMouseOver} onMouseLeave={handlePlayButtonMouseLeave} onClick={handleAudioClick}>
                        <svg className="audioPlayButton" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity={playButtonHover ? "1" : ".25"} /><path d="M29 27v21l21-10.5z" fill={playButtonHover ? "#FFFFFF" : "#A445ED"} /></g></svg>
                      </div>
                      :
                      <div className="audioButtonContainer error errorFont noPlay">
                        <svg className="audioPlayButton" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#ff5252" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25" /><path d="M29 27v21l21-10.5z" /></g></svg>
                      </div>
                  }
                </div>
                {
                  meaningData.map((meaningObject, index) => {
                    return (
                      <div key={index} className="resultBody">
                        {
                          meaningObject.meanings.map((meaning, index) => {
                            return (
                              <div key={index} className="partOfSpeechContainer">
                                <div className="partOfSpeechHeaderContainer">
                                  <div className="partOfSpeechTitle">
                                    <i><p className="partOfSpeechTitleText">{meaning.partOfSpeech}</p></i>
                                  </div>
                                  <div className="partOfSpeechInnerRectangle"></div>
                                </div>
                                {meaning.definitions.map((definition, index) => {
                                  return (
                                    <div key={index} className="partOfSpeechMeaningListContainer">
                                      <div className="partOfSpeechMeaningListItems">
                                        <ul>
                                          <li>{definition.definition}</li>
                                        </ul>
                                      </div>
                                      <div className="partOfSpeechMeaningTitle"><p className="exampleText">"{definition.example}"</p></div>
                                    </div>
                                  )
                                })}
                                <div className="synonymsContainer">
                                  <p className="synonym"><span className="partOfSpeechMeaningTitle">Synonyms</span></p>
                                  <div className="synonymList">
                                    {meaning.synonyms.map((synonym, index) => {
                                      return (
                                        <span key={index} className="purpleText"><p className="synonymText">{synonym}</p></span>
                                      )
                                    })}
                                    {/* <span className="purpleText"><p className="synonymText">electronic keyboard</p></span>
                          <span className="purpleText"><p className="synonymText">clavier</p></span>
                          <span className="purpleText"><p className="synonymText">row of keys</p></span>
                          <span className="purpleText"><p className="synonymText">console</p></span> */}
                                  </div>
                                </div>
                                <div className="synonymsContainer">
                                  <p className="synonym"><span className="partOfSpeechMeaningTitle">Antonyms</span></p>
                                  <div className="synonymList">
                                    {
                                      meaning.antonyms.map((antonym, index) => {
                                        return <span key={index} className="purpleText"><p className="synonymText">{antonym}</p></span>
                                      })
                                    }
                                    {/* <span className="purpleText"><p className="synonymText">goodbye</p></span> */}
                                    {/* <span className="purpleText"><p className="synonymText">interface</p></span> */}
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
              </div>
              :
              <div className="resultBodyContainer">
                <div className="resultHeader">
                  <div className="headerText">
                    <div className="searchWordHeading">
                      <p className="searchWordHeadingText">Hello</p>
                    </div>
                    <div className="phoneticSpelling">
                      <span className="purpleText"><p className="phoneticSpellingText">/həˈləʊ/</p></span>
                    </div>
                  </div>
                  {
                    playButtonWorking ?
                      <div className={`audioButtonContainer ${playButtonWorking ? "" : "noDisplay"}`} onMouseOver={handlePlayButtonMouseOver} onMouseLeave={handlePlayButtonMouseLeave} onClick={handleAudioClick}>
                        <svg className="audioPlayButton" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity={playButtonHover ? "1" : ".25"} /><path d="M29 27v21l21-10.5z" fill={playButtonHover ? "#FFFFFF" : "#A445ED"} /></g></svg>
                      </div>
                      :
                      <div className="audioButtonContainer error errorFont noPlay">
                        <svg className="audioPlayButton" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#ff5252" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25" /><path d="M29 27v21l21-10.5z" /></g></svg>
                      </div>
                  }
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
                            <li>Hello! or an equivalent greeting</li>
                            {/* <li>[etc.] A set of keys used to operate a typewriter, computer, etc</li>
                          <li>A component of many instruments including the piano, organ, and harpsichord consisting of usually black and white keys that cause different tones to be produced when struck.</li>
                          <li>A device with keys of a musical keyboard, used to control electronic sound-producing devices which may be built into or separate from the keyboard device.</li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="synonymsContainer">
                      <p className="synonym"><span className="partOfSpeechMeaningTitle">Synonyms</span></p>
                      <div className="synonymList">
                        <span className="purpleText"><p className="synonymText">greeting</p></span>
                        {/* <span className="purpleText"><p className="synonymText">electronic keyboard</p></span>
                      <span className="purpleText"><p className="synonymText">clavier</p></span>
                      <span className="purpleText"><p className="synonymText">row of keys</p></span>
                      <span className="purpleText"><p className="synonymText">console</p></span> */}
                      </div>
                    </div>
                    <div className="synonymsContainer">
                      <p className="synonym"><span className="partOfSpeechMeaningTitle">Antonyms</span></p>
                      <div className="synonymList">
                        <span className="purpleText"><p className="synonymText">bye</p></span>
                        <span className="purpleText"><p className="synonymText">goodbye</p></span>
                        {/* <span className="purpleText"><p className="synonymText">interface</p></span> */}
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
                            <li>To greet with "hello".</li>
                          </ul>
                        </div>
                        {/* <div className="partOfSpeechMeaningTitle"><p className="exampleText">"Keyboarding is the part of this job I hate the most."</p></div> */}
                      </div>
                    </div>
                  </div>
                  <div className="partOfSpeechContainer">
                    <div className="partOfSpeechHeaderContainer">
                      <div className="partOfSpeechTitle">
                        <i><p className="partOfSpeechTitleText">interjection</p></i>
                      </div>
                      <div className="partOfSpeechInnerRectangle"></div>
                    </div>
                    <div className="partOfSpeechMeaningContainer">
                      <p className="partOfSpeechMeaningTitle">Meaning</p>
                      <div className="partOfSpeechMeaningListContainer">
                        <div className="partOfSpeechMeaningListItems">
                          <ul>
                            <li>A greeting (salutation) said when meeting someone or acknowledging someone's arrival or presence</li>
                          </ul>
                        </div>
                        <div className="partOfSpeechMeaningTitle"><p className="exampleText">"Hello, everyone."</p></div>
                      </div>
                      <div className="partOfSpeechMeaningListContainer">
                        <div className="partOfSpeechMeaningListItems">
                          <ul>
                            <li>A greeting used when answering the telephone.</li>
                          </ul>
                        </div>
                        <div className="partOfSpeechMeaningTitle"><p className="exampleText">"Hello? How may I help you?"</p></div>
                      </div>
                      <div className="partOfSpeechMeaningListContainer">
                        <div className="partOfSpeechMeaningListItems">
                          <ul>
                            <li>A call for response if it is not clear if anyone is present or listening, or if a telephone conversation may have been disconnected.</li>
                          </ul>
                        </div>
                        <div className="partOfSpeechMeaningTitle"><p className="exampleText">"Hello? Is anyone there?"</p></div>
                      </div>
                      <div className="partOfSpeechMeaningListContainer">
                        <div className="partOfSpeechMeaningListItems">
                          <ul>
                            <li>Used sarcastically to imply that the person addressed or referred to has done something the speaker or writer considers to be foolish.</li>
                          </ul>
                        </div>
                        <div className="partOfSpeechMeaningTitle"><p className="exampleText">"You just tried to start your car with your cell phone. Hello?"</p></div>
                      </div>
                      <div className="partOfSpeechMeaningListContainer">
                        <div className="partOfSpeechMeaningListItems">
                          <ul>
                            <li>An expression of puzzlement or discovery.</li>
                          </ul>
                        </div>
                        <div className="partOfSpeechMeaningTitle"><p className="exampleText">"Hello! What’s going on here?"</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          }
          <div className="sourceListingContainer">
            <div className="sourceInnerRectangle"></div>
            <div className="source">
              <div className="sourceTitle">
                <p className="sourceTitleText"><u>Source</u></p>
              </div>
              <div className="sourceLinkContainer">
                <a href={searchWord ? `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}` : `https://api.dictionaryapi.dev/api/v2/entries/en/hello`} target='_blank' rel="noreferrer" className="sourceLink">{searchWord ? `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}` : `https://api.dictionaryapi.dev/api/v2/entries/en/hello`}</a>
                <img src={newWindowIcon} alt="newWindowIcon" className="newWindowIcon" />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default App
