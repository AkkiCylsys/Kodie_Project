import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY} from "../../../../../../../../Themes";
export const PersonStyle = StyleSheet.create({
  mainConatainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  card: {
    width: "100%",
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity:Platform.OS =='android'? 0.2:null,
    shadowRadius: 2,
    paddingHorizontal: 20,
    paddingTop: 1,
    // marginBottom: 20,
  },
  inputContainer: {
    marginBottom:5
  },
  input: {
    height: 45,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 10
  },
  ButtonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
    marginTop: 15,
    marginBottom:200
  },
  closeText: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 4,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  applyText: {
    backgroundColor: _COLORS.Kodie_BlackColor,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  text: {
    color: _COLORS.Kodie_WhiteColor,
    alignSelf: "center",
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  errorText: { color: "red", marginLeft: 10 },
});
