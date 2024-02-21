import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ReportsStyle } from "./ReportsStyle";
import TopHeader from "../../components/Molecules/Header/Header";
import SearchBar from "../../components/Molecules/SearchBar/SearchBar";
import { _COLORS, IMAGES } from "../../Themes";
import DividerIcon from "../../components/Atoms/Devider/DividerIcon";
import Entypo from "react-native-vector-icons/Entypo";
import Report from "../../components/Molecules/Reports/Report";
import { _goBack } from "../../services/CommonServices";

const Reports = (props) => {
  const [show, setShow] = useState(false);
  const [Rental, setRental] = useState(false);
  const [expense, setExpense] = useState(false);
  const [property, setProperty] = useState(false);

  const toggleshow = () => {
    setShow(!show);
  };

  const toggleRental = () => {
    setRental(!Rental);
  };

  const toggleExpense = () => {
    setExpense(!expense);
  };

  const toggleProperty = () => {
    setProperty(!property);
  };
  const searchReport =()=>{
    
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
            searchData={searchReport}
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
                  solidheart={true}
                />
              </View>

              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Rent overdue reports"
                  locationimg={IMAGES.Location}
                  address="Is a document that lists
                   tenants who have not paid their rent on time. 
                   It includes tenant names, outstanding balances"
                  hearting={true}
                />
              </View>

              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Missed rent reports"
                  locationimg={IMAGES.Location}
                  address="Is a document that identifies
                   instances where tenants have failed to 
                   make their rent payments as scheduled."
                  hearting={true}
                />
              </View>
            </View>
          )}

          <View style={ReportsStyle.dropdownview}>
            <Text style={ReportsStyle.placeholderdroptext}>
              Expense reports
            </Text>
            <TouchableOpacity onPress={toggleExpense}>
              <Entypo
                name={expense ? "chevron-up" : "chevron-down"}
                size={20}
                color={_COLORS.Kodie_BlackColor}
              />
            </TouchableOpacity>
          </View>

          {expense && (
            <View>
              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Expenses incurred report"
                  locationimg={IMAGES.Location}
                  address='An "Expenses Incurred Report" compiles
                   and details all expenses over a specific period,
                  aiding financial monitoring and analysis.'
                  solidheart={true}
                />
              </View>

              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Maintenance expenses report"
                  locationimg={IMAGES.Location}
                  address="Is a document that outlines all the
                   costs associated with property maintenance 
                   and repairs within a specific period."
                  hearting={true}
                />
              </View>

              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Unpaid expenses reports"
                  locationimg={IMAGES.Location}
                  address="Is a document that identifies instances 
                  where tenants have failed to make their rent 
                  payments as scheduled."
                  hearting={true}
                />
              </View>
            </View>
          )}

          <View style={ReportsStyle.dropdownview}>
            <Text style={ReportsStyle.placeholderdroptext}>
              Property management reports
            </Text>
            <TouchableOpacity onPress={toggleProperty}>
              <Entypo
                name={property ? "chevron-up" : "chevron-down"}
                size={20}
                color={_COLORS.Kodie_BlackColor}
              />
            </TouchableOpacity>
          </View>

          {property && (
            <View>
              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Properties detail report"
                  locationimg={IMAGES.Location}
                  address='An "Expenses Incurred Report" compiles
                   and details all expenses over a specific period,
                  aiding financial monitoring and analysis.'
                  solidheart={true}
                />
              </View>

              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Vacant property report"
                  locationimg={IMAGES.Location}
                  address="Is a document that provides
                   information about properties that are
                    currently unoccupied or without tenants."
                  hearting={true}
                />
              </View>

              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Property listings report"
                  locationimg={IMAGES.Location}
                  address="Is a document or database that compiles
                   information about properties available for sale or rent."
                  hearting={true}
                />
              </View>

              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Tenant list"
                  locationimg={IMAGES.Location}
                  address="Is a document or database that contains 
                  information about individuals or entities currently
                   renting or leasing properties."
                  hearting={true}
                />
              </View>

              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Lease summary report"
                  locationimg={IMAGES.Location}
                  address="Is a document that provides a 
                  concise overview of the key details and terms
                   of a lease agreement."
                  hearting={true}
                />
              </View>

              <View>
                <Report
                  lineimg={IMAGES.Report}
                  heading="Reminders report"
                  locationimg={IMAGES.Location}
                  address="Is a document or system-generated list that
                   provides reminders for various tasks, deadlines, or events."
                  hearting={true}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Reports;
