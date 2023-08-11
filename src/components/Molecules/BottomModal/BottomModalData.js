import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { BottomModalDataStyle } from "./BottomModalDataStyle";
import { IMAGES, _COLORS } from "../../../Themes";
import { TouchableOpacity } from "react-native";
const data = [
  {
    id: "1",
    Data: "View property details",
    Img: IMAGES.View_property,
  },
  {
    id: "2",
    Data: "Manage documents",
    Img: IMAGES.Documents,
  },
  {
    id: "3",
    Data: "Create notice / reminder",
    Img: IMAGES.Reminder,
  },
  {
    id: "4",
    Data: "Chat to tenant",
    Img: IMAGES.Chat_Tenant,
  },
  {
    id: "5",
    Data: "Delete property",
    Img: IMAGES.Delete,
  },
];
const BottomModalData = () => {
  const BottomData = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity style={BottomModalDataStyle.container}>
          <Image source={item.Img} style={BottomModalDataStyle.Icons} />
          <Text style={BottomModalDataStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={BottomModalDataStyle.mainContainer}>
      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={BottomData}
      />
    </View>
  );
};
export default BottomModalData;
