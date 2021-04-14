import React, {useContext} from 'react'
import withHistoryToggler from '../hocs/withHistoryToggler'
import HistoryItem from './HistoryItem'

function History(props) {
  const {toggleHistory} = props
  const {history} = props

  return (
    <div className="calculator-history">
      <div className="history-back" onClick={toggleHistory}>
        <i className="fas fa-arrow-circle-left"></i>
      </div>

      <div className="history-title text-center">HISTÓRICO</div>
      <div className="history-items">
        {
          history.length === 0 
          ? (
              <div className="text-center text-secondary">
                <p>
                  <i className="fas fa-calculator fa-2x"></i>
                </p>
                <p>Nenhum cálculo feito ainda</p>
              </div>
            )
          : history.map((calculation, index) => {
              return <HistoryItem key={index} calculation={calculation} />
            }).reverse()
        }
      </div>
    </div>
  )
}

export default withHistoryToggler(History)
