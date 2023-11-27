import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PropertyExpensesStyle } from "./PropertyExpensesStyle";
import { _COLORS } from "../../../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
export default PropertyExpenses = () => {
  return (
    <View style={PropertyExpensesStyle.mainContainer}>
      <View style={PropertyExpensesStyle.subContainer}>
        <Text style={PropertyExpensesStyle.heading_Text}>
          {"Property expenses"}
        </Text>

        <View style={PropertyExpensesStyle.Account_main_View}>
          <View style={PropertyExpensesStyle.account_view}>
            <View>
              <Text style={PropertyExpensesStyle.Accounting_Text}>
                {"Accounting"}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={PropertyExpensesStyle.Paid_Text}>
                  {"Paid by:"}
                </Text>
                <Text style={PropertyExpensesStyle.Paid_Text}>{"Tenant"}</Text>
              </View>
            </View>
            <View>
              <Text style={PropertyExpensesStyle.Amount_Text}>
                {"Amount due"}
              </Text>
              <Text style={PropertyExpensesStyle.Accounting_Text}>
                {"$100"}
              </Text>
            </View>
          </View>
        </View>
        <View style={PropertyExpensesStyle.datePaid_main_view}>
          <View style={PropertyExpensesStyle.paidDate_subView}>
            <View style={PropertyExpensesStyle.paid_Date_View}>
              <Text style={PropertyExpensesStyle.date_paid}>
                {"Date paid:"}
              </Text>
              <Text style={PropertyExpensesStyle.Amount_Text}>
                {"9 August 2023"}
              </Text>
            </View>
            <TouchableOpacity style={PropertyExpensesStyle.rent_received_view}>
              <View style={{ flexDirection: "row" }}>
                <Entypo
                  name="dot-single"
                  size={25}
                  color={_COLORS.Kodie_DarkOrange}
                />
                <Text style={PropertyExpensesStyle.rent_received_text}>
                  {"Awaiting payment"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
