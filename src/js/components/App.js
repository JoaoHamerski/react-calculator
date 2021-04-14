import React, {useReducer} from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { reducerCalculator, initCalculator } from '../reducer/calculatorReducer'
import Calculator from './Calculator'
import History from './History'

export const CalculatorContext = React.createContext()

function App() {
  const [calculator, dispatch] = useReducer(reducerCalculator, initCalculator)

  return (
    <div className="calculator">
      <SwitchTransition key="transition-switch" mode="out-in">
        <CSSTransition 
          key={calculator.displayHistory}
          timeout={200}
          classNames={{
            enter: 'animate__animated animate__fadeIn animate__evenFaster',
            exit: 'animate__animated animate__fadeOut animate__evenFaster'
          }}
        >
          <CalculatorContext.Provider value={{calculator, dispatch}}>
            { 
              ! calculator.displayHistory 
                ? <Calculator key={calculator.displayHistory} />
                : <History 
                    key={calculator.displayHistory} 
                    history={calculator.history} 
                  />
            }
          </CalculatorContext.Provider>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

export default App
