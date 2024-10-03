import React, { useState, } from "react";
import { View, Alert, Text, PermissionsAndroid, Linking, Platform, Image, FlatList, TouchableOpacity } from "react-native";
import { IMAGES, _COLORS } from "../../../Themes";
import { UploadImageStyle } from "./UploadImageStyle";
import Entypo from "react-native-vector-icons/Entypo";
import ImagePicker from "react-native-image-crop-picker";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PERMISSIONS, RESULTS, request, check, openSettings } from 'react-native-permissions';
const data = [
  {
    id: '1',
    Data: 'Take photo',
    // Img: IMAGES.camera,
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
    // Img: IMAGES.gallery,
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
  // {
  //   id: "3",
  //   Data: "Choose file from folder",
  //   Img: IMAGES.Upload,
  // },
];


const UploadImageData = (props) => {
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState({});


  const openAppSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    }
  };


  const UploadImageContent = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={UploadImageStyle.content_View}
          // onPress={Platform.OS == 'ios' ? handleImageSelection({item}) : handleAndroidPermission({item})}
          onPress={async () => {
            if (Platform.OS === 'ios') {
              if (index == 0) {
                const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
                if (
                  cameraPermission === 'denied' ||
                  cameraPermission === 'blocked'
                ) {
                  Alert.alert(
                    'Camera Permission Required',
                    'We need access to your camera and photo library. Please enable it in the app settings.',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Open Settings', onPress: openSettings },
                    ]
                  );
                  return; // Exit if permission is not granted
                }
                else {
                  const image = await ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true,
                    compressImageQuality: 0.5,
                  });
                  setImage(image);
                  setImageName(image?.path);
                  props?.ImageName(image);
                  console.log('Image from camera:', image);
                }
              }
              else {
                // for index==2
                const photoPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
                if (
                  photoPermission === 'denied' ||
                  photoPermission === 'blocked'
                ) {
                  Alert.alert(
                    'Gallery Permission Required',
                    'This app needs access to your gallery to select photos. Please enable it in the app settings.',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Open Settings', onPress: openSettings },
                    ]
                  );
                  return; // Exit if permission is not granted
                }
                else {
                  const image = await ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                    compressImageQuality: 0.5,
                  });
                  setImage(image);
                  setImageName(JSON.stringify(image?.path));
                  props?.ImageName(image);
                  console.log('Image from gallery:', image);
                }
              }
            }

            else {
              //for android
              //alert(index)
              if (index == 0) {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.CAMERA,
                  {
                    title: 'Camera Permission',
                    message:
                      'This app needs camera access to take photos.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                  },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true,
                    compressImageQuality: 0.5,
                  })
                    .then((image) => {
                      // console.log('image....', image);
                      setImage(image);
                      setImageName(image?.path);
                      // props?.ImageName(image?.path)
                      props?.ImageName(image);

                      console.log("ImagePath..", imageName);
                    })
                    .catch((err) => {
                      console.log("err...", err);
                    });

                } else {
                  Alert.alert('Camera permission denied. Open settings to enable camera access.', '', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: openAppSettings },
                  ]);
                }
              }
              else {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                  {
                    title: 'Gallery Access Permission',
                    message: 'This app needs access to your gallery to select photos.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                  },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                  // Navigate to Choose photo from library when Contact Us is clicked.......
                  ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                    compressImageQuality: 0.5,
                    // multiple: true,
                  })
                    .then((image) => {
                      // console.log(image);
                      setImage(image);
                      setImageName(JSON.stringify(image?.path));
                      props?.ImageName(image);
                      console.log("ImagePath..", imageName);
                    })
                    .catch((err) => {
                      console.log("err...", err);
                    });

                } else {
                  Alert.alert('Gallery permission denied. Open settings to enable gallery access.', '', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: openAppSettings },
                  ]);
                }
              }

              //for android

            }

          }
          }
        >
          <View style={UploadImageStyle.IconView}>{item.Img}</View>
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