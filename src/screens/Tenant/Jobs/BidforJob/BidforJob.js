import { View, Text, TextInput, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { _COLORS, LABEL_STYLES, FONTFAMILY, IMAGES } from "../../../../Themes";
import { _goBack } from "../../../../services/CommonServices";
import TopHeader from "../../../../components/Molecules/Header/Header";
import RowTexts from "../../../../components/Molecules/RowTexts/RowTexts";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import { BidforJobStyle } from "./BidforJobStyle";
import moment from "moment";
import TimePicker from "../../../../components/Molecules/ClockPicker/TimePicker";
import CalendarModal from "../../../../components/Molecules/CalenderModal/CalenderModal";
import { Divider } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import axios from "axios";
import { Config } from "../../../../Config";
import { useSelector } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
const BidforJob = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState("");
  const [bidSubmited, setBidSubmited] = useState([]);
  const [serviceTime, setServiceTime] = useState("");
  const [CoverLater, setCoverLater] = useState("");
  const [selectedDateError, setSelectedDateError] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const SearchJobId = props.route.params.SearchJobId;
  const BidJobId = props.route.params.BidJobId;
  const [isLoading, setIsLoading] = useState(false);
  const [jobDetailsData, setJobDetailsData] = useState([]);
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);
  const refRBSheet = useRef();
  console.log(SearchJobId, BidJobId);
  const handleRequestDate = (text) => {
    setSelectedDate(text);
    if (text.trim() === "") {
      setSelectedDateError("Request date is required.");
    } else {
      setSelectedDateError("");
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setSelectedDate("");
  };
  const apply_toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getJobDetails();
  }, []);

  const getJobDetails = () => {
    const url = Config.BASE_URL;
    const jobDetails_url = url + "job/get";
    console.log("Request URL:", jobDetails_url);
    setIsLoading(true);
    const jobDetailsData = {
      jm_job_id: SearchJobId || BidJobId,
    };
    axios
      .post(jobDetails_url, jobDetailsData)
      .then((response) => {
        console.log("API Response JobDetails:", response.data);
        if (response.data.success === true) {
          setJobDetailsData(response.data.data);
          console.log("jobDetailsData....", response.data.data);
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
  const BidSubmitDetails = () => {
    const url = Config.BASE_URL;
    const BidSubmit_url = url + "job/insertBidRequestData";
    console.log("Request URL:", BidSubmit_url);
    setIsLoading(true);
    const BidSubmitData = {
      job_id: SearchJobId || BidJobId,
      uad_key: loginData?.Login_details?.user_account_id,
      preferred_date: selectedDate,
      preferred_time: currentTime,
      amount: `$ ${amount}`,
      service_time: serviceTime,
      cover_later: CoverLater,
    };
    console.log(BidSubmitData);
    axios
      .post(BidSubmit_url, BidSubmitData)
      .then((response) => {
        console.log("API Response JobDetails:", response.data);
        setBidSubmited(response.data);
        if (response.data.success === true) {
          refRBSheet.current.open();
          setSelectedDate("");
          setCurrentTime("");
          setAmount("");
          setServiceTime("");
          setCoverLater("");
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
  return (
    <View style={BidforJobStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Submit bid for job"}
      />
      <ScrollView>
        <View style={BidforJobStyle.SubContainer}>
          <View>
            <Text style={BidforJobStyle.Subtext1}>
              {jobDetailsData.service_looking}
            </Text>
            <Text style={BidforJobStyle.Subtext2}>{`Posted ${moment(
              jobDetailsData.job_date
            ).format("MMM DD, YYYY")}`}</Text>
            <Text style={BidforJobStyle.Subtext3}>
              Max budget:{" "}
              <Text style={{ color: "black" }}>
                {jobDetailsData.job_max_budget}
              </Text>
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Divider />
          </View>
          <View>
            <View style={BidforJobStyle.Destext}>
              <Text
                style={{
                  fontSize: 16,
                  color: _COLORS.Kodie_BlackColor,
                  fontFamily: FONTFAMILY.K_Bold,
                }}
              >
                {"Description"}
              </Text>
            </View>
            <View style={BidforJobStyle.Destext1}>
              <Text
                style={{
                  fontSize: 14,
                  color: _COLORS.Kodie_BlackColor,
                  fontFamily: FONTFAMILY.K_Medium,
                }}
              >
                {jobDetailsData.job_description}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                marginTop: 15,
                color: _COLORS.Kodie_BlackColor,
                fontFamily: FONTFAMILY.K_Bold,
              }}
            >
              {"Job summary"}
            </Text>
            <View style={{ marginBottom: 50 }}>
              <RowTexts
                leftText={"Name"}
                rightText={`${jobDetailsData.first_name} ${jobDetailsData.last_name}`}
              />
              <RowTexts
                leftText={"Location"}
                rightText={jobDetailsData.job_location}
              />
              <RowTexts
                leftText={"Property type"}
                rightText={jobDetailsData.property_type}
              />
              <RowTexts
                leftText={"Proposed date"}
                rightText={moment(jobDetailsData.job_date).format(
                  "MMM DD, YYYY"
                )}
              />
              <RowTexts
                leftText={"Proposed time"}
                rightText={jobDetailsData.job_time}
              />
              <RowTexts
                leftText={"Number of hours"}
                rightText={jobDetailsData.number_of_hours}
              />
              <RowTexts
                leftText={"How often"}
                rightText={jobDetailsData.how_often}
              />
              <RowTexts
                leftText={"Budget range"}
                rightText={`${jobDetailsData.job_min_budget} - ${jobDetailsData.job_max_budget}`}
              />
            </View>
          </View>
          <View>
            <Text style={BidforJobStyle.Jobtext}>Your job bid</Text>
            <Text style={{ fontSize: 14, marginTop: 10 }}>
              What date and time would you prefer?
            </Text>
            <View style={BidforJobStyle.datePickerView}>
              <CalendarModal
                SelectDate={selectedDate ? selectedDate : "Select Date"}
                _textInputStyle={{
                  color: selectedDate
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_GrayColor,
                }}
                calenderIcon={toggleModal}
                // onDayPress={handleDayPress}
                onDayPress={(day) => handleRequestDate(day.dateString)}
                onChangeText={() => handleRequestDate(selectedDate)}
                Visible={isModalVisible}
                onRequestClose={toggleModal}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: _COLORS.Kodie_lightGreenColor,
                    selectedTextColor: _COLORS.Kodie_BlackColor,
                  },
                }}
                _closeButton={toggleModal}
                _ApplyButton={apply_toggleModal}
              />

              <View style={BidforJobStyle.spaceView} />
              <View style={[BidforJobStyle.calenderView]}>
                <Text
                  style={[
                    BidforJobStyle.textInputStyle,
                    {
                      color: currentTime
                        ? _COLORS.Kodie_BlackColor
                        : _COLORS.Kodie_GrayColor,
                    },
                  ]}
                >
                  {currentTime && currentTime != ""
                    ? String(currentTime)
                    : "Select time"}
                </Text>

                <TimePicker
                  data={new Date()}
                  getData={(date) => {
                    setCurrentTime(moment(date).format("hh:mm A"));
                  }}
                />
              </View>
            </View>
          </View>
          {selectedDateError ? (
            <Text style={BidforJobStyle.error_text}>{selectedDateError}</Text>
          ) : null}
          <View style={BidforJobStyle.jobDetailsView}>
            <Text style={LABEL_STYLES.commontext}>{"Amount"}</Text>
            <TextInput
              value={`${amount}`}
              onChangeText={(text) => setAmount(text)}
              style={[BidforJobStyle.input, BidforJobStyle.jobD_]}
              placeholder="200"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            />
          </View>
          <View style={BidforJobStyle.jobDetailsView}>
            <Text style={LABEL_STYLES.commontext}>{"Service time"}</Text>
            <TextInput
              value={serviceTime}
              onChangeText={setServiceTime}
              style={[BidforJobStyle.input, BidforJobStyle.jobD_]}
              placeholder="Number of hours to complete job"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            />
          </View>
          <View style={BidforJobStyle.jobDetailsView}>
            <Text style={LABEL_STYLES.commontext}>{"Cover letter"}</Text>
            <TextInput
              style={[BidforJobStyle.input1, BidforJobStyle.jobD1_]}
              value={CoverLater}
              onChangeText={setCoverLater}
              maxLength={150}
              multiline={true}
              placeholder="Enter why you're a good fit for this job"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            />
          </View>
        </View>
      </ScrollView>
      <DividerIcon />
      <View style={{ marginHorizontal: 20, marginBottom: 30 }}>
        <RowButtons
          LeftButtonText={"Save defalt"}
          leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
          LeftButtonTextColor={_COLORS.Kodie_BlackColor}
          LeftButtonborderColor={_COLORS.Kodie_BlackColor}
          RightButtonText={"Submit"}
          RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
          RightButtonTextColor={_COLORS.Kodie_WhiteColor}
          RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
          onPressRightButton={() => {
            BidSubmitDetails();
            setSelectedDate("");
            setCurrentTime("");
            setAmount("");
            setServiceTime("");
            setCoverLater("");
          }}
        />
      </View>
      <RBSheet
        ref={refRBSheet}
        height={500}
        // closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: BidforJobStyle.bottomModal_container,
        }}
      >
        <View style={BidforJobStyle.modalContainer}>
          <Text style={BidforJobStyle.modalMainText}>Bid submitted</Text>
          <Text style={BidforJobStyle.modalSubText}>
            {bidSubmited?.message}
          </Text>
          <Image
            source={IMAGES.CheckIcon}
            resizeMode={"center"}
            style={BidforJobStyle.checkStl}
          />
          <CustomSingleButton
            _ButtonText={"Continue"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            height={48}
            onPress={() => {
              refRBSheet.current.close();
              _goBack(props);
            }}
          />
          <CustomSingleButton
            disabled={isLoading ? true : false}
            _ButtonText={"Return"}
            Text_Color={_COLORS.Kodie_BlackColor}
            height={48}
            borderColor={_COLORS.Kodie_WhiteColor}
            backgroundColor={_COLORS.Kodie_WhiteColor}
          />
        </View>
      </RBSheet>

      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default BidforJob;
