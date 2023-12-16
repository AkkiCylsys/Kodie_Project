import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { _goBack } from "../../../services/CommonServices/CommonMethods";
import { ReviewjobdetailsStyle1 } from "./ReviewjobdetailsStyle1";
import { _COLORS } from "../../../Themes";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import RowTexts from "../../../components/Molecules/RowTexts/RowTexts";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Config } from "../../../Config";
import axios from "axios";
const Reviewjobdetails1 = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobDetailsData, setJobDetailsData] = useState([]);

  const imagesFiles = jobDetailsData.image_file_path;
  console.log("imagesFiles...", imagesFiles);

  // alert(props.job_id)
  useEffect(() => {
    getJobDetails();
  }, []);
  const getJobDetails = () => {
    const url = Config.BASE_URL;
    const jobDetails_url = url + "job/get";
    console.log("Request URL:", jobDetails_url);
    setIsLoading(true);
    const jobDetailsData = {
      // jm_job_id: 1,
      jm_job_id: props.job_id,
    };
    axios
      .post(jobDetails_url, jobDetailsData)
      .then((response) => {
        console.log("API Response JobDetails:", response.data);
        if (response.data.success === true) {
          setJobDetailsData(response.data.data);
          console.log(("jobDetailsData....", response.data.data));
          props?.imagesFilePath(response.data.data);
          // alert(JSON.stringify(response.data.data))
          // alert(response.data.message);
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // alert(JSON.stringify(jobDetailsData.first_name))
  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <View style={{ marginTop: 17 }}>
        <Text style={ReviewjobdetailsStyle1.textview}>
          I need someone to help me fix plugs in my house that keep short
          circuiting.
        </Text>
        <Text style={ReviewjobdetailsStyle1.textview1}>
          Job request summary
        </Text>
      </View>
      <RowTexts leftText={"Name"} rightText={jobDetailsData.first_name} />
      <RowTexts leftText={"Location"} rightText={jobDetailsData.job_location} />
      <RowTexts
        leftText={"Property type"}
        rightText={jobDetailsData.property_type}
      />
      <RowTexts
        leftText={"Proposed date"}
        rightText={jobDetailsData.job_date}
      />
      <RowTexts
        leftText={"Proposed time"}
        rightText={jobDetailsData.job_time}
      />
      <RowTexts
        leftText={"Number of hours"}
        rightText={jobDetailsData.number_of_hours}
      />
      <RowTexts leftText={"How often"} rightText={jobDetailsData.how_often} />
      <RowTexts
        leftText={"Budget range"}
        rightText={jobDetailsData.job_budget}
      />
      <RowTexts leftText={"Payment"} rightText={jobDetailsData.payment_by} />
      <RowTexts
        leftText={"Booking insurance"}
        rightText={jobDetailsData.insurance}
      />
      <View style={ReviewjobdetailsStyle1.nextBtn_view}>
        <CustomSingleButton
          _ButtonText={"Next"}
          Text_Color={_COLORS.Kodie_WhiteColor}
          disabled={isLoading ? true : false}
          onPress={() =>
            // props.navigation.navigate("CreateJobSecondScreen")
            // handleCreateJob()
            alert("done")
          }
        />
      </View>
      <TouchableOpacity style={ReviewjobdetailsStyle1.goBack_View}>
        <View style={ReviewjobdetailsStyle1.backIcon}>
          <Ionicons
            name="chevron-back"
            size={22}
            color={_COLORS.Kodie_MediumGrayColor}
          />
        </View>
        <Text style={ReviewjobdetailsStyle1.goBack_Text}>{"Go back"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Reviewjobdetails1;
