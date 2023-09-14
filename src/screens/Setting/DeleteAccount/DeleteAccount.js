import { View, Text, Image,TextInput } from "react-native";
import React from "react";
import { DeleteAccountStyle } from "./DeleteAccountStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS } from "../../../Themes";
const DeleteAccount = () => {
  return (
    <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Delete this account"}
      />

      <View style={DeleteAccountStyle.headingview}>
        <Image
          style={DeleteAccountStyle.helpimg}
          source={require("../../../assets/icons/helpCenter.png")}
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
        <Image
          style={DeleteAccountStyle.Logoutimg}
          source={require("../../../assets/icons/Logout.png")}
        />
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
          To delete your account, confirm your country code and enter your phone
          or email address
        </Text>
      </View>
      
      <View style={DeleteAccountStyle.firstview}>
        <Text style={DeleteAccountStyle.oldnumbertext}>
        Phone number
        </Text>

        <View>
          <View>
            <Text style={DeleteAccountStyle.numbercode}>+61</Text>
            <Image
              style={DeleteAccountStyle.downarrowimg}
              source={require("../../../assets/icons/downarrow.png")}
            />
            <Image
              style={DeleteAccountStyle.lineimg}
              source={require("../../../assets/icons/verticalLineimg.png")}
            />
          </View>
          <TextInput
            keyboardType="numeric"
            placeholder="Phone number"
            style={DeleteAccountStyle.input}
          />
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

    </View>
  );
};

export default DeleteAccount;
