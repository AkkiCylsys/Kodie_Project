import SUBSCRIPTION_ACTION_TYPES from '../../Actions/Subscription/SubscriptionActionTypes';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

const subscriptionReducer = (state = initialState, action) => {
  //alert(action.type)
  switch (action.type) {
    
    case SUBSCRIPTION_ACTION_TYPES.API_SUBSCRIPTION:
      return {
        ...state,
        loading: true,
      };
    case SUBSCRIPTION_ACTION_TYPES.API_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        //-------- Set the token when login is successful
        // token: action.token,
      };
    case SUBSCRIPTION_ACTION_TYPES.API_SUBSCRIPTION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      
    default:
      return state;
  }
};

export default subscriptionReducer;