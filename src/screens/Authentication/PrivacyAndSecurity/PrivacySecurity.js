import React from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { _COLORS, IMAGES } from "../../../Themes";
import { PrivacySecurityStyle } from "../../Authentication/PrivacyAndSecurity/PrivacySecurityStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { _goBack } from "../../../services/CommonServices";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const PrivacySecurity = (props) => {
  return (
    <>
      <View style={PrivacySecurityStyle.Mainview}>
        {/* <TopHeader
                    onPressLeftButton={() => _goBack(props)}
                    MiddleText={"Linked devices"}
                /> */}
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Privacy Security"}
        />
        <ScrollView>
          <View style={PrivacySecurityStyle.container}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("BlockedUser");
              }}
            >
              <View style={PrivacySecurityStyle.bindview}>
                <View style={PrivacySecurityStyle.checkimgview}>
                  <View>
                    <Image
                      source={IMAGES.Contact}
                      style={PrivacySecurityStyle.imgicon}
                    />
                  </View>
                  <View style={PrivacySecurityStyle.innertextview}>
                    <Text style={PrivacySecurityStyle.textitem}>
                      Blocked Users
                    </Text>
                    <Text style={PrivacySecurityStyle.subtext}>
                      Block or unblock users
                    </Text>
                  </View>
                </View>
                <Text style={PrivacySecurityStyle.text3}>3</Text>
              </View>
            </TouchableOpacity>
            <DividerIcon style={PrivacySecurityStyle.divider} />

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("LinkedDevice");
              }}
            >
              <View style={PrivacySecurityStyle.bindview}>
                <View style={PrivacySecurityStyle.checkimgview}>
                  <View>
                    <Image
                      source={IMAGES.Contact}
                      style={PrivacySecurityStyle.imgicon}
                    />
                  </View>
                  <View style={PrivacySecurityStyle.innertextview}>
                    <Text style={PrivacySecurityStyle.textitem}>
                      Linked devices
                    </Text>
                    <Text style={PrivacySecurityStyle.subtext}>
                      Manage your linked devices
                    </Text>
                  </View>
                </View>
                <Text style={PrivacySecurityStyle.text3}>0</Text>
              </View>
            </TouchableOpacity>
            <DividerIcon style={PrivacySecurityStyle.divider} />

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("TwoStepVerification");
              }}
            >
              <View style={PrivacySecurityStyle.bindview}>
                <View style={PrivacySecurityStyle.checkimgview}>
                  <View>
                    <Image
                      source={IMAGES.Contact}
                      style={PrivacySecurityStyle.imgicon}
                    />
                  </View>
                  <View style={PrivacySecurityStyle.innertextview}>
                    <Text style={PrivacySecurityStyle.textitem}>
                      Two-Step Verification
                    </Text>
                    <Text style={PrivacySecurityStyle.subtext}>
                      Secure your account with 2 step verification
                    </Text>
                  </View>
                </View>
                <View style={PrivacySecurityStyle.icon}>
                  <TouchableOpacity>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={30}
                      color={_COLORS.Kodie_GrayColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            <DividerIcon style={PrivacySecurityStyle.divider} />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default PrivacySecurity;
