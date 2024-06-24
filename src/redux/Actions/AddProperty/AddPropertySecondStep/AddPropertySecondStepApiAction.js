import ADD_PROPERTY_SECONDSTEP_ACTION_TYPES from './AddPropertySecondStepActionTypes';
export const fetchAddPropertySecondStepsData = () => ({
  type: ADD_PROPERTY_SECONDSTEP_ACTION_TYPES.API_ADDPROPERTYSECONDSTEP,
});

export const fetchAddPropertySecondStepsSuccess = data => ({
  type: ADD_PROPERTY_SECONDSTEP_ACTION_TYPES.API_ADDPROPERTYSECONDSTEP_SUCCESS,
  payload: data,
});

export const fetchAddPropertySecondStepsError = error => ({
  type: ADD_PROPERTY_SECONDSTEP_ACTION_TYPES.API_ADDPROPERTYSECONDSTEP_ERROR,
  payload: error,
});

export const clearPropertyData = () => ({
  type: ADD_PROPERTY_SECONDSTEP_ACTION_TYPES.CLEAR_PROPERTY_ID,
});