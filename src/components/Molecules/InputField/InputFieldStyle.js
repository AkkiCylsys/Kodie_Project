import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes";
export const InputFieldStyle = StyleSheet.create({
 
  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 1,
  },
  section: {marginTop: 20 },
});
