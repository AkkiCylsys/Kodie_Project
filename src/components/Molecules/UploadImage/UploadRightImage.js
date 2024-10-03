import React, {useState} from 'react';
import {View,Platform,Linking,PermissionsAndroid, Text, Image, FlatList, TouchableOpacity,Alert} from 'react-native';
import {IMAGES, _COLORS} from '../../../Themes';
import {UploadImageStyle} from './UploadImageStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
        style={{alignSelf: 'center'}}
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
        style={{alignSelf: 'center'}}
      />
    ),
  },
  // {
  //   id: "3",
  //   Data: "Choose file from folder",
  //   Img: IMAGES.Upload,
  // },
];

const UploadRightImage = props => {
  const [multipleImage, setMultipleImage] = useState([]);
  const [leftImage, setLeftImage] = useState([]);
  const [rightImage, setRightImage] = useState([]);
  const [image, setImage] = useState({});

  const handleClosePopup = () => {
    props.onClose();
  };

  const handleRightImageSelection = images => {
    if (rightImage.length + images.length <= 4) {
      setRightImage([...rightImage, ...images]);
      props.rightImage([...rightImage, ...images]);
    } else {
      Alert.alert(
        'Maximum Image Limit Exceeded',
        'Oops! You can add up to 4 images per card only.',
      );
    }
  };
  const openAppSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    }
  };

  const UploadImageContent = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={UploadImageStyle.content_View}
          onPress={async() => {

            try {
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
                    ImagePicker.openCamera({
                      width: 300,
                      height: 400,
                      cropping: true,
                      compressImageQuality: 0.5,
                      multiple: true,
                    })
                      .then(image => {
                        // console.log("image....", image);
                        setImage(image);
                        setRightImage(Array.isArray(image) ? image : [image]);
                        props?.rightImage(Array.isArray(image) ? image : [image]);
                        console.log('ImagePathleftimage..', rightImage);
                      })
                      .catch(err => {
                        console.log('err...', err);
                      });
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
                                     // Navigate to Choose photo from library when Contact Us is clicked.......
                  ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                    compressImageQuality: 0.5,
                    multiple: true,
                  })
                    .then(image => {
 
                      handleRightImageSelection(image);
                    })
                    .catch(err => {
                      console.log('err...', err);
                    });               
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
                      multiple: true,
                    })
                      .then(image => {
                        // console.log("image....", image);
                        setImage(image);
                        setRightImage(Array.isArray(image) ? image : [image]);
                        props?.rightImage(Array.isArray(image) ? image : [image]);
                        console.log('ImagePathleftimage..', rightImage);
                      })
                      .catch(err => {
                        console.log('err...', err);
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
                                     // Navigate to Choose photo from library when Contact Us is clicked.......
                  ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                    compressImageQuality: 0.5,
                    multiple: true,
                  })
                    .then(image => {
 
                      handleRightImageSelection(image);
                    })
                    .catch(err => {
                      console.log('err...', err);
                    });
  
                  } else {
                    Alert.alert('Gallery permission denied. Open settings to enable gallery access.', '', [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Open Settings', onPress: openAppSettings },
                    ]);
                  }
                }
  
              }






//old code
     
            } catch (err) {
              console.warn(err);
            }

           
          }}>
          {console.log(typeof item.Img, item.Img)}
          <TouchableOpacity style={UploadImageStyle.Bottomcontainer}
          // onPress={async() => {
          //   try {
          //     const granted = await PermissionsAndroid.request(
          //       PermissionsAndroid.PERMISSIONS.CAMERA,
          //       {
          //         title: 'Camera Permission',
          //         message:
          //           'This app needs camera access to take photos.',
          //         buttonNeutral: 'Ask Me Later',
          //         buttonNegative: 'Cancel',
          //         buttonPositive: 'OK',
          //       },
          //     );
          //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //       if (item.id === '1') {
          //         ImagePicker.openCamera({
          //           width: 300,
          //           height: 400,
          //           cropping: true,
          //           compressImageQuality: 0.5,
          //           multiple: true,
          //         })
          //           .then(image => {
          //             // console.log("image....", image);
          //             setImage(image);
          //             setRightImage(Array.isArray(image) ? image : [image]);
          //             props?.rightImage(Array.isArray(image) ? image : [image]);
          //             console.log('ImagePathleftimage..', rightImage);
          //           })
          //           .catch(err => {
          //             console.log('err...', err);
          //           });
          //       }
          //       if (item.id === '2') {
          //         // Navigate to Choose photo from library when Contact Us is clicked.......
          //         ImagePicker.openPicker({
          //           width: 300,
          //           height: 400,
          //           cropping: true,
          //           compressImageQuality: 0.5,
          //           multiple: true,
          //         })
          //           .then(image => {

          //             handleRightImageSelection(image);
          //           })
          //           .catch(err => {
          //             console.log('err...', err);
          //           });
          //       }
          //     } else {
          //       Alert.alert('Camera permission denied. Open settings to enable camera access.', '', [
          //         { text: 'Cancel', style: 'cancel' },
          //         { text: 'Open Settings', onPress: openAppSettings },
          //       ]);
          //     }
          //   } catch (err) {
          //     console.warn(err);
          //   }


           
          // }}
          >
            {/* <Image source={item.Img} style={UploadImageStyle.Icons} /> */}
            <View style={UploadImageStyle.IconView}>{item.Img}</View>
          </TouchableOpacity>
          <Text style={UploadImageStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  const navigateToViewPhotos = image => {
    // Implement your navigation logic here
    setImage(image);
    setMultipleImage(image?.path);
    props?.multipleImage(image);
    console.log('Navigating to view photos with', image);
  };
  return (
    <View style={UploadImageStyle.mainContainer}>
      <View style={UploadImageStyle.upload_View}>
        <Text style={UploadImageStyle.uploadImgText}>
          {props.heading_Text || 'Upload image'}
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
        keyExtractor={item => item?.id}
        renderItem={UploadImageContent}
      />
    </View>
  );
};

export default UploadRightImage;
