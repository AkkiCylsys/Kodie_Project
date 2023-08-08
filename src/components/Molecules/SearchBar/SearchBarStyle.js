import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes/index";
export const SearchBarStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: _COLORS.Kodie_GrayColor,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 20,
        marginHorizontal: 16,
      },
      input: {
        flex: 1,
        fontSize: 14,
        color: _COLORS.Kodie_MediumGrayColor,
        fontFamily: FONTFAMILY.K_Medium,
      },
      serchheaderView: {
        flexDirection: "row",
      },
      filterView: {
        alignSelf: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: _COLORS.Kodie_GrayColor,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginRight: 16,
        marginTop: 18,
      },
});
