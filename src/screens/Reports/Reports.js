import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ReportsStyle } from "./ReportsStyle";
import TopHeader from "../../components/Molecules/Header/Header";
import SearchBar from "../../components/Molecules/SearchBar/SearchBar";
import { _COLORS, IMAGES } from "../../Themes";
import DividerIcon from "../../components/Atoms/Devider/DividerIcon";
import Entypo from "react-native-vector-icons/Entypo";
import Report from "../../components/Molecules/Reports/Report";

const Reports = () => {
  const [show, setShow] = useState(false);
  const [Rental , setRental] = useState(false);
  const toggleshow = () => {
    setShow(!show);
  };

  const toggleRental = () =>{
    setRental(!Rental);
  }
  return (
    <View style={ReportsStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Reports"}
      />
      <ScrollView>
        <View style={ReportsStyle.searchview}>
          <SearchBar
            filterImage={IMAGES.filter}
            frontSearchIcon
            marginTop={3}
            placeholder="Search reports"
          />
        </View>

        <DividerIcon
          style={ReportsStyle.divider}
          color={_COLORS.Kodie_LightGrayColor}
        />

        <View style={ReportsStyle.dropdownbindview}>
          <View style={ReportsStyle.dropdownview}>
            <Text style={ReportsStyle.placeholderdroptext}>Favorites</Text>
            <TouchableOpacity onPress={toggleshow}>
              <Entypo
                name={show ? "chevron-up" : "chevron-down"}
                size={20}
                color={_COLORS.Kodie_BlackColor}
              />
            </TouchableOpacity>
          </View>
          {show && (
            <View>
              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Rental received report"
                  locationimg={IMAGES.Location}
                  address='A "Rental Received Report"
                summarizes income from tenants, detailing payments, 
                essential for property management.'
                />
              </View>

              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Expenses incurred report"
                  locationimg={IMAGES.Location}
                  address='An "Expenses Incurred Report"
                   compiles and details all expenses over
                    a specific period, aiding financial
                     monitoring and analysis.'
                />
              </View>

              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Property detail report"
                  locationimg={IMAGES.Location}
                  address='A "Property Detail Report" 
                  is a document that provides comprehensive
                   information about a specific property'
                />
              </View>
            </View>
          )}

          <View style={ReportsStyle.dropdownview}>
            <Text style={ReportsStyle.placeholderdroptext}>Rental reports</Text>
            <TouchableOpacity onPress={toggleRental}>
              <Entypo
                name={Rental ? "chevron-up" : "chevron-down"}
                size={20}
                color={_COLORS.Kodie_BlackColor}
              />
            </TouchableOpacity>
          </View>

          {Rental && (
            <View>
              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Rental received report"
                  locationimg={IMAGES.Location}
                  address='A "Rental Received Report"
                summarizes income from tenants, detailing payments, 
                essential for property management.'
                  hearting={true}
                />
              </View>

              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Expenses incurred report"
                  locationimg={IMAGES.Location}
                  address='An "Expenses Incurred Report"
                   compiles and details all expenses over
                    a specific period, aiding financial
                     monitoring and analysis.'
                  hearting={true}
                />
              </View>

              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Property detail report"
                  locationimg={IMAGES.Location}
                  address='A "Property Detail Report" 
                  is a document that provides comprehensive
                   information about a specific property'
                  hearting={true}
                />
              </View>
            </View>
          )}

          <View style={ReportsStyle.dropdownview}>
            <Text style={ReportsStyle.placeholderdroptext}>
              Expense reports
            </Text>
            <Entypo
              name="chevron-down"
              size={20}
              color={_COLORS.Kodie_BlackColor}
            />
          </View>

          <View style={ReportsStyle.dropdownview}>
            <Text style={ReportsStyle.placeholderdroptext}>
              Property management reports
            </Text>
            <Entypo
              name="chevron-down"
              size={20}
              color={_COLORS.Kodie_BlackColor}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Reports;
