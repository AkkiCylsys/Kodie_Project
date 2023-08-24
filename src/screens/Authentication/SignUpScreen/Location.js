import React from "react";
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
export default Location = (props) => {
  return (
    <View style={LocationStyle.mainContainer}>
      <TopHeader
        MiddleText={"Location"}
        onPressLeftButton={() => _goBack(props)}
      />

      <View style={LocationStyle.mapsty}>
        <MapScreen />
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