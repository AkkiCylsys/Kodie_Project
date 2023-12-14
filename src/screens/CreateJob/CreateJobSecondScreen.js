//ScreenNo:126
//ScreenNo:127
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import StepText from "../../components/Molecules/StepText/StepText";
import { CreateJobSecondStyle } from "./CreateJobSecondScreenCss";
import { _COLORS, LABEL_STYLES, BANNERS } from "../../Themes/index";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import { SliderBox } from "react-native-image-slider-box";
import UploadImageBoxes from "../../components/Molecules/UploadImageBoxes/UploadImageBoxes";
import Ionicons from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
import UploadImageData from "../../components/Molecules/UploadImage/UploadImage";
import UploadMultipleImage from "../../components/Molecules/UploadImage/UploadMultipleImage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import StepIndicator from "react-native-step-indicator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Video from "react-native-video";
import ImagePicker from "react-native-image-crop-picker";
import UploadLeftImage from "../../components/Molecules/UploadImage/UploadLeftImage";
import UploadRightImage from "../../components/Molecules/UploadImage/UploadRightImage";
import { CommonLoader } from "../../components/Molecules/ActiveLoader/ActiveLoader";
import { useDispatch, useSelector } from "react-redux";

const stepLabels = ["Step 1", "Step 2", "Step 3", "Step 4"];
const images = [
  BANNERS.wallImage,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
const CreateJobSecondScreen = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);
  // alert(loginData?.Login_details?.user_account_id);

  let job_id = props?.route?.params?.job_id;
  console.log("job_id.....", job_id);

  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);
  const [MultiImageName, setMultiImageName] = useState([]);
  const [leftImage, setLeftImage] = useState([]);
  const [rightImage, setRightImage] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);

  const CloseUp = () => {
    refRBSheet.current.close();
    console.log("close");
  };
  const CloseUp1 = () => {
    refRBSheet1.current.close();
    console.log("close");
  };
  const CloseUp2 = () => {
    refRBSheet2.current.close();
    console.log("close");
  };
  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: "feed",
      // name: stepStatus === "finished" ? "check" : (position + 1).toString(),
      color: stepStatus === "finished" ? "#ffffff" : "#fe7013",
      size: 20,
    };

    switch (position) {
      case 0: {
        iconConfig.name = stepStatus === "finished" ? "check" : null;
        break;
      }
      case 1: {
        iconConfig.name = stepStatus === "finished" ? "check" : null;
        break;
      }
      case 2: {
        iconConfig.name = stepStatus === "finished" ? "check" : null;
        break;
      }
      case 3: {
        iconConfig.name = stepStatus === "finished" ? "check" : null;
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
    stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
    labelColor: _COLORS.Kodie_BlackColor,
    labelSize: 14,
    labelAlign: "center",
  };
  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const renderLabel = ({ position, stepStatus }) => {
    // const iconColor = stepStatus === "finished" ? "#000000" : "#808080";
    const iconColor =
      position === currentPage // Check if it's the current step
        ? _COLORS.Kodie_BlackColor // Set the color for the current step
        : stepStatus === "finished"
        ? "#000000"
        : "#808080";
    const iconName =
      position === 0
        ? "Details"
        : position === 1
        ? "Terms"
        : position === 2
        ? "Images"
        : position === 3
        ? "Review"
        : "null";

    return (
      <View style={{}}>
        <Text
          style={{
            fontSize: 14,
            marginTop: 1,
            marginHorizontal: 10,
            color: iconColor,
            alignSelf: "center",
          }}
        >{`Step ${position + 1}`}</Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 5,
            marginHorizontal: 10,
            color: iconColor,
          }}
        >
          {iconName}
        </Text>
      </View>
    );
  };
  const removeVideo = (indexToRemove) => {
    const updatedVideos = [...selectedVideos];
    updatedVideos.splice(indexToRemove, 1);
    setSelectedVideos(updatedVideos);
  };

  const openVideoPicker = () => {
    ImagePicker.openPicker({
      mediaType: "video",
      multiple: true,
    })
      .then((videos) => {
        setSelectedVideos([...selectedVideos, ...videos]);
        console.log("videos....", videos);
      })
      .catch((error) => {
        console.error("Error selecting videos:", error);
      });
  };
  const handlefrontImage = (multipleImages) => {
    setMultiImageName(multipleImages);
    console.log("................multiFrontImage", multipleImages);
    // console.log("................ImageNAmepath", multipleImages.path);
  };
  const handleleftImage = (leftImage) => {
    setLeftImage(leftImage);
    console.log("................leftImage", leftImage);
    // console.log("................ImageNAmepath", multipleImages.path);
  };
  const handleRightImage = (rightImage) => {
    setRightImage(rightImage);
    console.log("................RightImage", rightImage);
    // console.log("................ImageNAmepath", multipleImages.path);
  };

  const imagePaths = MultiImageName.map((item) => item.path);
  console.log("imagePaths....", imagePaths);

  const leftImagePaths = leftImage.map((item) => item.path);
  console.log("leftImagePaths....", leftImagePaths);

  const rightImagePaths = rightImage.map((item) => item.path);
  console.log("rightImagePaths....", rightImagePaths);

  const allImagePaths = [
    ...new Set([...imagePaths, ...leftImagePaths, ...rightImagePaths]),
  ];
  // Api intrigation......
  const handleuploadJobFiles = async () => {
    const formData = new FormData();
    formData.append("JM_JOB_ID", job_id);
    if (MultiImageName && Array.isArray(MultiImageName)) {
      const imagePaths = MultiImageName.map((image) => image.path);
      imagePaths.forEach((path, index) => {
        formData.append("frontImage", {
          uri: path,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        });
      });
    } else {
      console.error(
        "MultiImageName is not defined or not an array:",
        MultiImageName
      );
      return;
    }

    if (leftImage && Array.isArray(leftImage)) {
      const leftImagePaths = leftImage.map((image) => image.path);
      leftImagePaths.forEach((path, index) => {
        formData.append("leftImage", {
          uri: path,
          name: `left_image_${index}.jpg`,
          type: "image/jpeg",
        });
      });
    } else {
      console.error("leftImage is not defined or not an array:", leftImage);
      return;
    }

    if (rightImage && Array.isArray(rightImage)) {
      const rightImagePaths = rightImage.map((image) => image.path);
      rightImagePaths.forEach((path, index) => {
        formData.append("rightImage", {
          uri: path,
          name: `right_image_${index}.jpg`,
          type: "image/jpeg",
        });
      });
    } else {
      console.error("rightImage is not defined or not an array:", rightImage);
      return;
    }

    if (selectedVideos && selectedVideos.length > 0) {
      selectedVideos.forEach((videoUri, index) => {
        if (typeof videoUri === "string") {
          const videoName = videoUri.substring(videoUri.lastIndexOf("/") + 1);
          formData.append("video", {
            uri: videoUri,
            name: videoName,
            type: "video/mp4",
          });
        } else {
          console.error(`Invalid video URI at index ${index}: ${videoUri}`);
        }
      });
    }
    formData.append("createdBy", loginData?.Login_details?.user_account_id);
    formData.append("updatedBy", loginData?.Login_details?.user_account_id);
    console.log("formData", formData);
    const uploadJobFiles = "https://e3.cylsys.com/api/v1/job/uploadJobFiles/65";
    console.log("Request URL:", uploadJobFiles);
    setIsLoading(true);
    try {
      const response = await axios.post(uploadJobFiles, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("uploadJobFilesData....", response.data);
      if (response.data.success === true) {
        setIsLoading(false);
        alert(" successfully uploaded files");
        console.log("SuploadJobFilesDatas", response.data);
      } else {
        console.log("uploadJobFilesData", response.data.error);
        alert("Error while saving account details");
      }
    } catch (error) {
      alert(error);
      console.log("error...", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={CreateJobSecondStyle.container}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Create job"}
      />
      <StepIndicator
        customSignUpStepStyle={firstIndicatorSignUpStepStyle}
        currentPosition={2}
        // onPress={onStepPress}
        renderStepIndicator={renderStepIndicator}
        labels={stepLabels}
        stepCount={4}
        renderLabel={renderLabel}
      />
      <ScrollView>
        <View style={CreateJobSecondStyle.phototextView}>
          <Text style={CreateJobSecondStyle.heading}>
            {"Images and videos of job"}
          </Text>
          <View style={CreateJobSecondStyle.slider_view}>
            {(imagePaths && imagePaths.length > 0) ||
            (leftImagePaths && leftImagePaths.length > 0) ||
            (rightImagePaths && rightImagePaths.length > 0) ? (
              <SliderBox
                images={allImagePaths}
                sliderBoxHeight={200}
                onCurrentImagePressed={(index) =>
                  console.warn(`image ${index} pressed`)
                }
                inactiveDotColor={_COLORS.Kodie_GrayColor}
                dotColor={_COLORS.Kodie_GreenColor}
                autoplay
                circleLoop
                resizeMethod={"resize"}
                resizeMode={"cover"}
                dotStyle={CreateJobSecondStyle.dotStyle}
                ImageComponentStyle={{
                  flex: 1,
                  resizeMode: "cover",
                  borderRadius: 15,
                  width: "90%",
                }}
              />
            ) : null}
          </View>

          <View style={CreateJobSecondStyle.heading_View}>
            <Text style={CreateJobSecondStyle.heading_Text}>
              {"Upload clear images of the front profile"}
            </Text>
            <MaterialCommunityIcons
              name="information"
              size={25}
              color={_COLORS.Kodie_GrayColor}
            />
          </View>
          <View style={{ flex: 1 }}>
            <UploadImageBoxes
              Box_Text={"Add Photo"}
              onPress={() => {
                refRBSheet.current.open();
              }}
            />
            {MultiImageName.length > 0 ? refRBSheet.current.close() : null}
          </View>

          <View style={CreateJobSecondStyle.heading_View}>
            <Text style={CreateJobSecondStyle.heading_Text}>
              {"Upload clear images of the left side profile"}
            </Text>
            <MaterialCommunityIcons
              name="information"
              size={25}
              color={_COLORS.Kodie_GrayColor}
            />
          </View>
          <View style={{ flex: 1 }}>
            <UploadImageBoxes
              Box_Text={"Add Photo"}
              onPress={() => {
                refRBSheet1.current.open();
              }}
            />
            {leftImage.length > 0 ? refRBSheet1.current.close() : null}
          </View>
          <View style={CreateJobSecondStyle.heading_View}>
            <Text style={CreateJobSecondStyle.heading_Text}>
              {"Upload clear images of the right side profile"}
            </Text>
            <MaterialCommunityIcons
              name="information"
              size={25}
              color={_COLORS.Kodie_GrayColor}
            />
          </View>
          <View style={{ flex: 1 }}>
            <UploadImageBoxes
              Box_Text={"Add Photo"}
              onPress={() => {
                refRBSheet2.current.open();
              }}
            />
            {rightImage.length > 0 ? refRBSheet2.current.close() : null}
          </View>
          <View style={CreateJobSecondStyle.heading_View}>
            <Text style={CreateJobSecondStyle.heading_Text}>
              {
                "Upload a video clearly showing and describing the job that you need completed"
              }
            </Text>
            <MaterialCommunityIcons
              name="information"
              size={25}
              color={_COLORS.Kodie_GrayColor}
            />
          </View>
          <UploadImageBoxes
            Box_Text={"Add Video"}
            onPress={() => {
              // refRBSheet.current.open();
              openVideoPicker();
            }}
          />
          {selectedVideos.length > 0 && (
            <View style={{ marginTop: 10 }}>
              {/* <Text>Selected Videos:</Text> */}
              <FlatList
                horizontal
                data={selectedVideos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View>
                    <Video
                      source={{ uri: item.path }}
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
                        position: "absolute",
                        // top: 2,
                        right: 5,
                        // backgroundColor: "rgba(255,255,255,0.7)",
                        borderRadius: 15,
                        padding: 3,
                      }}
                      onPress={() => removeVideo(index)}
                    >
                      <Entypo
                        name="cross"
                        size={20}
                        color={_COLORS.Kodie_BlackColor}
                        style={{
                          marginTop: 10,
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
              _ButtonText={"Next"}
              Text_Color={_COLORS.Kodie_WhiteColor}
              disabled={isLoading ? true : false}
              onPress={() => props.navigation.navigate("JobDetails")}
            />
          </View>
          <TouchableOpacity style={CreateJobSecondStyle.goBack_View}>
            <View style={CreateJobSecondStyle.backIcon}>
              <Ionicons
                name="chevron-back"
                size={22}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </View>
            <Text style={CreateJobSecondStyle.goBack_Text}>{"Go back"}</Text>
          </TouchableOpacity>
          <RBSheet
            ref={refRBSheet}
            // closeOnDragDown={true}
            closeOnPressMask={false}
            height={180}
            customStyles={{
              wrapper: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              draggableIcon: {
                backgroundColor: _COLORS.Kodie_LightGrayColor,
              },
              container: CreateJobSecondStyle.bottomModal_container,
            }}
          >
            <UploadMultipleImage
              onClose={CloseUp}
              heading_Text={"Upload image"}
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
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              draggableIcon: {
                backgroundColor: _COLORS.Kodie_LightGrayColor,
              },
              container: CreateJobSecondStyle.bottomModal_container,
            }}
          >
            <UploadLeftImage
              onClose={CloseUp1}
              heading_Text={"Upload image"}
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
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              draggableIcon: {
                backgroundColor: _COLORS.Kodie_LightGrayColor,
              },
              container: CreateJobSecondStyle.bottomModal_container,
            }}
          >
            <UploadRightImage
              onClose={CloseUp2}
              heading_Text={"Upload image"}
              rightImage={handleRightImage}
            />
          </RBSheet>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateJobSecondScreen;
