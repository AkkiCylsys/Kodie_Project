import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import {_goBack } from '../../../services/CommonServices/CommonMethods';
import { _COLORS,IMAGES } from "../../../Themes";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { Dropdown } from "react-native-element-dropdown";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import CustomTabNavigator from "../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import ReviewjobdetailsStyle3 from '../ReviewJobDetails/ReviewjobdetailsStyle3';

const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
const Reviewjobdetails3 = (props) => {
  const [activeTab, setActiveTab] = useState("Tab4");
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab2":
    }
  };
  const [value, setValue] = useState(null);
  return (
    <>
      <View style={ReviewjobdetailsStyle3.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Review job details"}
        />
        <ScrollView>
          <Image
            source={require("../../../assets/images/Banners/preview.png")}
            style={ReviewjobdetailsStyle3.img}
          />
          <View style={ReviewjobdetailsStyle3.Container}>
            <Text style={ReviewjobdetailsStyle3.TextFixing}>
              Fixing & Maintenance
            </Text>
            <Text style={ReviewjobdetailsStyle3.ElectricalsText}>
              Electricals
            </Text>
            <CustomTabNavigator
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              TAB3
              TAB4
              Tab1={"Details"}
              Tab2={"Bids"}
              Tab3={"Milestones"}
              Tab4={"Documents"}
              onPressTab1={() => setActiveTab("Tab1")}
              onPressTab2={() => setActiveTab("Tab2")}
              onPressTab3={() => setActiveTab("Tab3")}
              onPressTab4={() => setActiveTab("Tab4")}
              colorTab1={
                activeTab === "Tab1"
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              colorTab2={
                activeTab === "Tab2"
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              colorTab3={
                activeTab === "Tab3"
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              colorTab4={
                activeTab === "Tab4"
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              styleTab1={
                activeTab === "Tab1" && ReviewjobdetailsStyle3.activeTab
              }
              styleTab2={
                activeTab === "Tab2" && ReviewjobdetailsStyle3.activeTab
              }
              styleTab3={
                activeTab === "Tab3" && ReviewjobdetailsStyle3.activeTab
              }
              styleTab4={
                activeTab === "Tab4" && ReviewjobdetailsStyle3.activeTab
              }
            />
            <DividerIcon style={ReviewjobdetailsStyle3.divider} />
            <View>
              <Text style={ReviewjobdetailsStyle3.TextUpload}>
                Upload documents
              </Text>
              <Text style={ReviewjobdetailsStyle3.text3}>
                Documents should be formatted .pdf or .jpg or .png Size per file
                should not exceed 5 MB
              </Text>
              <Text style={ReviewjobdetailsStyle3.selecttext}>
                Select type of document
              </Text>
            </View>
            <Dropdown
              style={ReviewjobdetailsStyle3.dropdown}
              placeholderStyle={ReviewjobdetailsStyle3.placeholderStyle}
              selectedTextStyle={ReviewjobdetailsStyle3.selectedTextStyle}
              inputSearchStyle={ReviewjobdetailsStyle3.inputSearchStyle}
              iconStyle={ReviewjobdetailsStyle3.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Job proposal"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
            <Dropdown
              style={ReviewjobdetailsStyle3.dropdown}
              placeholderStyle={ReviewjobdetailsStyle3.placeholderStyle}
              selectedTextStyle={ReviewjobdetailsStyle3.selectedTextStyle}
              inputSearchStyle={ReviewjobdetailsStyle3.inputSearchStyle}
              iconStyle={ReviewjobdetailsStyle3.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Invoice & proof of payment"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
            <Dropdown
              style={ReviewjobdetailsStyle3.dropdown}
              placeholderStyle={ReviewjobdetailsStyle3.placeholderStyle}
              selectedTextStyle={ReviewjobdetailsStyle3.selectedTextStyle}
              inputSearchStyle={ReviewjobdetailsStyle3.inputSearchStyle}
              iconStyle={ReviewjobdetailsStyle3.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Proof of work completed"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
            <CustomSingleButton
              leftImage={IMAGES.uploadIcon}
              isLeftImage={true}
              borderColor={_COLORS.Kodie_TransparentColor}
              _ButtonText={"Upload"}
              backgroundColor={_COLORS.Kodie_lightGreenColor}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Reviewjobdetails3;
