import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Alert } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { _COLORS, IMAGES } from "../../../Themes";
// import { withNavigation } from 'react-navigation';
import { useNavigation } from "@react-navigation/native";
const actions = [
  {
    text: "Add property",
    icon: IMAGES.AddProperty,
    name: "add_Property",
    position: 2,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textBackground: "transparent",
    textProps: {
      style: { fontWeight: "bold", color: _COLORS.Kodie_WhiteColor },
    },
  },
  {
    text: "Edit dashboard",
    icon: IMAGES.EditDashboard,
    name: "edit_Dashboard",
    position: 1,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textBackground: "transparent",
    textProps: {
      style: { fontWeight: "bold", color: _COLORS.Kodie_WhiteColor },
    },
  },
  {
    text: "Invite prospective tenant",
    icon: IMAGES.InviteProspectiveTenant,
    name: "invite_Prospective_tenant",
    position: 3,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textBackground: "transparent",
    textProps: {
      style: { fontWeight: "bold", color: _COLORS.Kodie_WhiteColor },
    },
  },
  {
    text: "Invite contractor",
    icon: IMAGES.InviteContractor,
    name: "invite_Contract...",
    position: 4,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textBackground: "transparent",
    textProps: {
      style: { fontWeight: "bold", color: _COLORS.Kodie_WhiteColor },
    },
  },
  {
    text: "Add notice / reminder",
    icon: IMAGES.AddNoticeReminder,
    name: "Add_Notice_Reminder",
    position: 5,
    // color: '#37bc12',
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textBackground: "transparent",
    textProps: {
      style: { fontWeight: "bold", color: _COLORS.Kodie_WhiteColor },
    },
  },
  {
    text: "Create new job",
    icon: IMAGES.CreateNewJob,
    name: "Create_new_job",
    position: 6,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textBackground: "transparent",
    textProps: {
      style: { fontWeight: "bold", color: _COLORS.Kodie_WhiteColor },
    },
  },
];




const FloatingActionButton = (props) => {
  const navigation = useNavigation();
  const handleActionPress = (name) => {
    switch (name) {
      case "add_Property":
        navigation.navigate("PropertyDetails");
        console.log('pressed')
        break;
      case "Create_new_job":
        navigation.navigate('CreateJobFirstScreen')
        break;
      default:
        break;
    }
  };
  return (
    // <SafeAreaView style={styles.container}>
    //   <View style={styles.container}>
    <FloatingAction
      actions={actions}
      actionsPaddingTopBottom={6}
      color={_COLORS.Kodie_GreenColor}
      onPressItem={(name) => {
        // Alert.alert("Options pressed", `${name} was pressed`);
        handleActionPress(name)
      }}
      // overlayColor={_COLORS.Kodie_LightGrayColor}
      overlayColor="rgba(0, 0, 0, 0.5)"
    />
    //   </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_ExtraLiteWhiteColor,
    zIndex: -5,
  },
});

export default FloatingActionButton;
