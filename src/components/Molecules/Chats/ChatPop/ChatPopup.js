import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { _COLORS,IMAGES } from "../../../../Themes";
import { ChatPopupStyle } from "./ChatPopupStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const data = [
  {
    id: "1",
    Data: "Mark as read",
    // Img: IMAGES.Message,
    icon:<Ionicons
    name="chatbox-ellipses-outline"
    size={20}
    color={_COLORS.Kodie_GreenColor}
  />
  },
  {
    id: "2",
    Data: "Mute this chat",
    // Img: IMAGES.Mute,
    icon:<MaterialCommunityIcons
    name="volume-variant-off"
    size={25}
    color={_COLORS.Kodie_GreenColor}
  />
  },
  {
    id: "2",
    Data: "Archive chat",
    // Img: IMAGES.Archive,
    icon:<Ionicons
    name="file-tray-full-outline"
    size={25}
    color={_COLORS.Kodie_GreenColor}
  />
  },
];

const ChatPopup = (props) => {
  const ChatPopupContent = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity style={ChatPopupStyle.content_View} onPress={props?.onPress}>
          <TouchableOpacity style={ChatPopupStyle.Bottomcontainer}>
            {/* <Image source={item.Img} style={ChatPopupStyle.Icons} /> */}
            {/* {item.icon} */}
            <Text style={ChatPopupStyle.IconView}>
            {item.icon}
            </Text>
          </TouchableOpacity> 
          <Text style={ChatPopupStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={ChatPopupStyle.mainContainer}>

      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={ChatPopupContent}
      />
    </View>
  );
};

export default ChatPopup;
