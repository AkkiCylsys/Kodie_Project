import { View, Text, TextInput, Image } from "react-native";
import React from "react";
import { ChangeContactInputStyle } from "./ChangeContactInputStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS,IMAGES } from "../../../../Themes";

const ChangeContactInput = () => {
  return (
    <>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Change contact details"}
      />
      <View style={ChangeContactInputStyle.maincontainer}>
        <View style={ChangeContactInputStyle.firstview}>
          <Text style={ChangeContactInputStyle.oldnumbertext}>
            Enter your old phone number with country code
          </Text>

          <View style={ChangeContactInputStyle.numbercodefirstview}>
            <View style={ChangeContactInputStyle.bindview}>
              <Text style={ChangeContactInputStyle.numbercode}>+61</Text>
              <Image
                style={ChangeContactInputStyle.downarrowimg}
                source={IMAGES.downarrow}
              />

              <Image
                style={ChangeContactInputStyle.lineimg}
                source={IMAGES.verticalLine}
              />

              <TextInput
                keyboardType="numeric"
                placeholder="1234567890"
                placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              />
            </View>
            <Image
              style={ChangeContactInputStyle.Vectorimg}
              source={IMAGES.pencile}
            />
          </View>
        </View>

        <View style={ChangeContactInputStyle.secondview}>
          <Text style={ChangeContactInputStyle.oldnumbertext}>
            Enter your new phone number with country code
          </Text>

          <View style={ChangeContactInputStyle.numbercodefirstview}>
            <View style={ChangeContactInputStyle.bindview}>
              <Text style={ChangeContactInputStyle.numbercode}>+61</Text>
              <Image
                style={ChangeContactInputStyle.downarrowimg}
                source={IMAGES.downarrow}
              />

              <Image
                style={ChangeContactInputStyle.lineimg}
                source={IMAGES.verticalLine}
              />

              <TextInput
                keyboardType="numeric"
                placeholder="1234567890"
                placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              />
            </View>
            <Image
              style={ChangeContactInputStyle.Vectorimg}
              source={IMAGES.pencile}
            />
          </View>
        </View>

        <View style={{ marginTop: 60, marginLeft: 15, marginRight: 15 }}>
          <CustomSingleButton
            _ButtonText={"Next"}
            Text_Color={_COLORS.Kodie_WhiteColor}
          />
        </View>
      </View>
    </>
  );
};

export default ChangeContactInput;
