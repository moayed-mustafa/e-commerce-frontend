import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import rootReducer from './reducers/rootReducer'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'



import { Provider } from 'react-redux'

const persistConfig = {
  key: 'root',
  storage,
}

//   redux thunk and the redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(persistedReducer);
const persistor = persistStore(store);


ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />

      </PersistGate>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  // <React.StrictMode>

  {/* </React.StrictMode>, */}

reportWebVitals();
