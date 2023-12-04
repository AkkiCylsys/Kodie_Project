// screen number 136,137,138

import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";
import { JobDetailsStyle } from "./JobDetailsStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { SliderBox } from "react-native-image-slider-box";
import { BANNERS, _COLORS, IMAGES } from "../../../../Themes";
import CustomTabNavigator from "../../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import { Dropdown } from "react-native-element-dropdown";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import RBSheet from "react-native-raw-bottom-sheet";
import UploadImageData from "../../../../components/Molecules/UploadImage/UploadImage";
import Entypo from "react-native-vector-icons/Entypo";

const images = [
  BANNERS.previewImage,
  BANNERS.Apartment,
  BANNERS.BannerSecond,
  BANNERS.BannerFirst,
];

const Apartment_data = [
  { label: "House", value: "1" },
  { label: "Cottage", value: "2" },
  { label: "Apartment / Flat", value: "3" },
  { label: "Townhouse", value: "4" },
  { label: "ApLand / vacant plot", value: "5" },
  { label: "Farm", value: "6" },
];
const JobDetails = (props) => {
  const [activeTab, setActiveTab] = useState("Tab3");
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [visible, setVisible] = useState(false);
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
      case "Tab2":
      case "Tab3":
      case "Tab4":
    }
  };
  const refRBSheet = useRef();
  const toggleView = () => {
    setVisible(!visible);
  };
  return (
    <View style={JobDetailsStyle.container}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Review job details"}
      />
      <ScrollView>
        <ImageBackground>
          <View style={JobDetailsStyle.slider_view}>
            <SliderBox
              images={images}
              sliderBoxHeight={200}
              onCurrentImagePressed={(index) =>
                console.warn(`image ${index} pressed`)
              }
              inactiveDotColor={_COLORS.Kodie_GrayColor}
              dotColor={_COLORS.Kodie_GreenColor}
              autoplay
              circleLoop
              resizeMethod={"resize"}
              resizeMode={"cover"}
              dotStyle={JobDetailsStyle.dotStyle}
              ImageComponentStyle={{
                flex: 1,
                resizeMode: "cover",
              }}
            />
          </View>
          <View style={JobDetailsStyle.bidsview}>
            <Text style={JobDetailsStyle.bidstext}>Accepting bids</Text>
          </View>
        </ImageBackground>

        <View style={JobDetailsStyle.headingview}>
          <Text style={JobDetailsStyle.fixingtext}>Fixing & Maintenance</Text>
          <Text style={JobDetailsStyle.electricaltext}>Electricals</Text>
        </View>

        <View>
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
            styleTab1={activeTab === "Tab1" && JobDetailsStyle.activeTab}
            styleTab2={activeTab === "Tab2" && JobDetailsStyle.activeTab}
            styleTab3={activeTab === "Tab3" && JobDetailsStyle.activeTab}
            styleTab4={activeTab === "Tab4" && JobDetailsStyle.activeTab}
          />
        </View>
        {checkTabs()}

        <View style={JobDetailsStyle.headingview}>
          <Text style={JobDetailsStyle.uploadtext}>Upload documents</Text>
          <Text style={JobDetailsStyle.filenametext}>
            Documents should be formatted .pdf or .jpg or .png Size per file
            should not exceed 5 MB
          </Text>
        </View>

        <View style={JobDetailsStyle.dropdownmainview}>
          <Text style={JobDetailsStyle.dropdownheading}>
            Select type of document
          </Text>
          <View>
            <Dropdown
              style={JobDetailsStyle.dropdown}
              placeholderStyle={[
                JobDetailsStyle.placeholderStyle,
                { color: _COLORS.Kodie_BlackColor },
              ]}
              selectedTextStyle={JobDetailsStyle.selectedTextStyle}
              inputSearchStyle={JobDetailsStyle.inputSearchStyle}
              iconStyle={JobDetailsStyle.iconStyle}
              data={Apartment_data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Job proposal"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>

          <View>
            <Dropdown
              style={JobDetailsStyle.dropdown}
              placeholderStyle={[
                JobDetailsStyle.placeholderStyle,
                { color: _COLORS.Kodie_BlackColor },
              ]}
              selectedTextStyle={JobDetailsStyle.selectedTextStyle}
              inputSearchStyle={JobDetailsStyle.inputSearchStyle}
              iconStyle={JobDetailsStyle.iconStyle}
              data={Apartment_data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Invoice & proof of payment"
              value={value2}
              onChange={(item) => {
                setValue2(item.value);
              }}
            />
          </View>

          {visible && (
            <View>
              <TouchableOpacity
                style={JobDetailsStyle.textContainer}
                onPress={() => {
                  refRBSheet.current.open();
                }}
              >
                <View style={JobDetailsStyle.bindfile}>
                  {/* <MaterialCommunityIcons name="file" size={35} /> */}
                  <Image source={IMAGES.document} />
                  <View>
                    <Text style={JobDetailsStyle.pdfName}>
                      {"Company document.pdf"}
                    </Text>
                    <Text style={JobDetailsStyle.pdfSize}>{"4.8 MB"}</Text>
                  </View>
                </View>
                <Entypo
                  name="dots-three-vertical"
                  size={20}
                  style={JobDetailsStyle.doticon}
                />
              </TouchableOpacity>

              <View style={JobDetailsStyle.textContainer}>
                <View style={JobDetailsStyle.bindfile}>
                  <Image source={IMAGES.document} />
                  <View>
                    <Text style={JobDetailsStyle.pdfName}>
                      {"Company document.pdf"}
                    </Text>
                    <Text style={JobDetailsStyle.pdfSize}>{"4.8 MB"}</Text>
                  </View>
                </View>
                <Entypo
                  name="dots-three-vertical"
                  size={20}
                  style={JobDetailsStyle.doticon}
                />
              </View>
            </View>
          )}

          <View>
            <Dropdown
              style={JobDetailsStyle.dropdown}
              placeholderStyle={[
                JobDetailsStyle.placeholderStyle,
                { color: _COLORS.Kodie_BlackColor },
              ]}
              selectedTextStyle={JobDetailsStyle.selectedTextStyle}
              inputSearchStyle={JobDetailsStyle.inputSearchStyle}
              iconStyle={JobDetailsStyle.iconStyle}
              data={Apartment_data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Proof of work completed"
              value={value3}
              onChange={(item) => {
                setValue3(item.value);
              }}
            />
          </View>

          <View style={JobDetailsStyle.buttonview}>
            <CustomSingleButton
              leftImage={IMAGES.uploadIcon}
              isLeftImage={true}
              borderColor={_COLORS.Kodie_TransparentColor}
              _ButtonText={"Upload"}
              backgroundColor={_COLORS.Kodie_lightGreenColor}
              onPress={() => {
                refRBSheet.current.open();
              }}
            />
          </View>
        </View>

        <RBSheet
          ref={refRBSheet}
          height={200}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: JobDetailsStyle.bottomModal_container,
          }}
        >
          <UploadImageData
            heading_Text={"Upload  documents"}
            onPress={toggleView}
          />
        </RBSheet>
      </ScrollView>
    </View>
  );
};

export default JobDetails;
