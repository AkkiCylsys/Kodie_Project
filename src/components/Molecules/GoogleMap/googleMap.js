import React, { useEffect, useLayoutEffect, useRef } from 'react';
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
  PermissionsAndroid,
  Alert,
  Linking,
  AppState,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GoogleMapStyle } from './googleMapStyle';
import { useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { CommonLoader } from '../ActiveLoader/ActiveLoader';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import RNSettings from 'react-native-settings';
import { useNavigation } from '@react-navigation/native';
import { _COLORS } from '../../../Themes';

const MapScreen = props => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
    Platform.OS == 'ios' ? CheckIOSMapPermission() : checkpermissionlocation();
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      appStateListener.remove();
    };
  }, []);
  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      console.log('App has come to the foreground!');
      Platform.OS === 'ios' ? CheckIOSMapPermission() : checkpermissionlocation();
    }
  };

  const getCenterOffsetForAnchor = (anchorPoint, markerWidth, markerHeight) => {
    const offsetX = (markerWidth * 0.5) - (markerWidth * anchorPoint.x);
    const offsetY = (markerHeight * 0.5) - (markerHeight * anchorPoint.y);

    return { x: offsetX, y: offsetY };

  };
  // Usage Example
  const markerWidth = 40; // Marker width in pixels
  const markerHeight = 40; // Marker height in pixels

  // Anchor point, where (0.5, 0.5) is the center of the marker
  const anchorPoint = { x: 0.5, y: 0.5 };

  // Calculate the center offset
  const offset = getCenterOffsetForAnchor(anchorPoint, markerWidth, markerHeight);

  console.log(`Offset X: ${offset.x}, Offset Y: ${offset.y}`);// useLayoutEffect(() => {
  //   Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {language: 'en'});
  //   Platform.OS == 'ios' ? CheckIOSMapPermission() : checkpermissionlocation();

  // }, []);

  const getLOcation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('you are here.');
        const { latitude, longitude } = position.coords;
        console.log('position.coords in map components....', position.coords);
        setLat(latitude);
        setLong(longitude);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  };
  const checkpermissionlocation = async () => {
    try {
      const permissionGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (!permissionGranted) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Allow Location Access?',
            message: "Allow Kodie to access this device's location?",
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          alert('Location permission denied');
          return;
        }
      }

      console.log('You can use the location');

      // Check if location is enabled
      RNSettings.getSetting(RNSettings.LOCATION_SETTING).then(result => {
        if (result === RNSettings.ENABLED) {
          console.log('Location is enabled');
          getLOcation();
        } else {
          Alert.alert(
            'Location Alert',
            "You didn't allow access to the location, so you are not able to use location services. Please enable location access.",
            [
              {
                text: 'Cancel',
                onPress: () =>
                  props.iscancel ? props.iscancel() : navigation.pop(),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  RNSettings.openSetting(
                    RNSettings.ACTION_LOCATION_SOURCE_SETTINGS,
                  ).then(result => {
                    if (result === RNSettings.ENABLED) {
                      console.log('Location is enabled');
                      getLOcation();
                    } else {
                      Alert.alert(
                        'Location Alert',
                        "You didn't allow access to the location, so you are not able to use location services. Please enable location access.",
                        [
                          {
                            text: 'Cancel',
                            onPress: () =>
                              props.iscancel
                                ? props.iscancel()
                                : navigation.pop(),
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => {
                              RNSettings.openSetting(
                                RNSettings.ACTION_LOCATION_SOURCE_SETTINGS,
                              ).then(result => {
                                if (result === RNSettings.ENABLED) {
                                  console.log('Location is enabled');
                                  getLOcation();
                                }
                              });
                            },
                          },
                        ],
                      );
                    }
                  });
                },
              },
            ],
          );
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const CheckIOSMapPermission = async () => {
    try {
      const statusWhenInUse = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      const statusAlways = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);

      if (statusWhenInUse === RESULTS.GRANTED || statusAlways === RESULTS.GRANTED) {
        handlePermissionStatus(RESULTS.GRANTED);
      } else {
        const resultWhenInUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        const resultAlways = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        if (resultWhenInUse === RESULTS.GRANTED || resultAlways === RESULTS.GRANTED) {
          handlePermissionStatus(RESULTS.GRANTED);
        } else {
          handlePermissionStatus(resultWhenInUse);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePermissionStatus = (status) => {
    switch (status) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available (on this device / in this context)');
        showLocationAlert();
        break;
      case RESULTS.DENIED:
        console.log('The permission has not been requested / is denied but requestable');
        showLocationAlert();
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        showLocationAlert();
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        checkLocationServices();
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        showLocationAlert();
        break;
      default:
        showLocationAlert();
    }
  };
  const checkLocationServices = () => {
    RNSettings.getSetting(RNSettings.LOCATION_SETTING).then((result) => {
      if (result === RNSettings.ENABLED) {
        console.log('Location services enabled');
        getLOcation();
      } else {
        showLocationAlert();
      }
    });
  };
  const showLocationAlert = () => {
    Alert.alert(
      'Location Alert',
      "You didn't allow access to the location, so you are not able to use location services. Please enable location access.",
      [
        {
          text: 'Cancel',
          onPress: () =>props.iscancel
          ? props.iscancel()
          : navigation.pop(),
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => {
            Linking.openSettings().catch(() => console.warn('Cannot open settings'));
          },
        },
      ],
    );
  };
  const focusOnLocation = () => {
    if (lat && long) {
      const newRegion = {
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000)
      }
    }
  }

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
          showsMyLocationButton={true}
          ref={mapRef}
        >
          <View style={{
            position: 'absolute', 
            screentop: '50%', 
            verticallyleft: '50%', 
            horizontallymarginLeft: -24, 
            centermarginTop: -48, 

          }}>
            <Marker
              anchor={anchorPoint}
              centerOffset={offset}
              draggable={true}
              coordinate={{
                latitude: props?.Maplat ? parseFloat(props?.Maplat) : lat,
                longitude: props?.Maplng ? parseFloat(props?.Maplng) : long,
              }}
              onPress={props?.onPress}>

              {/* <Icon name="location-pin" size={30} color={'red'} /> */}
                          
               <View style={{ width: markerWidth, height: markerHeight, }}>
        <Text style={{fontSize:30}}>📍</Text>
      </View>

              <Callout tooltip onPress={props?.onPressTooltip}>
                {/* <View style={GoogleMapStyle.tooltipView}>
      <Text style={GoogleMapStyle.tooltipText}>
        {props?.ToolTxt ? props?.ToolTxt : "Cayman island"}
      </Text>
    </View> */}
              </Callout>

            </Marker>
            </View>
            <TouchableOpacity
              style={{
                flex:1,
                backgroundColor: _COLORS.Kodie_WhiteColor,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 3,
                borderRadius: 10,
                width: '24%',
                height: 60,
                bottom: -15,
                left: 20,
                marginBottom: 30,
                position: 'absolute',
              }}
              onPress={() => {
                focusOnLocation();
              }}
            >

              <Ionicons
                name="location-sharp"
                size={30}
                color={_COLORS.Kodie_lightGreenColor}
                style={{justifyContent: 'center',
                alignItems: 'center',}}
              />
            </TouchableOpacity>
        </MapView>
      )}
    </>
  );
};

export default MapScreen;
