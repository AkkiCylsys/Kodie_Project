//ScreenNo:196
import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { AccountStyle } from "./AccountStyle";
import { IMAGES } from "../../../Themes/index";
import RowTab from "../../../components/Molecules/RowTab/RowTab";

import { _goBack } from "../../../services/CommonServices/CommonMethods";
const AccountSetting = (props) => {
  return (
    <>
      <View style={AccountStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Account"}
        />
        <TouchableOpacity
          onPress={() => props.navigation.navigate("GeneralSettings")}
        >
          <RowTab
            isSecondRowText={true}
            LeftImage={IMAGES.Accountsetting}
            TabTaxt="General account settings"
            TabSubTaxt="Currency symbol, tax rate,  time zone"
          />
        </TouchableOpacity>
        <RowTab
          isSecondRowText={true}
          LeftImage={IMAGES.Autopayment}
          TabTaxt="Autopayment set up"
          TabSubTaxt="Configure autopayment for rentals & deposits"
        />
        <TouchableOpacity
          onPress={() => props.navigation.navigate("PaymentMethod")}
        >
          <RowTab
            isSecondRowText={true}
            LeftImage={IMAGES.kodiepayment}
            TabTaxt="Kodie payment methods"
            TabSubTaxt="Add or edit payment methods"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("ChangeContactInput")}
        >
          <RowTab
            isSecondRowText={true}
            LeftImage={IMAGES.changecontact}
            TabTaxt="Change Contact Details"
            TabSubTaxt="Update personal contact information"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("DeleteAccount")}
        >
          <RowTab
            isSecondRowText={true}
            LeftImage={IMAGES.delete}
            TabTaxt="Delete account"
            TabSubTaxt="Delete your account"
            IsDivider={false}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AccountSetting;
