import AUTHENTICATION_ACTION_TYPES from '../../Actions/Authentication/AuthenticationActionTypes';

const initialState = {
  loading: false,
  data: [],
  error: '',
  // this is login line below
  // token: null,
};

const authenticationReducer = (state = initialState, action) => {
  //alert(action.type)
  switch (action.type) {
    
    case AUTHENTICATION_ACTION_TYPES.API_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case AUTHENTICATION_ACTION_TYPES.API_LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        //-------- Set the token when login is successful
        // token: action.token,
      };
    case AUTHENTICATION_ACTION_TYPES.API_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

// for registration
case AUTHENTICATION_ACTION_TYPES.API_REGISTRATION:
  return {
    ...state,
    loading: true,
  };
case AUTHENTICATION_ACTION_TYPES.API_REGISTRATION_SUCCESS:
  return {
    ...state,
    data: action.payload,
    loading: false,
  };
case AUTHENTICATION_ACTION_TYPES.API_REGISTRATION_ERROR:
  return {
    ...state,
    error: action.payload,
    loading: false,
  };

  // for send OTP 
  case AUTHENTICATION_ACTION_TYPES.API_SENT_OTP:
  return {
    ...state,
    loading: true,
  };
case AUTHENTICATION_ACTION_TYPES.API_SENT_OTP_SUCCESS:
  return {
    ...state,
    data: action.payload,
    loading: false,
  };
case AUTHENTICATION_ACTION_TYPES.API_SENT_OTP_ERROR:
  return {
    ...state,
    error: action.payload,
    loading: false,
  };


  // for Verify OTP
  case AUTHENTICATION_ACTION_TYPES.API_VERIFY_OTP:
    return {
      ...state,
      loading: true,
    };
  case AUTHENTICATION_ACTION_TYPES.API_VERIFY_OTP_SUCCESS:
    return {
      ...state,
      data: action.payload,
      loading: false,
    };
  case AUTHENTICATION_ACTION_TYPES.API_VERIFY_OTP_ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  
    default:
      return state;
  }
};

export default authenticationReducer;