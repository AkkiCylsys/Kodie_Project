import React, { useState, useRef, useEffect, index } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import { PropertyImagesStyle } from './PropertyImagesStyle';
import TopHeader from '../../../../components/Molecules/Header/Header';
import { _goBack } from '../../../../services/CommonServices';
import { _COLORS, LABEL_STYLES, BANNERS } from '../../../../Themes';
import { SliderBox } from 'react-native-image-slider-box';
import UploadImageBoxes from '../../../../components/Molecules/UploadImageBoxes/UploadImageBoxes';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import UploadMultipleImage from '../../../../components/Molecules/UploadImage/UploadMultipleImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { CommonLoader } from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';
import { getPropertyDetailSevice, savePropertyImageService, updatePropertyImageService } from '../../../../services/PropertyModule/PropertyModul';
const stepLabels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
export default PropertyImages = props => {
  const refRBSheet = useRef();
  const property_id = props?.route?.params?.property_id;
  const editMode = props?.route?.params?.editMode;
  console.log('.............property_id.', property_id, editMode);
  const [isLoading, setIsLoading] = useState(false);
  const [MultiImageName, setMultiImageName] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [serverimagePath, setImagePaths] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      property_id > 0 ? DetailsData() : null;
    }, [property_id])
  )
  const DetailsData = async () => {
    setIsLoading(true);
    try {
      const details = await getPropertyDetailSevice(property_id);
      console.log(details, "detailis");
      setImagePaths(details?.image_path);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
      return;
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
    setIsLoading(true);
    const imageDetail = await savePropertyImageService(formData)
    if (imageDetail?.success === true) {
      setIsLoading(false);
      MultiImageName ? refRBSheet.current.close() : null;
      props.navigation.navigate('PropertyReview', {
        property_id: property_id,
        MultiImageName: MultiImageName,
        selectedVideos: selectedVideos,
      });
      console.log('Save Account Details', imageDetail);
      setMultiImageName([])
      setSelectedVideos([])
    } else {
      console.log('Save Account Details error:', imageDetail?.error);
      alert('Oops Somthing went wrong! please try again later.');
    }
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
      return;
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
    setIsLoading(true);
const updateImage = await updatePropertyImageService(formData)
      if (updateImage?.success === true) {
        setIsLoading(false);
        props.navigation.navigate('PropertyReview', {
          property_id: property_id,
          MultiImageName: MultiImageName,
          selectedVideos: selectedVideos,
          editMode: editMode,
        });
        setMultiImageName([])
        setSelectedVideos([])
      } else {
        console.error('Save Account Details error:', updateImage?.error);
        alert('Oops something went wrong! Please try again later.');
      }
  };

  const CloseUp = () => {
    refRBSheet.current.close();
    console.log('close');
  };
  const openVideoPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
      multiple: true, // Allow multiple selection
    })
      .then(videos => {
        const maxSize = 100 * 1024 * 1024; // 100 MB
        const validVideos = videos.filter(video => video.size <= maxSize);

        if (validVideos.length > 0) {
          setSelectedVideos(prevSelectedVideos => [
            ...prevSelectedVideos,
            ...validVideos,
          ]);
          console.log('Selected videos:', validVideos);
        } else {
          Alert.alert("Warning", 'Video size exceeds the limit of 100 MB.');
        }
      })
      .catch(error => {
        console.error('Error selecting videos:', error);
      });
  };
  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: 'feed',
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
  const renderLabel = ({ position, stepStatus }) => {
    const iconColor =
      position === currentPage
        ? _COLORS.Kodie_BlackColor
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
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    const oversizedImage = multipleImages.find(
      image => image.size > MAX_FILE_SIZE,
    );

    if (oversizedImage) {
      Alert.alert('The uploaded image must be less than 5 MB in size.');
      refRBSheet.current.close();
      return;
    }

    const newTotalImages = MultiImageName.length + multipleImages.length;

    if (newTotalImages > 4) {
      Alert.alert(
        'Maximum Image Limit Exceeded',
        'Oops! You can add up to 4 images per card only.',
      );
      refRBSheet.current.close();
    } else {
      setMultiImageName([...MultiImageName, ...multipleImages]);
      console.log('................ImageName', multipleImages);
      console.log(
        '................ImageName',
        multipleImages.map(image => image.path),
      );
    }
  };
  const removeVideo = indexToRemove => {
    const updatedVideos = [...selectedVideos];
    updatedVideos.splice(indexToRemove, 1);
    setSelectedVideos(updatedVideos);
  };
  const imagePaths = MultiImageName.map(image => image.path);
  console.log('lenght images...', imagePaths.length);


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
                  editMode || property_id
                    ? [...(serverimagePath || []), ...imagePaths]
                    : [...imagePaths]
                }
                sliderBoxHeight={200}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
                }
                inactiveDotColor={_COLORS.Kodie_GrayColor}
                dotColor={_COLORS.Kodie_GreenColor}
                autoplay={false}
                circleLoop={false}
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
            <View style={{ flex: 1 }}>
              <UploadImageBoxes
                Box_Text={'Add Photo'}
                onPress={() => {
                  refRBSheet.current.open();
                }}
              />
              {MultiImageName.length > 0 ? refRBSheet.current.close() : null}

              <Text style={PropertyImagesStyle.formatted_property_text}>
                {
                  'Images should be formatted .jpg or .png. Size per image should not exceed 5 MB.'
                }
              </Text>
            </View>

            <Text style={PropertyImagesStyle.upload_Heading_Text}>
              {'Upload video'}
            </Text>
            <View style={{ flex: 1 }}>
              <UploadImageBoxes
                Box_Text={'Add Video'}
                onPress={() => {
                  openVideoPicker();
                }}
              />
              {selectedVideos.length > 0 && (
                <View style={{ marginTop: 10 }}>
                  <FlatList
                    horizontal
                    data={selectedVideos}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <>
                        <Video
                          source={{ uri: item.path }}
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
                      </>
                    )}
                  />
                </View>
              )}
              <Text style={PropertyImagesStyle.formatted_property_text}>
                {
                  'Videos should be formatted .mp4, HEVC, MKV. Size per video should not exceed 100 MB.'
                }
              </Text>
            </View>

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
                  // alert('sdv');
                } else {
                  handleSaveImage();
                  // alert('sdee');

                }
              }}
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
