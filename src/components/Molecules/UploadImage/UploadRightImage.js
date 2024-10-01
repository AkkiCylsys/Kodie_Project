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
                if (item.id === '1') {
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
                if (item.id === '2') {
                  // Navigate to Choose photo from library when Contact Us is clicked.......
                  ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                    compressImageQuality: 0.5,
                    multiple: true,
                  })
                    .then(image => {
                      // if (image.length > 0) {
                      //   setImage(image);
                      //   setRightImage(image);
                      //   props.rightImage(image);
                      //   console.log("Navigating to RightImage photos with", image);
                      // }
                      handleRightImageSelection(image);
                    })
                    .catch(err => {
                      console.log('err...', err);
                    });
                }
              } else {
                Alert.alert('Camera permission denied. Open settings to enable camera access.', '', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Open Settings', onPress: openAppSettings },
                ]);
              }
            } catch (err) {
              console.warn(err);
            }

           
          }}>
          {console.log(typeof item.Img, item.Img)}
          <TouchableOpacity style={UploadImageStyle.Bottomcontainer}
          onPress={async() => {
            try {
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
                if (item.id === '1') {
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
                if (item.id === '2') {
                  // Navigate to Choose photo from library when Contact Us is clicked.......
                  ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                    compressImageQuality: 0.5,
                    multiple: true,
                  })
                    .then(image => {
                      // if (image.length > 0) {
                      //   setImage(image);
                      //   setRightImage(image);
                      //   props.rightImage(image);
                      //   console.log("Navigating to RightImage photos with", image);
                      // }
                      handleRightImageSelection(image);
                    })
                    .catch(err => {
                      console.log('err...', err);
                    });
                }
              } else {
                Alert.alert('Camera permission denied. Open settings to enable camera access.', '', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Open Settings', onPress: openAppSettings },
                ]);
              }
            } catch (err) {
              console.warn(err);
            }


           
          }}>
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
