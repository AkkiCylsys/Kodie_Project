import SUBSCRIPTION_ACTION_TYPES from './SubscriptionActionTypes.js';

export const fetchSubscriptionData = () => ({
  type: SUBSCRIPTION_ACTION_TYPES.API_SUBSCRIPTION,
});

export const fetchSubscriptionSuccess = (data) => ({
  
  type: SUBSCRIPTION_ACTION_TYPES.API_SUBSCRIPTION_SUCCESS,
  payload: data,
});

export const fetchSubscriptionError = (error) => ({
  type: SUBSCRIPTION_ACTION_TYPES.API_SUBSCRIPTION_ERROR,
  payload: error,
});
