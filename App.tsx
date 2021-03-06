import React from 'react';
import { Provider  } from 'react-redux';
import dva from "./utils/dva";
import useCachedResources from './hooks/useCachedResources';
import { persistStore, REHYDRATE } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react'
import useColorScheme from './hooks/useColorScheme';
import ThemedApp from "./ThemedApp";


const app = dva; // Create a dva instance to pass configuration parameters. Https://dvajs.com/api/#app-dva-opts

const store = app._store; // Get the redux store object for react-redux

const createPersistor = (store) => {
  const persistor = persistStore(store)
  // hmr时，如果不dispatch REHYDRATE，会导致
  // PersistGate的子元素不渲染，页面展示空白
  persistor.dispatch({
    type: REHYDRATE,
  }) 
  return persistor
}


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
              <PersistGate persistor={createPersistor(store)} loading={null}>
                 <ThemedApp />
              </PersistGate>
      </Provider>
    );
  }
}

