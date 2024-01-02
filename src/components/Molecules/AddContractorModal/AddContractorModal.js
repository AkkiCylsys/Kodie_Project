import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { _COLORS } from "../../../Themes";
import { AddContractorModalStyle } from "./AddContractorModalStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

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
  const ContractorsImageContent = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={AddContractorModalStyle.content_View}
          onPress={props?.onPress}
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
        keyExtractor={(item) => item?.id}
        renderItem={ContractorsImageContent}
      />
    </View>
  );
};

export default AddContractorModal;
