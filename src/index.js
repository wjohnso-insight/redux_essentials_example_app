import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import { fetchUsers } from './features/users/usersSlice'

import './api/server'

store.dispatch(fetchUsers()) //* Because we only want to call fetchUsers() once, we can call it from index

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
