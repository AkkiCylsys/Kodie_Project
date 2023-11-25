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

const UploadMultipleImage = (props) => {
  const [multipleImage, setMultipleImage] = useState([]);
  const [image, setImage] = useState({});

  const handleClosePopup = () => {
    props.onClose()
  };


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
                multiple: true,
              })
                .then((image) => {
                  console.log("image....", image);
                  setImage(image);
                  setMultipleImage(image);
                  // props?.ImageName(image?.path)
                  props?.multipleImage(image);

                  console.log("ImagePath..", multipleImage);
                })
                .catch((err) => {
                  console.log("err...", err);
                });
            }
            if (item.id === "2") {
              // Navigate to Choose photo from library when Contact Us is clicked.......
              ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                compressImageQuality: 0.5,
                multiple: true,
              })
                .then((image) => {
                  // console.log(image);
                  // setImage(image);
                  // setImageName(JSON.stringify(image?.path));
                  // props?.ImageName(image?.path);
                  // console.log("ImagePath..", imageName);

                  // ...
                  if (image.length > 0) {
                    setImage(image);
                    setMultipleImage(image);
                    props.multipleImage(image);
                    console.log("Navigating to view photos with", image);
                  }
                })
                .catch((err) => {
                  console.log("err...", err);
                });
            }
          }}
        >
          {console.log(typeof item.Img, item.Img)}
          <TouchableOpacity style={UploadImageStyle.Bottomcontainer}>
            <Image source={item.Img} style={UploadImageStyle.Icons} />
          </TouchableOpacity>
          <Text style={UploadImageStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  const navigateToViewPhotos = (image) => {
    // Implement your navigation logic here
    setImage(image);
    setMultipleImage(image?.path);
    props?.multipleImage(image);
    console.log("Navigating to view photos with", image);
  };
  return (
    <View style={UploadImageStyle.mainContainer}>
      <View style={UploadImageStyle.upload_View}>
        <Text style={UploadImageStyle.uploadImgText}>
          {props.heading_Text || "Upload image"}
        </Text>
        <TouchableOpacity onPress={handleClosePopup}>
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

export default UploadMultipleImage;
