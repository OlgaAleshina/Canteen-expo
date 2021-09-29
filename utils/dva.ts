import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist'
import { createMemoryHistory } from 'history';
import company from "../models/company";
import cart from "../models/cart";

const history = createMemoryHistory();


import dva from 'dva';

const persistConfig = {
    key: 'root',
   // debug: true,
    storage: AsyncStorage,
    whitelist: ['company' , 'cart'],
  }
  

  const app = dva({
    initialState: {},
    onReducer: rootReducer => persistReducer(persistConfig, rootReducer),
    onError: (error: ErrorEvent) => {
        error.preventDefault();
        console.error(error.message);
    },
    //models: [company],
    history
  })
  // HMR workaround
  const models = [company, cart];
  if (!global.registered) models.forEach(model => app.model(model))
  global.registered = true


  app._router = () => {};

  app.start()
  // eslint-disable-next-line no-underscore-dangle
  const store = app.store

  //app.getStore = () => store

  export default app;
 