import Head from 'next/head';
import React, { useState, useRef, useEffect } from 'react';
import styles from "./Home.module.css";

export default function Home() {
  
  const Ref = useRef(null);
  const gameDuration = 120; //in seconds
  const letterList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [letter, setLetter] = useState('');
  const [word, setWord] = useState('');
  const [message, setMessage] = useState('');
  const [allowedWordList, setaAllowedWordList] = useState([]);
  const [correctWordList, setCorrectWordList] = useState([]);
  const [wrondWordList, setWrongWordList] = useState([]);

  useEffect(()=>{
    if(timer > 0){
      setTimeout(()=>{
        setTimer(timer - 1);
      }, 1000)
    } else {
      let newLetter = letterList[generateRandomInteger(1, letterList.length)];
      setLetter(newLetter);
      setWord(newLetter);
      setMessage('');
      FetchAllowedWords(newLetter);
    }
  }, [timer]);

  const timerToString = () => {
    let hours = ('0' + Math.floor(timer/3600)).slice(-2);
    let minutes = ('0' + Math.floor(timer/60)).slice(-2);
    let seconds = ('0' + timer%60).slice(-2);
    return /*hours + ":" +*/ minutes + ":" + seconds;
  }

  function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1))
  }

  function handleOnChange(e){
     setWord(e.target.value);
  }

  function handleKeyPress(e){
      if (e.key === 'Enter') {
        handleNewWord();
      }
  }

  function handleNewWord(){
    if(word.length == 0){
      setMessage('Please type a word...');
      return;
    }

    let scorePoint = 0;
    if(correctWordList.filter(f => f == word).length > 0 || wrondWordList.filter(f => f == word).length > 0){
      setMessage('Already typed...');
      return;
    } 
    
    if(CheckWord(word) == true){
      setCorrectWordList(correctWordList => [...correctWordList, word]);
        scorePoint = word.length * 10;
    } else {
      setWrongWordList(wrondWordList => [...wrondWordList, word]);
      scorePoint = word.length * -10;
    }
    setMessage('');
    setScore(score + scorePoint);
    setWord(letter);
  }

  function Start(){
    setCorrectWordList([]);
    setWrongWordList([]);
    setTimer(gameDuration);
  }  
  
  async function FetchAllowedWords(letter){
    fetch('/words/' + letter + '.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setaAllowedWordList(myJson);
      });
  }

  function CheckWord(word){
    if(allowedWordList.indexOf(word) > -1){
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className={styles.container} styles={timer == 0 ? "background-color: gray;" : "background-color: white;"}>
      <Head>
        <title>Word Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col col-md-6'>

            <div className='card'>
              <div className='card-header d-flex'>
                <h5>Enter words starting with the letter '{letter}'</h5>
              </div>
              <div className='card-body'>
                <button className={`btn btn-lg btn-success col-lg-12 ${styles.startButton}`} disabled={timer > 0 ? "disabled" : ""} onClick={() => Start()}>Start</button>
                <div className={styles.countDownWrapper}>
                  <h1 className='text-center'>{timerToString()}</h1>
                </div>
                <div className={styles.scoreWrapper}>
                  <h4 className='text-center'>Score : {score}</h4>
                </div>
                <div><h6 className='text-center'>{message}</h6></div>
                <div className={`row ${styles.inputRow}`}>
                  <div className={`col col-lg-11`}>
                    <input type={"text"} maxLength={100} className={`form-control ${styles.formControl}`} placeholder={"Type a word and press enter"} value={word} disabled={timer == 0 ? "disabled" : ""} onChange={handleOnChange} onKeyUp={handleKeyPress} />
                  </div>
                  <div className={`col col-lg-1`}>
                    <button className='btn btn-lg btn-primary' disabled={timer == 0 ? "disabled" : ""} onClick={() => handleNewWord()}>Ok</button>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>

              <div className='col col-md-6'>
                <div className={`card ${styles.wordList}`}>
                  <div className='card-header bg-success text-light'>
                    Correct Words ({correctWordList.length})
                  </div>
                  <div className='card-body'>
                    <ul>
                      {correctWordList.sort().reverse().map((item, key)=> { return <li key={key} className="text-success">
                        <span>{key + 1} - {item}</span> 
                        <span className={`${styles.point} badge bg-success text-light`}>{item.length * 10}</span>
                        </li>})}
                    </ul>
                  </div>
                </div>
              </div>

              <div className='col col-md-6'>
                <div className={`card ${styles.wordList}`}>
                  <div className='card-header bg-danger text-light'>
                    Wrong Words ({wrondWordList.length})
                  </div>
                  <div className='card-body'>
                    <ul>
                      {wrondWordList.sort().reverse().map((item, key)=> { return <li key={key} className="text-danger">
                        <span>{key + 1} - {item}</span>
                        <span className={`${styles.point} badge bg-danger text-light`}>-{item.length * 10}</span>
                        </li>})}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
