import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import StepText from "../../components/Molecules/StepText/StepText";
import { CreateJobSecondStyle } from "./CreateJobSecondScreenCss";
import {
  _COLORS,
  LABEL_STYLES,
  IMAGES,
  VIEW_STYLES,
  BANNERS,
} from "../../Themes/index";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import AntDesign from "react-native-vector-icons/AntDesign";
export default CreateJobSecondScreen = (props) => {
  return (
    <View style={CreateJobSecondStyle.container}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Create job"}
      />
      <StepText _StepNo={"2"} _StepText={" Photo and Video"} />
      <View style={CreateJobSecondStyle.phototextView}>
        <Text style={LABEL_STYLES.commontext}>{"Photos and Video"}</Text>
        <Text style={LABEL_STYLES.commonMidtext}>
          {"You can upload photo and video here"}
        </Text>

        <Text style={LABEL_STYLES.commontext}>
          {"How to upload photos watch video"}
        </Text>
        <View style={CreateJobSecondStyle.videoView}>
          <ImageBackground
            source={BANNERS.wallImage}
            style={CreateJobSecondStyle.imagebackground}
          >
            <TouchableOpacity style={CreateJobSecondStyle.playBtn}>
              <AntDesign
                name="playcircleo"
                size={35}
                color={_COLORS.Kodie_WhiteColor}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <CustomSingleButton
          leftImage={IMAGES.uploadIcon}
          isLeftImage={true}
          borderColor={_COLORS.Kodie_TransparentColor}
          _ButtonText={"Upload"}
          backgroundColor={_COLORS.Kodie_lightGreenColor}
        />
        <Text style={LABEL_STYLES.commonMidtext}>
          {
            "Image type should be Jpg & PNG,and size should not be greater then 2MB"
          }
        </Text>
        {/* <Text style={LABEL_STYLES.commonMidtext}>
          {"Video size greater then 10MB"}
        </Text> */}
      </View>
      <View style={VIEW_STYLES._bottomButtonView}>
        <CustomSingleButton
          onPress={() => props.navigation.navigate("PropertyList")}
          _ButtonText={"Next"}
          Text_Color={_COLORS.Kodie_WhiteColor}
          onPress={() => props.navigation.navigate("InviteTenant")}
        />
      </View>
    </View>
  );
};
