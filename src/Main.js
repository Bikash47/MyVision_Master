// import 'react-native-gesture-handler';
import * as React from 'react';
import { View,AsyncStorage } from 'react-native'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import Router from './Router'



export default function Main() {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  let store = createStore(persistedReducer,{}, applyMiddleware(ReduxThunk))
  let persistor = persistStore(store)
  
 // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
        </PersistGate>
      </Provider>
    </View>
  );
}