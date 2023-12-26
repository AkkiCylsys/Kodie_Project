import { StyleSheet } from "react-native";
import { _COLORS ,FONTFAMILY} from "../../Themes";
export const ContractorsStyle1 = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_ExtraLiteWhiteColor,
  },
  container: {
    // marginHorizontal: 16,
  },
  activeTab: {
    backgroundColor: "white",
    borderBottomWidth: 1,
  },
  Line: {
    borderBottomWidth: 1,
    borderBottomColor: _COLORS.Kodie_LiteWhiteColor,
    elevation: 2,
  },
  Line1: {
    borderBottomWidth: 10,
    borderBottomColor: _COLORS.Kodie_LiteWhiteColor,
    elevation: 2,
    marginTop:20
  },
  buttonview:{
    marginHorizontal:15
  },
  tabview:{
    marginHorizontal:15
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },  
  flexContainer: { flex: 1 },
  expandedContent: {
    marginHorizontal: 30,
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
  },
  rentView: { flex: 1, alignItems: "flex-end" },
});
