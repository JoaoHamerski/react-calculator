import {
  getCurrentOperand, 
  calculateResult, 
  endsWithAnyOperator,
  replaceLastOperator
} from '../helpers'

export const initCalculator = {
    operation: '',
    result: '',
    history: [],
    displayHistory: false
}

const operand = (state, action, currentOperand) => {
  if (! _.isEmpty(state.result)) {
    return {
      ...state,
      result: '',
      operation: action.operand.toString()
    }
  }

  if (currentOperand === '0') {
    return {
      ...state,
      operation: state.operation.includes(';')
        ? state.operation
          .substring(0, state.operation.lastIndexOf(' ') + 1)
          .concat(action.operand)
        : action.operand.toString()
    }
  }

  return {
    ...state,
    operation: state.operation.concat(action.operand)
  }
}

const operator = (state, action, currentOperand) => {
  if (currentOperand.charAt(currentOperand.length - 1) === ',') {
    state.operation = state.operation.substring(0, state.operation.length - 1)
  }

  if (_.isEmpty(state.operation)) {
    return state
  }

  if (! _.isEmpty(state.result)) {
    return {
      ...state,
      result: '',
      operation: state.operation.concat(` ${action.operator} `)
    }
  }

  if (endsWithAnyOperator(state.operation)) {
    return {
      ...state,
      operation: replaceLastOperator(state.operation, action.operator)
    }
  }

  return {
    ...state,
    operation: state.operation.concat(` ${action.operator} `)
  }
}

const erase = (state, currentOperand) => {
  let lastIndex
  let eraseUntilIndex = lastIndex = state.operation.length - 1

  // Salva o índice para apagar 
  // toda entidade HTML caso encontre (operadores matemáticos)
  if (state.operation.charAt(lastIndex) === ' ') {
    eraseUntilIndex = state.operation.lastIndexOf(' &')
  }

  if (currentOperand === 'Infinito') {
    eraseUntilIndex = 0
  }

  return {
    ...state,
    operation: state.operation.substring(0, eraseUntilIndex)
  }
}

const comma = (state, currentOperand) => {
  if (! _.isEmpty(state.result)) {
    return {
      ...state, 
      operation: '0', 
      result: ''
    }
  }

  // Previne multiplas virgulas em cada operando
  if (currentOperand == '' || currentOperand.includes(','))
    return state

  return { ...state, operation: state.operation.concat(',') }
}

const clear = state => {
  return { ...state, operation: '' }
}

const result = state => {
  let result,
    history = [...state.history]

  if (_.isEmpty(state.operation)) {
    return state
  }

  // Remove o operador caso termine em um
  if (state.operation[state.operation.length - 1] === ' ') {
    state.operation = state.operation.substring(
      0, state.operation.lastIndexOf('&')
    )
  }

  result = calculateResult(state.operation)

  // Previne multiplos históricos com a mesma operação anterior
  if (! _.isEqual(
    { operation: state.operation, result }, 
    history[history.length - 1]
  )) {
    history.push({ operation: state.operation, result })
  }

  return {
    ...state,
    result,
    history,
    operation: result,
  }
}

const history = (state, action) => {
  return { 
    ...state, 
    displayHistory: action.display 
  }
}

const apply = (state, action) => {
  return { 
    ...state, 
    operation: action.operation, 
    displayHistory: false 
  }
}

export const reducerCalculator = (state, action) => {
  let currentOperand = getCurrentOperand(state.operation)
  
  switch(action.type) {
    case 'operand':
      return operand(state, action, currentOperand)

    case 'operator':
      return operator(state, action, currentOperand)

    case 'erase':
      return erase(state, currentOperand)
    
    case 'comma':
      return comma(state, currentOperand)

    case 'clear':
      return clear(state)
    
    case 'result':
      return result(state)
    
    case 'history':
      return history(state, action)

    case 'apply':
      return apply(state, action)
  }

  // Caso o desenvolvedor digite uma ação não definida no reducer
  throw new Error('Reducer action undefined')
}
