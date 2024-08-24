import { View, Text, ScrollView,TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { InviteTenantStyle } from "./InviteTenantStyle";
import Entypo from "react-native-vector-icons/Entypo";
import { _COLORS } from "../../../Themes";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
const InviteTenant = () => {
  const [isPopupVisible, setPopupVisible] = useState(true);

  const handleClosePopup = () => {
    props.onClose();
  };
  return (
    <ScrollView>
      <View style={InviteTenantStyle.headingview}>
        <Text style={InviteTenantStyle.headingtext}>
        Invite tenant 
        </Text>
        <TouchableOpacity onPress={handleClosePopup}>
          <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
        </TouchableOpacity>
      </View>

      <View style={InviteTenantStyle.optionsmainview}>
        <View style={InviteTenantStyle.optionsview}>
          <View style={InviteTenantStyle.optionsiconview}>
            <MaterialIcons
              size={18}
              color={_COLORS.Kodie_GreenColor}
              name="person-add-alt"
            />
          </View>
          <Text style={InviteTenantStyle.textoption}>
          Invite tenant from contacts
          </Text>
        </View>

        <View style={InviteTenantStyle.optionsview}>
          <View style={InviteTenantStyle.optionsiconview}>
            <MaterialIcons
              size={18}
              color={_COLORS.Kodie_GreenColor}
              name="post-add"
            />
          </View>
          <Text style={InviteTenantStyle.textoption}>
          Invite tenant from Kodie
          </Text>
        </View>

        <View style={InviteTenantStyle.optionsview}>
          <View style={InviteTenantStyle.optionsiconview}>
            <MaterialIcons
              size={18}
              color={_COLORS.Kodie_GreenColor}
              name="addchart"
            />
          </View>
          <Text style={InviteTenantStyle.textoption}>
          Add tenant manually
          </Text>
        </View>


      </View>
    </ScrollView>
  );
};

export default InviteTenant;
