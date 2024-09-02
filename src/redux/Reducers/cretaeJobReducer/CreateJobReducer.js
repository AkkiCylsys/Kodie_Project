import CREATE_JOB_ACTION_TYPE from '../../Actions/AddJob/CreateJob/CreateJobActionTypes';
const initialState = {
  loading: false,
  data: [],
  error: '',
};

const AddCreateJobReducer = (state = initialState, action) => {
  //alert(action.type)
  switch (action.type) {
    case CREATE_JOB_ACTION_TYPE.API_CREATEJOB:
      return {
        ...state,
        loading: true,
      };
    case CREATE_JOB_ACTION_TYPE.API_CREATEJOB_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        //-------- Set the token when login is successful
        // token: action.token,
      };
    case CREATE_JOB_ACTION_TYPE.API_CREATEJOB_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default AddCreateJobReducer;
