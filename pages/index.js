import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {

  const Ref = useRef(null);
  const [timer, setTimer] = useState(120); //in seconds
  const [score, setScore] = useState(0);
  const [letter, setLetter] = useState('a');
  const [word, setWord] = useState('');
  const [correctWordList, setCorrectWordList] = useState([]);
  const [wrondWordList, setWrongWordList] = useState([]);

  const timerToString = () => {
    let hours = ('0' + Math.floor(timer/3600)).slice(-2);
    let minutes = ('0' + Math.floor(timer/60)).slice(-2);
    let seconds = ('0' + timer%60).slice(-2);
    return /*hours + ":" +*/ minutes + ":" + seconds;
  }

  useEffect(()=>{
    if(timer > 0){
      setTimeout(()=>{
        setTimer(timer-1);
      }, 1000)
    }
  }, [timer]);


  function handleOnChange(e){
     setWord(e.target.value);
  }

  function handleKeyPress(e){
      if (e.key === 'Enter') {
        let scorePoint = 0;
        if(CheckWord(word) == true){
          setCorrectWordList(correctWordList => [...correctWordList, word]);
          scorePoint = word.length * 10;
        } else {
          setWrongWordList(wrondWordList => [...wrondWordList, word]);
          scorePoint = word.length * -10;
        }
        setScore(score + scorePoint);
        setWord(letter);
      }
  }

  function Refresh(){
    setCorrectWordList([]);
    setWrongWordList([]);
    setTimer(120);
  }

  function CheckWord(word){
    return true;
  }

  return (
    <div className={styles.container} styles={timer == 0 ? "background-color: gray;" : "background-color: white;"}>
      <Head>
        <title>Word Game</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles/globals.css" />
      </Head>
      
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col col-md-6'>

            <div className='card'>
              <div className='card-header'>
                <h5>Enter words starting with the letter '{letter}'</h5>
              </div>
              <div className='card-body'>
                <h2 className='text-center'>{timerToString()}</h2>
                <h4 className='text-center'>Score : {score}</h4>
                {timer == 0 && <button className='btn btn-primary' onClick={() => Refresh()}>Refresh</button>}
                <input type={"text"} maxLength={100} className={`form-control ${styles.formControl}`} placeholder={"Type a word and press enter"} value={word} disabled={timer == 0 ? "disabled" : ""} onChange={handleOnChange} onKeyUp={handleKeyPress} />
              </div>
            </div>

            <div className='row'>

              <div className='col col-md-6'>
                <div className={`card ${styles.wordList}`}>
                  <div className='card-header'>
                    Correct Words - {correctWordList.length}
                  </div>
                  <div className='card-body'>
                    <ul>
                      {correctWordList.map((item, key)=> { return <li key={key}>{item}</li> })}
                    </ul>
                  </div>
                </div>
              </div>

              <div className='col col-md-6'>
                <div className={`card ${styles.wordList}`}>
                  <div className='card-header'>
                    Wrong Words - {wrondWordList.length}
                  </div>
                  <div className='card-body'>
                    <ul>
                      {wrondWordList.map((item, key)=> { return <li key={key}>{item}</li> })}
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
