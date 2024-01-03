import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { _COLORS, IMAGES } from "../../../../Themes";
import { ContractorsImageStyle } from "./ContractorsImageStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const data = [
  {
    id: "1",
    Data: "View / edit contractor details",
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
    Data: "Request new quote",
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
    Data: "Create notice / reminder",
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
  {
    id: "4",
    Data: "Remove contractor from preferred",
    // Img: IMAGES.Delete,
    Icon: (
      <MaterialCommunityIcons
        name="delete-outline"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
        style={{ alignSelf: "center" }}
      />
    ),
  },
];

const ContractorsImage = (props) => {
  const handleDeleteContractor = (ContractorId) => {
    console.log(ContractorId, "catch data");
    props.onDelete(ContractorId);
  };
  const ContractorsImageContent = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={ContractorsImageStyle.content_View}
          onPress={() => {
            if (item.id == "4") {
              handleDeleteContractor();
            }
          }}
        >
          <TouchableOpacity style={ContractorsImageStyle.Bottomcontainer}>
            {/* <Image source={item.Img} style={ContractorsImageStyle.Icons} /> */}
            {/* {item.icon} */}
            <Text style={ContractorsImageStyle.IconView}>{item.Icon}</Text>
          </TouchableOpacity>
          <Text style={ContractorsImageStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={ContractorsImageStyle.mainContainer}>
      <View style={ContractorsImageStyle.upload_View}></View>

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

export default ContractorsImage;
