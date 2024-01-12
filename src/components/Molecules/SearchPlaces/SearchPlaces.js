import React, { useEffect, useRef, useState } from "react";
import { View, Text, Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SearchPlacesStyle } from "./SearchPlacesStyle";
import { _COLORS } from "../../../Themes";
import TopHeader from "../Header/Header";
const SearchPlaces = (props) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const textInputRef = useRef(null);
  useEffect(() => {
    // Focus on the text input when the component mounts
    textInputRef.current?.focus();
  }, []);
  return (
    <View style={SearchPlacesStyle.container}>
      {/* <TopHeader MiddleText={"Location"} /> */}
      <GooglePlacesAutocomplete
        placeholder="Enter Location"
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

        // textInputProps={{
        //   // Super hacky..
        //   ref: (textInput) => {
        //     setTimeout(() => textInput && textInput.focus(), 100);
        //   },
        // }}
        // textInputProps={{
        //   ref: textInput => {

        //       textInput && textInput.focus();

        //   }
        textInputProps={{
          ref: textInputRef,
        }}
        query={{
          key: "AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw",
          language: "en",
        }}
        fetchDetails={true} // Enable fetching place details
        // minLength={2}
        styles={{
          textInputContainer: {
            marginHorizontal: 16,
            borderWidth: Platform.OS == "ios" ? 0 : 1,
            borderColor: "#E5E4E2",
            borderRadius: 8,
            marginTop: 10,
          },
          textInput: {
            backgroundColor: _COLORS.Kodie_ExtraLiteGrayColor,
            height: 44,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
            color: _COLORS.Kodie_BlackColor,
          },
        }}
      />
    </View>
  );
};

export default SearchPlaces;
