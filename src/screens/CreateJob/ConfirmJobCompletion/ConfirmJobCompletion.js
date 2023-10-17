// Screen no: 149
import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { ConfirmJobCompletionStyle } from "./ConfirmJobCompletionStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import RowTexts from "../../../components/Molecules/RowTexts/RowTexts";
import { IMAGES, _COLORS } from "../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import UploadImageBoxes from "../../../components/Molecules/UploadImageBoxes/UploadImageBoxes";
import SwitchButton from "../../../components/Molecules/SwitchButton/SwitchButton";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
export default ConfirmJobCompletion = (props) => {
  return (
    <View style={ConfirmJobCompletionStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Confirm job completion"}
      />
      <ScrollView>
        <View style={ConfirmJobCompletionStyle.container}>
          <Text style={ConfirmJobCompletionStyle.heading_Text}>
            {"Plasterer to fix wall"}
          </Text>
          <Text style={ConfirmJobCompletionStyle.Sub_heading_Text}>
            {"Posted Nov 11, 2022"}
          </Text>
          <DividerIcon />
          <View>
            <Text style={ConfirmJobCompletionStyle.job_Details_txt}>
              {"Job detail"}
            </Text>
            <RowTexts leftText={"Name of job owner"} rightText={"Tom"} />
            <RowTexts
              leftText={"Location"}
              rightText={"1729 Melbourne St Australia"}
            />
            <RowTexts leftText={"Proposed date"} rightText={"Nov 11, 2022"} />
            <RowTexts
              leftText={"Proposed time"}
              rightText={"10pm - 2am (4 hours)"}
            />
            <RowTexts leftText={"Number of hours"} rightText={"3 hours"} />
            <RowTexts leftText={"How often"} rightText={"One time"} />
            <RowTexts leftText={"Budget range"} rightText={"$100 - $200"} />
            <RowTexts leftText={"Booking insurance"} rightText={"Yes"} />
          </View>
          <View style={ConfirmJobCompletionStyle.job_billing}>
            <Text style={ConfirmJobCompletionStyle.job_Details_txt}>
              {"Job billing"}
            </Text>
            <RowTexts leftText={"Final cost"} rightText={"$165"} />
            <RowTexts leftText={"Completed date"} rightText={"Nov 11, 2022"} />
            <RowTexts
              leftText={"Number of hours spent"}
              rightText={"2 hours"}
            />
          </View>
          <View style={ConfirmJobCompletionStyle.job_billing}>
            <Text style={ConfirmJobCompletionStyle.job_Details_txt}>
              {"Job invoice"}
            </Text>
            <View style={ConfirmJobCompletionStyle.pdf_container}>
              <View style={ConfirmJobCompletionStyle.pdfInfo}>
                <Image
                  source={IMAGES.document}
                  style={ConfirmJobCompletionStyle.pdfIcon}
                />
                <View style={ConfirmJobCompletionStyle.textContainer}>
                  <Text style={ConfirmJobCompletionStyle.pdfName}>
                    {"Invoice.pdf"}
                  </Text>
                  <Text style={ConfirmJobCompletionStyle.pdfSize}>
                    {"4.8 MB"}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={ConfirmJobCompletionStyle.crossIcon}>
                <Entypo
                  name="cross"
                  size={20}
                  color={_COLORS.Kodie_WhiteColor}
                  style={ConfirmJobCompletionStyle.crossIconStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={ConfirmJobCompletionStyle.job_billing}>
            <Text style={ConfirmJobCompletionStyle.job_Details_txt}>
              {"Photo confirmation"}
            </Text>
            <UploadImageBoxes Box_Text={"Add Photo"} />
          </View>
          <View style={ConfirmJobCompletionStyle.job_billing}>
            <Text style={ConfirmJobCompletionStyle.job_Details_txt}>
              {"Photo confirmation"}
            </Text>
            <View style={ConfirmJobCompletionStyle.switchBtn_view}>
              <SwitchButton
                leftBtnText={"Not approved"}
                rightBtnText={"Approved"}
              />
            </View>
          </View>
          <View style={ConfirmJobCompletionStyle.job_billing}>
            <Text style={ConfirmJobCompletionStyle.job_Details_txt}>
              {"Tenant approval"}
            </Text>
            <View style={ConfirmJobCompletionStyle.switchBtn_view}>
              <SwitchButton
                leftBtnText={"Not approved"}
                rightBtnText={"Approved"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={ConfirmJobCompletionStyle.confirmBtn_view}>
        <CustomSingleButton
          _ButtonText={"Confirm"}
          Text_Color={_COLORS.Kodie_WhiteColor}
          onPress={() => props.navigation.navigate("Billinginformation")}
        />
      </View>
    </View>
  );
};
