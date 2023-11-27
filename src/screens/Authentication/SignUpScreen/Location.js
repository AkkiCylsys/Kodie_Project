import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import { LocationStyle } from "./LocationStyle";
import MapScreen from "../../../components/Molecules/GoogleMap/googleMap";
import SearchPlaces from "../../../components/Molecules/SearchPlaces/SearchPlaces";
import { _COLORS, FONTFAMILY, IMAGES } from "../../../Themes";
import Geocoder from "react-native-geocoding";
import Geolocation from "react-native-geolocation-service";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { TextInput } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AntDesign from "react-native-vector-icons/AntDesign";
export default Location = (props) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const [latitude_Search, setLatitude_Search] = useState("");
  const [longitude_Search, setLongitude_Search] = useState("");
  const [description, setDescription] = useState("");
  const [Address, setAddress] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [text, onChangeText] = useState("");
  const [showMap, setShowMap] = useState(true);

  const toggleMapVisibility = () => {
    setShowMap(!showMap);
  };
  useLayoutEffect(() => {
    checkpermissionlocation();
  }, []);

  const checkpermissionlocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",

          message: "Example App access to your location ",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        // alert("You can use the location");
        //getAddressWithCordinates();
        getOneTimeLocation();
      } else {
        console.log("location permission denied");
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getOneTimeLocation = () => {
    setLocationStatus("Getting Location ...");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        // alert(JSON.stringify(position))
        setLocationStatus("You are Here");

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        setlatitude(currentLatitude);
        setlongitude(currentLongitude);

        getAddress(currentLongitude, currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };

  const onRegionChange = (Region) => {
    //alert(JSON.stringify(Region.latitude))
    setlatitude(Region.latitude);
    // alert(latitude);
    // alert(longitude);
    console.log("latitude..", latitude);
    console.log("longitude..", longitude);
    setlongitude(Region.longitude);
    getAddress(Region.latitude, Region.longitude);
  };

  const getAddress = (latitude, longitude) => {
    // alert(longitude);
    Geocoder.from(latitude, longitude)
      .then((json) => {
        // alert(JSON.stringify(json.results))
        let MainFullAddress = json.results[0].formatted_address;
        var addressComponent2 = json.results[0].address_components[1];
      })
      .catch((error) => console.warn(error));
  };
  useEffect(() => {
    Geocoder.init("AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw", {
      language: "en",
    });
    checkpermissionlocation();
  }, []);

  const GOOGLE_PLACES_API_KEY = "AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw";

  return (
    <View style={LocationStyle.mainContainer}>
      <TopHeader
        MiddleText={"Location"}
        onPressLeftButton={() => _goBack(props)}
      />
      {showMap ? (
        <TouchableOpacity
          style={{
            backgroundColor: _COLORS.Kodie_WhiteColor,
            flexDirection: "row",

            // borderWidth: 1,
          }}
          onPress={toggleMapVisibility}
        >
          <AntDesign
            name="search1"
            size={20}
            color={_COLORS.Kodie_ExtraminLiteGrayColor}
            style={{
              alignSelf: "center",
              marginLeft: 10,
            }}
          />
          <Text
            style={{
              paddingVertical: 10,
              marginLeft: 10,
              fontSize: 15,
              fontFamily: FONTFAMILY.K_Regular,
              color: _COLORS.Kodie_ExtraminLiteGrayColor,
            }}
          >
            {"Search"}
          </Text>
        </TouchableOpacity>
      ) : null}
      {showMap ? (
        <View style={LocationStyle.mapsty}>
          <MapScreen
            onRegionChange={onRegionChange}
            Maplat={latitude}
            Maplng={longitude}
          />
        </View>
      ) : (
        <View style={LocationStyle.searchPlc}>
          <SearchPlaces
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log("Selected Place Data:", data);
              if ((details, data)) {
                // Access latitude and longitude from 'details'
                const { lat, lng } = details.geometry.location;
                console.log("Latitude:", lat);
                console.log("Longitude:", lng);
                console.log("description:", data?.description);
                setLatitude_Search(lat);
                setLongitude_Search(lng);
                setDescription(data?.description);
                props.navigation.navigate("SignUpSteps", {
                  latitude_Search: details.geometry.location.lat,
                  longitude_Search: details.geometry.location.lng,
                  description: data?.description,
                });
              }
            }}
          />
        </View>
      )}

      {/* <TouchableOpacity style={LocationStyle.shapeIcon}>
        <Image source={IMAGES.Shape} style={LocationStyle.shapImg} />
      </TouchableOpacity> */}
    </View>
  );
};
