import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React from "react";
import { DeleteAccountStyle } from "./DeleteAccountStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, IMAGES } from "../../../Themes";
import { _goBack } from "../../../services/CommonServices";
const DeleteAccount = (props) => {
  return (
    <>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Delete this account"}
      />
      <ScrollView style={DeleteAccountStyle.container}>
        <View style={DeleteAccountStyle.headingview}>
          <Image
            style={DeleteAccountStyle.helpimg}
            source={IMAGES.helpCenter}
          />
          <Text style={DeleteAccountStyle.accounttext}>
            If you delete this account
          </Text>
        </View>

        <View style={DeleteAccountStyle.Pointsview}>
          <Text style={DeleteAccountStyle.textpoint}>
            • The account will be deleted from Kodie and all your devices
          </Text>
          <Text style={DeleteAccountStyle.textpoint}>
            • Your message history will be erased
          </Text>
          <Text style={DeleteAccountStyle.textpoint}>
            • Delete your payments info
          </Text>
          <Text style={DeleteAccountStyle.textpoint}>
            • Property data will also be deleted
          </Text>
        </View>

        <View style={DeleteAccountStyle.logoutview}>
          <Image style={DeleteAccountStyle.Logoutimg} source={IMAGES.Log_Out} />
          <Text style={DeleteAccountStyle.insteadtext}>
            Change number instead?
          </Text>
        </View>

        <View style={DeleteAccountStyle.buttonview}>
          <CustomSingleButton
            _ButtonText={"Change number instead"}
            backgroundColor={_COLORS.Kodie_lightGreenColor}
            Text_Color={_COLORS.Kodie_BlackColor}
          />
        </View>

        <View style={DeleteAccountStyle.toconfirmview}>
          <Text style={DeleteAccountStyle.toconfirmtext}>
            To delete your account, confirm your country code and enter your
            phone or email address
          </Text>
        </View>

        <View style={DeleteAccountStyle.firstview}>
          <Text style={DeleteAccountStyle.oldnumbertext}>Phone number</Text>

          <View>
            <View style={DeleteAccountStyle.inputview}>
              <Text style={DeleteAccountStyle.numbercode}>+61</Text>
              <Image
                style={DeleteAccountStyle.downarrowimg}
                source={IMAGES.downarrow}
              />
              <Image
                style={DeleteAccountStyle.lineimg}
                source={IMAGES.verticalLine}
              />
              <TextInput
                keyboardType="numeric"
                placeholder="Phone number"
                placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              />
            </View>
          </View>
        </View>

        <View style={DeleteAccountStyle.firstemailview}>
          <Text style={DeleteAccountStyle.oldnumbertext}>
            Enter your email address
          </Text>

          <View>
            <TextInput
              keyboardType="text"
              placeholder="Email"
              style={DeleteAccountStyle.inputemail}
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            />
          </View>
        </View>

        <View style={DeleteAccountStyle.buttonblackview}>
          <CustomSingleButton
            _ButtonText={"Delete account"}
            backgroundColor={_COLORS.Kodie_BlackColor}
            Text_Color={_COLORS.Kodie_WhiteColor}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default DeleteAccount;
