import React from 'react';
import { useState } from 'react';
// import axios from 'axios';

const App = () => {

  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("Sans Serif");

  return (
    <div className={`App ${theme} ${font}`}>
      <div className="mainDictionaryContainer">

      </div>
    </div>
  )
}

export default App
