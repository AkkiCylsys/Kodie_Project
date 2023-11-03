import React,{useState} from "react";
import { View, Text } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SearchPlacesStyle } from "./SearchPlacesStyle";
const SearchPlaces = () => {
  const [selectedLocation, setSelectedLocation]=useState('')
  const handleLocationSelect = (selectedLocation) => {
    // Call the function to send the selected location to the parent component (MapScreen in this case)
    props.onLocationSelect(selectedLocation);
  };
  return (
    <View style={SearchPlacesStyle.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: "AIzaSyDLWZtQIx0JsQciFm7VLzSKJOS_QqjJsoA",
          language: "en",
        }}
        styles={{
          textInputContainer: {
            marginHorizontal: 16,
            borderWidth: 1,
            // marginTop: 13,
            borderRadius: 8,
            borderColor: _COLORS.Kodie_ExtraLightGrayColor,
          },
          textInput: {
            height: 38,
            color: _COLORS.Kodie_MediumGrayColor,
            fontFamily: FONTFAMILY.K_Medium,
            fontSize: 14,
            alignSelf: "center",
          },
        }}
      />
    </View>
  );
};
export default SearchPlaces;
