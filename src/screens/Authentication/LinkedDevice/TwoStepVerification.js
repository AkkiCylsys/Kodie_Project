import React, { useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { TwoStepVerificationStyle } from "./TwoStepVerificationStyle";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, IMAGES, LABEL_STYLES } from "../../../Themes";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import Entypo from "react-native-vector-icons/Entypo";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
  useBlurOnFulfill,
} from "react-native-confirmation-code-field";
import RBSheet from "react-native-raw-bottom-sheet";
const TwoStepVerification = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet = useRef();
  const [isClick, setIsClick] = useState(0);
  const CELL_COUNT = 6;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [doneContent, setDoneContent] = useState("");

  const buttonLabels = ["Turn on", "Next", "Next", "Next", "Next", "Done"];
  const handleButtonPress = () => {
    if (isClick === 5) {
      setDoneContent(!doneContent);
    } else {
      setIsClick((prev) => (prev + 1) % 6);
    }
  };
  return (
    <>
      <View style={TwoStepVerificationStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Two-step verification"}
        />
        {!doneContent ? (
          <ScrollView>
            <View style={TwoStepVerificationStyle.container}>
              {isClick === 0 && (
                <>
                  <View style={TwoStepVerificationStyle.img}>
                    <Image
                      source={IMAGES.lock}
                      style={TwoStepVerificationStyle.Imagestyle}
                    />
                  </View>
                  <View style={TwoStepVerificationStyle.text}>
                    <Text style={LABEL_STYLES.commonMidtext}>
                      For extra security turn on two-step verification which
                      will require a PIN when Login your email with Kodie again.
                    </Text>
                  </View>
                </>
              )}
              {isClick === 1 && (
                <>
                  <Text style={LABEL_STYLES.commontext}>
                    Create a 6-digit PIN that you can remember
                  </Text>
                  <View style={TwoStepVerificationStyle.otp_view}>
                    <CodeField
                      ref={ref}
                      {...prop}
                      value={value}
                      onChangeText={setValue}
                      cellCount={CELL_COUNT}
                      rootStyle={TwoStepVerificationStyle.CodeField}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      renderCell={({ index, symbol, isFocused }) => (
                        <Text
                          key={index}
                          style={[
                            TwoStepVerificationStyle.cell,
                            isFocused && TwoStepVerificationStyle.focusCell,
                          ]}
                          onLayout={getCellOnLayoutHandler(index)}
                        >
                          {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                      )}
                    />
                  </View>
                </>
              )}
              {isClick === 2 && (
                <>
                  <Text style={LABEL_STYLES.commontext}>Confirm your pin</Text>
                  <View style={TwoStepVerificationStyle.otp_view}>
                    <CodeField
                      ref={ref}
                      {...prop}
                      value={value}
                      onChangeText={setValue}
                      cellCount={CELL_COUNT}
                      rootStyle={TwoStepVerificationStyle.CodeField}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      renderCell={({ index, symbol, isFocused }) => (
                        <Text
                          key={index}
                          style={[
                            TwoStepVerificationStyle.cell,
                            isFocused && TwoStepVerificationStyle.focusCell,
                          ]}
                          onLayout={getCellOnLayoutHandler(index)}
                        >
                          {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                      )}
                    />
                  </View>
                </>
              )}
              {isClick === 3 && (
                <>
                  <Text style={LABEL_STYLES.commontext}>
                    Add an email so you can reset your PIN if you forget it.
                  </Text>
                  <View>
                    <TextInput
                      style={TwoStepVerificationStyle.input}
                      placeholder="Add email address"
                      placeholderTextColor="#999"
                    />
                  </View>
                </>
              )}
              {isClick === 4 && (
                <>
                  <Text style={LABEL_STYLES.commontext}>
                    Confirm your email address
                  </Text>
                  <View>
                    <TextInput
                      style={TwoStepVerificationStyle.input}
                      placeholder="Add email address"
                      placeholderTextColor="#999"
                    />
                  </View>
                </>
              )}
              {isClick === 5 && (
                <>
                  <View style={TwoStepVerificationStyle.img}>
                    <Image
                      source={IMAGES.lock}
                      style={TwoStepVerificationStyle.Imagestyle}
                    />
                  </View>
                  <View style={TwoStepVerificationStyle.text}>
                    <Text style={LABEL_STYLES.commonMidtext}>
                      Two-step verification has been switched on.
                    </Text>
                  </View>
                </>
              )}
              <View style={TwoStepVerificationStyle.Button}>
                <CustomSingleButton
                  disabled={isLoading ? true : false}
                  _ButtonText={buttonLabels[isClick]}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  text_Size={14}
                  backgroundColor={_COLORS.Kodie_BlackColor}
                  height={48}
                  marginTop={3}
                  onPress={handleButtonPress}
                />
              </View>
              {(isClick === 3 || isClick === 4) && (
                <>
                  <View style={TwoStepVerificationStyle.Button2}>
                    <CustomSingleButton
                      disabled={isLoading ? true : false}
                      _ButtonText={"Skip"}
                      Text_Color={_COLORS.Kodie_BlackColor}
                      text_Size={16}
                      backgroundColor={_COLORS.Kodie_WhiteColor}
                      height={48}
                      marginTop={3}
                    />
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        ) : (
          <ScrollView>
            <View style={TwoStepVerificationStyle.container}>
              <View style={TwoStepVerificationStyle.img}>
                <Image
                  source={IMAGES.lock}
                  style={TwoStepVerificationStyle.Imagestyle}
                />
              </View>
              <View style={TwoStepVerificationStyle.text}>
                <Text style={{ textAlign: "center" }}>
                  Two-step verification is switched on. You will need to enter
                  your pin when you log in to kodie using your email again.
                </Text>
              </View>
              <DividerIcon />
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.open();
                }}
                style={TwoStepVerificationStyle.bindview}
              >
                <Image
                  source={IMAGES.TurnOff}
                  style={TwoStepVerificationStyle.imgicon}
                  resizeMode={"center"}
                />
                <View style={TwoStepVerificationStyle.innertextview}>
                  <Text style={TwoStepVerificationStyle.textitem}>
                    Turn off
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={TwoStepVerificationStyle.bindview}>
                <Image
                  source={IMAGES.ChangePin}
                  style={TwoStepVerificationStyle.imgicon}
                  resizeMode={"center"}
                />
                <View style={TwoStepVerificationStyle.innertextview}>
                  <Text style={TwoStepVerificationStyle.textitem}>
                    Change PIN
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={TwoStepVerificationStyle.bindview}>
                <Image
                  source={IMAGES.changeEmail}
                  style={TwoStepVerificationStyle.imgicon}
                  resizeMode={"center"}
                />
                <View style={TwoStepVerificationStyle.innertextview}>
                  <Text style={TwoStepVerificationStyle.textitem}>
                    Change email address
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
        <RBSheet
          ref={refRBSheet}
          height={140}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0, 0, 0, 0.20)",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_BlackColor,
            },
            container: TwoStepVerificationStyle.bottomModal_container,
          }}
        >
          <View style={TwoStepVerificationStyle.item}>
            <Text style={TwoStepVerificationStyle.Logouttext}>
              Logout from device
            </Text>
            <TouchableOpacity>
              <Entypo name="cross" size={30} color={"black"} />
            </TouchableOpacity>
          </View>
          <View style={TwoStepVerificationStyle.btn}>
            <Text style={TwoStepVerificationStyle.Cancelbtn}>Cancel</Text>
            <View style={TwoStepVerificationStyle.Logoutbtnview}>
              <Text style={TwoStepVerificationStyle.Logoutbtn}>Logout</Text>
            </View>
          </View>
        </RBSheet>
      </View>
    </>
  );
};

export default TwoStepVerification;
