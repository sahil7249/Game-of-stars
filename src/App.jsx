import { useEffect, useState } from 'react';
import '../src/App.css'
import _ from 'lodash'


const colors = {
  used: "lightgreen",
  selected: "deepskyblue",
  wrong: "lightcoral"
};


const NumberButton = ({ index, isSelected, isUsed, isWrong, onClick }) => {

  const handleClick = () => {
    onClick(index)
  }

  const numberStyle = () => {
    if (isUsed) {
      return { background: colors.used }
    }
    if (isWrong) {
      return { background: colors.wrong }
    }
    if (isSelected) {
      return { background: colors.selected }
    }
    return {}
  }

  return (
    <button style={numberStyle()} className="number" onClick={handleClick}>
      {index}
    </button>
  )
}

const Star = () => {
  return <div className='star' />
}

const GameApp = () => {

  // const [stars, setStars] = useState(1 + Math.floor(Math.random() * 9))
  // const [usedNumbers, setUsedNumbers] = useState([]);
  // const [selectedNumbers, setSelectedNumbers] = useState([]);

  const [state, setState] = useState({
    stars: 1 + Math.floor(Math.random() * 9),
    usedNumbers: [],
    selectedNumbers: []
  })
  const [timer,setTimer] = useState(0)

  useEffect(() => {
    const interval = setTimeout(()=>{
      setTimer(timer + 1)
    },1000)
    if(timer == 10){
      clearInterval(interval)
    }
  },[timer])

  const selectionIsWrong = _.sum(state.selectedNumbers) > state.stars;
  const allNumbers = _.range(1, 10);
  const isGameDone = state.usedNumbers.length === allNumbers.length;
  const isTimeOver = timer == 10;
  const resetGame = () => {
    setState({
      stars: 1 + Math.floor(Math.random() * 9),
      usedNumbers: [],
      selectedNumbers: []
    })
  }
  const onNumberClick = (number) => {

    setState((prevState) => {
      let { stars, usedNumbers, selectedNumbers } = prevState;
      if (selectedNumbers.indexOf(number) >= 0) {
        selectedNumbers = selectedNumbers.filter(num => num != number)
      } else {
        selectedNumbers = [...selectedNumbers, number]
      }

      const sumOfSelectedNumber = _.sum(selectedNumbers)

      if (sumOfSelectedNumber === stars) {
        usedNumbers = [...usedNumbers, ...selectedNumbers]
        selectedNumbers = [];
        const availableNumbers = _.difference(allNumbers, usedNumbers)
        stars = randomSum(availableNumbers, 9);
      }

      return {
        stars,
        usedNumbers,
        selectedNumbers
      }
    })
  }

  const randomSum = (arr, maxSum) => {
    const sets = [[]], sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i])
        const candidateSum = _.sum(candidateSet)
        if (candidateSet <= maxSum) {
          sets.push(candidateSet)
          sums.push(candidateSum)
        }
      }
    }
    return _.sample(sums)
  }

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more number that sum to the
        number of stars {timer}
      </div>
      <div className="body">
        {isGameDone || isTimeOver
          ? <button onClick={resetGame} >Play again</button> :
          <>
            <div className="left">
              {_.range(state.stars).map(index => {
                return <Star
                  key={index}
                />
              })}
            </div>
            <div className="right">
              {allNumbers.map(index => {
                const isUsed = state.usedNumbers.indexOf(index) >= 0;
                const isSelected = state.selectedNumbers.indexOf(index) >= 0;
                const isWrong = selectionIsWrong && isSelected;
                return <NumberButton
                  index={index}
                  key={index}
                  isSelected={isSelected}
                  isUsed={isUsed}
                  onClick={onNumberClick}
                  isWrong={isWrong}
                />
              })}
            </div>

          </>}
      </div>
    </div>
  )
}

export default GameApp;

