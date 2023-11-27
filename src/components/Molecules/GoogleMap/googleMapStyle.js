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
    textAlign: "center",
    fontSize: 15,
    alignSelf: "center",
    width: "30%",
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
});
