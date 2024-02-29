import { View, Text, TouchableOpacity } from "react-native";
// Screen n0: 197
import React, { useState } from "react";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { GeneralSettingsStyle } from "./GeneralSettingsStyle";
import GeneralSetting from "../../../../components/Molecules/GeneralSetting/GeneralSetting";
import { IMAGES } from "../../../../Themes";
import { Dropdown } from "react-native-element-dropdown";
const data = [
  { label: "None", value: "1" },
  { label: "Aus $", value: "2" },
];
const GeneralSettings = (props) => {
  const [value, setValue] = useState(null);
  return (
    <View>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"General settings"}
      />

      <View style={GeneralSettingsStyle.mainContainer}>
        <View style={GeneralSettingsStyle.Headingview}>
          <Text style={GeneralSettingsStyle.Headingtext}>General settings</Text>
        </View>

        <View style={GeneralSettingsStyle.rowview}>
          <View style={GeneralSettingsStyle.componentview}>
            <GeneralSetting
              heading="Currency symbol"
              imageSource={IMAGES.currency}
              description="Select the currency symbol to display"
            />
          </View>
          <View style={[GeneralSettingsStyle.dropdownview,{alignItems:'center',flex:0.3,justifyContent:'center'}]}>
            <Dropdown
              style={GeneralSettingsStyle.dropdown}
              placeholderStyle={GeneralSettingsStyle.placeholderStyle}
              selectedTextStyle={GeneralSettingsStyle.selectedTextStyle}
              inputSearchStyle={GeneralSettingsStyle.inputSearchStyle}
              iconStyle={GeneralSettingsStyle.iconStyle}
              data={data}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Aus $"
              // searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>
        </View>

        <View style={GeneralSettingsStyle.textratemainview}>
          <View style={GeneralSettingsStyle.textratecomponentview}>
            <GeneralSetting
              heading="Tax rate"
              imageSource={IMAGES.Tax}
              description="Select your region’s GST rate"
            />
          </View>
          <View style={GeneralSettingsStyle.rateview}>
            <Text style={GeneralSettingsStyle.ratetext}>10.00%</Text>
          </View>
        </View>

        <TouchableOpacity style={GeneralSettingsStyle.calenderview}
         onPress={() => props.navigation.navigate("GeneralSetting")}>
          <GeneralSetting
            heading="Calendar settings"
            imageSource={IMAGES.Calendar}
            description="Configure your calendar "
            leftarrowimg={IMAGES.rightarrow}
          />
        </TouchableOpacity>

        <TouchableOpacity style={GeneralSettingsStyle.origanisationview}
          onPress={() => props.navigation.navigate("AccountStep")}>
          <GeneralSetting
            heading="Organisation profile"
            imageSource={IMAGES.Group}
            description="Your organisation details will be used in 
            correspondence and also invoices  "
            leftarrowimg={IMAGES.rightarrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GeneralSettings;
