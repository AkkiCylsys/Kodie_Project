import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { _COLORS,IMAGES } from "../../../../Themes";
import { ContractorsImageStyle } from "./ContractorsImageStyle";
const data = [
  {
    id: "1",
    Data: "View / edit contractor details",
    Img: IMAGES.View_property,
  },
  {
    id: "2",
    Data: "Request new quote",
    Img: IMAGES.gallery,
  },
  {
    id: "3",
    Data: "Create notice / reminder",
    Img: IMAGES.Reminder,
  },
  {
    id: "4",
    Data: "Remove contractor from preferred",
    Img: IMAGES.Delete,
  },
  
];

const ContractorsImage = (props) => {
  const ContractorsImageContent = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity style={ContractorsImageStyle.content_View} onPress={props?.onPress}>
          <TouchableOpacity style={ContractorsImageStyle.Bottomcontainer}>
            <Image source={item.Img} style={ContractorsImageStyle.Icons} />
          </TouchableOpacity>
          <Text style={ContractorsImageStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={ContractorsImageStyle.mainContainer}>
      <View style={ContractorsImageStyle.upload_View}>
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

export default ContractorsImage;
