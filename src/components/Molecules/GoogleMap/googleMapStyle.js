import { StyleSheet } from "react-native";
export const GoogleMapStyle = StyleSheet.create({
  MapView: {
    height: "100%",
    width: "100%",
  },
  tooltipView: {
    backgroundColor: "white",
    justifyContent: "space-between",
    alignContent: "center",
    borderRadius: 2,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
  },

  tooltipText: {
    flex:1,
    textAlign: "center",
    fontSize: 15,
    alignSelf: "center",
    width: "100%",
    marginVertical: "4%",
    marginRight: "3%",
    color: "black",
  },
  searchBar: {
    width: "90%",
    height: 40,
    alignSelf: "center",
    marginTop: 100,
    backgroundColor: "red",
  },
  myLocationIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'white', // Example styling for the icon
    borderRadius: 20,
    padding: 8,
  },
  compass: {
    position: 'relative',
    left: '50%',
    marginLeft: -20, 
    marginTop: -20,
    top:"50%"
  },
});
