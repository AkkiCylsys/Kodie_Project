import React, { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import TopHeader from "../../../../components/Molecules/Header/Header";
import CustomTabNavigator from "../../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import { _goBack } from "../../../../services/CommonServices";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { _COLORS, LABEL_STYLES } from "../../../../Themes";
import { Dropdown } from "react-native-element-dropdown";
import { Divider } from "react-native-paper";
import SwitchToggle from "react-native-switch-toggle";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import { TomPropertyStyle } from "./SchedulemeetingStyle";
const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
const TomProperty = (props) => {
  const [Off, setOff] = useState(false);
  <SwitchToggle switchOff={Off} onPress={() => setOff(!Off)} />;
  const [activeTab, setActiveTab] = useState("Tab2");
  const [select, setSelect] = useState("");
  const [value, setValue] = useState(null);
  const [propertyDesc, setPropertyDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
    }
  };

  return (
    <View style={TomPropertyStyle.Mainview}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Tom’s property"}
      />
      <CustomTabNavigator
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        TAB2
        Tab1={"Messages"}
        Tab2={"Schedule a meeting"}
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
        styleTab1={activeTab === "Tab1" && TomPropertyStyle.activeTab}
        styleTab2={activeTab === "Tab2" && TomPropertyStyle.activeTab}
      />
      <View style={TomPropertyStyle.Line} />
      <View style={TomPropertyStyle.Container}>
        {checkTabs()}
        <View style={TomPropertyStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>Event name</Text>
          <TextInput
            style={TomPropertyStyle.input}
            placeholder="Event name"
            placeholderTextColor="#999"
          />
        </View>
        <View style={TomPropertyStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>Add participants</Text>
          <TextInput
            style={TomPropertyStyle.input}
            placeholder="Add  participants"
            placeholderTextColor="#999"
          />
        </View>
        <Divider style={TomPropertyStyle.dividersecond} />
        <View style={TomPropertyStyle.allday}>
          <View style={TomPropertyStyle.alldayview}>
            <MaterialCommunityIcons name="alarm-plus" size={30} />
            <Text style={TomPropertyStyle.alldaytext}>All Day</Text>
          </View>
          <SwitchToggle
            switchOff={Off}
            onPress={() => setOff(!Off)}
            circleColorOff={_COLORS.Kodie_BlackColor}
            circleColorOn={_COLORS.Kodie_GreenColor}
            backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
            backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
            containerStyle={TomPropertyStyle.toggle_con}
            circleStyle={TomPropertyStyle.toggle_circle}
          />
        </View>
        <View style={TomPropertyStyle.datetimeview}>
          <View style={TomPropertyStyle.dateview}>
            <Text style={TomPropertyStyle.datetext}>Thu, Aug 17 2023</Text>
            <Text style={TomPropertyStyle.timetext}>5:00 PM</Text>
          </View>
          <View style={TomPropertyStyle.dateview}>
            <Text style={TomPropertyStyle.datetext}>Thu, Aug 17 2023</Text>
            <Text style={TomPropertyStyle.timetext}>1:00 PM</Text>
          </View>
        </View>
        <View style={TomPropertyStyle.Line1} />
        <View style={TomPropertyStyle.mainreapeatview}>
          <Image
            source={require("../../../../assets/images/Common/Vector.png")}
          />
          <Text style={TomPropertyStyle.repeattext}>Repeat</Text>
          <View style={TomPropertyStyle.noticedropdownview}>
            <Dropdown
              style={[
                TomPropertyStyle.dropdown,
                TomPropertyStyle.dropdownNotice,
              ]}
              placeholderStyle={TomPropertyStyle.placeholderStyle}
              selectedTextStyle={TomPropertyStyle.selectedTextStyle}
              inputSearchStyle={TomPropertyStyle.inputSearchStyle}
              iconStyle={TomPropertyStyle.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Never"
              value={value}
              onChange={(item) => {
                setSelect(item.value);
              }}
            />
          </View>
        </View>
        <View style={TomPropertyStyle.Line2} />
        <View style={TomPropertyStyle.Describescpace}>
          <View style={TomPropertyStyle.inputContainer}>
            <Text style={LABEL_STYLES._texinputLabel}>description</Text>
            <TextInput
              style={TomPropertyStyle.input1}
              value={propertyDesc}
              onChangeText={setPropertyDesc}
              placeholder="Describe your property here..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View>
          <CustomSingleButton
            _ButtonText={"Schedule"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            disabled={isLoading ? true : false}
          />
        </View>
      </View>
    </View>
  );
};

export default TomProperty;
