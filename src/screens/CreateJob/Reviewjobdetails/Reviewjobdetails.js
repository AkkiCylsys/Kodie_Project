import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { ReviewjobdetailsStyle } from "../Reviewjobdetails/ReviewjobdetailsStyle";
import { _goBack } from "../../../services/CommonServices/CommonMethods";
import { _COLORS, IMAGES, BANNERS } from "../../../Themes";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { Dropdown } from "react-native-element-dropdown";
import Entypo from "react-native-vector-icons/Entypo";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import CustomTabNavigator from "../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";

const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
const Reviewjobdetails = (props) => {
  const [activeTab, setActiveTab] = useState("Tab3");
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":

      case "Tab2":

      case "Tab3":

      case "Tab4":
    }
  };

  const [value, setValue] = useState(null);
  return (
    <>
      <View style={ReviewjobdetailsStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Review job details"}
        />
        <ScrollView>
          <Image
            source={BANNERS.previewImage}
            style={ReviewjobdetailsStyle.img}
          />
          <View style={ReviewjobdetailsStyle.Container}>
            <Text style={ReviewjobdetailsStyle.TextFixing}>
              Fixing & Maintenance
            </Text>
            <Text style={ReviewjobdetailsStyle.ElectricalsText}>
              Electricals
            </Text>
            <CustomTabNavigator
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              TAB4
              TAB3
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
                activeTab === "Tab1" && ReviewjobdetailsStyle.activeTab
              }
              styleTab2={
                activeTab === "Tab2" && ReviewjobdetailsStyle.activeTab
              }
              styleTab3={
                activeTab === "Tab3" && ReviewjobdetailsStyle.activeTab
              }
              styleTab4={
                activeTab === "Tab4" && ReviewjobdetailsStyle.activeTab
              }
            />
            <DividerIcon style={ReviewjobdetailsStyle.divider} />
            {checkTabs()}
            <View>
              <Text style={ReviewjobdetailsStyle.TextUpload}>
                Upload documents
              </Text>
              <Text style={ReviewjobdetailsStyle.text3}>
                Documents should be formatted .pdf or .jpg or .png Size per file
                should not exceed 5 MB
              </Text>
            </View>
            <Dropdown
              style={ReviewjobdetailsStyle.dropdown}
              placeholderStyle={ReviewjobdetailsStyle.placeholderStyle}
              selectedTextStyle={ReviewjobdetailsStyle.selectedTextStyle}
              inputSearchStyle={ReviewjobdetailsStyle.inputSearchStyle}
              iconStyle={ReviewjobdetailsStyle.iconStyle}
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
              style={ReviewjobdetailsStyle.dropdown}
              placeholderStyle={ReviewjobdetailsStyle.placeholderStyle}
              selectedTextStyle={ReviewjobdetailsStyle.selectedTextStyle}
              inputSearchStyle={ReviewjobdetailsStyle.inputSearchStyle}
              iconStyle={ReviewjobdetailsStyle.iconStyle}
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
            {/* <View style={ReviewjobdetailsStyle.Pdfinput}> */}
            <View style={ReviewjobdetailsStyle.pdfmainview}>

              <View style={ReviewjobdetailsStyle.bindfile}>
                <Image source={IMAGES.document} />
                <View>
                  <Text style={ReviewjobdetailsStyle.pdfName}>
                    {"Invoice #13046.pdf"}
                  </Text>
                  <Text style={ReviewjobdetailsStyle.pdfSize}>{"4.8 MB"}</Text>
                </View>
              </View>

              <View style={ReviewjobdetailsStyle.bindfile}>
                <Image source={IMAGES.document} />
                <View>
                  <Text style={ReviewjobdetailsStyle.pdfName}>
                    {"Proof of payment.pdf"}
                  </Text>
                  <Text style={ReviewjobdetailsStyle.pdfSize}>{"1,3 MB"}</Text>
                </View>
              </View>
            </View>

            <Dropdown
              style={ReviewjobdetailsStyle.dropdown3}
              placeholderStyle={ReviewjobdetailsStyle.placeholderStyle}
              selectedTextStyle={ReviewjobdetailsStyle.selectedTextStyle}
              inputSearchStyle={ReviewjobdetailsStyle.inputSearchStyle}
              iconStyle={ReviewjobdetailsStyle.iconStyle}
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

export default Reviewjobdetails;
