import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from './app/components/navigation.js';

const initialState = {
  information: {}
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'Save_info':
      state.information = action.payload;
      break;
  }
  return state;
};

const store = createStore(reducer);

export default class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}


