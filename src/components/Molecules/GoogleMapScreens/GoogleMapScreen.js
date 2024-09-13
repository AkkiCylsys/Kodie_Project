import React from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { GoogleMapScreenStyle } from './GoogleMapScreenStyle';
import MapScreen from '../GoogleMap/googleMap';
import { IMAGES, _COLORS } from '../../../Themes';

const GoogleMapScreen = ({ Maplat, Maplng, onRegionChange, openMapandClose, ConfirmAddress }) => {
  return (
    <View style={GoogleMapScreenStyle.container}>
      <MapScreen
        style={GoogleMapScreenStyle.mapScreen}
        onRegionChange={onRegionChange}
        Maplat={Maplat}
        Maplng={Maplng}
      />
      <View style={GoogleMapScreenStyle.searchContainer}>
        <TextInput
          style={GoogleMapScreenStyle.searchInput}
          onFocus={openMapandClose}
          placeholder={'Search Place'}
          placeholderTextColor={_COLORS.Kodie_BlackColor}
        />
      </View>
      <TouchableOpacity style={GoogleMapScreenStyle.btnContainer} onPress={ConfirmAddress}>
        <Image source={IMAGES?.Shape} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default GoogleMapScreen;
