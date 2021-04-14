import React, { useContext } from 'react'
import { CalculatorContext } from '../components/App'

const withHistoryToggler = WrapperComponent => {
  function WithHistoryToggler(props) {
    const {calculator, dispatch} = useContext(CalculatorContext)
    
    const toggleHistory = () => {
      dispatch({type: 'history', display: ! calculator.displayHistory})
    }

    return (
      <WrapperComponent 
        toggleHistory={toggleHistory} 
        {...props}
      />
    )
  }

  return WithHistoryToggler
}

export default withHistoryToggler