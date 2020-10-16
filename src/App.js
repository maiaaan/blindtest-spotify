
/*global swal*/

import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQBZWJjRDoCekdWZXSk4Z5W9Q_PxiBOxnk6fBrIW4Bc0zdT2uqn7-zbJdAUKyXM8AgAVvxBt2ucTEe8hp3-jVW8d2Qt10pRQ4J58dyN3Gh7cBliWyeUQnQT2lX5Z75k6cw6hG_SGGue_sbfQe3BFm1dfgQs';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const App = () => {
  const [text, setText] = useState('');
  useEffect ( () => {
    setText ("Bienvenue");
  }, [] )

  const [tracks, setTracks] = useState('');

  const [songsLoaded, setSongsLoaded] = useState(false);

  useEffect ( () => {
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
       Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
        console.log(data.items.length);
        setTracks (data.items);
        setSongsLoaded (true);
      })
  }, [] )

  const AlbumCover = (props) =>  {
    const src = "https://example.com/image.png"; // A changer ;)
    return (
        <img src={src} style={{ width: 400, height: 400 }} />
    );
  }

  if (songsLoaded) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">no no no</h1>
        </header>
        <div className="App-images">
          <p>{text}</p>
          <p>{tracks[0].track.name} - {tracks[0].track.artists[0].name}</p>
          <p>{}</p>
          <AlbumCover />
        </div>
        <div className="App-buttons">
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <img src={loading} className="App-logo" alt="logo"/>
          <h1 className="App-title">no no no</h1>
        </header>
        <div className="App-images">
          <p>{text}</p>
        </div>
        <div className="App-buttons">
        </div>
      </div>
    );
  }
}

export default App;
