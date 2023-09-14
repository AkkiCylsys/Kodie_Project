import { View, Text, TextInput, Image } from "react-native";
import React from "react";
import { ChangeContactInputStyle } from "./ChangeContactInputStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
// import { TextInput } from "react-native-gesture-handler";
// import InputNumberPackage from "./InputNumberPackage";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS } from "../../../../Themes";

const ChangeContactInput = () => {
  return (
    <>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Change contact details"}
      />
      <View style={ChangeContactInputStyle.firstview}>
        <Text style={ChangeContactInputStyle.oldnumbertext}>
          Enter your old phone number with country code
        </Text>

        <View>
          <View>
            <Text style={ChangeContactInputStyle.numbercode}>+61</Text>
            <Image
              style={ChangeContactInputStyle.downarrowimg}
              source={require("../../../../assets/icons/downarrow.png")}
            />
            <Image
              style={ChangeContactInputStyle.lineimg}
              source={require("../../../../assets/icons/verticalLineimg.png")}
            />
            {/* <View  style={ChangeContactInputStyle.downarrowimg}></View> */}
          </View>
          <TextInput
            keyboardType="numeric"
            placeholder="1234567890"
            style={ChangeContactInputStyle.input}
          />
          <Image
            style={ChangeContactInputStyle.Vectorimg}
            source={require("../../../../assets/icons/Vector.png")}
          />
        </View>
      </View>

      <View style={ChangeContactInputStyle.secondview}>
        <Text style={ChangeContactInputStyle.oldnumbertext}>
          Enter your new phone number with country code
        </Text>

        <View>
          <View>
            <Text style={ChangeContactInputStyle.numbercode}>+61</Text>
            <Image
              style={ChangeContactInputStyle.downarrowimg}
              source={require("../../../../assets/icons/downarrow.png")}
            />
            <Image
              style={ChangeContactInputStyle.lineimg}
              source={require("../../../../assets/icons/verticalLineimg.png")}
            />
            {/* <View  style={ChangeContactInputStyle.downarrowimg}></View> */}
          </View>
          <TextInput
            keyboardType="numeric"
            placeholder="1234567890"
            style={ChangeContactInputStyle.input}
          />
          <Image
            style={ChangeContactInputStyle.Vectorimg}
            source={require("../../../../assets/icons/Vector.png")}
          />
          {/* <Image
            style={ChangeContactInputStyle.HorizontallineImage}
            source={require("../../../../assets/icons/HorizontallineImage.png")}
          /> */}
        </View>
      </View>

      <View style={{marginTop:60,marginLeft:15,marginRight:15}}>
        <CustomSingleButton
         _ButtonText={"Next"} 
         Text_Color={_COLORS.Kodie_WhiteColor}
         />
      </View>
    
    </>

    );
};

export default ChangeContactInput;
