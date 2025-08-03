import "./StopWatch.css";
import { useRef, useState, useEffect, use } from "react";
import gifImage from "../assets/Black-And-White Art-GIF-by Mathew-Lucas.gif";

function StopWatch() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [status,setStatus] = useState('')
  const [isRunning,setIsRunning] = useState(false)
  const intervalId = useRef(null);

  function startButton() {
    setIsRunning(true)
    setStatus('Timer Started')
    setTimeout(() =>{
        setStatus('')
    },2000)

    if (!intervalId.current) {
      intervalId.current = setInterval(() => {
        setSecond((prev) => {
          if (prev + 1 === 60) {
            setMinute((prevMin) => {
              if (prevMin + 1 === 60) {
                setHour((prevHour) => prevHour + 1);
                return 0;
              }
              return prevMin + 1;
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  }

  function stopButton() {
    setIsRunning(false)
    setStatus('Timer Stopped!')
    setTimeout(() =>{
        setStatus('')
    },2000)

    clearInterval(intervalId.current);
    intervalId.current = null
  }

  function resetButton() {
    setIsRunning(false)
    setStatus('Timer Reset!')
    setTimeout(() =>{
        setStatus('')
    },2000)

    clearInterval(intervalId.current);
     intervalId.current = null
    setSecond(0);
    setMinute(0);
    setHour(0);
  }

  useEffect(() => {
    console.log("ค่าของ second ที่อัปเดตแล้ว:", second);
  }, [second]);

  return (
    <>
      <div className="container">
        <div className="animatedModel">
          <img src={gifImage} alt="" />
        </div>
        <div className="shownTime">
          {hour.toString().padStart(2, "0")}:
          {minute.toString().padStart(2, "0")}:
          {second.toString().padStart(2, "0")}
        </div>
        <div className="controlButtons">
          <button disabled={isRunning} onClick={startButton}>START</button>
          <button disabled={!isRunning} onClick={stopButton}>STOP</button>
          <button onClick={resetButton}>RESET</button>
        </div>
        <p className="statusText">{status}</p>
        <footer>
            <p>The stopwatch was created by Supawich Kuenongkhun when first using React.js.</p>
        </footer>
      </div>
    </>
  );
}

export default StopWatch;
