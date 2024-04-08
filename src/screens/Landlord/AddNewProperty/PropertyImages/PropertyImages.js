import React, {useState, useRef, useEffect, index} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import {PropertyImagesStyle} from './PropertyImagesStyle';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import {_COLORS, LABEL_STYLES, BANNERS} from '../../../../Themes';
import {SliderBox} from 'react-native-image-slider-box';
import UploadImageBoxes from '../../../../components/Molecules/UploadImageBoxes/UploadImageBoxes';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import UploadMultipleImage from '../../../../components/Molecules/UploadImage/UploadMultipleImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Config} from '../../../../Config';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import Video from 'react-native-video';
const stepLabels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

const images = [
  BANNERS.Apartment,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
export default PropertyImages = props => {
  const refRBSheet = useRef();
  const property_id = props?.route?.params?.property_id;
  const editMode = props?.route?.params?.editMode;
  console.log('.............property_id.', property_id, editMode);
  const [isLoading, setIsLoading] = useState(false);
  const [MultiImageName, setMultiImageName] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [property_Detail, setProperty_Details] = useState([]);
  const [serverimagePath, setImagePaths] = useState([]);
  useEffect(() => {
    property_id > 0 ? DetailsData() : null;
  }, []);
  const DetailsData = () => {
    const detailData = {
      property_id: property_id,
    };
    console.log('detailData', detailData);
    const url = Config.BASE_URL;
    const property_Detailss = url + 'get_property_details';
    console.log('Request URL:', property_Detailss);
    setIsLoading(true);
    axios
      .post(property_Detailss, detailData)
      .then(response => {
        console.log('propertyDetail', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          setProperty_Details(response?.data?.property_details[0]);
          setImagePaths(response?.data?.property_details[0]?.image_path);
          // alert(JSON.stringify(response?.data?.property_details));
          console.log('propertyDetail....', response?.data?.property_details);
        } else {
          console.error('propertyDetail_error:', response?.data?.error);
          // alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('property_type error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };

  //popup closeup code here
  const CloseUp = () => {
    refRBSheet.current.close();
    console.log('close');
  };
  // setImagePaths(imagePath);
  // alert(imagePaths);
  const openVideoPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
      multiple: true,
    })
      .then(videos => {
        setSelectedVideos([...selectedVideos, ...videos]);
      })
      .catch(error => {
        console.error('Error selecting videos:', error);
      });
  };
  const handleSaveUpdateImage = async () => {
    refRBSheet.current.close();
    const formData = new FormData();
    formData.append('property_id', property_id);
    console.log('kljproperty_Data_id', property_id);
    if (MultiImageName && Array.isArray(MultiImageName)) {
      const imagePaths = MultiImageName.map(image => image.path);

      imagePaths.forEach((path, index) => {
        formData.append('images', {
          uri: path,
          name: path,
          type: 'image/jpeg',
        });
      });
    } else {
      console.error(
        'MultiImageName is not defined or not an array:',
        MultiImageName,
      );
      return; // Stop execution if MultiImageName is not properly defined
    }
    // Append videos
    if (selectedVideos && selectedVideos.length > 0) {
      selectedVideos.forEach((videoUri, index) => {
        if (typeof videoUri === 'string') {
          const videoName = videoUri.substring(videoUri.lastIndexOf('/') + 1);
          formData.append(`videos`, {
            uri: videoUri,
            name: videoName,
            type: 'video/mp4', // Set the appropriate video type
          });
        } else {
          console.error(`Invalid video URI at index ${index}: ${videoUri}`);
        }
      });
    }
    console.log('formData', formData);
    const url = Config.BASE_URL;
    const saveAccountDetails = url + 'update_property_images_video_details';
    console.log('Request URL:', saveAccountDetails);
    setIsLoading(true);
    try {
      const response = await axios.put(saveAccountDetails, formData, {
        headers: {
          'content-type': 'multipart/form-data',

          // 'Content-Type': 'text/plain'
        },
      });

      console.log('Save Account Details', response?.data);

      if (response?.data?.success === true) {
        setIsLoading(false);
        props.navigation.navigate('PropertyReview', {
          property_id: property_id,
          MultiImageName: MultiImageName,
          selectedVideos: selectedVideos,
          editMode: editMode,
        });
        setMultiImageName([])
      } else {
        console.error('Save Account Details error:', response?.data?.error);
        alert('Oops something went wrong! Please try again later.');
      }
    } catch (error) {
      console.error('Account_Details error:', error);
      // alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStepIndicatorIconConfig = ({position, stepStatus}) => {
    const iconConfig = {
      name: 'feed',
      // name: stepStatus === "finished" ? "check" : (position + 1).toString(),
      color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
      size: 20,
    };

    switch (position) {
      case 0: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }
      case 1: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }
      case 2: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }
      case 3: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }

      default: {
        break;
      }
    }
    return iconConfig;
  };
  const firstIndicatorSignUpStepStyle = {
    stepIndicatorSize: 40,
    currentStepIndicatorSize: 20,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    separatorFinishedColor: _COLORS.Kodie_GrayColor,
    separatorUnFinishedColor: _COLORS.Kodie_LightOrange,
    stepIndicatorFinishedColor: _COLORS.Kodie_GreenColor,
    stepIndicatorUnFinishedColor: _COLORS.Kodie_GrayColor,
    stepIndicatorCurrentColor: _COLORS.Kodie_WhiteColor,
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: _COLORS.Kodie_BlackColor,
    stepIndicatorLabelFinishedColor: _COLORS.Kodie_BlackColor,
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: _COLORS.Kodie_BlackColor,
    labelSize: 14,
    labelAlign: 'center',
  };
  const renderStepIndicator = params => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const renderLabel = ({position, stepStatus}) => {
    // const iconColor = stepStatus === "finished" ? "#000000" : "#808080";
    const iconColor =
      position === currentPage // Check if it's the current step
        ? _COLORS.Kodie_BlackColor // Set the color for the current step
        : stepStatus === 'finished'
        ? '#000000'
        : '#808080';
    const iconName =
      position === 0
        ? 'Details'
        : position === 1
        ? 'Features'
        : position === 2
        ? 'Images'
        : position === 3
        ? 'Review'
        : 'null';

    return (
      <View style={{}}>
        <Text
          style={{
            fontSize: 14,
            marginTop: 1,
            marginHorizontal: 10,
            color: iconColor,
            alignSelf: 'center',
          }}>{`Step ${position + 1}`}</Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 5,
            marginHorizontal: 10,
            color: iconColor,
          }}>
          {iconName}
        </Text>
      </View>
    );
  };
  const goBack = () => {
    props.navigation.pop();
  };
  const handleImageNameChange = multipleImages => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const oversizedImage = multipleImages.find(
      image => image.size > MAX_FILE_SIZE,
    );

    if (oversizedImage) {
      Alert.alert('The uploaded image must be less than 5 MB in size.');
      refRBSheet.current.close();
      return;
    }

    // setMultiImageName(multipleImages);
    setMultiImageName([...MultiImageName, ...multipleImages]);
    console.log('................ImageNAme', multipleImages);
    console.log('................ImageNAme', multipleImages.path);
  };
  //.....remove video....////
  const removeVideo = indexToRemove => {
    const updatedVideos = [...selectedVideos];
    updatedVideos.splice(indexToRemove, 1);
    setSelectedVideos(updatedVideos);
  };

  const imagePaths = MultiImageName.map(image => image.path);
  // alert(imagePaths);
  const handleSaveImage = async () => {
    const formData = new FormData();
    refRBSheet.current.close();
    formData.append('property_id', property_id);

    if (MultiImageName && Array.isArray(MultiImageName)) {
      const imagePaths = MultiImageName.map(image => image.path);

      imagePaths.forEach((path, index) => {
        formData.append('images', {
          uri: path,
          name: path,
          type: 'image/jpeg',
        });
      });
    } else {
      console.error(
        'MultiImageName is not defined or not an array:',
        MultiImageName,
      );
      return; // Stop execution if MultiImageName is not properly defined
    }

    if (selectedVideos && selectedVideos.length > 0) {
      selectedVideos.forEach((videoUri, index) => {
        if (typeof videoUri === 'string') {
          const videoName = videoUri.substring(videoUri.lastIndexOf('/') + 1);
          formData.append(`videos`, {
            uri: videoUri,
            name: videoName,
            type: 'video/mp4',
          });
        } else {
          console.error(`Invalid video URI at index ${index}: ${videoUri}`);
        }
      });
    }

    console.log('formData', formData);
    const url = Config.BASE_URL;
    const saveAccountDetails = url + 'add_property_images_videos';
    console.log('Request URL:', saveAccountDetails);

    setIsLoading(true);

    try {
      const response = await axios.post(saveAccountDetails, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Save Account Details', response?.data);

      if (response?.data?.success === true) {
        setIsLoading(false);
        MultiImageName ? refRBSheet.current.close() : null;
        props.navigation.navigate('PropertyReview', {
          property_id: property_id,
          MultiImageName: MultiImageName,
          selectedVideos: selectedVideos,
        });
        console.log('Save Account Details', response?.data);
        setMultiImageName([])

      } else {
        console.log('Save Account Details error:', response?.data?.error);
        alert('Oops Somthing went wrong! please try again later.');
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.log('saving account details', error.message);
        alert(
          error.message || 'An error occurred while saving account details',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={PropertyImagesStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={goBack}
        MiddleText={editMode ? 'Edit property' : 'Add new property'}
      />
      <View
        style={{
          marginTop: 15,
        }}>
        <StepIndicator
          customSignUpStepStyle={firstIndicatorSignUpStepStyle}
          currentPosition={currentPage}
          // onPress={onStepPress}
          renderStepIndicator={renderStepIndicator}
          labels={stepLabels}
          stepCount={4}
          renderLabel={renderLabel}
        />
      </View>
      <ScrollView>
        <View style={PropertyImagesStyle.phototextView}>
          <View style={PropertyImagesStyle.headingView}>
            <Text style={PropertyImagesStyle.heading}>{'Property images'}</Text>
          </View>
          <View style={PropertyImagesStyle.phototextView}>
            <View style={PropertyImagesStyle.slider_view}>
              <SliderBox
                images={
                  editMode
                    ? [...(serverimagePath || []), ...imagePaths]
                    : [...imagePaths]
                }
                sliderBoxHeight={200}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
                }
                inactiveDotColor={_COLORS.Kodie_GrayColor}
                dotColor={_COLORS.Kodie_GreenColor}
                autoplay
                circleLoop
                resizeMethod={'resize'}
                resizeMode={'cover'}
                dotStyle={PropertyImagesStyle.dotStyle}
                ImageComponentStyle={{
                  flex: 1,
                  resizeMode: 'cover',
                  borderRadius: 15,
                  width: '90%',
                  // position: "relative",
                }}
              />
              {/* )} */}
            </View>
            <Text style={PropertyImagesStyle.upload_Heading_Text}>
              {'Upload images'}
            </Text>
            <View style={{flex: 1}}>
              <UploadImageBoxes
                Box_Text={'Add Photo'}
                onPress={() => {
                  refRBSheet.current.open();
                }}
              />
              {MultiImageName.length > 0 ? refRBSheet.current.close() : null}

              <Text style={PropertyImagesStyle.formatted_property_text}>
                {
                  'Images should be formatted .jpg or .png Size per image should not exceed 5 MB'
                }
              </Text>
            </View>

            {/* {MultiImageName.length == 0 ? refRBSheet.current.close() : null} */}
            <Text style={PropertyImagesStyle.upload_Heading_Text}>
              {'Upload video'}
            </Text>
            <View style={{flex: 1}}>
              <UploadImageBoxes
                Box_Text={'Add Video'}
                onPress={() => {
                  // refRBSheet.current.open();
                  openVideoPicker();
                }}
              />
              {selectedVideos.length > 0 && (
                <View style={{marginTop: 10}}>
                  {/* <Text>Selected Videos:</Text> */}
                  <FlatList
                    horizontal
                    data={selectedVideos}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <>
                        <Video
                          source={{uri: item.path}}
                          style={{
                            width: 310,
                            height: 150,
                            borderRadius: 5,
                            marginLeft: 5,
                          }}
                          controls={true}
                        />
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            // top: 2,
                            right: 5,
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            height: '20%',
                            width: '12%',
                            borderRadius: 8,
                            // padding: 3,
                            justifyContent: 'center',
                          }}
                          onPress={() => removeVideo(index)}>
                          <Text
                            style={{
                              color: 'black',
                              fontWeight: 'bold',
                              alignSelf: 'center',
                            }}>
                            X
                          </Text>
                        </TouchableOpacity>
                        {/* <Text style={{fontSize:14,color:_COLORS?.Kodie_BlackColor}}>{item.path}</Text> */}
                      </>
                    )}
                  />
                </View>
              )}
              <Text style={PropertyImagesStyle.formatted_property_text}>
                {
                  'Videos should be formatted .mp4, HEVC, MKV.Size per video should not exceed 100 MB'
                }
              </Text>
            </View>
            {/* {selectedVideos.length > 0 && refRBSheet.current.close()} */}

            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              height={180}
              customStyles={{
                wrapper: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                draggableIcon: {
                  backgroundColor: _COLORS.Kodie_LightGrayColor,
                  marginBottom: 2,
                },
                container: PropertyImagesStyle.bottomModal_container,
              }}>
              <UploadMultipleImage
                onClose={CloseUp}
                heading_Text={'Upload image'}
                multipleImage={handleImageNameChange}
              />
            </RBSheet>
          </View>

          <View style={PropertyImagesStyle.btnView}>
            <CustomSingleButton
              _ButtonText={'Next'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              onPress={() => {
                if (editMode) {
                  handleSaveUpdateImage();
                } else {
                  handleSaveImage();
                }
              }}
              disabled={isLoading ? true : false}
            />
          </View>
          <View style={PropertyImagesStyle.btnView}>
            <CustomSingleButton
              _ButtonText={
                editMode
                  ? 'Edit property features later'
                  : 'Add property features later'
              }
              Text_Color={_COLORS.Kodie_BlackColor}
              backgroundColor={_COLORS.Kodie_WhiteColor}
              disabled={isLoading ? true : false}
            />
          </View>
          <TouchableOpacity
            style={PropertyImagesStyle.goBack_View}
            onPress={() => {
              goBack();
            }}>
            <View style={PropertyImagesStyle.backIcon}>
              <Ionicons
                name="chevron-back"
                size={22}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </View>
            <Text style={PropertyImagesStyle.goBack_Text}>{'Go back'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
