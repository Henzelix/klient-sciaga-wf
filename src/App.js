import './App.css';
import React, { useEffect, useState, useRef } from 'react';

function App() {

  const [result, setResult] = useState([]);

  const resultRef = useRef();
  resultRef.current = result;

  const fetchGifs = () => {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log(JSON.parse(req.response));
        setResult(JSON.parse(req.response));
      }
    };

    req.open("GET", "https://api.jsonbin.io/b/620c4bfdca70c44b6e998099/latest", true);
    req.setRequestHeader("secret-key", "$2b$10$b7TzO1HogbIlivNj/dPOZObD/VxWVwgw5ad4rE/Zh3rbvtrLE3dKG");
    req.send();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchGifs();
    }, 500);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  return (
    <main>
      <div id='wrapper'>
        <h1>Klient karate</h1>
        <div id='list'>
          {
            resultRef.current!=[] ?
              resultRef.current.map((item) => {
                return <div className='tile' key={item.name}>
                  <img className='image' src={item.url} alt={item.name} />
                  <h2 className='text'>{item.name}</h2>
                </div>
              })
            :
              <h1>nie ma nic</h1>
          }
        </div>
      </div>
    </main>
  );
}

export default App;
