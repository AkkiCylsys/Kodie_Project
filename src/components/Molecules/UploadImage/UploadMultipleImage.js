import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
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

const UploadMultipleImage = props => {
  const [multipleImage, setMultipleImage] = useState([]);
  const [image, setImage] = useState({});

  const handleClosePopup = () => {
    props.onClose();
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
          onPress={() => {
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
                  // setMultipleImage(image);
                  // // props?.ImageName(image?.path)
                  // props?.multipleImage(image);
                  setMultipleImage(Array.isArray(image) ? image : [image]); // Ensure it's an array
                  props?.multipleImage(Array.isArray(image) ? image : [image]);
                  console.log('ImagePath..', multipleImage);
                })
                // .then(() => {
                //   setMultipleImage(Array.isArray(image) ? image : [image]);
                //   handleImageSelection(image);
                // })
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
                  // console.log(image);
                  // setImage(image);
                  // setImageName(JSON.stringify(image?.path));
                  // props?.ImageName(image?.path);
                  // console.log("ImagePath..", imageName);

                  // if (image.length > 0) {
                  //   setImage(image);
                  //   setMultipleImage(image);
                  //   props.multipleImage(image);
                  //   console.log('Navigating to view photos with', image);
                  // }
                  handleImageSelection(image);
                })
                .catch(err => {
                  console.log('err...', err);
                });
            }
          }}>
          {console.log(typeof item.Img, item.Img)}
          <TouchableOpacity style={UploadImageStyle.Bottomcontainer}>
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

export default UploadMultipleImage;
