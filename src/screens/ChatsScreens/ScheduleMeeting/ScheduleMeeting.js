import { View, Text, ScrollView, TextInput, Image } from "react-native";
import React, { useState } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import PropertyList from "../../Landlord/PropertyList/MyProperty/PropertyList";
import { ScheduleMeetingStyle } from "./ScheduleMeetingStyle";
import PropertyList2 from "../../Landlord/PropertyList/SearchForRentals/PropertyList2";
import CustomTabNavigator from "../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import { _COLORS, IMAGES } from "../../../Themes";
import { Divider } from "react-native-paper";
import ToggleSwitch from "toggle-switch-react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Dropdown } from "react-native-element-dropdown";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
const ScheduleMeeting = (props) => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState("");
  const [select, setSelect] = useState("");
  const [value, setValue] = useState(null);
  const [ScheduleDesc, setScheduleDesc] = useState("");
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
        return (
          <PropertyList
            propertyDetail={() => props.navigation.navigate("Messages")}
          />
        );
      case "Tab2":
        return (
          <PropertyList2
            SearchButton={() => props.navigation.navigate("Schedule a meeting")}
          />
        );

      default:
        return <PropertyList />;
    }
  };
  return (
    <View style={ScheduleMeetingStyle.mainview}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Tom’s property"}
      />
      <CustomTabNavigator
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        Tab1={"Messages"}
        Tab2={"Schedule a meeting"}
        onPressTab1={() => setActiveTab("Tab1")}
        onPressTab2={() => setActiveTab("Tab2")}
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
        styleTab1={activeTab === "Tab1" && ScheduleMeetingStyle.activeTab}
        styleTab2={activeTab === "Tab2" && ScheduleMeetingStyle.activeTab}
      />
      <ScrollView>
        <View style={ScheduleMeetingStyle.container}>
          <View style={ScheduleMeetingStyle.inputContainer}>
            <Text style={ScheduleMeetingStyle._texinputLabel}>
            Event name
            </Text>
            <TextInput
              style={ScheduleMeetingStyle.input}
              value={name}
              onChangeText={setName}
              placeholder="Event name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={ScheduleMeetingStyle.inputContainer}>
            <Text style={ScheduleMeetingStyle._texinputLabel}>
              Add participants
            </Text>
            <TextInput
              style={ScheduleMeetingStyle.input}
              value={participants}
              onChangeText={setParticipants}
              placeholder="Add  participants"
              placeholderTextColor="#999"
            />
          </View>

          <Divider style={ScheduleMeetingStyle.divider} />

          <View style={ScheduleMeetingStyle.alldayviewmain}>
            <View style={ScheduleMeetingStyle.alldayview}>
              <MaterialCommunityIcons name="alarm-plus" size={30} />
              <Text style={ScheduleMeetingStyle.alldaytext}>All Day</Text>
            </View>
            <ToggleSwitch
              isOn={false}
              onColor="#D8D8D8"
              offColor="#D8D8D8"
              size="small"
              thumbOnStyle={{ backgroundColor: _COLORS.Kodie_GreenColor }}
              thumbOffStyle={{ backgroundColor: _COLORS.Kodie_BlackColor }}
              onToggle={(isOn) => console.log("changed to : ", isOn)}
            />
          </View>

          <View style={ScheduleMeetingStyle.datetimeview}>
            <View style={ScheduleMeetingStyle.dateview}>
              <Text style={ScheduleMeetingStyle.datetext}>
                Thu, Aug 17 2023
              </Text>
              <Text style={ScheduleMeetingStyle.timetext}>5:00 PM</Text>
            </View>

            <View style={ScheduleMeetingStyle.dateview}>
              <Text style={ScheduleMeetingStyle.datetext}>
                Thu, Aug 17 2023
              </Text>
              <Text style={ScheduleMeetingStyle.timetext}>1:00 PM</Text>
            </View>
          </View>
          <Divider
            style={[
              ScheduleMeetingStyle.divider,
              ScheduleMeetingStyle.seconddivider,
            ]}
          />
          {/* repeat never section */}
          <View style={ScheduleMeetingStyle.mainreapeatview}>
            <View style={ScheduleMeetingStyle.bindimagetextview}>
            <Image source={IMAGES.RightLeftarrow} />
              <Text style={ScheduleMeetingStyle.repeattext}>Repeat</Text>
            </View>
            <View style={ScheduleMeetingStyle.noticedropdownview}>
              <Dropdown
                style={[
                  ScheduleMeetingStyle.dropdown,
                  ScheduleMeetingStyle.dropdownNotice,
                ]}
                placeholderStyle={ScheduleMeetingStyle.placeholderStyle}
                selectedTextStyle={ScheduleMeetingStyle.selectedTextStyle}
                inputSearchStyle={ScheduleMeetingStyle.inputSearchStyle}
                iconStyle={ScheduleMeetingStyle.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select"
                value={value}
                onChange={(item) => {
                  setSelect(item.value);
                }}
              />
            </View>
          </View>
          <Divider
            style={[
              ScheduleMeetingStyle.divider,
              ScheduleMeetingStyle.thirddivider,
            ]}
          />

          <View style={ScheduleMeetingStyle.inputContainer}>
            <Text style={ScheduleMeetingStyle.propertydesctext}>Notes</Text>
            <TextInput
              style={ScheduleMeetingStyle.inputdesc}
              value={ScheduleDesc}
              onChangeText={setScheduleDesc}
              placeholder="Add additional notes..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View>

          <View>
            <CustomSingleButton
              _ButtonText={"Schedule"}
              backgroundColor={_COLORS.Kodie_BlackColor}
              Text_Color={_COLORS.Kodie_WhiteColor}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ScheduleMeeting;
