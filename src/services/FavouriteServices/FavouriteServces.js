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

export const GetFavouriteServices = async getfavourtiesPayload => {
  try {
    const url = Config.BASE_URL;
    const getFavouriteUri = `${url}Favoritelist`;
    console.log('getFavouriteUri:', getFavouriteUri);

    const response = await axios.post(getFavouriteUri, getfavourtiesPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response?.data;
  } catch (error) {
    console.error('Error in getFavouriteUri:', error);
    throw error;
  }
};
