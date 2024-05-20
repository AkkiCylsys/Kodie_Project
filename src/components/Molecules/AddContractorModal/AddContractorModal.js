import React, { useRef } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { _COLORS } from "../../../Themes";
import { AddContractorModalStyle } from "./AddContractorModalStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import AddTenantDetails from "../../../screens/Landlord/AddNewProperty/PropertyReview/Leases/TenantDetails/AddTenantDetails/AddTenantDetails";
import AddContractorDetails from "../../../screens/Managingcontractors/AddContractorDetails/AddContractorDetails";

const data = [
  {
    id: "1",
    Data: "Invite contractor from contacts",
    // Img: IMAGES.View_property,
    Icon: (
      <MaterialIcons
        name="preview"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
        style={{ alignSelf: "center" }}
      />
    ),
  },
  {
    id: "2",
    Data: "Invite contractor from Kodie",
    // Img: IMAGES.gallery,
    Icon: (
      <MaterialCommunityIcons
        name="image-area"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
        style={{ alignSelf: "center" }}
      />
    ),
  },
  {
    id: "3",
    Data: "Add contractor manually",
    // Img: IMAGES.Reminder,
    Icon: (
      <Ionicons
        name="mail-unread-outline"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
        style={{ alignSelf: "center" }}
      />
    ),
  },
];

const AddContractorModal = (props) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const handleClosePopup = () => {
    props.onClose();
  };

  const ContractorsImageContent = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
        key={item?.id}
          style={AddContractorModalStyle.content_View}
          onPress={() => {
            if (item.id === "1") {
              //---- Navigate to OtherScreen when Contact Us is clicked
              navigation.navigate("Invitefriend");
            }
            if (item.id === "3") {
              refRBSheet.current.open();
            }
          }}
        >
          <TouchableOpacity style={AddContractorModalStyle.Bottomcontainer}>
            {/* <Image source={item.Img} style={AddContractorModalStyle.Icons} /> */}
            {/* {item.icon} */}
            <Text style={AddContractorModalStyle.IconView}>{item.Icon}</Text>
          </TouchableOpacity>
          <Text style={AddContractorModalStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={AddContractorModalStyle.mainContainer}>
      <View style={AddContractorModalStyle.upload_View}>
        <Text style={AddContractorModalStyle.text}>{"Invite Contractor"}</Text>
      </View>

      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item.id.toString()}
        renderItem={ContractorsImageContent}
      />
      <RBSheet
        ref={refRBSheet}
        height={750}
        closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: AddContractorModalStyle.bottomModal_container,
        }}
      >
        <AddContractorDetails
          onCloseSave={() => refRBSheet.current.close()}
          onClose={() => refRBSheet.current.close()}
        />
      </RBSheet>
    </View>
  );
};

export default AddContractorModal;
