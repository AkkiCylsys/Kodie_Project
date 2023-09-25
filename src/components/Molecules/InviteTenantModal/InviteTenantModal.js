import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { InviteTenantModalStyle } from "./InviteTenantModalStyle";
import { IMAGES } from "../../../Themes";

export default InviteTenantModal = () => {
  return (
    <View style={InviteTenantModalStyle.mainContainer}>
      <View style={InviteTenantModalStyle.subContainer}>
        <Text style={InviteTenantModalStyle.Invite_tenant}>
          {"Invite tenant"}
        </Text>
      </View>
      <View style={InviteTenantModalStyle.All_Data_View}>
        <TouchableOpacity style={InviteTenantModalStyle.Main_View}>
          <Image source={IMAGES.InviteContact} style={InviteTenantModalStyle.Icons} />
          <Text style={InviteTenantModalStyle.Invite_Data_Text}>
            {"Invite tenant from contacts"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={InviteTenantModalStyle.Main_View}>
          <Image source={IMAGES.InviteTenant} style={InviteTenantModalStyle.Icons} />
          <Text style={InviteTenantModalStyle.Invite_Data_Text}>
            {"Invite tenant from Kodie"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={InviteTenantModalStyle.Main_View}>
          <Image source={IMAGES.AddManually} style={InviteTenantModalStyle.Icons} />
          <Text style={InviteTenantModalStyle.Invite_Data_Text}>
            {"Add tenant manually"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
