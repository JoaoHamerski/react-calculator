import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDOM from 'react-dom'

import classNames from 'classnames'
import lodash from 'lodash'

window.classNames = classNames
window.lodash = lodash

import App from './components/App'

ReactDOM.render(
  <App />,
  document.getElementById('app')
)