import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { IMAGES, _COLORS } from "../../../Themes";
import { UploadImageStyle } from "./UploadImageStyle";
import Entypo from "react-native-vector-icons/Entypo";
import ImagePicker from "react-native-image-crop-picker";
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
  // {
  //   id: "3",
  //   Data: "Choose file from folder",
  //   Img: IMAGES.Upload,
  // },
];

const UploadImageData = (props) => {
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState({});
  const UploadImageContent = ({ item, index }) => {
    return (
      <>
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
                .then(image => {
                  // console.log('image....', image);
                  setImage(image);
                  setImageName(image?.path);
                  // props?.ImageName(image?.path)
                  props?.ImageName(image)

                  console.log("ImagePath..",imageName)
                })
                .catch(err => {
                  console.log('err...', err);
                });
            }
            if (item.id === "2") {
              // Navigate to Choose photo from library when Contact Us is clicked.......
              ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                compressImageQuality: 0.5,
              })
                .then(image => {
                  // console.log(image);
                  setImage(image);
                  setImageName(image?.path);
                  props?.ImageName(image?.path)
                  console.log("ImagePath..",imageName)
                })
                .catch(err => {
                  console.log('err...', err);
                });
            }
          }}
        >
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
      {/* <View style={UploadImageStyle.upload_View}>
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
      </View> */}

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
