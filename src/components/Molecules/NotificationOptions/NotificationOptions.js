import { View, Text } from "react-native";
import React, { useState } from "react";
import { NotificationOptionsStyle } from "./NotificationOptionsStyle";
import Entypo from "react-native-vector-icons/Entypo";
import { _COLORS } from "../../../Themes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
const NotificationOptions = () => {
  const [isPopupVisible, setPopupVisible] = useState(true);

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <View style={NotificationOptionsStyle.headingview}>
        <Text style={NotificationOptionsStyle.headingtext}>
          Notification options
        </Text>
        <Entypo
          name="cross"
          size={24}
          color={_COLORS.Kodie_BlackColor}
          onPress={handleClosePopup}
        />
      </View>

      <View style={NotificationOptionsStyle.optionsmainview}>
        <View style={NotificationOptionsStyle.optionsview}>
          <View style={NotificationOptionsStyle.optionsiconview}>
            <MaterialCommunityIcons
              size={18}
              color={_COLORS.Kodie_GreenColor}
              name="alarm-snooze"
            />
          </View>
          <Text style={NotificationOptionsStyle.textoption}>
            Snooze this notification
          </Text>
        </View>

        <View style={NotificationOptionsStyle.optionsview}>
          <View style={NotificationOptionsStyle.optionsiconview}>
            <MaterialCommunityIcons
              size={18}
              color={_COLORS.Kodie_GreenColor}
              name="bell-off-outline"
            />
          </View>
          <Text style={NotificationOptionsStyle.textoption}>
            Mute notification{" "}
          </Text>
        </View>

        <View style={NotificationOptionsStyle.optionsview}>
          <View style={NotificationOptionsStyle.optionsiconview}>
            <MaterialCommunityIcons
              size={18}
              color={_COLORS.Kodie_GreenColor}
              name="bell-off-outline"
            />
          </View>
          <Text style={NotificationOptionsStyle.textoption}>
            Archive notification{" "}
          </Text>
        </View>

        <View style={NotificationOptionsStyle.optionsview}>
          <View style={NotificationOptionsStyle.optionsiconview}>
            <AntDesign
              name="delete"
              size={18}
              color={_COLORS.Kodie_GreenColor}
            />
          </View>
          <Text style={NotificationOptionsStyle.textoption}>
            Remove this notification
          </Text>
        </View>
      </View>
    </>
  );
};

export default NotificationOptions;
