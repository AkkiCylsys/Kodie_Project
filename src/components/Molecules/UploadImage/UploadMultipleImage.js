import React, {useState} from 'react';
import {
  View,
  Text,PermissionsAndroid,
  Image,Linking,Platform,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {IMAGES, _COLORS} from '../../../Themes';
import {UploadImageStyle} from './UploadImageStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PERMISSIONS, RESULTS, request, check, openSettings } from 'react-native-permissions';
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

const UploadMultipleImage = props => {
  const [multipleImage, setMultipleImage] = useState([]);
  const [image, setImage] = useState({});

  const handleClosePopup = () => {
    props.onClose();
  };
  const openAppSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    }
    else {
      Linking.openURL('app-settings:');
    }
  };
  const handleImageSelection = images => {
    if (multipleImage.length + images.length <= 4) {
      setMultipleImage([...multipleImage, ...images]);
      props.multipleImage([...multipleImage, ...images]);
    } else {
      Alert.alert(
        'Maximum Image Limit Exceeded',
        'Oops! You can add up to 4 images per card only.',
      );
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
                        { text: 'Open Settings', onPress: openAppSettings },
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
                        setMultipleImage(Array.isArray(image) ? image : [image]); // Ensure it's an array
                        props?.multipleImage(Array.isArray(image) ? image : [image]);
                        console.log('ImagePath..', multipleImage);
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
                        { text: 'Open Settings', onPress: openAppSettings },
                      ]
                    );
                    return; // Exit if permission is not granted
                  }
                  else {
                    ImagePicker.openPicker({
                      width: 300,
                      height: 400,
                      cropping: true,
                      compressImageQuality: 0.5,
                      multiple: true,
                    })
                      .then(image => {
                        handleImageSelection(image);
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
                        setMultipleImage(Array.isArray(image) ? image : [image]); // Ensure it's an array
                        props?.multipleImage(Array.isArray(image) ? image : [image]);
                        console.log('ImagePath..', multipleImage);
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
                    ImagePicker.openPicker({
                      width: 300,
                      height: 400,
                      cropping: true,
                      compressImageQuality: 0.5,
                      multiple: true,
                    })
                      .then(image => {
                        handleImageSelection(image);
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
          // onPress={() => {
          //   if (item.id === '1') {
          //     ImagePicker.openCamera({
          //       width: 300,
          //       height: 400,
          //       cropping: true,
          //       compressImageQuality: 0.5,
          //       multiple: true,
          //     })
          //       .then(image => {
          //         // console.log("image....", image);
          //         setImage(image);
          //         setMultipleImage(Array.isArray(image) ? image : [image]); // Ensure it's an array
          //         props?.multipleImage(Array.isArray(image) ? image : [image]);
          //         console.log('ImagePath..', multipleImage);
          //       })
          //       .catch(err => {
          //         console.log('err...', err);
          //       });
          //   }
          //   if (item.id === '2') {
          //     ImagePicker.openPicker({
          //       width: 300,
          //       height: 400,
          //       cropping: true,
          //       compressImageQuality: 0.5,
          //       multiple: true,
          //     })
          //       .then(image => {
          //         handleImageSelection(image);
          //       })
          //       .catch(err => {
          //         console.log('err...', err);
          //       });
          //   }
          // }}
          >
            <View style={UploadImageStyle.IconView}>{item.Img}</View>
          </TouchableOpacity>
          <Text style={UploadImageStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  const navigateToViewPhotos = image => {
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

export default UploadMultipleImage;
