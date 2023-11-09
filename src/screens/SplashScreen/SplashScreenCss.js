import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { _COLORS, FONTFAMILY } from "../../Themes";
export const SplashStyles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  mainIcon: {
    flex: 1,
    justifyContent: "center",
  },
  mainSmallIcon: {
    height: Platform.OS == "android" ? 50 : 75,
    marginTop: 250,
    width: "90%",
    resizeMode: "center",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    color: _COLORS.Kodie_WhiteColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  subtext: {
    fontSize: 14,
    textAlign: "center",
    color: _COLORS.Kodie_WhiteColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTextContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,

    paddingHorizontal: 15,
  },
});
