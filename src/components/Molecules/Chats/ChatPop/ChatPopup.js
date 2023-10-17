import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { _COLORS,IMAGES } from "../../../../Themes";
import { ChatPopupStyle } from "./ChatPopupStyle";
import Entypo from "react-native-vector-icons/Entypo";
const data = [
  {
    id: "1",
    Data: "Mark as read",
    Img: IMAGES.Message,
  },
  {
    id: "2",
    Data: "Mute this chat",
    Img: IMAGES.Mute,
  },
  {
    id: "2",
    Data: "Archive chat",
    Img: IMAGES.Archive,
  },
];

const ChatPopup = (props) => {
  const ChatPopupContent = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity style={ChatPopupStyle.content_View} onPress={props?.onPress}>
          <TouchableOpacity style={ChatPopupStyle.Bottomcontainer}>
            <Image source={item.Img} style={ChatPopupStyle.Icons} />
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
