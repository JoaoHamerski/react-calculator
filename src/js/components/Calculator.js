import React, {useMemo, useContext} from 'react'
import { CalculatorContext } from './App'
import Button from './Button'
import Display from './Display'

function Calculator() {
  const {calculator} = useContext(CalculatorContext)

  const lastOperation = useMemo(() => {
    let historyLength = calculator.history.length

    return historyLength && calculator.history[historyLength - 1]
  })

  return (
    <div className="calculator-app">
      <Display 
        operation={calculator.operation} 
        lastOperation={lastOperation} 
        result={calculator.result}
      />

      <Button className="clear text-center" clear>C</Button>
      <Button className="erase" erase><i className="fas fa-backspace fa-fw"></i></Button>
      <Button operator="divide"><i className="fas fa-divide"></i></Button>

      <Button>{7}</Button>
      <Button>{8}</Button>
      <Button>{9}</Button>
      <Button operator="times"><i className="fas fa-times"></i></Button>

      <Button>{4}</Button>
      <Button>{5}</Button>
      <Button>{6}</Button>
      <Button operator="minus"><i className="fas fa-minus"></i></Button>

      <Button>{1}</Button>
      <Button>{2}</Button>
      <Button>{3}</Button>
      <Button operator="plus"><i className="fas fa-plus"></i></Button>

      <Button className="zero text-center">{0}</Button>
      <Button comma>,</Button>
      <Button result className="equals"><i className="fas fa-equals"></i></Button>
    </div>
  )
}

export default Calculator
