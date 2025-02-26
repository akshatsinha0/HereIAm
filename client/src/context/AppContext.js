import React, { createContext, useReducer } from 'react';

// Define your initial state
const initialState = {
  user: null,          // will store user authentication details
  messages: [],        // array of chat messages
  ui: {
    loginModalOpen: false,  // controls whether the login modal is open
  }
};

// Create the context
const AppContext = createContext(initialState);

// Create a reducer to update state based on actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'TOGGLE_LOGIN_MODAL':
      return { ...state, ui: { ...state.ui, loginModalOpen: action.payload } };
    default:
      return state;
  }
};

// Create the provider component
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
