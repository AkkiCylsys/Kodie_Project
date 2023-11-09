import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import PropertyDetails from "./PropertyDetails/PropertyDetails";
import PropertyFeature from "./PropertyFeature/PropertyFeature";
import PropertyImages from "./PropertyImages/PropertyImages";
import PropertyReview from "./PropertyReview/PropertyReview";
import { _COLORS } from "../../../Themes";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { SignUpStepStyle } from "../../Authentication/SignUpScreen/SignUpSteps/SignUpStepsStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
const stepLabels = ["Step 1", "Step 2", "Step 3", "Step 4"];
const AddPropertyMainPage = (props) => {
  const [currentPage, setCurrentPage] = useState(0);

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
    separatorUnFinishedColor: _COLORS.Kodie_GrayColor,
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
  const handleNextBtn = () => {
    if (currentPage == 0) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage == 1) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage == 2) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage == 3) {
      props.navigation.navigate("DrawerNavigatorLeftMenu");
      // handleSaveSignup();
    } else {
      null;
    }
  };
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
        ? "Features"
        : position === 2
        ? "Images"
        : position === 3
        ? "Review"
        : "circle";

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
  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return <PropertyDetails />;
      case 1:
        return <PropertyFeature />;
      case 2:
        return <PropertyImages />;
      case 3:
        return <PropertyReview />;

      default:
        return null;
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor }}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Add new property"}
      />
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 15 }}>
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
        <ScrollView
          contentContainerStyle={{ marginBottom: 190 }}
          showsVerticalScrollIndicator={false}
        >
          <View>{renderPageContent()}</View>
          <View
            style={{
              marginHorizontal: 16,
              backgroundColor: _COLORS.Kodie_WhiteColor,
              marginBottom: 100,
            }}
          >
            <View
              style={{
                justifyContent: "flex-end",
                // marginBottom: 30,
              }}
            >
              <CustomSingleButton
                _ButtonText={currentPage == 3 ? "Add property" : "Next"}
                Text_Color={_COLORS.Kodie_WhiteColor}
                onPress={() => {
                  handleNextBtn();
                }}
              />
              {currentPage == 1 || currentPage == 2 ? (
                <>
                  <CustomSingleButton
                    _ButtonText={"Fill these details out later"}
                    Text_Color={_COLORS.Kodie_BlackColor}
                    backgroundColor={_COLORS.Kodie_WhiteColor}
                    onPress={() => {
                      if (currentPage == 2) {
                        // handleNextBtn();
                      } else {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                  />

                  <TouchableOpacity style={SignUpStepStyle.goBack_View}>
                    <View style={SignUpStepStyle.backIcon}>
                      <Ionicons
                        name="chevron-back"
                        size={22}
                        color={_COLORS.Kodie_MediumGrayColor}
                      />
                    </View>
                    <Text style={SignUpStepStyle.goBack_Text}>{"Go back"}</Text>
                  </TouchableOpacity>
                </>
              ) : null}
              {currentPage == 0 || currentPage == 3 ? (
                <TouchableOpacity style={SignUpStepStyle.goBack_View}>
                  <View style={SignUpStepStyle.backIcon}>
                    <Ionicons
                      name="chevron-back"
                      size={22}
                      color={_COLORS.Kodie_MediumGrayColor}
                    />
                  </View>
                  <Text style={SignUpStepStyle.goBack_Text}>{"Go back"}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddPropertyMainPage;
