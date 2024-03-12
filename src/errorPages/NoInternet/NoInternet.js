import React from 'react';
import { View, Text } from 'react-native';

const NoInternet = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>No Internet Connection</Text>
    </View>
  );
};

export default NoInternet;