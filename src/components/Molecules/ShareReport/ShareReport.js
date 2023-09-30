import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import { ShareReportStyle } from "./ShareReportStyle";
import { _COLORS, IMAGES } from "../../../Themes";

const ShareReport = (props) => {
  const [email, setEmail] = useState("");
  return (
    <View>
      <ScrollView>
        <View style={ShareReportStyle.headerview}>
          <Text style={ShareReportStyle.headingtext}>{props.Header}</Text>
          <Entypo name="cross" color={_COLORS.Kodie_BlackColor} size={30} />
        </View>

        <View style={ShareReportStyle.emailview}>
          <Text style={ShareReportStyle.titletext}>{props.title}</Text>
          <TextInput
            style={ShareReportStyle.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address"
            placeholderTextColor={_COLORS.Kodie_LightGrayColor}
          />
        </View>

        <View style={ShareReportStyle.btnmainview}>

          <View style={[ShareReportStyle.binbtnview,ShareReportStyle.canclebtn]}>
          <Text style={ShareReportStyle.Cancletext}>Cancle</Text>
          </View>

          <View style={[ShareReportStyle.binbtnview,ShareReportStyle.sharebtn]}>
          <Text style={ShareReportStyle.Sharetext}>Share</Text>
          </View>

        </View>

      </ScrollView>
    </View>
  );
};

export default ShareReport;
