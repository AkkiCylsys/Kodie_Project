import React, { useRef } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { TwoStepVerificationStyle6 } from "./TwoStepVerificationStyle6";
import { _COLORS, IMAGES } from "../../../Themes";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from "react-native-vector-icons/Entypo";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
const TwoStepVerification6 = (props) => {
  const refRBSheet = useRef();
  return (
    <>
      <View style={TwoStepVerificationStyle6.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Two-step verification"}
        />
        <DividerIcon style={TwoStepVerificationStyle6.divider} />
        <View style={TwoStepVerificationStyle6.img}>
          <Image source={IMAGES.lock} />
        </View>
        <View style={TwoStepVerificationStyle6.text}>
          <Text style={{ textAlign: "center" }}>
            Two-step verification is switched on. You will need to enter your
            pin when you log in to kodie using your email again.
          </Text>
        </View>
        <DividerIcon style={TwoStepVerificationStyle6.divider1} />
        <ScrollView>
          <View style={TwoStepVerificationStyle6.container}>
            <View style={TwoStepVerificationStyle6.mainbindview}>
              <View style={TwoStepVerificationStyle6.bindview}>
                <View style={TwoStepVerificationStyle6.checkimgview}>
                  <TouchableOpacity
                    onPress={() => {
                      refRBSheet.current.open();
                    }}
                  >
                    <Image
                      source={IMAGES.CheckIcon}
                      style={TwoStepVerificationStyle6.imgicon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={TwoStepVerificationStyle6.innertextview}>
                  <Text style={TwoStepVerificationStyle6.textitem}>
                    Turn off
                  </Text>
                </View>
              </View>
              <View style={TwoStepVerificationStyle6.bindview}>
                <View style={TwoStepVerificationStyle6.checkimgview}>
                  <TouchableOpacity>
                    <Image
                      source={IMAGES.CheckIcon}
                      style={TwoStepVerificationStyle6.imgicon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={TwoStepVerificationStyle6.innertextview}>
                  <Text style={TwoStepVerificationStyle6.textitem}>
                    Change PIN
                  </Text>
                </View>
              </View>
              <View style={TwoStepVerificationStyle6.bindview}>
                <View style={TwoStepVerificationStyle6.checkimgview}>
                  <TouchableOpacity>
                    <Image
                      source={IMAGES.CheckIcon}
                      style={TwoStepVerificationStyle6.imgicon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={TwoStepVerificationStyle6.innertextview}>
                  <Text style={TwoStepVerificationStyle6.textitem}>
                    Change email address
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <RBSheet
          ref={refRBSheet}
          height={140}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0, 0, 0, 0.20)",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_BlackColor,
            },
            container: TwoStepVerificationStyle6.bottomModal_container,
          }}
        >
          <View style={TwoStepVerificationStyle6.item}>
            <Text style={TwoStepVerificationStyle6.Logouttext}>
              Turn two-step verification off
            </Text>
            <TouchableOpacity>
              <Entypo name="cross" size={30} color={"black"} />
            </TouchableOpacity>
          </View>
          <View style={TwoStepVerificationStyle6.btn}>
            <Text style={TwoStepVerificationStyle6.Cancelbtn}>Cancel</Text>
            <View style={TwoStepVerificationStyle6.Logoutbtnview}>
              <Text style={TwoStepVerificationStyle6.Logoutbtn}>Turn off</Text>
            </View>
          </View>
        </RBSheet>
      </View>
    </>
  );
};

export default TwoStepVerification6;
