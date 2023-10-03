import { View, Text, ScrollView } from "react-native";
import React, { useState, useRef } from "react";
import { GeneralReportStyle } from "./GenerateReportStyle";
import { _goBack } from "../../../services/CommonServices";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _COLORS, IMAGES } from "../../../Themes";
import { Dropdown } from "react-native-element-dropdown";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import CalendarModal from "../../../components/Molecules/CalenderModal/CalenderModal";
import RBSheet from "react-native-raw-bottom-sheet";
import GenerateReportCommon from "../../../components/Molecules/GenerateReportCommon/GenerateReportCommon";
const Apartment_data = [
  { label: "All", value: "1" },
  { label: "8502 Preston Rd. Inglewood", value: "2" },
  { label: "2118 Thornridge Cir. Syracuse", value: "3" },
  { label: "Townhouse", value: "4" },
  { label: "1729 Sickle St, QLD,  4010 ", value: "5" },
];

const GenerateReport = (props) => {
  const [value, setValue] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const refRBSheet = useRef();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  return (
    <View style={GeneralReportStyle.main}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Generate report"}
      />
      <ScrollView style={GeneralReportStyle.container}>
        <View style={GeneralReportStyle.dropdownview}>
          <Text style={GeneralReportStyle.headingtext}>Properties</Text>
          <Dropdown
            style={GeneralReportStyle.dropdown}
            placeholderStyle={[
              GeneralReportStyle.placeholderStyle,
              { color: _COLORS.Kodie_BlackColor },
            ]}
            selectedTextStyle={GeneralReportStyle.selectedTextStyle}
            inputSearchStyle={GeneralReportStyle.inputSearchStyle}
            iconStyle={GeneralReportStyle.iconStyle}
            data={Apartment_data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select  property"
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
        </View>

        <View style={GeneralReportStyle.mainboxview}>
          <View>
            <Text style={GeneralReportStyle.headtext}>Start date </Text>
            <View style={GeneralReportStyle.boxview}>
              <CalendarModal
                SelectDate={selectedDate ? selectedDate : "Start Date"}
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
            </View>
          </View>

          <View>
            <Text style={GeneralReportStyle.headtext}>End date</Text>
            <View style={GeneralReportStyle.boxview}>
              <CalendarModal
                SelectDate={selectedDate ? selectedDate : "End Date"}
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
            </View>
          </View>
        </View>

        <View
          style={[
            GeneralReportStyle.dropdownview,
            GeneralReportStyle.groupview,
          ]}
        >
          <Text style={GeneralReportStyle.headingtext}>Group by</Text>
          <Dropdown
            style={GeneralReportStyle.dropdown}
            placeholderStyle={[
              GeneralReportStyle.placeholderStyle,
              { color: _COLORS.Kodie_LightGrayColor },
            ]}
            selectedTextStyle={GeneralReportStyle.selectedTextStyle}
            inputSearchStyle={GeneralReportStyle.inputSearchStyle}
            iconStyle={GeneralReportStyle.iconStyle}
            data={Apartment_data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Property"
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
        </View>

        <View>
          <CustomSingleButton
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={"Generate report"}
            backgroundColor={_COLORS.Kodie_BlackColor}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={() => {
              refRBSheet.current.open();
            }}
          />
        </View>

        <RBSheet
          ref={refRBSheet}
          height={200}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: GeneralReportStyle.bottomModal_container,
          }}
        >
          <GenerateReportCommon
            Header="Generate report"
            imageSource={IMAGES.View_property}
            title="View report"
            secondimg={IMAGES.Save}
            secondDesc='Save report to files'
            thirdimg={IMAGES.Email}
            thirdDesc='Share report to email'
          />

        </RBSheet>
      </ScrollView>
    </View>
  );
};

export default GenerateReport;
