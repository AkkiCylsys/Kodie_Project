import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import {rootReducer} from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  
};
const persistedReducer=persistReducer(persistConfig,rootReducer)

const logger = createLogger();

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, logger)
  );
export const persistor =persistStore(store);
export default store;