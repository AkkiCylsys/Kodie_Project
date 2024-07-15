import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { _COLORS } from "../../../Themes";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from "react-native-image-crop-picker";
import { UploadImageStyle } from "../UploadImage/UploadImageStyle";

const data = [
  {
    id: '1',
    Data: 'Take photo',
    Img: (
      <Feather
        name="camera"
        size={20}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={'contain'}
        style={{alignSelf: 'center'}}
      />
    ),
  },
  {
    id: '2',
    Data: 'Choose photo from library',
    Img: (
      <MaterialIcons
        name="add-photo-alternate"
        size={20}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={'contain'}
        style={{alignSelf: 'center'}}
      />
    ),
  },
];

const UploadCabinateImage = ({ onImageSelect, heading_Text }) => {
  const UploadImageContent = ({ item }) => (
    <TouchableOpacity
      style={UploadImageStyle.content_View}
      onPress={() => {
        if (item.id === "1") {
          ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            compressImageQuality: 0.5,
          })
            .then((image) => {
              onImageSelect([image]);
            })
            .catch((err) => {
              console.log("err...", err);
            });
        }
        if (item.id === "2") {
          ImagePicker.openPicker({
            multiple: true, // Allow multiple image selection
            waitAnimationEnd: false,
            mediaType: 'photo',
            includeExif: true,
            compressImageQuality: 0.5,
            cropping: true,
          })
            .then((images) => {
              onImageSelect(images);
            })
            .catch((err) => {
              console.log("err...", err);
            });
        }
      }}
    >
      <TouchableOpacity style={UploadImageStyle.Bottomcontainer}>
        <View style={UploadImageStyle.IconView}>{item.Img}</View>
      </TouchableOpacity>
      <Text style={UploadImageStyle.text}>{item.Data}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={UploadImageStyle.mainContainer}>
      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={UploadImageContent}
      />
    </View>
  );
};

export default UploadCabinateImage;
