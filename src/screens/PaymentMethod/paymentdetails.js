import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import { _COLORS, IMAGES } from "../../Themes";
import PayButton from "../../components/PayButton/PayButton";
import { paymentdetailsStyle } from "./paymentdetailsStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
import ApplePay from "./ApplePay/ApplePay";
import CreditCard from "./CreditCard/CreditCard";

const paymentdetails = (props) => {
  const [tabValue, setTabValue] = useState("CreditCard");
  const checkTabs = () => {
    switch (tabValue) {
      case "CreditCard":
        return <CreditCard />;
      case "ApplePay":
        return <ApplePay />;
      default:
        return <CreditCard />;
    }
  };
  return (
    <View style={paymentdetailsStyle.Mainview}>
      <TopHeader
        onPressLeftButton={() => props.navigation.navigate("PaymentMethod")}
        MiddleText={"Enter payment details"}
      />

      <ScrollView style={paymentdetailsStyle.scrollviewpayment}>
        <View style={paymentdetailsStyle.PaymentView}>
          <Text style={paymentdetailsStyle.Paymenttext}>For payment:</Text>
          <Text style={paymentdetailsStyle.Paymenttext}>$173.25</Text>
        </View>
        <View>
          <Text style={{ alignSelf: "flex-end" }}>Including VAT (21%)</Text>
        </View>
        <View style={paymentdetailsStyle.btn_main_view}>
          <TouchableOpacity
            style={[
              paymentdetailsStyle.person_view,
              {
                backgroundColor:
                  tabValue === "CreditCard"
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_LightGrayColor,
              },
            ]}
            onPress={() => {
              setTabValue("CreditCard");
            }}
          >
            <Fontisto
              name="credit-card"
              size={24}
              color={_COLORS.Kodie_BlackColor}
            />
            <Text
              style={[
                paymentdetailsStyle.person_text,
                {
                  color:
                    tabValue === "CreditCard"
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_BlackColor,
                },
              ]}
            >
              {"Credit Card"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              paymentdetailsStyle.person_view,
              {
                backgroundColor:
                  tabValue === "ApplePay"
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_LightGrayColor,
              },
            ]}
            onPress={() => {
              setTabValue("ApplePay");
            }}
          >
            <Fontisto name="apple" size={24} color={_COLORS.Kodie_BlackColor}
            />
            <Text
              style={[
                paymentdetailsStyle.company_text,
                {
                  color:
                    tabValue === "ApplePay"
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_BlackColor,
                },
              ]}
            >
              {"Apple Pay"}
            </Text>
          </TouchableOpacity>
        </View>

        {checkTabs()}
      </ScrollView>
    </View>
  );
};

export default paymentdetails;
