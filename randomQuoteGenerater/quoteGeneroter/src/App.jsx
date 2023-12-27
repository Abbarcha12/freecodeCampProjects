import "./App.css";
import { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { TbBrandFiverr } from "react-icons/tb";

function App() {
  const [quote, setQuote] = useState(null); // Use appropriate initial value
  const [error, setError] = useState(null); // Use appropriate initial value
  const [loading, setLoading] = useState(true); // Set to true initially
  const [number, setNumber] = useState(1); 
  const [color, setColor] = useState(" "); 

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setQuote(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [number]);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
  
    do {
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    } while (color === '#FFFFFF'); // Repeat until a color other than white is generated
  
    return color;
  }
  const handleClick=()=>{
    const randomNumber = Math.floor(Math.random() * 15);
    const randomColor = getRandomColor();
    setColor(randomColor); // Generates a random number between 0 and 16
    setNumber(randomNumber);
    
  }

  return (
    <>
      
      {quote && (
        <div className='' id='quote-box' >
          {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
          <div className='quote-text' id='text' style={{color:color?color:"#0000"}}>
            <span>
              <FaQuoteLeft />
            </span>
            <span>{quote[number].text }</span>
          </div>
          <div id='author' className='quote-author' style={{color:color?color:"#0000"}}>
          {quote[number].author}
          </div>
          <div className='buttons'>
            <div className='Social'>
              <div className='button' id='new-quote' style={{backgroundColor:color?color:"#0000"}}>
                <a href='https://github.com/Abbarcha12'>
                  <FaGithub />
                </a>
              </div>
              <div className='button' id='new-quote' style={{backgroundColor:color?color:"#0000"}}>
                <a href='https://www.upwork.com/freelancers/~0159384574cca4c8f2'>
                  <SiUpwork />
                </a>
              </div>
              <div className='button' id='new-quote' style={{backgroundColor:color?color:"#0000"}}>
                <a href='https://www.fiverr.com/abbarcha1'>
                  <TbBrandFiverr />
                </a>
              </div>
            </div>
            <div className='' id='tweet-quote'>
              <button className='button' onClick={handleClick} style={{backgroundColor:color?color:"#0000"}}>New Quote</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
