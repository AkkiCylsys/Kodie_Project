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
    icon: (
      <MaterialIcons
        name="preview"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
      />
    ),
  },
  {
    id: "2",
    Data: "Request new quote",
    // Img: IMAGES.gallery,
    icon: (
      <MaterialCommunityIcons
        name="image-area"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
      />
    ),
  },
  {
    id: "3",
    Data: "Create notice / reminder",
    // Img: IMAGES.Reminder,
    icon: (
      <Ionicons
        name="mail-unread-outline"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
      />
    ),
  },
  {
    id: "4",
    Data: "Remove contractor from preferred",
    // Img: IMAGES.Delete,
    icon: (
      <MaterialCommunityIcons
        name="delete-outline"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
      />
    ),
  },
];

const ContractorsImage = (props) => {
  const ContractorsImageContent = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={ContractorsImageStyle.content_View}
          onPress={props?.onPress}
        >
          <TouchableOpacity style={ContractorsImageStyle.Bottomcontainer}>
            {/* <Image source={item.Img} style={ContractorsImageStyle.Icons} /> */}
            {item.icon}
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
