import CREATE_JOB_ACTION_TYPE from './CreateJobActionTypes';
export const fetchCreateJobData = () => ({
  type: CREATE_JOB_ACTION_TYPE.API_CREATEJOB,
});

export const fetchCreateJobSuccess = data => ({
  type: CREATE_JOB_ACTION_TYPE.API_CREATEJOB_SUCCESS,
  payload: data,
});

export const fetchCreateJobError = error => ({
  type: CREATE_JOB_ACTION_TYPE.API_CREATEJOB_ERROR,
  payload: error,
});
