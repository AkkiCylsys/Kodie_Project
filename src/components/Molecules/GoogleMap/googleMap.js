import React, {useEffect, useLayoutEffect, useRef} from 'react';
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
  Alert,
  Linking,
  AppState,
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
import RNSettings from 'react-native-settings';

import {useNavigation} from '@react-navigation/native';
const MapScreen = props => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
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
    // curLocation()
    // checkpermissionlocation()
    Platform.OS == 'ios' ? CheckIOSMapPermission() : checkpermissionlocation();
    // Add AppState listener
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // Remove AppState listener
      appStateListener.remove();
    };
  }, []);
  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      console.log('App has come to the foreground!');
      Platform.OS === 'ios' ? CheckIOSMapPermission() : checkpermissionlocation();
    }
  };
 

  // useLayoutEffect(() => {
  //   Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {language: 'en'});
  //   Platform.OS == 'ios' ? CheckIOSMapPermission() : checkpermissionlocation();

  // }, []);

  const getLOcation = () => {
    // Geolocation.getCurrentPosition(position => {
    //   console.log('you are here.');
    //   const {latitude, longitude} = position.coords;
    //   console.log('position.coords in map components....', position.coords);
    //   // setlatitude(latitude);
    //   setLat(latitude);
    //   setLong(longitude);
    //   setIsLoading(false);
    //   // setlongitude(longitude);
    //   // animateToCoordinate(latitude, longitude)
    // });
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
      error => {
        RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then(
          result => {
            if (result === RNSettings.ENABLED) {
              console.log('location is enabled');
              getLOcation();
            } else {
              Alert.alert(
                'Location Alert',

                "You didn't allow access to the location, so you are not able to use location services. Please enable location access.",
                [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      props.iscancel ? props.iscancel() : navigation.pop();
                    },
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      RNSettings.openSetting(
                        RNSettings.ACTION_LOCATION_SOURCE_SETTINGS,
                      ).then(result => {
                        if (result === RNSettings.ENABLED) {
                          console.log('location is enabled');
                          getLOcation();
                        }
                      });
                    },
                  },
                ],
              );
              setIsLoading(false);
            }
          },
        );
      },
      {
        enableHighAccuracy: true,
        // timeout: 24000,
        // maximumAge: 1000,
      },
    );
  };

  const checkpermissionlocation = async () => {
    try {
      // Check if permission is already granted
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
      // alert("hjhjh")
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
    // Use RNSettings to check if location services are enabled
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
          onPress: () => navigation.pop(),
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
