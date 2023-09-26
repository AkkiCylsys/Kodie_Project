import { View, Text } from "react-native";
import React from "react";
import { ChangeNotifyStyle } from "./ChangeNotifyStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { Divider } from "react-native-paper";
import ToggleSwitch from "toggle-switch-react-native";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS } from "../../../../Themes";
// Screen no: 207
const ChangeContactNotify = () => {
  return (
    <>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Change contact details"}
      />
      <View style={ChangeNotifyStyle.maincontainer}>
        <View style={ChangeNotifyStyle.headingview}>
          <Text style={ChangeNotifyStyle.alltext}>
            You are about to change your number from
          </Text>
          <View style={ChangeNotifyStyle.numberview}>
            <Text style={ChangeNotifyStyle.firstnumbertext}>
              +61 123 456 7890{" "}
            </Text>
            <Text style={ChangeNotifyStyle.totext}> to </Text>
            <Text style={ChangeNotifyStyle.secondnumbertext}>
              {" "}
              +61 123 456 7890
            </Text>
          </View>
        </View>

        <Divider style={ChangeNotifyStyle.Dividerline} />
        <View>
          <View style={ChangeNotifyStyle.notifyview}>
            <Text style={ChangeNotifyStyle.notifytext}>Notify others</Text>
            <View>
              <ToggleSwitch
                isOn={false}
                onColor="#D8D8D8"
                offColor="#D8D8D8"
                size="small"
                thumbOnStyle={{ backgroundColor: "green" }}
                thumbOffStyle={{ backgroundColor: "black" }}
                onToggle={(isOn) => console.log("changed to : ", isOn)}
              />
            </View>
          </View>
        </View>

        <Divider style={ChangeNotifyStyle.Dividerlinesecond} />

        <View style={ChangeNotifyStyle.buttonview}>
          <CustomSingleButton
            _ButtonText={"Done"}
            Text_Color={_COLORS.Kodie_WhiteColor}
          />
        </View>
      </View>
    </>
  );
};

export default ChangeContactNotify;
