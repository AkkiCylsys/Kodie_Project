import {createStore, applyMiddleware, combineReducers} from 'redux';
import authenticationReducer from '../Reducers/AuthenticationReducer/AuthenticationReducer';
import subscriptionReducer from '../Reducers/SubscriptionReducer/SubscriptionReducer';
import AddPropertyStepsReducer from '../Reducers/AddPropertyStepReducer/AddPropertyStepReducer';
import AddCreateJobReducer from '../Reducers/cretaeJobReducer/CreateJobReducer';
const appReducers = combineReducers({
  authenticationReducer,
   subscriptionReducer,
   AddPropertyStepsReducer,
   AddCreateJobReducer
  // abcReducer

});

export const rootReducer = (state, action) =>{ 
if (action.type === 'USER_LOGOUT') {
    return appReducers(undefined, action)
  }

  return appReducers(state, action);

}