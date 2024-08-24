import ADD_PROPERTY_SECONDSTEP_ACTION_TYPES from '../../Actions/AddProperty/AddPropertySecondStep/AddPropertySecondStepActionTypes';
const initialState = {
  loading: false,
  data: [],
  error: '',
};

const AddPropertyStepsReducer = (state = initialState, action) => {
  //alert(action.type)
  switch (action.type) {
    case ADD_PROPERTY_SECONDSTEP_ACTION_TYPES.API_ADDPROPERTYSECONDSTEP:
      return {
        ...state,
        loading: true,
      };
    case ADD_PROPERTY_SECONDSTEP_ACTION_TYPES.API_ADDPROPERTYSECONDSTEP_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        //-------- Set the token when login is successful
        // token: action.token,
      };
    case ADD_PROPERTY_SECONDSTEP_ACTION_TYPES.API_ADDPROPERTYSECONDSTEP_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      case ADD_PROPERTY_SECONDSTEP_ACTION_TYPES.CLEAR_PROPERTY_ID:
        return {
          ...state,
          data: [],
          loading: false,
        };
    default:
      return state;
  }
};

export default AddPropertyStepsReducer;
