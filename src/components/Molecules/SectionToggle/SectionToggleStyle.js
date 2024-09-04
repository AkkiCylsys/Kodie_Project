import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes";
export const SectionToggleStyle = StyleSheet.create({
  subContainer: {
    // flex:1,
    marginTop: '2%',
  },
  propety_details_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  down_Arrow_icon: {
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 10,
    borderColor: _COLORS.Kodie_GrayColor,
    alignSelf:'center'
  },
  propertyDetailsContent:{marginHorizontal:16},

});
