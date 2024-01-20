import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
export const SearchJobResultStyle = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 16,
  },
  Fixtext: {
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 16,
  },
  fixcontain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Budgetstyle: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 25,
  },
  hearto: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#FFEDB5",
  },
  heartotext: {
    fontSize: 13,
    fontFamily: FONTFAMILY.K_Medium,
    color: "#F9A000",
    textAlign: "center",
    alignSelf: "center",
  },
  locationstyle: {
    marginTop: 5,
  },
  locationcurrent: {
    flex: 1,
    marginLeft: 9,
    fontSize: 13,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
  },
});
