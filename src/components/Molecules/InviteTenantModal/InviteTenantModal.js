import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { InviteTenantModalStyle } from "./InviteTenantModalStyle";
import { IMAGES } from "../../../Themes";
import { useNavigation } from "@react-navigation/native";
import { _COLORS } from "../../../Themes";
import RBSheet from "react-native-raw-bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AddTenantDetails from "../../../screens/Landlord/AddNewProperty/PropertyReview/Leases/TenantDetails/AddTenantDetails/AddTenantDetails";
const data = [
  {
    id: "1",
    key: "InviteFriend",
    title: "Invite tenant from contact",
    Icon: (
      <Ionicons
        name={"person-add-outline"}
        size={20}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: "2",
    key: "InviteKodie",
    title: "Invite tenant from Kodie",
    Icon: (
      <MaterialCommunityIcons
        name={"account-search-outline"}
        size={20}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: "3",
    key: "AddManually",
    title: "Add tenant manually",
    Icon: (
      <MaterialCommunityIcons
        name={"account-circle-outline"}
        size={20}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
];

export default InviteTenantModal = (props) => {
  const property_id = props.property_id;
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const handleClosePopup = () => {
    props.onClose();
  };

  const CloseUp = () => {
    refRBSheet.current.close();
  };
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={InviteTenantModalStyle.Main_View}
      onPress={() => {
        if (item.id === "1") {
          //---- Navigate to OtherScreen when Contact Us is clicked
          navigation.navigate("Invitefriend");
          handleClosePopup()
        }
        if (item.id === "3") {
          refRBSheet.current.open();
        }
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderRadius: 8,
          borderColor: _COLORS.Kodie_LightWhiteColor,
          width: 35,
          height: 35,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.Icon}
      </View>
      <Text style={InviteTenantModalStyle.Invite_Data_Text}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={InviteTenantModalStyle.mainContainer}>
      <View style={InviteTenantModalStyle.subContainer}>
        <Text style={InviteTenantModalStyle.Invite_tenant}>
          {"Invite tenant"}
        </Text>
        <TouchableOpacity onPress={handleClosePopup}>
          <AntDesign
            color={_COLORS.Kodie_BlackColor}
            name={'close'}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={InviteTenantModalStyle.All_Data_View}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </View>

      <RBSheet
        ref={refRBSheet}
        height={700}
        // closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: InviteTenantModalStyle.bottomModal_container,
        }}
      >
        <AddTenantDetails
          onClose={handleClosePopup}
          property_id={property_id}
        />
      </RBSheet>
    </View>
  );
};
