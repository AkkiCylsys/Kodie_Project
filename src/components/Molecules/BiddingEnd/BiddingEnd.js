import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { BiddingEndStyle } from "./BiddingEndStyle";
import { _COLORS,} from "../../../Themes";
import RowButtons from "../RowButtons/RowButtons";

const BiddingEnd = (props) => {
  return (
    <>
      <ScrollView>
        <View style={BiddingEndStyle.Mainview}>
          <View style={BiddingEndStyle.Textview}>
            <Text style={BiddingEndStyle.Text}>Bidding ends in</Text>
            <Text style={BiddingEndStyle.Text}>Budget:</Text>
          </View>
          <View style={BiddingEndStyle.Boxview}>
            <View style={BiddingEndStyle.firstbox}>
              <Text style={BiddingEndStyle.boxtext}>22 hrs</Text>
            </View>
            <View style={BiddingEndStyle.firstbox}>
              <Text style={BiddingEndStyle.boxtext}>33 mins</Text>
            </View>
            <View style={BiddingEndStyle.firstbox}>
              <Text style={BiddingEndStyle.boxtext}>10 secs</Text>
            </View>
            <View style={BiddingEndStyle.firstbox1}>
              <Text style={BiddingEndStyle.boxtext}>$100 per hour</Text>
            </View>
          </View>
          <RowButtons
            leftButtonHeight={44}
            RightButtonHeight={44}
            LeftButtonText={"Bid for job"}
            RightButtonText={"Message"}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            RightButtonborderColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default BiddingEnd;
