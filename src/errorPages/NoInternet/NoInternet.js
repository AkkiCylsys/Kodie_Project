import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FONTFAMILY, IMAGES, _COLORS } from '../../Themes';

const NoInternet = () => {
  return (
    <View style={styles.container}>
      <Image
        source={IMAGES?.NoInternet} // Update with your image path
        style={styles.image}
      />
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    marginBottom: 20, // Add spacing between image and text
  },
  text: {
    fontSize: 18,
    color: _COLORS?.Kodie_BlackColor,
    fontFamily:FONTFAMILY?.K_Bold
  },
});

export default NoInternet;
