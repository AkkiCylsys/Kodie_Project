import React, { useState } from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SearchPlacesStyle } from "./SearchPlacesStyle";
import { _COLORS } from "../../../Themes";
import TopHeader from "../Header/Header";
const SearchPlaces = (props) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  return (
    <View style={SearchPlacesStyle.container}>
      {/* <TopHeader MiddleText={"Location"} /> */}
      <GooglePlacesAutocomplete
        placeholder="Search"
        debounce={400}
        onPress={props.onPress}
        // onPress={(data, details) => {
        //   // 'details' is provided when fetchDetails = true
        //   console.log("Selected Place Data:", data);
        //   if ((details, data)) {
        //     // Access latitude and longitude from 'details'
        //     const { lat, lng } = details.geometry.location;
        //     console.log("Latitude:", lat);
        //     console.log("Longitude:", lng);
        //     console.log("description:", data?.description);
        //     setLatitude(lat);
        //     setLongitude(lng);
        //     setDescription(data);
        //     props.navigation.navigate("SignUpSteps", {
        //       latitude: latitude,
        //       longitude: longitude,
        //       description: description,
        //     });
        //   }
        // }}
        query={{
          key: "AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw",
          language: "en",
        }}
        fetchDetails={true} // Enable fetching place details
        minLength={2}
        styles={{
          textInputContainer: {
            marginHorizontal: 16,
            borderWidth: 1,
            borderColor: "#E5E4E2",
            borderRadius: 8,
            marginTop: 10,
          },
          textInput: {
            height: 38,
            color: _COLORS.Kodie_BlackColor,
          },
        }}
      />
    </View>
  );
};

export default SearchPlaces;
