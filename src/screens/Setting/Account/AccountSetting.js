// Screen no:196
import { View, Text, Image } from "react-native";
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
        <RowTab
          isSecondRowText={true}
          LeftImage={IMAGES.Accountsetting}
          TabTaxt="General account settings"
          TabSubTaxt="Currency symbol, tax rate,  time zone"
        />
        <RowTab
          isSecondRowText={true}
          LeftImage={IMAGES.Autopayment}
          TabTaxt="Autopayment set up"
          TabSubTaxt="Configure autopayment for rentals & deposits"
        />
        <RowTab
          isSecondRowText={true}
          LeftImage={IMAGES.kodiepayment}
          TabTaxt="Kodie payment methods"
          TabSubTaxt="Add or edit payment methods"
        />
        <RowTab
          isSecondRowText={true}
          LeftImage={IMAGES.changecontact}
          TabTaxt="Change Contact Details"
          TabSubTaxt="Update personal contact information"
        />
        <RowTab
          isSecondRowText={true}
          LeftImage={IMAGES.delete}
          TabTaxt="Delete account"
          TabSubTaxt="Delete your account"
          IsDivider={false}
        />
      </View>
    </>
  );
};

export default AccountSetting;
