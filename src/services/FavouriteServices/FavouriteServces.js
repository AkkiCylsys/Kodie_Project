import axios from 'axios';
import {Config} from '../../Config';

export const FavouriteServices = async favourtiesPayload => {
  try {
    const url = Config.BASE_URL;
    const FavouriteUri = `${url}saveFavoriteMapping`;
    console.log('FavouriteUri:', FavouriteUri);

    const response = await axios.post(FavouriteUri, favourtiesPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response?.data;
  } catch (error) {
    console.error('Error in favourtiesPayload:', error);
    throw error;
  }
};
