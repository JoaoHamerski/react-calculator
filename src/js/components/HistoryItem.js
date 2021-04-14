import React, { useContext } from 'react'
import { strLimit, strLength} from '../helpers'
import { CalculatorContext } from './App'
import Tippy from '@tippyjs/react';

function HistoryItemOperation({operation, applyOperation}) {
  return (
    <Tippy
      content={<span dangerouslySetInnerHTML={{ __html: operation }}></span>}
      disabled={strLength(operation, true) <= 10}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: strLimit(
            operation, 10
          )
        }}
        className="operation"
        onClick={() => { applyOperation(operation) }}
      ></span>
    </Tippy>
  )
}

function HistoryItemResult({result, applyOperation}) {
  return (
    <Tippy
      content={result}
      disabled={strLength(result, true) <= 10}
    >
      <span
        className="result"
        onClick={() => { applyOperation(result) }}
      >
        {strLimit(result, 10)}
      </span>
    </Tippy>
  )
}

function HistoryItem({calculation}) {
  const {dispatch} = useContext(CalculatorContext)

  const applyOperation = (operation) => {
    dispatch({type: 'apply', operation})
  }

  return (
    <div className="history-item">
      <HistoryItemOperation 
        applyOperation={applyOperation} 
        operation={calculation.operation}
      />

      <span className="equals">=</span>

      <HistoryItemResult 
        applyOperation={applyOperation} 
        result={calculation.result} 
      />
    </div>
  )
}

export default HistoryItem
