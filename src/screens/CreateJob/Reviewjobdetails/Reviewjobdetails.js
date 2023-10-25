import { View, Text, IMAGES, Image } from "react-native";
import React, { useState } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { ReviewjobdetailsStyle } from "../ReviewJobdetails/ReviewjobdetailsStyle";
import { _goBack } from "../../../services/CommonServices/CommonMethods";
import { _COLORS } from "../../../Themes";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { Dropdown } from "react-native-element-dropdown";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import CustomTabNavigator from "../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";

const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
const Reviewjobdetails = (props) => {
  const [activeTab, setActiveTab] = useState("Tab2");
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab2":
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
        <Image
          source={require("../../../assets/images/Banners/preview.png")}
          style={ReviewjobdetailsStyle.img}
        />
        <View style={ReviewjobdetailsStyle.Container}>
          <Text style={ReviewjobdetailsStyle.TextFixing}>
            Fixing & Maintenance
          </Text>
          <Text style={ReviewjobdetailsStyle.ElectricalsText}>Electricals</Text>
          <CustomTabNavigator
            activeTab={activeTab}
            setActiveTab={setActiveTab}
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
            styleTab1={activeTab === "Tab1" && ReviewjobdetailsStyle.activeTab}
            styleTab2={activeTab === "Tab2" && ReviewjobdetailsStyle.activeTab}
            styleTab3={activeTab === "Tab3" && ReviewjobdetailsStyle.activeTab}
            styleTab4={activeTab === "Tab4" && ReviewjobdetailsStyle.activeTab}
          />
          <DividerIcon style={ReviewjobdetailsStyle.divider} />
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
          <View>
            <View>
              <View>
                <Text style={ReviewjobdetailsStyle.file}>Invoice #13046.pdf</Text></View>
                <Text style={ReviewjobdetailsStyle.file}>4,8 MB</Text>
            </View>
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
            placeholder="Proof of work completed"
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
          <CustomSingleButton
            //   leftImage={IMAGES.uploadIcon}
            isLeftImage={false}
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={"Upload"}
            backgroundColor={_COLORS.Kodie_lightGreenColor}
          />
        </View>
      </View>
    </>
  );
};

export default Reviewjobdetails;
