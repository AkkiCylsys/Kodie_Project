import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { IMAGES, _COLORS } from "../../../Themes";
import { UploadImageStyle } from "./UploadImageStyle";
import Entypo from "react-native-vector-icons/Entypo";
const data = [
  {
    id: "1",
    Data: "Take photo",
    Img: IMAGES.Documents,
  },
  {
    id: "2",
    Data: "Choose photo from library",
    Img: IMAGES.Documents,
  },
];

const UploadImageData = () => {
  const UploadImageContent = ({ item, index }) => {
    return (
      <>
        <View style={UploadImageStyle.content_View}>
          <TouchableOpacity style={UploadImageStyle.Bottomcontainer}>
            <Image source={item.Img} style={UploadImageStyle.Icons} />
          </TouchableOpacity>
          <Text style={UploadImageStyle.text}>{item.Data}</Text>
        </View>
      </>
    );
  };
  return (
    <View style={UploadImageStyle.mainContainer}>
      <View style={UploadImageStyle.upload_View}>
        <Text style={UploadImageStyle.uploadImgText}>{"Upload image"}</Text>
        <TouchableOpacity>
          <Entypo
            name="cross"
            size={25}
            color={_COLORS.Kodie_BlackColor}
            style={UploadImageStyle.crossIconStyle}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={UploadImageContent}
      />
    </View>
  );
};

export default UploadImageData;
