import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { AddGuestStyle } from "./AddGuestStyle";
import { _COLORS, IMAGES } from "../../../Themes";
const AddGuest = () => {
  const [location, setLocation] = useState("");
  return (
    <View style={AddGuestStyle.maincontainer}>
      <Text style={AddGuestStyle.addgusttext}>Add guests</Text>
      <View style={AddGuestStyle.mainviewinput}>
        <View style={AddGuestStyle.bindview}>
          <TextInput
            placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            value={location}
            onChangeText={setLocation}
            placeholder="Add guests"
          />
          <Image source={IMAGES.Adduser} style={AddGuestStyle.adduserimg} />
        </View>

        <View style={AddGuestStyle.vecentview}>
          <Image source={IMAGES.chat} style={AddGuestStyle.chatimage} />
          <Text style={AddGuestStyle.chattext}>Chat </Text>
        </View>
      </View>
    </View>
  );
};

export default AddGuest;
