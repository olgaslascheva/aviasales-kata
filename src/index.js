import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import App from './components/app';
import filtersReducer from './redux/filtersReducer';
import tabsReducer from './redux/tabsReducer';
import ticketsReducer from './redux/ticketsReducer';

const rootReducer = combineReducers({
  filters: filtersReducer,
  tabs: tabsReducer,
  tickets: ticketsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
