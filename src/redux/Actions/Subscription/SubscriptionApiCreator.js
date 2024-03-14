import axios from 'axios';
import {
    fetchSubscriptionData,
    fetchSubscriptionSuccess,
    fetchSubscriptionError,
} from './SubscriptionApiAction';
import {Config} from '../../../Config';

const url = Config.BASE_URL;

export const userSubscribedCreator = data => async dispatch => {
    // alert(JSON.stringify(data));
    dispatch(fetchSubscriptionData());
    try {
      const res = await axios.post(url + 'check_subscription', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res?.data?.data?.status == 'active') {
          dispatch(fetchSubscriptionSuccess(res.data));
          return res;
        
      } else {
        //dispatch(fetchLoginError(res.data));
        return res;
      }
    } catch (error) {
      // alert(JSON.stringify(error?.response?.status));
      dispatch(fetchSubscriptionError(error));
      return error?.response?.status;
    }
  };
