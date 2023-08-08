import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
import { fontFamily } from "../../../Themes/FontStyle/FontStyle";
export const JobCompletionCss = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },

  review: { marginTop: 15, textAlign: "center" },
});
