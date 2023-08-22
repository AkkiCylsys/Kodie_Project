import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
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
import UploadImagebox from "../../components/Molecules/UploadImageBox/UploadImageBox";
import UploadImageBoxes from "../../components/Molecules/UploadImageBoxes/UploadImageBoxes";
export default CreateJobSecondScreen = (props) => {
  return (
    <View style={CreateJobSecondStyle.container}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Create job"}
      />
      <ScrollView>
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
          {/* <View style={CreateJobSecondStyle.uploadImagebox}>
            <UploadImagebox _BoxText={"Upload Front Image"} icon={"camera"} />
            <UploadImagebox
              _BoxText={"Upload Back Side Image"}
              icon={"camera"}
            />
          </View>
          <View style={CreateJobSecondStyle.uploadImagebox}>
            <UploadImagebox _BoxText={"Upload Side Image"} icon={"camera"} />
            <UploadImagebox _BoxText={"Upload  Video"} icon={"video"} />
          </View> */}
          <UploadImageBoxes
            heading_Text={"Upload clear images of the front profile"}
            Box_Text={'Add Photo'}
          />
          <UploadImageBoxes
            heading_Text={"Upload clear images of the left side profile"}
            Box_Text={'Add Photo'}
          />
          <UploadImageBoxes
            heading_Text={"Upload clear images of the right side profile"}
            Box_Text={'Add Photo'}
          />
          <UploadImageBoxes
            heading_Text={"Upload a video clearly showing and describing the job that you need completed"}
            Box_Text={'Add Video'}
          />
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
        </View>

        <View style={VIEW_STYLES._bottomButtonView}>
          <CustomSingleButton
            _ButtonText={"Next"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={() => props.navigation.navigate("InviteTenant")}
          />
        </View>
      </ScrollView>
    </View>
  );
};
