import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { DashboardStyle } from "./DashboardStyle";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import { Dropdown } from "react-native-element-dropdown";
import { _COLORS } from "../../Themes";
import DeshboardNotice from "../../components/Molecules/deshboardNoice/DeshboardNotice";
import { LineChart } from "react-native-chart-kit";
import { Card } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
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
      <ScrollView
        style={DashboardStyle.container}
        showsVerticalScrollIndicator={false}
      >
        <DeshboardNotice />

        <Text style={DashboardStyle.Name_Text}>{"Hii Jason!"}</Text>
        <Text style={DashboardStyle.welcome_Text}>{"Welcome Back"}</Text>
        <View
          style={{
            // flex: 1,
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
        <Card style={DashboardStyle.card}>
          <Card.Content>
            <View style={DashboardStyle.headerView}>
              <Text style={DashboardStyle.header}>Cash flow overview</Text>
              <TouchableOpacity>
                <Entypo
                  name={"dots-three-horizontal"}
                  size={20}
                  color={_COLORS.Kodie_GrayColor}
                  style={DashboardStyle.icon}
                />
              </TouchableOpacity>
            </View>
            <LineChart
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr"],
                datasets: [
                  {
                    data: [
                      Math.random(),
                      Math.random() * 100,
                      Math.random() * 120,
                      Math.random() * 140,
                      Math.random() * 160,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width - 56} // from react-native
              height={160}
              yAxisLabel={"$"}
              chartConfig={{
                backgroundColor: _COLORS.Kodie_WhiteColor,
                backgroundGradientFrom: _COLORS.Kodie_WhiteColor,
                backgroundGradientTo: _COLORS.Kodie_WhiteColor,
                // decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 255) => `	rgb(0, 0, ${opacity})`,
              }}
              bezier
              style={DashboardStyle.lineChartStl}
            />
            <View style={DashboardStyle.chartfooterView}>
              <View style={DashboardStyle.headerView}>
                <View style={DashboardStyle.incomeBox} />
                <Text style={DashboardStyle.incomeText}>Total Income</Text>
              </View>
              <View style={DashboardStyle.headerView}>
                <View style={DashboardStyle.expBox} />
                <Text style={DashboardStyle.incomeText}>Total expenses</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};
