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
    marginBottom:80
  },
  videoView: { marginTop: 10 },
  imagebackground: {
    height: 150,
    width: 330,
    borderRadius: 10,
    overflow: "hidden",
    resizeMode: "contain",
    alignSelf: "center",
  },
  playBtn: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  uploadImagebox:{flexDirection:"row"}
});
