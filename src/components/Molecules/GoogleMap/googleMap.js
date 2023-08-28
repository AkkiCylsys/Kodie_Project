import * as React from "react";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Callout,
} from "react-native-maps";
import { View, Text, Platform, GoogleMapStyleheet } from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";
import { GoogleMapStyle } from "./googleMapStyle";
import SearchPlaces from "../SearchPlaces/SearchPlaces";
const MapScreen = (props) => {
  return (
    <MapView
      // region={''}
      onRegionChange={props?.onRegionChange}
      provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      style={props?.style ? props?.style : GoogleMapStyle.MapView}
      showsUserLocation={true}
      initialRegion={{
        latitude: props?.Maplat ? parseFloat(props?.Maplat) : 37.785834,
        longitude: props?.Maplng ? parseFloat(props?.Maplng) : -122.406417,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
    >
      <Marker
        coordinate={{
          latitude: props?.Maplat ? parseFloat(props?.Maplat) : 37.785834,
          //   latitude: props?.Marklat ? props?.Marklat : 19.313299,
          //   longitude: props?.Marklng ? props?.Marklng : -81.254601,
          longitude: props?.Maplng ? parseFloat(props?.Maplng) : -122.406417,
        }}
        onPress={props?.onPress}
      >
        <Icon name="location-pin" size={30} color={"red"} />

        <Callout tooltip onPress={props?.onPressTooltip}>
          <View style={GoogleMapStyle.tooltipView}>
            <Text style={GoogleMapStyle.tooltipText}>
              {props?.ToolTxt ? props?.ToolTxt : "Cayman island"}
            </Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
};

export default MapScreen;
