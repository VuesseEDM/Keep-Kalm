import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, stopTimer, restartTimer, decrementTimer, resetTimer, changeTimer } from '../redux/timerSlice';
import ReactHowler from 'react-howler';
import MusicPlayer from './MusicPlayer';

import '../style/timer.css'

const Timer = () => {
  const { durationMinutes, durationSeconds, seconds, isRunning } = useSelector((state) => state.timer);
  const dispatch = useDispatch();

  const [playTick, setPlayTick] = useState(false);
  const [playAlarm, setPlayAlarm] = useState(false);

  // Gestione del suonotick e dell'allarme
  useEffect(() => {
    let interval;

    // Se il timer è in esecuzione
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(decrementTimer());

        // Se il tempo non è scaduyto, suona il "tick"
        if (seconds !== 0 || durationMinutes !== 0) {
          setPlayTick(true); 
        }

        // Verifica se il timer è scaduto 
        if (seconds === 0 && durationMinutes === 0) {
          setPlayAlarm(true); 
          setTimeout(() => setPlayAlarm(false), 3000);
          setPlayTick(false); // Ferma "tick" quando  timer è scaduto
        }
      }, 1000);
    } else {
      clearInterval(interval);  // ferma l'intervallo quando il timer è fermo
      setPlayTick(false); 
    }

    // per fermare l'intervallo al termine del componente
    return () => clearInterval(interval);
  }, [isRunning, seconds, dispatch, durationMinutes]);

  //cambiamento dei minuti
  const handleMinutesChange = (event) => {
    let minutes = parseInt(event.target.value); // Prende i minuti
    // Se l'input è vuoto o NaN, impost su 0
    if (isNaN(minutes) || minutes < 0) {
      minutes = 0;
    }
    dispatch(changeTimer({
      minutes,
      seconds: durationSeconds,  
    }));
  };

  // Gestire il cambiamento dei secondi
  const handleSecondsChange = (event) => {
    let seconds = parseInt(event.target.value);
    // Se l'input è vuoto o NaN diventa 0
    if (isNaN(seconds) || seconds < 0) {
      seconds = 0;
    }
    dispatch(changeTimer({
      minutes: durationMinutes,  
      seconds,
    }));
  };

  // Funzione per formattare l'inpurt senza zeri iniziali
  const formatInput = (value) => {
    if (value === 0) return '';
    return value.toString();
  };

  return (
    <div className="timer-container">
      <div className='timer-box'>
        <h1 className='timer-title'>
          {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
        </h1>
      </div>

      <div className="input-container">
        <label>
          <input
            type="number"
            min={0}
            max={60}
            value={formatInput(durationMinutes)} 
            onChange={handleMinutesChange}
          />
        </label>
        <b> Modifica minuti (0-60) </b> 
      </div>

      <div className="input-container">
        <label>
          <b>Secondi : </b>
          <input
            type="number"
            min={0}
            max={59}
            value={formatInput(durationSeconds)}  
            onChange={handleSecondsChange}
          />
        </label>
        <b> Modifica secondi (0-60) </b> 
      </div>

      <div>
        <button onClick={() => dispatch(startTimer())}>Start</button>
        <button onClick={() => dispatch(stopTimer())}>Stop</button>  {/* Correzione qui con onClick */}
        <button onClick={() => dispatch(restartTimer())}>Restart</button>
        <button onClick={() => dispatch(resetTimer())}>Reset</button>
      </div>
      <MusicPlayer/>

      <ReactHowler
        src="/audio/tiktak.mp3"
        playing={playTick}
        loop={true} 
        volume={0.5} 
      />

      <ReactHowler
        src="/audio/alarm.mp3" 
        playing={playAlarm} //  solo quando playAlarm è true
        loop={false} // Non ripete il suono
        volume={0.5} //
      />
    </div>
  );
};

export default Timer;
