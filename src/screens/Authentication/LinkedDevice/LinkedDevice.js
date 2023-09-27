import React, { useRef } from "react";
import {
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinkedDeviceStyle } from "../../Authentication/LinkedDevice/LinkedDeviceStyle";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, IMAGES } from "../../../Themes";
import TopHeader from "../../../components/Molecules/Header/Header";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { _goBack } from "../../../services/CommonServices";
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from "react-native-vector-icons/Entypo";
const LinkedDevice = (props) => {
  const refRBSheet = useRef();

  return (
    <>
      <View style={LinkedDeviceStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Linked devices"}
        />
        <ScrollView>
          <View style={LinkedDeviceStyle.container}>
            <View style={LinkedDeviceStyle.img}>
              <Image source={IMAGES.locketone} />
            </View>
            <View style={LinkedDeviceStyle.text}>
              <Text style={LinkedDeviceStyle.text1}>
                Use kodie on other devices
              </Text>
            </View>
            <View style={LinkedDeviceStyle.Button}>
              <CustomSingleButton
                _ButtonText={"Link a device"}
                Text_Color={_COLORS.Kodie_BlackColor}
                text_Size={14}
                backgroundColor={_COLORS.Kodie_lightGreenColor}
                height={40}
                marginTop={3}
                onPress={() => {
                  refRBSheet.current.open();
                }}
              />
            </View>
            <View>
              <Text style={LinkedDeviceStyle.Devicetext}>Device status</Text>
              <Text>Tap a device to log out</Text>
            </View>
            <DividerIcon style={LinkedDeviceStyle.divider} />
            <View>
              <View style={LinkedDeviceStyle.bindview}>
                <Image
                  source={IMAGES.windows}
                  style={LinkedDeviceStyle.imgicon}
                />
                <View style={LinkedDeviceStyle.innertextview}>
                  <Text style={LinkedDeviceStyle.textitem}>Windows</Text>
                  <Text>Active</Text>
                </View>
              </View>
            </View>
            <DividerIcon style={LinkedDeviceStyle.divider} />
            <View>
              <View style={LinkedDeviceStyle.bindview}>
                <Image
                  source={IMAGES.chrome}
                  style={LinkedDeviceStyle.imgicon}
                />
                <View style={LinkedDeviceStyle.innertextview}>
                  <Text style={LinkedDeviceStyle.textitem}>
                    Google chrome (Windows)
                  </Text>
                  <Text>Last active today at 12:10 PM </Text>
                </View>
              </View>
            </View>
            <DividerIcon style={LinkedDeviceStyle.divider} />
            <View>
              <View style={LinkedDeviceStyle.bindview}>
                <Image
                  source={IMAGES.firefox}
                  style={LinkedDeviceStyle.imgicon}
                />
                <View style={LinkedDeviceStyle.innertextview}>
                  <Text style={LinkedDeviceStyle.textitem}>
                    Firefox (Windows)
                  </Text>
                  <Text>Last active today at 12:20 PM </Text>
                </View>
              </View>
            </View>
            <DividerIcon style={LinkedDeviceStyle.divider} />
          </View>
        </ScrollView>
        <RBSheet
          ref={refRBSheet}
          height={150}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: LinkedDeviceStyle.bottomModal_container,
          }}
        >
          <View style={LinkedDeviceStyle.item}>
            <Text style={LinkedDeviceStyle.Logouttext}>Logout from device</Text>
            <TouchableOpacity>
              <Entypo name="cross" size={20} />
            </TouchableOpacity>
          </View>
          <View style={LinkedDeviceStyle.btn}>
            <Text style={LinkedDeviceStyle.Cancelbtn}>Cancel</Text>
            <View style={LinkedDeviceStyle.Logoutbtnview}>

            <Text style={LinkedDeviceStyle.Logoutbtn}>Logout</Text>
            </View>
          </View>
        </RBSheet>
      </View>
    </>
  );
};

export default LinkedDevice;
