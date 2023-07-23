import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {

  const Ref = useRef(null);
  const [timer, setTimer] = useState(120); //in seconds
  const [harf, setHarf] = useState('a');
  const [kelime, setKelime] = useState('');
  const [bulunanKelimeListesi, setBulunanKelimeListesi] = useState([]);
  const [hataliKelimeListesi, setHataliKelimeListesi] = useState([]);

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
     setKelime(e.target.value);
  }

  function handleKeyPress(e){
      if (e.key === 'Enter') {
          console.log({bulunanKelimeListesi});
          setBulunanKelimeListesi(bulunanKelimeListesi => [...bulunanKelimeListesi, kelime]);
          setKelime(harf);
      }
  }

  function Yenile(){
    setBulunanKelimeListesi([]);
    setHataliKelimeListesi([]);
    setTimer(120);
  }

  return (
    <div className={styles.container} styles={timer == 0 ? "background-color: gray;" : "background-color: white;"}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles/globals.css" />
      </Head>
      
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col col-md-6'>

            <div className='card'>
              <div className='card-header'>
                <h5>Enter words starting with the letter '{harf}'</h5>
              </div>
              <div className='card-body'>
                <h2 className='text-center'>{timerToString()}</h2>
                {timer == 0 && <button className='btn btn-primary' onClick={() => Yenile()}>Yenile</button>}
                <input type={"text"} className={`form-control ${styles.formControl}`} value={kelime} disabled={timer == 0 ? "disabled" : ""} onChange={handleOnChange} onKeyUp={handleKeyPress} />
               
              </div>
            </div>

            <div className='row'>

              <div className='col col-md-6'>
                <div className={`card ${styles.wordList}`}>
                  <div className='card-header'>
                    Correct Words - {bulunanKelimeListesi.length}
                  </div>
                  <div className='card-body'>
                    <ul>
                      {bulunanKelimeListesi.map((item, key)=> { return <li key={key}>{item}</li> })}
                    </ul>
                  </div>
                </div>
              </div>

              <div className='col col-md-6'>
                <div className={`card ${styles.wordList}`}>
                  <div className='card-header'>
                    Wrong Words - {hataliKelimeListesi.length}
                  </div>
                  <div className='card-body'>
                    <ul>
                      {hataliKelimeListesi.map((item, key)=> { return <li key={key}>{item}</li> })}
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
    </div>
  )
}
