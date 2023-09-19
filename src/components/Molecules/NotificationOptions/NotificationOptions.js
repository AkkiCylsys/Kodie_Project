import { View, Text } from "react-native";
import React from "react";
import { NotificationOptionsStyle } from "./NotificationOptionsStyle";
import Entypo from "react-native-vector-icons/Entypo";
const NotificationOptions = () => {
  return (
    <>
      <View>
        <Text>Notification options</Text>
        <Entypo name="cross" />
      </View>

      <View>
        <Text style={NotificationOptionsStyle.textoption}>Snooze this notification</Text>
        <Text style={NotificationOptionsStyle.textoption}>Mute notification </Text>
        <Text style={NotificationOptionsStyle.textoption}>Archive notification </Text>
        <Text style={NotificationOptionsStyle.textoption}>Remove this notification</Text>
      </View>
    </>
  );
};

export default NotificationOptions;
