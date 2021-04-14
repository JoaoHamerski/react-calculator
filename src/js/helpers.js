import { evaluate } from 'mathjs'

/* 
  Função para retornar o "operando" atual
  que pode estar entre operadores ou sozinho 
  na string
*/
export const getCurrentOperand = operation => {
  if (typeof operation === 'number') {
    operation = `${operation}`
  }

  if (operation.includes(';')) {
    let lastIndex = operation.lastIndexOf(' ')

    return operation.substring(lastIndex + 1)
  }

  return operation
}

export const calculateResult = operation => {
  let operations = operation.split(' '),
      result = 0,
      operationMap = {
        '&plus;': '+',
        '&minus;': '-',
        '&divide;': '/',
        '&times;': '*',
        'Infinito': 'Infinity' // A biblioteca math.js se vira operando com a string "Infinity"    
    }
  
  // Substitui todas as ocorrencias de acordo com "operationMap"
  operations = operations.map(operation => {
    for (let key in operationMap) {
      if (operation === key) 
        return operationMap[key]
    }

    return operation
  })

  // Substitui qualquer separador decimal
  operation = operations.join('').replaceAll(',', '.')

  // Calcula o resultado usando math.js 
  // pois respeita a regra de prioridade das operações
  result = evaluate(operation)

  return isFinite(result) 
    ? Intl.NumberFormat('pt-BR', {maximumFractionDigits: 10})
        .format(result)
        .toString()
        .replaceAll('.', '')
    : 'Infinito'
}

export const endsWithAnyOperator = (operation) => {
  operation = operation.trim()

  if (operation[operation.length - 1] === ';') {
    let startLastOperatorIndex = operation.lastIndexOf('&'),
        endsLastOperatorIndex = operation.lastIndexOf(';')

    
    return operation.substring(
      startLastOperatorIndex, 
      endsLastOperatorIndex
    )
  }

  return false
}

export const endsWithOperator = (operation, operator) => {
  return endsWithAnyOperator(operation)
    && endsWithAnyOperator(operation).includes(operator)
}

export const replaceLastOperator = (operation, operator) => {
  return operation.substring(0, operation.lastIndexOf('&'))
    .concat(operator + ' ')
}

export const strLength = (str, countHTMLEntitiesAsOne = false) => {
  if (countHTMLEntitiesAsOne)
    return str.match(/\&(.*?)\;|./g).length
  
  return str.length
}

export const strLimit = (str, limit, end = '...') => {
  let newStr = str.replace(/\&.*?\;/g, '|'),
      entities = str.match(/\&.*?\;/g)

  if (newStr.length > limit) {
    newStr = newStr.substring(0, limit)

    if (entities) {
      for (let entity of entities) {
        newStr = newStr.replace('|', entity)
      }
    }

    return newStr.concat(end)
  }
  
  return str
}
