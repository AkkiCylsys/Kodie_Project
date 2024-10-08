//ScreenNo:126
//ScreenNo:127
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import StepText from '../../components/Molecules/StepText/StepText';
import {CreateJobSecondStyle} from './CreateJobSecondScreenCss';
import {_COLORS, LABEL_STYLES, BANNERS} from '../../Themes/index';
import CustomSingleButton from '../../components/Atoms/CustomButton/CustomSingleButton';
import TopHeader from '../../components/Molecules/Header/Header';
import {_goBack} from '../../services/CommonServices';
import {SliderBox} from 'react-native-image-slider-box';
import UploadImageBoxes from '../../components/Molecules/UploadImageBoxes/UploadImageBoxes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import UploadImageData from '../../components/Molecules/UploadImage/UploadImage';
import UploadMultipleImage from '../../components/Molecules/UploadImage/UploadMultipleImage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-crop-picker';
import UploadLeftImage from '../../components/Molecules/UploadImage/UploadLeftImage';
import UploadRightImage from '../../components/Molecules/UploadImage/UploadRightImage';
import {CommonLoader} from '../../components/Molecules/ActiveLoader/ActiveLoader';
import {useDispatch, useSelector} from 'react-redux';
import {Config} from '../../Config';
import axios from 'axios';
const stepLabels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
const images = [
  BANNERS.wallImage,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
const CreateJobSecondScreen = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const createJobId = useSelector(state => state.AddCreateJobReducer.data);
  console.log('createJobId.....', createJobId);
  // console.log('loginResponse.....', loginData);
  // alert(loginData?.Login_details?.user_account_id);

  // validation...
  const handleValidate = () => {
    if (editMode || (updateAllImage && updateAllImage.length > 0)) {
      if (allImagePaths.length === 0) {
        props.navigation.navigate('JobDetails', {
          JobId: JobId,
          editMode: editMode,
        });
      } else {
        handleUpdateJobFiles();
      }
    } else if (MultiImageName.length > 0) {
      handleuploadJobFiles();
    } else {
      setMultiImageNameError('Front images required!');
      console.log('err...', MultiImageNameError);
    }
  };

  let job_id = props?.route?.params?.job_id;
  let editMode = props?.route?.params?.editMode;
  let JobId = props?.route?.params?.JobId;
  console.log('job_id time for create job.....', job_id);
  console.log('job_id time update job.....', JobId);
  console.log('job_id editMode.....', editMode);

  // alert(editMode);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);
  const [MultiImageName, setMultiImageName] = useState([]);
  const [MultiImageNameError, setMultiImageNameError] = useState(true);
  const [leftImage, setLeftImage] = useState([]);
  const [rightImage, setRightImage] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [jobDetailsData, setJobDetailsData] = useState([]);
  const [updateAllImage, setUpdateAllImage] = useState([]);

  useEffect(() => {
    JobId > 0 ||
    (Array.isArray(createJobId) && createJobId.length > 0) ||
    typeof createJobId === 'number'
      ? getJobDetails()
      : null;
  }, []);
  const CloseUp = () => {
    refRBSheet.current.close();
    console.log('close');
  };
  const CloseUp1 = () => {
    refRBSheet1.current.close();
    console.log('close');
  };
  const CloseUp2 = () => {
    refRBSheet2.current.close();
    console.log('close');
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
        ? 'Terms'
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
  const removeVideo = indexToRemove => {
    const updatedVideos = [...selectedVideos];
    updatedVideos.splice(indexToRemove, 1);
    setSelectedVideos(updatedVideos);
  };

  const openVideoPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
      multiple: true,
    })
      .then(videos => {
        setSelectedVideos([...selectedVideos, ...videos]);
        console.log('videos....', videos);
      })
      .catch(error => {
        console.error('Error selecting videos:', error);
      });
  };
  const handlefrontImage = multipleImages => {
    // setMultiImageName(multipleImages);
    setMultiImageName([...MultiImageName, ...multipleImages]);
    console.log('................multiFrontImage', multipleImages);
    // console.log("................ImageNAmepath", multipleImages.path);
  };
  const handleleftImage = leftImages => {
    // setLeftImage(leftImage);
    setLeftImage([...leftImage, ...leftImages]);
    console.log('................leftImage', leftImage);
    // console.log("................ImageNAmepath", multipleImages.path);
  };
  const handleRightImage = rightImages => {
    setRightImage([...rightImage, ...rightImages]);
    console.log('................RightImage', rightImage);
    // console.log("................ImageNAmepath", multipleImages.path);
  };

  const imagePaths = MultiImageName.map(item => item.path);
  console.log('imagePaths....', imagePaths);

  const leftImagePaths = leftImage.map(item => item.path);
  console.log('leftImagePaths....', leftImagePaths);

  const rightImagePaths = rightImage.map(item => item.path);
  console.log('rightImagePaths....', rightImagePaths);

  const allImagePaths = [
    ...new Set([...imagePaths, ...leftImagePaths, ...rightImagePaths]),
  ];
  console.log('allImagePaths....', allImagePaths.length);
  // Api intrigation......
  const handleuploadJobFiles = async () => {
    const formData = new FormData();
    formData.append('JM_JOB_ID', JobId > 0 ? JobId : job_id);

    try {
      // Append front images
      if (MultiImageName && Array.isArray(MultiImageName)) {
        MultiImageName.forEach((image, index) => {
          console.log('images for path for multiname image ....', image);

          formData.append(`frontImage`, {
            uri: image.path,
            // name: `image.jpg`,
            name: image.path,
            type: 'image/jpeg',
          });
        });
      } else {
        throw new Error('MultiImageName is not defined or not an array');
      }

      // Append left images
      if (leftImage && Array.isArray(leftImage)) {
        leftImage.forEach((image, index) => {
          console.log('images for path ....', image);
          formData.append(`leftImage`, {
            uri: image.path,
            // name: `left_image.jpg`,
            name: image.path,
            type: 'image/jpeg',
          });
        });
      } else {
        throw new Error('leftImage is not defined or not an array');
      }

      // Append right images
      if (rightImage && Array.isArray(rightImage)) {
        rightImage.forEach((image, index) => {
          console.log('images for path for right image ....', image);
          formData.append(`rightImage`, {
            uri: image.path,
            // name: `right_image.jpg`,
            name: image.path,
            type: 'image/jpeg',
          });
        });
      } else {
        throw new Error('rightImage is not defined or not an array');
      }
      // Append videos
      if (selectedVideos && selectedVideos.length > 0) {
        selectedVideos.forEach((videoInfo, index) => {
          const {path, mime} = videoInfo;
          const videoName = path.substring(path.lastIndexOf('/') + 1);
          formData.append(`video`, {
            uri: path,
            name: videoName,
            type: mime,
          });
        });
      } else {
        console.log('invalid video');
      }
      console.log('formData', formData);
      const url = Config.BASE_URL;
      const uploadFile_url = url + 'job/uploadJobFiles';
      console.log('Request URL:', uploadFile_url);

      setIsLoading(true);
      const response = await axios.post(uploadFile_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('uploadJobFilesData', response?.data);
      if (response?.data && response?.data?.success === true) {
        setIsLoading(false);
        Alert.alert('Success!', response?.data?.message);
        // props.navigation.navigate('JobDetails', {job_id: job_id});
        props.navigation.navigate('JobDetails', {
          job_id: JobId > 0 ? JobId : job_id,
        });
        // clear state for image..
        // setMultiImageName([]);
        // setLeftImage([]);
        // setRightImage([]);
      } else {
        const errorMessage = response?.data
          ? response?.data?.error
          : 'Unknown error occurred';
        console.error('uploadJobFilesData', errorMessage);
        alert('There was an error. Please try again.');
      }
    } catch (error) {
      // alert(error.message || 'An error occurred');
      // alert('Maximum image length exceeded.');
      console.error('error...', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getJobDetails = () => {
    const url = Config.BASE_URL;
    const jobDetails_url = url + 'job/get';
    console.log('Request URL:', jobDetails_url);
    setIsLoading(true);
    const jobDetails_Data = {
      jm_job_id: JobId,
    };
    axios
      .post(jobDetails_url, jobDetails_Data)
      .then(response => {
        console.log('API Response JobDetails for updateImage:', response?.data);
        if (response?.data?.success === true) {
          setJobDetailsData(response?.data?.data);
          console.log('jobDetailsData_term....', response?.data?.data);
          const images = response?.data?.data?.image_file_path || [];
          setUpdateAllImage(images);
          console.log('updateAllImage.....', images);
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed jobDetails in edit mode ', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleUpdateJobFiles = async () => {
    const formData = new FormData();
    if (MultiImageName && Array.isArray(MultiImageName)) {
      const imagePaths = MultiImageName.map(image => image.path);
      imagePaths.forEach((path, index) => {
        console.log('update time image path..', path);
        formData.append('frontImage', {
          uri: path,
          name: String(path.split('/').pop()) || `image.jpg`,
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

    if (leftImage && Array.isArray(leftImage)) {
      const leftImagePaths = leftImage.map(image => image.path);

      leftImagePaths.forEach((path, index) => {
        formData.append('leftImage', {
          uri: path,
          name: String(path.split('/').pop()) || `left_image.jpg`,
          type: 'image/jpeg',
        });
      });
    } else {
      console.error('leftImage is not defined or not an array:', leftImage);
      return;
    }

    if (rightImage && Array.isArray(rightImage)) {
      const rightImagePaths = rightImage.map(image => image.path);
      rightImagePaths.forEach((path, index) => {
        formData.append('rightImage', {
          uri: path,
          name: String(path.split('/').pop()) || `right_image_${index}.jpg`,
          type: 'image/jpeg',
        });
      });
    } else {
      console.error('rightImage is not defined or not an array:', rightImage);
      return;
    }
    if (selectedVideos && selectedVideos.length > 0) {
      selectedVideos.forEach((videoInfo, index) => {
        const {path, mime} = videoInfo;
        console.log('path..', path);
        console.log('mime..', mime);
        const videoName = path.substring(path.lastIndexOf('/') + 1);
        formData.append('video', {
          uri: path,
          name: videoName,
          type: mime,
        });
      });
    } else {
      console.log('invalid video');
    }

    // formData.append("uad_user_key", loginData?.Login_details?.user_account_id);
    console.log('formData', formData);
    console.log('length data ...', formData.length);
    const url = Config.BASE_URL;
    const update_uploadFile_url =
      url + `job/updatejobimages/${JobId > 0 ? JobId : job_id}`;
    console.log('Request URL image:', update_uploadFile_url);
    setIsLoading(true);
    try {
      const response = await axios.put(update_uploadFile_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('update_uploadJobFilesData....', response?.data);
      if (response?.data?.success === true) {
        setIsLoading(false);
        alert(response?.data?.message);
        props.navigation.navigate('JobDetails', {
          // JobId: JobId,
          JobId: JobId > 0 ? JobId : job_id,
          editMode: editMode,
        });
        console.log('update_uploadJobFilesDatas', response?.data);
        // setMultiImageName([]);
        // setLeftImage([]);
        // setRightImage([]);
      } else {
        console.log('update_uploadJobFilesData', response?.data?.error);
        // alert('Oops Somthing went wrong! please try again later.');
      }
    } catch (error) {
      // alert(error);
      console.log('update_error...', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={CreateJobSecondStyle.container}>
      <TopHeader
        // isprofileImage
        // IsNotification
        onPressLeftButton={() => _goBack(props)}
        MiddleText={editMode ? 'Edit job' : 'Create new job request'}
      />
      <View style={{marginVertical: 10}}>
        <StepIndicator
          customSignUpStepStyle={firstIndicatorSignUpStepStyle}
          currentPosition={2}
          // onPress={onStepPress}
          renderStepIndicator={renderStepIndicator}
          labels={stepLabels}
          stepCount={4}
          renderLabel={renderLabel}
        />
      </View>
      <ScrollView>
        <View style={CreateJobSecondStyle.phototextView}>
          <Text style={CreateJobSecondStyle.heading}>
            {'Images and videos of job'}
          </Text>
          <View style={CreateJobSecondStyle.slider_view}>
            {(imagePaths && imagePaths.length > 0) ||
            (leftImagePaths && leftImagePaths.length > 0) ||
            (rightImagePaths && rightImagePaths.length > 0) ||
            editMode ||
            (updateAllImage && updateAllImage.length > 0) ? (
              <SliderBox
                images={
                  editMode || (updateAllImage && updateAllImage.length > 0)
                    ? [...updateAllImage, ...allImagePaths]
                    : [...allImagePaths]
                }
                sliderBoxHeight={200}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
                }
                inactiveDotColor={_COLORS.Kodie_GrayColor}
                dotColor={_COLORS.Kodie_GreenColor}
                // autoplay
                // circleLoop
                resizeMethod={'resize'}
                resizeMode={'cover'}
                dotStyle={CreateJobSecondStyle.dotStyle}
                ImageComponentStyle={{
                  flex: 1,
                  resizeMode: 'cover',
                  borderRadius: 15,
                  width: '90%',
                }}
              />
            ) : null}
          </View>

          <View style={CreateJobSecondStyle.heading_View}>
            <Text style={CreateJobSecondStyle.heading_Text}>
              {'Upload clear images of the front profile'}
              <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
            </Text>
            <AntDesign
              name="questioncircle"
              size={20}
              color={_COLORS.Kodie_MediumGreenColor}
            />
          </View>

          <View style={{flex: 1}}>
            <UploadImageBoxes
              Box_Text={'Add Photo'}
              onPress={() => {
                refRBSheet.current.open();
              }}
            />
            {MultiImageName.length > 0 ? refRBSheet.current.close() : null}
          </View>

          {MultiImageName.length > 0 ? null : (
            <Text style={CreateJobSecondStyle.error_text}>
              {MultiImageNameError}
            </Text>
          )}
          <View style={CreateJobSecondStyle.heading_View}>
            <Text style={CreateJobSecondStyle.heading_Text}>
              {'Upload clear images of the left side profile'}
            </Text>
            <AntDesign
              name="questioncircle"
              size={20}
              color={_COLORS.Kodie_MediumGreenColor}
            />
          </View>
          <View style={{flex: 1}}>
            <UploadImageBoxes
              Box_Text={'Add Photo'}
              onPress={() => {
                refRBSheet1.current.open();
              }}
            />
            {leftImage.length > 0 ? refRBSheet1.current.close() : null}
          </View>
          <View style={CreateJobSecondStyle.heading_View}>
            <Text style={CreateJobSecondStyle.heading_Text}>
              {'Upload clear images of the right side profile'}
            </Text>
            <AntDesign
              name="questioncircle"
              size={20}
              color={_COLORS.Kodie_MediumGreenColor}
            />
          </View>
          <View style={{flex: 1}}>
            <UploadImageBoxes
              Box_Text={'Add Photo'}
              onPress={() => {
                refRBSheet2.current.open();
              }}
            />
            {rightImage.length > 0 ? refRBSheet2.current.close() : null}
          </View>
          <View style={CreateJobSecondStyle.heading_View}>
            <Text style={CreateJobSecondStyle.heading_Text}>
              {
                'Upload a video clearly showing and describing the job that you need completed'
              }
            </Text>
            <AntDesign
              name="questioncircle"
              size={20}
              color={_COLORS.Kodie_MediumGreenColor}
            />
          </View>
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
                renderItem={({item, index}) => (
                  <View>
                    <Video
                      source={{uri: item.path}}
                      style={{
                        // flex:1,
                        width: 310,
                        // width: "100%",
                        height: 150,
                        borderRadius: 5,
                        marginLeft: 10,
                        // backgroundColor: "black",
                        borderWidth: 1,
                        borderColor: _COLORS.Kodie_GrayColor,
                        marginTop: 10,
                      }}
                      controls={true}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 15,
                        right: 5,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        borderRadius: 15,
                        // padding: 3,
                        justifyContent: 'center',
                        width: '12%',
                        height: '20%',
                      }}
                      onPress={() => removeVideo(index)}>
                      <Entypo
                        name="cross"
                        size={20}
                        color={_COLORS.Kodie_BlackColor}
                        style={{
                          // marginTop: 10,
                          alignSelf: 'center',
                        }}
                      />
                    </TouchableOpacity>
                    {/* <Text style={{fontSize:14,color:_COLORS?.Kodie_BlackColor}}>{item.path}</Text> */}
                  </View>
                )}
              />
            </View>
          )}
          <View style={CreateJobSecondStyle.next_Btn}>
            <CustomSingleButton
              _ButtonText={'Next'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              disabled={isLoading ? true : false}
              onPress={() => {
                // props.navigation.navigate("JobDetails");
                // handleuploadJobFiles();
                handleValidate();
              }}
            />
          </View>
          <TouchableOpacity
            style={CreateJobSecondStyle.goBack_View}
            onPress={() => {
              props.navigation.pop();
            }}>
            <View style={CreateJobSecondStyle.backIcon}>
              <Ionicons
                name="chevron-back"
                size={22}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </View>
            <Text style={CreateJobSecondStyle.goBack_Text}>{'Go back'}</Text>
          </TouchableOpacity>
          <RBSheet
            ref={refRBSheet}
            // closeOnDragDown={true}
            closeOnPressMask={false}
            height={180}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
              draggableIcon: {
                backgroundColor: _COLORS.Kodie_LightGrayColor,
              },
              container: CreateJobSecondStyle.bottomModal_container,
            }}>
            <UploadMultipleImage
              onClose={CloseUp}
              heading_Text={'Upload image'}
              // multipleImage={handleImageNameChange}
              multipleImage={handlefrontImage}
            />
          </RBSheet>
          <RBSheet
            ref={refRBSheet1}
            // closeOnDragDown={true}
            closeOnPressMask={false}
            height={180}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
              draggableIcon: {
                backgroundColor: _COLORS.Kodie_LightGrayColor,
              },
              container: CreateJobSecondStyle.bottomModal_container,
            }}>
            <UploadLeftImage
              onClose={CloseUp1}
              heading_Text={'Upload image'}
              leftImage={handleleftImage}
            />
          </RBSheet>
          <RBSheet
            ref={refRBSheet2}
            // closeOnDragDown={true}
            closeOnPressMask={false}
            height={180}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
              draggableIcon: {
                backgroundColor: _COLORS.Kodie_LightGrayColor,
              },
              container: CreateJobSecondStyle.bottomModal_container,
            }}>
            <UploadRightImage
              onClose={CloseUp2}
              heading_Text={'Upload image'}
              rightImage={handleRightImage}
            />
          </RBSheet>
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default CreateJobSecondScreen;
