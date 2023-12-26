import React, {useEffect, useState} from 'react'
import './App.scss';
import COLORS_ARRAY from './colorsArray.js';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { FaTwitter } from '@fortawesome/free-brands-svg-icons'

let ourDBurl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"


function App() {
  const [quote, setQuote] = useState("All our dreams can come true; if we have the courage to pursue them.")
  const [author, setAuthor] = useState("Walt Disney")
  const [randomNumber, setRandomeNumber] = useState(0)
  const[quotes, setQuotes] = useState(null)
  const[AccentColor, setAccentColor]= useState("#282c34")


  const fecthQuotes = async(url) =>{
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotes(parsedJSON.quotes)
  }
  useEffect(()=>{   
    fecthQuotes(ourDBurl)
  }, [ourDBurl])

  const generateRandomQuote = ()=>{
    let randomInt = Math.floor(quotes.length*Math.random())
    setRandomeNumber(randomInt)
    setAccentColor(COLORS_ARRAY[randomInt])
    setQuote(quotes[randomInt].quote)
    setAuthor(quotes[randomInt].author)
  }
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor:AccentColor}}>
        <div id ="quote-box" style={{color:AccentColor}}>
        {/* <h1>Random Number :{randomNumber}</h1>        */}
        <p id ="text">
          "{quote}"
        </p>
        <p id ="author">
          - {author}
        </p>
        <div class="button">
          <a id ="tweet-quote" style={{backgroundColor:AccentColor}} 
          href={encodeURI(`https://www.twitter.com/intent/tweet?text=${quote}- ${author}`)}>twitter</a>
        </div>
        <button id="new-quote" style={{backgroundColor:AccentColor}}  onClick={()=>generateRandomQuote()}>Generate a Random Quote</button>
        </div>
      </header>
    </div>
  );
}

export default App;
