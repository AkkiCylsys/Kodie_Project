//ScreenNo:126
//ScreenNo:127
import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StepIndicator from "react-native-step-indicator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const stepLabels = ["Step 1", "Step 2", "Step 3", "Step 4"];
const images = [
  BANNERS.wallImage,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
const CreateJobSecondScreen = (props) => {
  const refRBSheet = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);

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
        {/* <StepText _StepNo={"2"} _StepText={"Images & videos of job required"} /> */}
        <View style={CreateJobSecondStyle.phototextView}>
          <Text style={CreateJobSecondStyle.heading}>
            {"Images and videos of job"}
          </Text>
          {/* <Text style={LABEL_STYLES.commonMidtext}>
            {
              "Images should be formatted .jpg or .png Videos should be formatting .mp4 or .mov or .m4 Size per file should not exceed 5 MB"
            }
          </Text> */}
          <View style={CreateJobSecondStyle.slider_view}>
            <SliderBox
              images={images}
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
                // position: "relative",
              }}
            />
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
          <UploadImageBoxes
            Box_Text={"Add Photo"}
            onPress={() => {
              refRBSheet.current.open();
            }}
          />
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
          <UploadImageBoxes
            Box_Text={"Add Photo"}
            onPress={() => {
              refRBSheet.current.open();
            }}
          />
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

          <UploadImageBoxes
            Box_Text={"Add Photo"}
            onPress={() => {
              refRBSheet.current.open();
            }}
          />
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
              refRBSheet.current.open();
            }}
          />
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
            <UploadImageData heading_Text={"Upload more images"} />
          </RBSheet>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateJobSecondScreen;
