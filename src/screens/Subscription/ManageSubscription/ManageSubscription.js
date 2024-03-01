import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { ManageSubscriptionStyle } from "./ManageSubscriptionStyle";
import { IMAGES, FONTFAMILY, _COLORS } from "../../../Themes/index";
import RangeSlider from "../../../components/Molecules/RangeSlider/RangeSlider";
import { _goBack } from "../../../services/CommonServices/CommonMethods";
import SwitchButton from "../../../components/Molecules/SwitchButton/SwitchButton";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { FlatList } from "react-native-gesture-handler";
//ScreenNo:209

const subscriptionData = [
  {
    id: 1,
    cardHeading: "Property Essential",
    amount: "69",
    duration: "Month",
    description: "The best place to get started",
    rule_desc: "You get:",
    rule_no_1: "Easily manage up to 3 properties",
    rule_no_2: "Single user",
    rule_no_3: "Standard financial dashboards(revenues & expenses)",
    rule_no_4: "Service & maintenance requests with ease",
    rule_no_5: "Standard access to contractors",
    rule_no_6: "Income & expense tracking",
    rule_no_7: "Tenant screening",
    rule_no_8: "Standard document management",
    rule_no_9:
      "Standard rental property listings on Kodie Property Marketplace",
  },
  {
    id: 2,
    cardHeading: "Portfolio Pioneer",
    amount: "149",
    duration: "Month",
    description: "The best place to get started",
    rule_desc: "You get:",
    rule_no_1: "Easily manage up to 3 properties",
    rule_no_2: "Single user",
    rule_no_3: "Standard financial dashboards(revenues & expenses)",
    rule_no_4: "Service & maintenance requests with ease",
    rule_no_5: "Standard access to contractors",
    rule_no_6: "Income & expense tracking",
    rule_no_7: "Tenant screening",
    rule_no_8: "Standard document management",
    rule_no_9:
      "Standard rental property listings on Kodie Property Marketplace",
  },
  {
    id: 3,
    cardHeading: "Property Mogul",
    amount: "69",
    duration: "Month",
    description: "The best place to get started",
    rule_desc: "You get:",
    rule_no_1: "Easily manage up to 3 properties",
    rule_no_2: "Single user",
    rule_no_3: "Standard financial dashboards(revenues & expenses)",
    rule_no_4: "Service & maintenance requests with ease",
    rule_no_5: "Standard access to contractors",
    rule_no_6: "Income & expense tracking",
    rule_no_7: "Tenant screening",
    rule_no_8: "Standard document management",
    rule_no_9:
      "Standard rental property listings on Kodie Property Marketplace",
  },
];
const ManageSubscription = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [priceRanges, setPriceRanges] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);

  const handlePriceRangeChange = (priceRange) => {
    console.log("Price Range in Parent Component:", priceRange);
    setPriceRanges(priceRange);
    // Do something with the price range in the parent component
  };
  const handlemaxRange = (high) => {
    console.log("High Range in Parent Component:", high);
    setMax(high);
  };
  const handleminRange = (low) => {
    console.log("Low Range in Parent Component:", low);
    setMin(low);
  };
  const RowsData = (props) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <Image
          source={IMAGES.Done}
          style={ManageSubscriptionStyle.DoneImage}
          resizeMode="contain"
        />
        <Text style={ManageSubscriptionStyle.SubDataText}>
          {props.DataTexts}
        </Text>
      </View>
    );
  };

  const subscriptionCardRender = ({ item }) => {
    return (
      <View style={ManageSubscriptionStyle.SubscriptionDataView}>
        <Text style={ManageSubscriptionStyle.Heading}>{item.cardHeading}</Text>
        <Text style={ManageSubscriptionStyle.Subscriptionprice}>
          ${item.amount}
          <Text style={ManageSubscriptionStyle.SubscriptionpriceText}>
            /{item.duration}
          </Text>
        </Text>
        <Text style={ManageSubscriptionStyle.SubDataText}>
          {item.description}
        </Text>
        <View style={ManageSubscriptionStyle.ShadowLine} />
        <Text style={ManageSubscriptionStyle.getText}>{item.rule_desc}</Text>
        <RowsData DataTexts="Easily manage up to 3 properties" />
        <RowsData DataTexts="Single user" />
        <RowsData DataTexts="Standard financial dashboard (revenues & expenses)" />
        <RowsData DataTexts="Service & maintenance requests with ease" />
        <RowsData DataTexts="Standard access to contractors" />
        <RowsData DataTexts="Income & expense tracking" />
        <RowsData DataTexts="Tenant screening" />
        <RowsData DataTexts="Standard document management" />
        <RowsData DataTexts="Standard rental property listings on Kodie Property Marketplace" />
        <View style={{ padding: 5 }}>
          <RowButtons
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_TransparentColor}
            RightButtonborderColor={_COLORS.Kodie_BlackColor}
            LeftButtonText={"Contact us"}
            RightButtonText={"Subscribe"}
            onPressLeftButton={() =>
              // props.navigation.navigate("ContractorProfile")
              alert("Contact us pressed")
            }
            onPressRightButton={() => {
              // props.navigation.navigate("SubscriptionScreen");
              props.navigation.navigate("PaymentScreen");
              // alert("Subscription")

            }}
          />
        </View>
      </View>
    );
  };
  return (
    <>
      <View style={ManageSubscriptionStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Manage Subscription"}
        />

        <ScrollView style={{ paddingHorizontal: 10 }}>
          <Image
            source={IMAGES.Subscription}
            style={ManageSubscriptionStyle.SubscriptionImage}
            resizeMode="contain"
          />
          <Text style={ManageSubscriptionStyle.MainHeading}>
            {"Subscribe to Kodie"}
          </Text>
          <Text style={ManageSubscriptionStyle.SubHeading}>
            Go beyond the limits, get{" "}
            <Text
              style={[
                ManageSubscriptionStyle.SubHeading,
                { color: _COLORS.Kodie_GreenColor },
              ]}
            >
              {" "}
              exclusive features
            </Text>{" "}
            by subscribing to{" "}
            <Text
              style={[
                ManageSubscriptionStyle.SubHeading,
                {
                  color: _COLORS.Kodie_GreenColor,
                  fontFamily: FONTFAMILY.K_Bold,
                },
              ]}
            >
              Kodie
            </Text>
            .
          </Text>
          <Text
            style={[
              ManageSubscriptionStyle.SubUnderlineHeading,
              { color: _COLORS.Kodie_GreenColor },
            ]}
          >
            {" "}
            14-days unlimited FREE trial, then only $69 / month
          </Text>
          <View style={ManageSubscriptionStyle.RangeSliderView}>
            <View style={ManageSubscriptionStyle.switchBtn_view}>
              <SwitchButton
                leftBtnText={"Not approved"}
                rightBtnText={"Approved"}
              />
            </View>

            <RangeSlider
              from={1}
              to={20}
              onPriceRangeChange={handlePriceRangeChange}
              onHighRange={handlemaxRange}
              onLowRange={handleminRange}
              onLowrange={2}
            />
          </View>
          {/* <ScrollView style={{ width: "100%" }} horizontal={true}>
            <View style={ManageSubscriptionStyle.SubscriptionDataView}>
              <Text style={ManageSubscriptionStyle.Heading}>
                {"Property Essential"}
              </Text>
              <Text style={ManageSubscriptionStyle.Subscriptionprice}>
                $69
                <Text style={ManageSubscriptionStyle.SubscriptionpriceText}>
                  /Month
                </Text>
              </Text>
              <Text style={ManageSubscriptionStyle.SubDataText}>
                The best place to get started
              </Text>
              <View style={ManageSubscriptionStyle.ShadowLine} />
              <Text style={ManageSubscriptionStyle.getText}>You get:</Text>
              <RowsData DataTexts="Easily manage up to 3 properties" />
              <RowsData DataTexts="Single user" />
              <RowsData DataTexts="Standard financial dashboard (revenues & expenses)" />
              <RowsData DataTexts="Service & maintenance requests with ease" />
              <RowsData DataTexts="Standard access to contractors" />
              <RowsData DataTexts="Income & expense tracking" />
              <RowsData DataTexts="Tenant screening" />
              <RowsData DataTexts="Standard document management" />
              <RowsData DataTexts="Standard rental property listings on Kodie Property Marketplace" />
              <View style={{ padding: 5 }}>
                <RowButtons
                  leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
                  RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
                  LeftButtonTextColor={_COLORS.Kodie_BlackColor}
                  RightButtonTextColor={_COLORS.Kodie_WhiteColor}
                  LeftButtonborderColor={_COLORS.Kodie_TransparentColor}
                  RightButtonborderColor={_COLORS.Kodie_BlackColor}
                  LeftButtonText={"Contact us"}
                  RightButtonText={"Subscribe"}
                  onPressLeftButton={() =>
                    props.navigation.navigate("ContractorProfile")
                  }
                  onPressRightButton={() => {
                    props.navigation.navigate("HireContractor");
                  }}
                />
              </View>
            </View>

            <View
              style={[
                ManageSubscriptionStyle.SubscriptionDataView,
                ManageSubscriptionStyle.secondcard,
              ]}
            >
              <Text style={ManageSubscriptionStyle.Heading}>
                {"Property Essential"}
              </Text>
              <Text style={ManageSubscriptionStyle.Subscriptionprice}>
                $149
                <Text style={ManageSubscriptionStyle.SubscriptionpriceText}>
                  /Month
                </Text>
              </Text>
              <Text style={ManageSubscriptionStyle.SubDataText}>
                The best place to get started
              </Text>
              <View style={ManageSubscriptionStyle.ShadowLine} />
              <Text style={ManageSubscriptionStyle.getText}>You get:</Text>
              <RowsData DataTexts="Easily manage up to 3 properties" />
              <RowsData DataTexts="Single user" />
              <RowsData DataTexts="Standard financial dashboard (revenues & expenses)" />
              <RowsData DataTexts="Service & maintenance requests with ease" />
              <RowsData DataTexts="Standard access to contractors" />
              <RowsData DataTexts="Income & expense tracking" />
              <RowsData DataTexts="Tenant screening" />
              <RowsData DataTexts="Standard document management" />
              <RowsData DataTexts="Standard rental property listings on Kodie Property Marketplace" />
              <View style={{ padding: 5 }}>
                <RowButtons
                  leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
                  RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
                  LeftButtonTextColor={_COLORS.Kodie_BlackColor}
                  RightButtonTextColor={_COLORS.Kodie_WhiteColor}
                  LeftButtonborderColor={_COLORS.Kodie_TransparentColor}
                  RightButtonborderColor={_COLORS.Kodie_BlackColor}
                  LeftButtonText={"Contact us"}
                  RightButtonText={"Subscribe"}
                  onPressLeftButton={() =>
                    alert("Contact us pressed")
                  }
                  onPressRightButton={() => {
                    alert("Subscribe pressed");
                  }}
                />
              </View>
            </View>

            <View style={ManageSubscriptionStyle.SubscriptionDataView}>
              <Text style={ManageSubscriptionStyle.Heading}>
                {"Property Mogul"}
              </Text>
              <Text style={ManageSubscriptionStyle.Subscriptionprice}>
                Contact Us
              </Text>
              <Text style={ManageSubscriptionStyle.SubDataText}>
                The best place to get started
              </Text>
              <View style={ManageSubscriptionStyle.ShadowLine} />
              <Text style={ManageSubscriptionStyle.getText}>You get:</Text>
              <RowsData DataTexts="Easily manage up to 3 properties" />
              <RowsData DataTexts="Single user" />
              <RowsData DataTexts="Standard financial dashboard (revenues & expenses)" />
              <RowsData DataTexts="Service & maintenance requests with ease" />
              <RowsData DataTexts="Standard access to contractors" />
              <RowsData DataTexts="Income & expense tracking" />
              <RowsData DataTexts="Tenant screening" />
              <RowsData DataTexts="Standard document management" />
              <RowsData DataTexts="Standard rental property listings on Kodie Property Marketplace" />
              <View style={{ padding: 5 }}>
                <RowButtons
                  leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
                  RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
                  LeftButtonTextColor={_COLORS.Kodie_BlackColor}
                  RightButtonTextColor={_COLORS.Kodie_WhiteColor}
                  LeftButtonborderColor={_COLORS.Kodie_TransparentColor}
                  RightButtonborderColor={_COLORS.Kodie_BlackColor}
                  LeftButtonText={"Contact us"}
                  RightButtonText={"Subscribe"}
                  onPressLeftButton={() =>
                    props.navigation.navigate("ContractorProfile")
                  }
                  onPressRightButton={() => {
                    props.navigation.navigate("HireContractor");
                  }}
                />
              </View>
            </View>
          </ScrollView> */}

          <FlatList
            horizontal={true}
            data={subscriptionData}
            keyExtractor={(item, index) => item.id}
            renderItem={subscriptionCardRender}
          />
          <CustomSingleButton
            onPress={() => props.navigation.navigate("BottomNav")}
            _ButtonText={"Subscribe for only $69 / month"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            disabled={isLoading ? true : false}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default ManageSubscription;
