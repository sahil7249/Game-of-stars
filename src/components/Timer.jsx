import { use } from "react"
import { useEffect, useState } from "react"

const TimerComponent = ({timer,setTimer}) => {
    const [isRuning, setIsRunning] = useState(false)
    useEffect(() => {
        let interval;
        if (isRuning) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isRuning])

    useEffect(()=>{
        if(timer == 5){
            setTimer(0)
            setIsRunning(false)
        }
    })
    
    const startTimer = () => {
        setIsRunning(true)
    }

    return (
        <button onClick={startTimer} disabled={isRuning} >Play</button>
    )
}

export default TimerComponent;