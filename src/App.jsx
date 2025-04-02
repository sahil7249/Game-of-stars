import { useState } from 'react';
import '../src/App.css'
import _ from 'lodash'


const colors = {
  used: "lightgreen",
  selected: "deepskyblue",
  wrong: "lightcoral"
};


const NumberButton = ({ index,isSelected,isUsed,isWrong }) => {

  const handleClick = () => {
    
  }

  const numberStyle = () => {
    if(isUsed){
      return { background:colors.used}
    }
    if(isWrong){
      return { background:colors.wrong}
    }
    if(isSelected){
      return { background:colors.selected}
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

  const [state,State] = useState({
    stars:1 + Math.floor(Math.random() * 9),
    usedNumbers:[],
    selectedNumbers:[]
  })

  const selectionIsWrong = _.sum(state.selectedNumbers) > state.stars;

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more number that sum to the
        number of stars
      </div>
      <div className="body">
        <div className="left">
            {_.range(state.stars).map(index => {
              return <Star 
                key={index}     
              />
            })} 
        </div>
        <div className="right">
          {_.range(1,10).map(index => {
            const isUsed = state.usedNumbers.indexOf(index) >= 0;
            const isSelected = state.selectedNumbers.indexOf(index) >= 0;
            const isWrong = selectionIsWrong && isSelected;
            return <NumberButton 
              index={index}
              key={index}
              isSelected={isSelected}
              isUsed={isUsed}
              isWrong = {isWrong}
            />
          })}
        </div>
      </div>
    </div>
  )
}

export default GameApp;

