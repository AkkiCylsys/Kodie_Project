import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './NoInternet'; // Import the NoInternet component
 
const withNetworkConnectivity = WrappedComponent => {
  const WithNetworkConnectivity = props => {
    const [isConnected, setIsConnected] = useState(true);
 
    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
      });
 
      return () => {
        unsubscribe();
      };
    }, []);
 
    return (
      <View style={{ flex: 1 }}>
        {isConnected ? <WrappedComponent {...props} /> : <NoInternet />}
      </View>
    );
  };
 
  return WithNetworkConnectivity;
};
 
export default withNetworkConnectivity;