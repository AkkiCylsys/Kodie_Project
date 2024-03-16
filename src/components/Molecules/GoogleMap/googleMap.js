import React, {useEffect,useLayoutEffect, useRef} from 'react';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Callout,
} from 'react-native-maps';
import {
  View,
  Text,
  Platform,
  GoogleMapStyleheet,
  PermissionsAndroid,
} from 'react-native'; 
import Icon from 'react-native-vector-icons/dist/Entypo';
import {GoogleMapStyle} from './googleMapStyle';
import SearchPlaces from '../SearchPlaces/SearchPlaces';
import {useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
// import Geolocation from "react-native-geolocation-service";
import {CommonLoader} from '../ActiveLoader/ActiveLoader';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';

const MapScreen = props => {
  const mapRef = useRef(null);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  useEffect(() => {
    console.log('props?.Maplat........', props?.Maplat);
    console.log('props?.Maplng........', props?.Maplng);
    // fetchCurrentLocation();
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
   // checkpermissionlocation()
    Platform.OS == 'ios' ? CheckIOSMapPermission() : checkpermissionlocation();
  }, []);

  useLayoutEffect(() => {
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {language: 'en'});
    Platform.OS == 'ios' ? CheckIOSMapPermission() : checkpermissionlocation();

  }, []);

  const fetchCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('you are here.');
        const {latitude, longitude} = position.coords;
        console.log('position.coords in map components....', position.coords);
        // setlatitude(latitude);
        setLat(latitude);
        setLong(longitude);
        setIsLoading(false);
        // setlongitude(longitude);
        // animateToCoordinate(latitude, longitude)
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };
  const checkpermissionlocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },    
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        fetchCurrentLocation();
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const CheckIOSMapPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            fetchCurrentLocation();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      {isLoading ? (
        <CommonLoader />
      ) : (
        <MapView
          onRegionChange={props?.onRegionChange}
          provider={
            Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          style={props?.style ? props?.style : GoogleMapStyle.MapView}
          showsUserLocation={true}
          showsCompass={true}
          compassStyle={GoogleMapStyle.compass}
          initialRegion={{
            latitude: props?.Maplat ? parseFloat(props?.Maplat) : lat,
            longitude: props?.Maplng ? parseFloat(props?.Maplng) : long,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsMyLocationButton={true}>
          <Marker
            draggable={true}
            coordinate={{
              latitude: props?.Maplat ? parseFloat(props?.Maplat) : lat,
              longitude: props?.Maplng ? parseFloat(props?.Maplng) : long,
            }}
            onPress={props?.onPress}>
            <Icon name="location-pin" size={30} color={'red'} />

            <Callout tooltip onPress={props?.onPressTooltip}>
              {/* <View style={GoogleMapStyle.tooltipView}>
      <Text style={GoogleMapStyle.tooltipText}>
        {props?.ToolTxt ? props?.ToolTxt : "Cayman island"}
      </Text>
    </View> */}
            </Callout>
          </Marker>
        </MapView>
      )}
    </>
  );
};

export default MapScreen;
