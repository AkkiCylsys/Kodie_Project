import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from "react-native-image-crop-picker";
import { _COLORS } from "../../../Themes";
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
        style={{ alignSelf: 'center' }}
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
        style={{ alignSelf: 'center' }}
      />
    ),
  },
];

const UploadCabinateImage = ({ onImageSelect, heading_Text }) => {

  const handleCameraOpen = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.5,
      });
      onImageSelect([image]);
    } catch (err) {
      console.error("Camera error:", err);
      Alert.alert("Error", "Unable to open camera. Please try again.");
    }
  };

  const handlePickerOpen = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true, // Allow multiple image selection
        waitAnimationEnd: false,
        mediaType: 'photo',
        includeExif: true,
        compressImageQuality: 0.5,
        cropping: true,
      });
      onImageSelect(images);
    } catch (err) {
      console.error("Picker error:", err);
      Alert.alert("Error", "Unable to select images from the library. Please try again.");
    }
  };

  const UploadImageContent = ({ item }) => (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel={item.Data}
      style={UploadImageStyle.content_View}
      onPress={() => {
        if (item.id === "1") {
          handleCameraOpen();
        } else if (item.id === "2") {
          handlePickerOpen();
        }
      }}
    >
      <View style={UploadImageStyle.Bottomcontainer}>
        <View style={UploadImageStyle.IconView}>
          {item.Img}
        </View>
      </View>
      <Text style={UploadImageStyle.text}>{item.Data}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={UploadImageStyle.mainContainer}>
      {/* <Text style={UploadImageStyle.heading}>{heading_Text || "Upload Image"}</Text> */}
      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <UploadImageContent item={item} />}
      />
    </View>
  );
};

export default UploadCabinateImage;
