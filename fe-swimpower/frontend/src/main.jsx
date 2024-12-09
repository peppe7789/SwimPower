import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import postEventReducer from "./reducer/PostEventSlice";
import './index.css';
import App from './App.jsx';



const store = configureStore({
  reducer: {
    postEvents: postEventReducer,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
