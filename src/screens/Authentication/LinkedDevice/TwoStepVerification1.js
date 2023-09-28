import React,{ useState} from "react";
import {
  Text,
  View,
  ScrollView,
} from "react-native";
import { TwoStepVerificationStyle1 } from "./TwoStepVerificationStyle1";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS } from "../../../Themes";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import { CodeField, Cursor,useClearByFocusCell,useBlurOnFulfill } from "react-native-confirmation-code-field";
const TwoStepVerification1 = (props) => {
    const CELL_COUNT = 6;
    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
      });
  return (
    <>
      <View style={TwoStepVerificationStyle1.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Two-step verification"}
        />
        <DividerIcon style={TwoStepVerificationStyle1.divider} />
        <ScrollView>
          <View style={TwoStepVerificationStyle1.container}>
              <Text style={TwoStepVerificationStyle1.text}>
                Create a 6-digit PIN that you can remember
              </Text>
              <View style={TwoStepVerificationStyle1.otp_view}>
          <CodeField
            ref={ref}
            {...prop}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={TwoStepVerificationStyle1.CodeField}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[
                    TwoStepVerificationStyle1.cell,
                  isFocused && TwoStepVerificationStyle1.focusCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
            <View style={TwoStepVerificationStyle1.Button}>
              <CustomSingleButton
                _ButtonText={"Next"}
                Text_Color={_COLORS.Kodie_WhiteColor}
                text_Size={16}
                backgroundColor={_COLORS.Kodie_BlackColor}
                height={58}
                marginTop={3}
              />
            </View>
          </View>
        </ScrollView>
        
      </View>
    </>
  );
};

export default TwoStepVerification1;
