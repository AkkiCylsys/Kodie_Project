// Screen no: 149
import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { Config } from "../../../Config";
import moment from "moment/moment";

export default ConfirmJobCompletion = (props) => {
  const [jobDetailsData, setJobDetailsData] = useState([]);

  useEffect(() => {
    getJobDetails();
  }, []);
  const getJobDetails = () => {
    const url = Config.BASE_URL;
    const jobDetails_url = url + "job/get";
    console.log("Request URL:", jobDetails_url);
    setIsLoading(true);
    const jobDetailsData = {
      jm_job_id: 72,
    };
    axios
      .post(jobDetails_url, jobDetailsData)
      .then((response) => {
        console.log("API Response JobDetails:", response.data);
        if (response.data.success === true) {
          setJobDetailsData(response.data.data);
          console.log("jobDetailsData....", response.data.data);
          console.log("job_type_my..", response.data.data.job_type_my);
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed JobDetails ", error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={ConfirmJobCompletionStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Confirm job completion"}
      />
      <ScrollView>
        <View style={ConfirmJobCompletionStyle.container}>
          <Text style={ConfirmJobCompletionStyle.heading_Text}>
            {jobDetailsData?.service_looking}
          </Text>
          <Text style={ConfirmJobCompletionStyle.Sub_heading_Text}>
            {`Posted  ${moment(jobDetailsData?.job_date).format(
              "MMM  DD, YYYY"
            )}`}
          </Text>
          <DividerIcon />
          <View>
            <Text style={ConfirmJobCompletionStyle.job_Details_txt}>
              {"Job detail"}
            </Text>
            <RowTexts leftText={"Name of job owner"} rightText={jobDetailsData?.first_name} />
            <RowTexts
              leftText={"Location"}
              rightText={jobDetailsData?.job_location}
            />
            <RowTexts leftText={"Proposed date"} rightText={moment(jobDetailsData?.job_date).format(
              "MMM  DD, YYYY"
            )} />
            <RowTexts
              leftText={"Proposed time"}
              rightText={`${jobDetailsData?.job_time} ${jobDetailsData?.number_of_hours}`}
            />
            <RowTexts leftText={"Number of hours"} rightText={jobDetailsData?.number_of_hours} />
            <RowTexts leftText={"How often"} rightText={jobDetailsData?.how_often} />
            <RowTexts leftText={"Budget range"} rightText={`${jobDetailsData?.job_max_budget}  ${jobDetailsData?.job_min_budget}`} />
            <RowTexts leftText={"Booking insurance"} rightText={jobDetailsData?.insurance} />
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
          disabled={isLoading ? true : false}
        />
      </View>
    </View>
  );
};
