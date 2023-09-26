// Screen no: 159
import React, { useState } from "react";
import { View, Text, TextInput, Image, ScrollView } from "react-native";
import { AddNewNoticeStyle } from "./AddNewNoticeStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { Dropdown } from "react-native-element-dropdown";
import { _COLORS, IMAGES } from "../../../Themes";
import { Divider } from "react-native-paper";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import ToggleSwitch from "toggle-switch-react-native";
import AddGuest from "../../../components/Molecules/AddGuests/AddGuest";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
const AddNewNotice = () => {
  const [value, setValue] = useState(null);
  const [location, setLocation] = useState("");
  const [select, setSelect] = useState("");
  const [propertyDesc, setPropertyDesc] = useState("");
  return (
    <View style={AddNewNoticeStyle.MainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Add new notice"}
      />
      <ScrollView contentContainerStyle={{ marginBottom: 50 }}>
        <View style={AddNewNoticeStyle.mainview}>
          <Text style={AddNewNoticeStyle.dropdownheadingtext}>
            Select the type of notice you want to create
          </Text>
          <Dropdown
            style={AddNewNoticeStyle.dropdown}
            placeholderStyle={AddNewNoticeStyle.placeholderStyle}
            selectedTextStyle={AddNewNoticeStyle.selectedTextStyle}
            inputSearchStyle={AddNewNoticeStyle.inputSearchStyle}
            iconStyle={AddNewNoticeStyle.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select notice type"
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />

          {/* second part start here */}
          <View style={AddNewNoticeStyle.Noticeview}>
            <Text style={AddNewNoticeStyle.noticehead}>Notice title</Text>
            <TextInput
              style={AddNewNoticeStyle.locationInput}
              value={location}
              onChangeText={setLocation}
              placeholder="Search location"
            />
          </View>

          <Divider style={AddNewNoticeStyle.divider} />

          {/* third part start here */}
          <View style={AddNewNoticeStyle.mainreapeatview}>
            <Image source={IMAGES.RightLeftarrow} />

            <Text style={AddNewNoticeStyle.repeattext}>Repeat</Text>
            <View style={AddNewNoticeStyle.noticedropdownview}>
              <Dropdown
                style={[
                  AddNewNoticeStyle.dropdown,
                  AddNewNoticeStyle.dropdownNotice,
                ]}
                placeholderStyle={AddNewNoticeStyle.placeholderStyle}
                selectedTextStyle={AddNewNoticeStyle.selectedTextStyle}
                inputSearchStyle={AddNewNoticeStyle.inputSearchStyle}
                iconStyle={AddNewNoticeStyle.iconStyle}
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
          <Divider style={AddNewNoticeStyle.dividersecond} />
          {/* fourth part start here */}
          <View style={AddNewNoticeStyle.alldayviewmain}>
            <View style={AddNewNoticeStyle.alldayview}>
              <MaterialCommunityIcons name="alarm-plus" size={30} />
              <Text style={AddNewNoticeStyle.alldaytext}>All Day</Text>
            </View>
            <ToggleSwitch
              isOn={false}
              onColor="#D8D8D8"
              offColor="#D8D8D8"
              size="small"
              thumbOnStyle={{ backgroundColor: "green" }}
              thumbOffStyle={{ backgroundColor: _COLORS.Kodie_BlackColor }}
              onToggle={(isOn) => console.log("changed to : ", isOn)}
            />
          </View>

          {/* five part start here */}
          <View style={AddNewNoticeStyle.datetimeview}>
            <View style={AddNewNoticeStyle.dateview}>
              <Text style={AddNewNoticeStyle.datetext}>Thu, Aug 17 2023</Text>
              <Text style={AddNewNoticeStyle.timetext}>5:00 PM</Text>
            </View>

            <View style={AddNewNoticeStyle.dateview}>
              <Text style={AddNewNoticeStyle.datetext}>Thu, Aug 17 2023</Text>
              <Text style={AddNewNoticeStyle.timetext}>1:00 PM</Text>
            </View>
          </View>

          <Divider style={AddNewNoticeStyle.dividerthird} />

          {/*six part start here */}
          <View style={AddNewNoticeStyle.secondmainview}>
            <AddGuest />

            <View style={AddNewNoticeStyle.addlocationmainview}>
              <Text style={AddNewNoticeStyle.addlocationtext}>
                Add location
              </Text>
              <View style={AddNewNoticeStyle.locationInputview}>
                <Entypo name="location-pin" size={20} />
                <TextInput
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Enter new location"
                />
              </View>
            </View>
            <Divider style={AddNewNoticeStyle.dividerfourth} />

            {/*seven part start here */}
            <View style={AddNewNoticeStyle.setnotificationview}>
              <View style={AddNewNoticeStyle.notificationbind}>
                <SimpleLineIcons name="bell" size={25} />
                <Text style={AddNewNoticeStyle.settext}>Set notification </Text>
              </View>
              <ToggleSwitch
                isOn={false}
                onColor="#D8D8D8"
                offColor="#D8D8D8"
                size="small"
                thumbOnStyle={{ backgroundColor: "green" }}
                thumbOffStyle={{ backgroundColor: _COLORS.Kodie_BlackColor }}
                onToggle={(isOn) => console.log("changed to : ", isOn)}
              />
            </View>
            {/*eight part start here */}
            <View style={AddNewNoticeStyle.setnoticeviewdrop}>
              <Text></Text>
              <Text style={AddNewNoticeStyle.Notificationtypetext}>
                Set notification type
              </Text>
              <Dropdown
                style={AddNewNoticeStyle.setnotificationdrop}
                placeholderStyle={AddNewNoticeStyle.placeholderStyle}
                selectedTextStyle={AddNewNoticeStyle.selectedTextStyle}
                inputSearchStyle={AddNewNoticeStyle.inputSearchStyle}
                iconStyle={AddNewNoticeStyle.iconStyle}
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
            {/*nine part start here */}
            <View style={AddNewNoticeStyle.setcustomview}>
              <Text style={AddNewNoticeStyle.setcustometext}>Set custom</Text>
              <View style={AddNewNoticeStyle.rightimgview}>
                <Image
                  source={IMAGES.rightarrow}
                  style={AddNewNoticeStyle.rightarrowimg}
                />
              </View>
            </View>
          </View>

          <Divider style={AddNewNoticeStyle.dividerfourth} />

          <View style={AddNewNoticeStyle.inputContainer}>
            <Text style={AddNewNoticeStyle.propertydesctext}>Notes</Text>
            <TextInput
              style={AddNewNoticeStyle.input}
              value={propertyDesc}
              onChangeText={setPropertyDesc}
              placeholder="Add additional notes..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View>

          <View style={AddNewNoticeStyle.addattachmentbtnview}>
            <Text style={AddNewNoticeStyle.addattachment}>Add attachment</Text>
            <CustomSingleButton
              leftImage={IMAGES.uploadIcon}
              isLeftImage={true}
              _ButtonText={"Upload"}
              backgroundColor={_COLORS.Kodie_lightGreenColor}
              Text_Color={_COLORS.Kodie_BlackColor}
            />
            <Divider style={AddNewNoticeStyle.dividerfourth} />
            <CustomSingleButton
              _ButtonText={"Add notice"}
              Text_Color={_COLORS.Kodie_WhiteColor}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddNewNotice;
