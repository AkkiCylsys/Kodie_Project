import { View, Text, Image } from "react-native";
import React from "react";
import { _COLORS, IMAGES } from "../../../Themes";
import { ChatStyle } from "./ChatStyle";
const Chat = (props) => {
  return (
    <View>
      <View style={ChatStyle.mainview}>
        <View style={ChatStyle.textimgbindview}>
          <Image source={props.imagesource} style={ChatStyle.profileimage} />
          <View style={ChatStyle.bindtextview}>
            <Text style={ChatStyle.headingtext}>{props.heading}</Text>
            <Text style={ChatStyle.descriptiontext}>{props.description}</Text>
          </View>
        </View>

        <View style={ChatStyle.timeview}>
          <Text style={ChatStyle.timetext}>{props.time}</Text>
        </View>
      </View>
    </View>
  );
};

export default Chat;
