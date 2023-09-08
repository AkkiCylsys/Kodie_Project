import React, { useState } from "react";
import { View, Text } from "react-native";
import { DashboardStyle } from "./DashboardStyle";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import { Dropdown } from "react-native-element-dropdown";
import { _COLORS } from "../../Themes";
const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
export default Dashboard = (props) => {
  const [value, setValue] = useState(null);
  return (
    <View style={DashboardStyle.mainContainer}>
      <TopHeader
        MiddleText={"Kodie"}
        onPressLeftButton={() => _goBack(props)}
      />
      <View style={DashboardStyle.container}>
        <Text style={DashboardStyle.Name_Text}>{"Hii Jason!"}</Text>
        <Text style={DashboardStyle.welcome_Text}>{"Welcome Back"}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Dropdown
            style={[DashboardStyle.dropdown, { flex: 1 }]}
            placeholderStyle={DashboardStyle.placeholderStyle}
            selectedTextStyle={DashboardStyle.selectedTextStyle}
            inputSearchStyle={DashboardStyle.inputSearchStyle}
            iconStyle={DashboardStyle.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="All Properties"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
          <Dropdown
            style={[DashboardStyle.dropdown, { flex: 1 }]}
            placeholderStyle={DashboardStyle.placeholderStyle}
            selectedTextStyle={DashboardStyle.selectedTextStyle}
            inputSearchStyle={DashboardStyle.inputSearchStyle}
            iconStyle={DashboardStyle.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Year to date"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
          <Dropdown
            style={[DashboardStyle.dropdown, { flex: 1 }]}
            placeholderStyle={DashboardStyle.placeholderStyle}
            selectedTextStyle={DashboardStyle.selectedTextStyle}
            inputSearchStyle={DashboardStyle.inputSearchStyle}
            iconStyle={DashboardStyle.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Cash flow"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
        </View>

      </View>
      <Text>gjkgsdhsag</Text>
      
    </View>
  );
};
