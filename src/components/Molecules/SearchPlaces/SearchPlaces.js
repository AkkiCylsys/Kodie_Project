import React, { useState } from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SearchPlacesStyle } from "./SearchPlacesStyle";

const SearchPlaces = () => {
  const [selectedLocation, setSelectedLocation] = useState("");

  return (
    <View style={SearchPlacesStyle.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log("Selected Place Data:", data);
          if (details) {
            // Access latitude and longitude from 'details'
            const { lat, lng } = details.geometry.location;
            console.log("Latitude:", lat);
            console.log("Longitude:", lng);
          }
        }}
        query={{
          key: "AIzaSyDLWZtQIx0JsQciFm7VLzSKJOS_QqjJsoA",
          language: "en",
        }}
        fetchDetails={true} // Enable fetching place details
        styles={{
          textInputContainer: {
            marginHorizontal: 16,
            borderWidth: 1,
            borderRadius: 8,
          },
          textInput: {
            height: 38,
          },
        }}
      />
    </View>
  );
};

export default SearchPlaces;
