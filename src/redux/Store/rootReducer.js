import {createStore, applyMiddleware, combineReducers} from 'redux';
import authenticationReducer from '../Reducers/AuthenticationReducer/AuthenticationReducer'
//  import xyzReducer from '../Reducers/xyzReducer/xyzReducer'


const appReducers = combineReducers({
  authenticationReducer,
  // xyzReducer,
  // abcReducer

});

export const rootReducer = (state, action) =>{ 
if (action.type === 'USER_LOGOUT') {
    return appReducers(undefined, action)
  }

  return appReducers(state, action);

}