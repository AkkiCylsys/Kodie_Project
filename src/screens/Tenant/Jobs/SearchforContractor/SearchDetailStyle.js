import { StyleSheet } from "react-native";
import { _COLORS } from "../../../../Themes";
export const SearchDetailStyle = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  ContainerView: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  filterIcon: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 5,
    height: 40,
  },
});
