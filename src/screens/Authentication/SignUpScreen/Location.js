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

export default Location = (props) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const [Address, setAddress] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
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
    alert(latitude);
    alert(longitude);
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
    Geocoder.init("AIzaSyDLWZtQIx0JsQciFm7VLzSKJOS_QqjJsoA", {
      language: "en",
    });
    checkpermissionlocation();
  }, []);

  return (
    <View style={LocationStyle.mainContainer}>
      <TopHeader
        MiddleText={"Location"}
        onPressLeftButton={() => _goBack(props)}
      />

      <View style={LocationStyle.mapsty}>
        <MapScreen
          onRegionChange={onRegionChange}
          // Maplat={locationInfo?.latitude || latitude}
          // Maplng={locationInfo?.longitude || longitude}
          // Maplat={latitude ||22.924898263688327}
          // Maplng={longitude ||78.77681708434507}
          Maplat={latitude}
          Maplng={longitude}
        />
      </View>
      <View style={LocationStyle.searchPlc}>
        <SearchPlaces />
      </View>

      <TouchableOpacity style={LocationStyle.shapeIcon}>
        <Image source={IMAGES.Shape} style={LocationStyle.shapImg} />
      </TouchableOpacity>
    </View>
  );
};
