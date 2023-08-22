import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../Themes/index";
export const CreateJobSecondStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  phototextView: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 80,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 1,
    padding: 0,
    margin: 0,
  },
  goBack_View: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 29,
  },
  goBack_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
  },
  backIcon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
  },
  next_Btn: { marginTop: 50 },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  slider_view: {
    justifyContent: "center",
     borderWidth: 1,
    marginVertical: 25,
  },
});
