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

export default NumberButton;