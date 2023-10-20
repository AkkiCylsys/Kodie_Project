//ScreenNo:11
//ScreenNo:12
//ScreenNo:13
//ScreenNo:14
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import StepIndicator from "react-native-step-indicator";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _COLORS } from "../../../../Themes";
import Account from "../Account/Account";
import ProgressBar from "react-native-progress/Bar";
import AboutYou from "../AboutYou/AboutYou";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import FirstProperty from "../FirstProperty/FirstProperty";
import { SignUpStepStyle } from "./SignUpStepsStyle";

const labels = ["Step 1", "Step 2", "Step 3"];

const firstIndicatorSignUpStepStyle = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
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

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: "feed",
    color: stepStatus === "finished" ? "#ffffff" : "#fe7013",
    size: 25,
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

    default: {
      break;
    }
  }
  return iconConfig;
};
const SignUpSteps = (props) => {
  const [currentPage, setCurrentPage] = useState(0);

  const onStepPress = (position) => {
    setCurrentPage(position);
  };
  const renderLabel = ({ position, stepStatus }) => {
    const iconColor = stepStatus === "finished" ? "#000000" : "#808080";
    const iconName =
      position === 0
        ? "Account"
        : position === 1
        ? "About you"
        : position === 2
        ? "First Property"
        : "circle";

    return (
      <View style={SignUpStepStyle.labelContainer}>
        <Text
          style={{
            fontSize: 14,
            marginTop: 1,
            marginHorizontal: 10,
            color: iconColor,
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
        return <Account />;
      case 1:
        return <AboutYou />;
      case 2:
        return <FirstProperty />;
      default:
        return null;
    }
  };

  return (
    <>
      <TopHeader
        MiddleText={"Set up your Kodie account"}
        onPressLeftButton={() => _goBack(props)}
      />
      <ProgressBar
        progress={0.4}
        width={800}
        height={5}
        color={_COLORS.Kodie_lightGreenColor}
        style={SignUpStepStyle.progresBar}
      />
      <View style={SignUpStepStyle.container}>
        <View style={SignUpStepStyle.stepIndicator}>
          <StepIndicator
            customSignUpStepStyle={firstIndicatorSignUpStepStyle}
            currentPosition={currentPage}
            onPress={onStepPress}
            renderStepIndicator={renderStepIndicator}
            labels={labels}
            stepCount={3}
            renderLabel={renderLabel}
          />
        </View>
        <ScrollView
          contentContainerStyle={{ marginBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={SignUpStepStyle.stepIndicator}>
            {renderPageContent()}
          </View>

          <View
            style={{
              marginHorizontal: 16,
              backgroundColor: _COLORS.Kodie_WhiteColor,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                justifyContent: "flex-end",
                marginBottom: 30,
              }}
            >
              <CustomSingleButton
                _ButtonText={"Next"}
                Text_Color={_COLORS.Kodie_WhiteColor}
                onPress={() => {
                  if (currentPage === 2) {
                    props.navigation.navigate("DrawerNavigstorLeftMenu");
                  } else {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              />

              {currentPage === 1 || currentPage === 2 ? (
                <>
                  <CustomSingleButton
                    _ButtonText={"Fill these details out later"}
                    Text_Color={_COLORS.Kodie_BlackColor}
                    backgroundColor={_COLORS.Kodie_WhiteColor}
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
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SignUpSteps;
