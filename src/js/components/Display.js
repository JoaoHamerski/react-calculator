import React, { useContext } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import withHistoryToggler from '../hocs/withHistoryToggler'

function Display(props) {
  const { operation, result, lastOperation } = props
  const { toggleHistory } = props

  return (
    <div 
      className="calculator-display" 
    >
      <div className="history-icon" onClick={toggleHistory}>
        <i className="fas fa-history"></i>
      </div>

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={result}
          timeout={300}
          classNames={{
            enter: 'animate__animated animate__fadeInUp animate__evenFaster',
            exit: 'animate__animated animate__fadeOutUp animate__evenFaster'
          }}
        >
          <div key={result} 
            className="calculator-last-operation text-secondary font-weight-bold"
            dangerouslySetInnerHTML={{ 
              __html: result === '' 
                ? lastOperation.result 
                : lastOperation.operation 
              }}
          >
          </div>
        </CSSTransition>
      </SwitchTransition>
        {/* <div key={result} 
          className="calculator-last-operation text-secondary"
          dangerouslySetInnerHTML={{
            __html: result === '' 
              ? lastOperation.result 
              : lastOperation.operation
          }} ></div> */}

      <div dangerouslySetInnerHTML={{__html: operation}}></div>
    </div>
  )
}

export default withHistoryToggler(Display)
