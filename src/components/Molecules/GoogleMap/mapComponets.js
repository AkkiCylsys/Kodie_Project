import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { LatLng } from "react-native-maps";

const MapComponent = () => {
  const onMarkerDragEnd = (event) => {
    const position = event.nativeEvent.coordinate;
    console.log(`Pin dropped at: ${position.latitude}, ${position.longitude}`);
  };
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.39094933041195,
        longitude: -122.02503913145092,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{
          latitude: 37.39094933041195,
          longitude: -122.02503913145092,
        }}
        title="Draggable Marker"
        description="You can drag this marker"
        draggable
        onDragEnd={onMarkerDragEnd}
      />
    </MapView>
  );
};

export default MapComponent;
