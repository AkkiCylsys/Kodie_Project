import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo'; // Ensure this package is installed

const useNetworkStatus = (isScreenFocused) => {
  const [isConnected, setIsConnected] = useState(null);
  const [isInternetReachable, setIsInternetReachable] = useState(null);

  useEffect(() => {
    if (isScreenFocused) {
      // Subscribe to network status updates
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsConnected(state.isConnected);
        setIsInternetReachable(state.isInternetReachable);
      });

      // Check the initial network status
      NetInfo.fetch().then((state) => {
        setIsConnected(state.isConnected);
        setIsInternetReachable(state.isInternetReachable);
      });

      // Cleanup the event listener on component unmount
      return () => {
        unsubscribe();
      };
    }
  }, [isScreenFocused]); // Only run the effect if the screen is focused

  return { isConnected, isInternetReachable };
};

export default useNetworkStatus;
