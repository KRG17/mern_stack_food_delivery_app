import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import { BrowserRouter as Router } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { legacy_createStore as createStore } from "redux"
import { Provider } from 'react-redux'
import myReducers from './context/reducers'

//2nd para is used to monitor what actions have been performed or triggered
const myStore = createStore(myReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const root = ReactDOM.createRoot(document.getElementById('root'))
//Provider -> to provide the store throughout app component
root.render(
    <React.StrictMode>
        <Router>
            <AnimatePresence>
                <Provider store={myStore}>
                    <App />
                </Provider>
            </AnimatePresence>
        </Router>
    </React.StrictMode>
)