import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './NoInternet'; // Import the NoInternet component

const withNetworkConnectivity = WrappedComponent => {
  const WithNetworkConnectivity = props => {
    const [isConnected, setIsConnected] = useState(true);
    const [isReachable, setIsReachable] = useState(true);

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        const isInternetReachable = state.isInternetReachable;
        setIsConnected(state.isConnected && isInternetReachable);
        NetInfo.fetch('wifi').then(state => {
          console.log('SSID', state.details.ssid);
          console.log('BSSID', state.details.bssid);
        });
        if (!isInternetReachable) {
          Alert.alert(
            'No Internet Connection',
            'You have lost your internet connection. Please check your network settings.',
            [{text: 'OK'}],
          );
        }
        // setIsConnected(state.isConnected);
        // setIsReachable(state.isInternetReachable);
      });

      return () => {
        unsubscribe();
      };
    }, []);

    return (
      <View style={{flex: 1}}>
        {isConnected ? <WrappedComponent {...props} /> : <NoInternet />}
      </View>
    );
  };

  return WithNetworkConnectivity;
};

export default withNetworkConnectivity;
