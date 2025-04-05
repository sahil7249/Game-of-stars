import _ from 'lodash'
import NumberButton from './NumberButton';

const Star = () => {
    return <div className='star' />
}

const GameBody = ({state,setState,selectionIsWrong,onNumberClick}) => {
    const allNumbers = _.range(1,10)
    return (
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
        </>
    )
}

export default GameBody;