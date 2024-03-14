import {createStore, applyMiddleware, combineReducers} from 'redux';
import authenticationReducer from '../Reducers/AuthenticationReducer/AuthenticationReducer'
import subscriptionReducer from '../Reducers/SubscriptionReducer/SubscriptionReducer'


const appReducers = combineReducers({
  authenticationReducer,
   subscriptionReducer,
  // abcReducer

});

export const rootReducer = (state, action) =>{ 
if (action.type === 'USER_LOGOUT') {
    return appReducers(undefined, action)
  }

  return appReducers(state, action);

}