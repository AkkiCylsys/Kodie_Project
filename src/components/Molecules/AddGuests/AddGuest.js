import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { AddGuestStyle } from "./AddGuestStyle";
import { _COLORS, IMAGES } from "../../../Themes";
const AddGuest = () => {
  const [location, setLocation] = useState("");
  return (
    <View>
      <View style={AddGuestStyle.Noticetextview}>
        <Text style={AddGuestStyle.addgusttext}>Add guests</Text>
        <View style={AddGuestStyle.bindview}>
          <View>
            <TextInput
              style={AddGuestStyle.locationInput}
              value={location}
              onChangeText={setLocation}
              placeholder="Add guests"
            />
            <Image source={IMAGES.adduser} style={AddGuestStyle.adduserimg} />
          </View>
          <View>
            <View style={AddGuestStyle.vecentview}></View>
            <View style={AddGuestStyle.chatview}>
              <Image source={IMAGES.chat} style={AddGuestStyle.chatimage}/>
              <Text style={AddGuestStyle.chattext}>Chat </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddGuest;
