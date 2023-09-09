import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { DashboardStyle } from "./DashboardStyle";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import { Dropdown } from "react-native-element-dropdown";
import { IMAGES, _COLORS } from "../../Themes/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
const IncomeData = [
  {
    id: "1",
    icm_heading: "Income",
    percentage: "+2.5%",
    price: "$10 500",
    compare_text: "Compared to($10 000 last month)",
  },
  {
    id: "2",
    icm_heading: "Expenses",
    percentage: "-1.5%",
    price: "$10 500",
    compare_text: "Compared to($10 000 last month)",
  },
  {
    id: "3",
    icm_heading: "Profit",
    percentage: "+2.5%",
    price: "$10 500",
    compare_text: "Compared to($10 000 last month)",
  },
];
const Notice = [
  {
    id: "1",
    image: IMAGES.redLine,
    notice: "Lease agreement expiring in 30 days",
    location: "2118 Thornridge Cir. Syracuse,",
  },
  {
    id: "2",
    image: IMAGES.greenLine,
    notice: "Pre move inspection due",
    location: "8502 Preston Rd. Inglewood",
  },
  {
    id: "3",
    image: IMAGES.blueLine,
    notice: "Post move inspection due",
    location: "65 Mountain View Parade",
  },
];
const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
export default Dashboard = (props) => {
  const [value, setValue] = useState(null);

  const Income_render = ({ item, index }) => {
    return (
      <>
        <View style={DashboardStyle.income_Box_View}>
          <View style={DashboardStyle.inc_view}>
            <Text style={DashboardStyle.income_text}>{item.icm_heading}</Text>
            <Text style={DashboardStyle.income_percent}>{item.percentage}</Text>
            <TouchableOpacity>
              <AntDesign
                name="arrowup"
                size={20}
                color={_COLORS.Kodie_ExtralightGreenColor}
              />
            </TouchableOpacity>
          </View>
          <Text style={DashboardStyle.Price_Text}>{item.price}</Text>
          <Text style={DashboardStyle.compare_Text}>{item.compare_text}</Text>
        </View>
      </>
    );
  };
  const NoticeData = ({ item, index }) => {
    return (
      <>
        <View style={DashboardStyle.pdf_container}>
          <View style={DashboardStyle.pdfInfo}>
            <Image source={item.image} style={DashboardStyle.lines} />
            <View style={DashboardStyle.textContainer}>
              <Text style={DashboardStyle.note}>{item.notice}</Text>
            </View>
          </View>
          <TouchableOpacity style={DashboardStyle.crossIcon}>
            <Entypo
              name="chevron-small-right"
              size={20}
              color={_COLORS.Kodie_BlackColor}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <View style={DashboardStyle.mainContainer}>
      <TopHeader
        MiddleText={"Kodie"}
        onPressLeftButton={() => _goBack(props)}
      />
      <ScrollView>
        <View style={DashboardStyle.container}>
          <Text style={DashboardStyle.Name_Text}>{"Hii Jason!"}</Text>
          <Text style={DashboardStyle.welcome_Text}>{"Welcome Back"}</Text>
          <View style={DashboardStyle.dropdown_view}>
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

          <FlatList
            data={IncomeData}
            scrollEnabled
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            keyExtractor={(item) => item?.id}
            renderItem={Income_render}
          />
          <View style={DashboardStyle.maintenance_statusView}>
            <View style={DashboardStyle.maintenance_view}>
              <Text style={DashboardStyle.maintenance_Text}>
                {"Maintenance status"}
              </Text>
              <TouchableOpacity>
                <Entypo
                  name="dots-three-horizontal"
                  size={20}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </View>
            <View>
              <View style={DashboardStyle.maintenance_main_menu}>
                <View style={DashboardStyle.maintenance_menu}>
                  <AntDesign
                    name="infocirlce"
                    size={18}
                    color={_COLORS.Kodie_yellow}
                  />
                  <Text style={DashboardStyle.request_Text}>{"Requested"}</Text>
                </View>
                <View style={DashboardStyle.maintenance_menu}>
                  <AntDesign
                    name="checkcircle"
                    size={18}
                    color={_COLORS.Kodie_GreenColor}
                  />
                  <Text style={DashboardStyle.request_Text}>{"Approved"}</Text>
                </View>
                <View style={DashboardStyle.maintenance_menu}>
                  <Entypo
                    name="circle-with-cross"
                    size={18}
                    color={_COLORS.Kodie_redColor}
                  />
                  <Text style={DashboardStyle.request_Text}>{"Rejected"}</Text>
                </View>
              </View>
              <View style={DashboardStyle.maintenance_sts_NOView}>
                <Text style={DashboardStyle.maintenance_sts_NOText}>{"8"}</Text>
                <Text style={DashboardStyle.maintenance_sts_NOText}>{"5"}</Text>
                <Text style={DashboardStyle.maintenance_sts_NOText}>{"3"}</Text>
              </View>
              <CustomSingleButton
                _ButtonText={"View all jobs"}
                Text_Color={_COLORS.Kodie_BlackColor}
                backgroundColor={_COLORS.Kodie_lightGreenColor}
                height={45}
              />
            </View>
          </View>
          <View style={DashboardStyle.Noticemain_View}>
            <View style={DashboardStyle.Notice_view}>
              <Text style={DashboardStyle.maintenance_Text}>{"Notices"}</Text>
              <TouchableOpacity>
                <Entypo
                  name="dots-three-horizontal"
                  size={20}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={Notice}
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}
              keyExtractor={(item) => item?.id}
              renderItem={NoticeData}
            />
            <View style={DashboardStyle.btnView}>
              <CustomSingleButton
                height={45}
                _ButtonText={"View all notices"}
                backgroundColor={_COLORS.Kodie_lightGreenColor}
                Text_Color={_COLORS.Kodie_BlackColor}
                borderColor={_COLORS.Kodie_GreenColor}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
