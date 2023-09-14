import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { IMAGES, _COLORS } from "../../../Themes";
import { UploadImageStyle } from "./UploadImageStyle";
import Entypo from "react-native-vector-icons/Entypo";
const data = [
  {
    id: "1",
    Data: "Take photo",
    Img: IMAGES.camera,
  },
  {
    id: "2",
    Data: "Choose photo from library",
    Img: IMAGES.gallery,
  },
  {
    id: "2",
    Data: "Choose file from folder",
    Img: IMAGES.Upload,
  },
];

const UploadImageData = (props) => {
  const UploadImageContent = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity style={UploadImageStyle.content_View}>
          <TouchableOpacity style={UploadImageStyle.Bottomcontainer}>
            <Image source={item.Img} style={UploadImageStyle.Icons} />
          </TouchableOpacity>
          <Text style={UploadImageStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={UploadImageStyle.mainContainer}>
      <View style={UploadImageStyle.upload_View}>
        <Text style={UploadImageStyle.uploadImgText}>
          {props.heading_Text || "Upload image"}
        </Text>
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
