//ScreenNo:88
//ScreenNo:89
//ScreenNo:90
//ScreenNo:92
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import TopHeader from "../../../components/Molecules/Header/Header";
import { Dropdown } from "react-native-element-dropdown";
import { CreateNewInspectionStyle } from "./CreateNewInspectionCss";
import CalendarModal from "../../../components/Molecules/CalenderModal/CalenderModal";
import TimePicker from "../../../components/Molecules/ClockPicker/TimePicker";
import { LABEL_STYLES, _COLORS, IMAGES } from "../../../Themes";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _goBack } from "../../../services/CommonServices";
import CustomDropdown from "../../../components/Molecules/CustomDropdown/CustomDropdown";

const inspection_type = [
  "All",
  "Cleaning inspection",
  "Bond inspection",
  "Ad-hoc inspection",
];

const select_property = [
  "All",
  "2118 Thornridge Cir. Syracuse",
  "8502 Preston Rd. Inglewood",
  "1729 Sickle St, QLD",
  "5 Aspen Villas"
];
const Detail = [
  {
    id: "1",
    name: "Bathroom",
  },
  {
    id: "2",
    name: "Garden",
  },
  {
    id: "3",
    name: "Bedroom",
  },
  {
    id: "4",
    name: "Kitchen",
  },
  {
    id: "5",
    name: "Dining Room",
  },
  {
    id: "6",
    name: "Living Room",
  },
  {
    id: "7",
    name: "Exterior",
  },
  {
    id: "8",
    name: "Roof ",
  },
  {
    id: "9",
    name: "Garage",
  },
];

const CreateNewInspection = (props) => {
  const [inspectionType, setInspectionType] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [location, setLocation] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [AddInspection, setAddInspection] = useState("");
  const [Notes, setNotes] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  // ----data come from dropdown and define these condition
  const handleApply = (selectedOptions) => {
    console.log("Clear Action");
  };
  const handleClear = () => {
    console.log("Clear Action");
  };

  const Detail_rander = ({ item, index }) => {
    return (
      <>
        <View style={CreateNewInspectionStyle.DetailsView}>
          <MaterialIcons
            name={"check-box-outline-blank"}
            size={25}
            color={_COLORS.Kodie_MediumGrayColor}
          />
          <Text style={CreateNewInspectionStyle.details_text}>{item.name}</Text>
        </View>
      </>
    );
  };
  return (
    <View style={CreateNewInspectionStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Create New Inspections"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={CreateNewInspectionStyle.Container}
      >
        <Text style={CreateNewInspectionStyle.HeadingText}>
          {"Tell us about your inspection"}
        </Text>
        <Text style={LABEL_STYLES.commontext}>
          {"What type if inspection is this?"}
        </Text>

        <View>
          <CustomDropdown
            data={inspection_type}
            placeholdertext="Select inspection type"
            onApply={handleApply}
            onClear={handleClear}
            btnview={true}
          />
        </View>
        <Text style={LABEL_STYLES.commontext}>
          {"Schedule time and date of inspection"}
        </Text>
        <View style={CreateNewInspectionStyle.datePickerView}>
          <CalendarModal
            SelectDate={selectedDate ? selectedDate : "Select Date"}
            _textInputStyle={{
              color: selectedDate
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_GrayColor,
            }}
            calenderIcon={toggleModal}
            onDayPress={handleDayPress}
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
            _ApplyButton={toggleModal}
          />

          <View style={CreateNewInspectionStyle.spaceView} />
          <View style={[CreateNewInspectionStyle.calenderView]}>
            <Text style={CreateNewInspectionStyle.textInputStyle}>
              {currentTime && currentTime != ""
                ? String(currentTime)
                : "Select time"}
            </Text>

            <TimePicker
              data={new Date()}
              getData={(date) => {
                setCurrentTime(moment(date).format("hh:mm "));
              }}
            />
          </View>
        </View>
        <Text style={LABEL_STYLES.commontext}>
          {"Where is the inspection taking place?"}
        </Text>

        <View>
          <CustomDropdown
            data={select_property}
            placeholdertext="Select property"
            onApply={handleApply}
            onClear={handleClear}
            btnview={true}
          />
        </View>
        <View style={CreateNewInspectionStyle.locationContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Location");
            }}
          >
            <Octicons
              name={"location"}
              size={20}
              color={_COLORS.Kodie_MediumGrayColor}
              style={CreateNewInspectionStyle.locationIcon}
            />
          </TouchableOpacity>
          <TextInput
            style={CreateNewInspectionStyle.locationInput}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter new location"
            placeholderTextColor={_COLORS.Kodie_LightGrayColor}
          />
        </View>
        <Text style={LABEL_STYLES.commontext}>{"Add attendees"}</Text>
        <TouchableOpacity>
          <View style={CreateNewInspectionStyle.TextInputView}>
            <TextInput
              value={AddInspection}
              placeholder={"Add people attending the inspection"}
              style={CreateNewInspectionStyle.input}
              onChange={(text) => setAddInspection(text)}
              palceholderColor={_COLORS.Kodie_MediumGrayColor}
            />
            <Image
              source={IMAGES.Adduser}
              style={CreateNewInspectionStyle.userStyle}
              resizeMode={"center"}
            />
          </View>
        </TouchableOpacity>
        <Text style={LABEL_STYLES.commontext}>
          {"Is the place furnished or unfurnished?"}
        </Text>
        <View style={CreateNewInspectionStyle.margin}>
          <RowButtons
            LeftButtonText={"Furnished"}
            leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            RightButtonText={"Unfurnished"}
            RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
          />
        </View>
        <Text style={LABEL_STYLES.commontext}>
          {"Select the areas you would like to include:"}
        </Text>
        <FlatList
          data={Detail}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          numColumns={2}
          keyExtractor={(item) => item?.id}
          renderItem={Detail_rander}
        />
        <Text style={LABEL_STYLES.commontext}>{"Notes:"}</Text>
        <TextInput
          style={CreateNewInspectionStyle.NotesInput}
          value={Notes}
          onChangeText={(text) => setNotes(text)}
          placeholder="Enter any notes about this item"
          placeholderTextColor="#999"
          multiline
          numberOfLines={5}
          textAlignVertical={"top"}
        />
        <CustomSingleButton
          _ButtonText={"Schedule inspection"}
          Text_Color={_COLORS.Kodie_WhiteColor}
          backgroundColor={_COLORS.Kodie_BlackColor}
        />
      </ScrollView>
    </View>
  );
};
export default CreateNewInspection;
