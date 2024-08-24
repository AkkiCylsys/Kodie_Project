import { View, Text, ScrollView } from "react-native";
import React from "react";
import { StorageSettingsStyle } from "./StorageSettingsStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import Chat from "../../../components/Molecules/Chats/Chat";
import GeneralSetting from "../../../components/Molecules/GeneralSetting/GeneralSetting";
import { _COLORS, IMAGES } from "../../../Themes";
import { Divider } from "react-native-paper";
const StorageSettings = () => {
  return (
    <View style={StorageSettingsStyle.maincontainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Storage and Data"}
      />
      <ScrollView>
        <View style={StorageSettingsStyle.firstview}>
          <Chat
            imagesource={IMAGES.Storage}
            heading="Manage Storage"
            time="4.8 GB"
          />
        </View>
        <Divider style={StorageSettingsStyle.firstdivider} />
        <View style={StorageSettingsStyle.firstview}>
          <GeneralSetting
            heading="Network Usage"
            imageSource={IMAGES.wifi}
            description="7.7 GB send  - 8.2 GB received"
            leftarrowimg={IMAGES.rightarrow}
          />
        </View>
        <Divider style={StorageSettingsStyle.seconddivider} />

        <View style={StorageSettingsStyle.descview}>
          <Text style={StorageSettingsStyle.mediatext}>
            Media Auto-Download
          </Text>
          <View style={StorageSettingsStyle.mainbindview}>
            <View style={StorageSettingsStyle.bindview}>
              <Text style={StorageSettingsStyle.headtext}>When Using Mobile Data</Text>
              <Text style={StorageSettingsStyle.destext}>Photos</Text>
            </View>

            <View style={StorageSettingsStyle.bindview}>
              <Text style={StorageSettingsStyle.headtext}>When Connected on Wi-Fi</Text>
              <Text style={StorageSettingsStyle.destext}>All Media</Text>
            </View>

            <View style={StorageSettingsStyle.bindview}>
              <Text style={StorageSettingsStyle.headtext}>When Roaming</Text>
              <Text style={StorageSettingsStyle.destext}>No media</Text>
            </View>

            <View style={StorageSettingsStyle.bindview}>
              <Text style={StorageSettingsStyle.headtext}>Photo Upload Quality</Text>
              <Text style={StorageSettingsStyle.destext}>Auto</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StorageSettings;
