import React, {useContext, useCallback} from 'react'
import { CalculatorContext } from './App'


function Button(props) {
  const {dispatch} = useContext(CalculatorContext)

  const handleClick = () => {
    if (typeof props.children === 'number') {
      dispatch({type: 'operand', operand: props.children})
      return
    }

    if ('operator' in props) {
      dispatch({type: 'operator', operator: `&${props.operator};`})
      return
    }

    if ('erase' in props) {
      dispatch({type: 'erase'})
      return
    }

    if ('comma' in props) {
      dispatch({type: 'comma'})
      return
    }

    if ('clear' in props) {
      dispatch({type: 'clear'})
      return
    }

    if ('result' in props) {
      dispatch({type: 'result'})
      return
    }
  }
  
  return (
    <React.Fragment>
      <button key={props.children}
        className={classNames([
          props.className, 
          ! isNaN(props.children) && 'btn-white',
          (isNaN(props.children) && ! ('result' in props)) && 'btn-light-grey',
          'result' in props && 'btn-primary'
        ])}
        onClick={handleClick}
      >
        {props.children}
      </button>
    </React.Fragment>
  )
}

export default React.memo(Button)
