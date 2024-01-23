import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SelectStyle } from "./SelectStyle";
import Entypo from "react-native-vector-icons/Entypo";
import { _COLORS } from "../../../Themes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
const Select = (props) => {
  const [isPopupVisible, setPopupVisible] = useState(true);

  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  const onClose = () => {
    props.onClose();
  };

  return (
    <ScrollView>
      <View style={SelectStyle.headingview}>
        <Text style={SelectStyle.headingtext}>Select</Text>
        <TouchableOpacity
          onPress={() => {
            onClose();
          }}
        >
          <Entypo
            name="cross"
            size={24}
            color={_COLORS.Kodie_BlackColor}
            onPress={handleClosePopup}
          />
        </TouchableOpacity>
      </View>

      <View style={SelectStyle.optionsmainview}>
        <View style={SelectStyle.optionsview}>
          <View style={SelectStyle.optionsiconview}>
            <MaterialCommunityIcons
              size={18}
              color={_COLORS.Kodie_GreenColor}
              name="alarm-snooze"
            />
          </View>
          <Text style={SelectStyle.textoption}>View/edit notice</Text>
        </View>

        <View style={SelectStyle.optionsview}>
          <View style={SelectStyle.optionsiconview}>
            <Fontisto size={18} color={_COLORS.Kodie_GreenColor} name="copy" />
          </View>
          <Text style={SelectStyle.textoption}>Duplicate notice </Text>
        </View>

        <View style={SelectStyle.optionsview}>
          <View style={SelectStyle.optionsiconview}>
            <AntDesign
              size={18}
              color={_COLORS.Kodie_GreenColor}
              name="delete"
            />
          </View>
          <Text style={SelectStyle.textoption}>Delete notice </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Select;
