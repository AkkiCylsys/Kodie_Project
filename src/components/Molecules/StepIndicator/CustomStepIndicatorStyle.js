import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes";
export const CustomStepIndicatorStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  stepIndicator: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  rowItem: {
    flex: 1,
    justifyContent: "space-between",
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  body: {
    fontSize: 12,
    color: "#666",
  },
  textview: {
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  Viewitem:{
    justifyContent:"space-between",
    flexDirection:"row"
  },
  textView:{
    color:_COLORS.Kodie_GreenColor,
    fontFamily:FONTFAMILY.K_Bold,
    fontSize:14
  },
});
