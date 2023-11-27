import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React,{useState} from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { GeneralSettingStyle } from "../Account/GeneralSettingStyle";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { _goBack } from "../../../services/CommonServices/CommonMethods";
import { _COLORS } from "../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import SwitchToggle from "react-native-switch-toggle";
const GeneralSetting = (props) => {
  const [on, setOn] = useState(true);
  <SwitchToggle switchOn={on} onPress={() => setOn(!on)} />;
  const [Off, setOff] = useState(false);
  <SwitchToggle switchOff={Off} onPress={() => setOff(!Off)} />;
  return (
    <>
      <View style={GeneralSettingStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"General Setting"}
        />
        <ScrollView>
          <View style={GeneralSettingStyle.Container}>
            <Text style={GeneralSettingStyle.TextCalendar}>
              Calendar settings
            </Text>
            <Text style={GeneralSettingStyle.text}>
              These options will allow you to change your preferred weekly
              availability to ensure that bookings are only made when you are
              available.
            </Text>
            <View>
              <View style={GeneralSettingStyle.row}>
                <View>
                  <Text style={GeneralSettingStyle.Time}>Time zone</Text>
                  <Text style={{ fontSize: 12 }}>
                    Select your region’s time zone
                  </Text>
                </View>
                <View>
                  <Text style={GeneralSettingStyle.GMT}>
                    (GMT + 10:00) Sydney
                  </Text>
                </View>
              </View>
            </View>
            <DividerIcon style={GeneralSettingStyle.divider} />
            <View style={GeneralSettingStyle.item1}>
              <Text style={GeneralSettingStyle.sundaytext}>Sunday</Text>
              <Text style={GeneralSettingStyle.Unvl}>Unavailable</Text>
              
              <SwitchToggle
              switchOff={Off}
              onPress={() => setOff(!Off)}
              circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={GeneralSettingStyle.toggle_con}
              circleStyle={GeneralSettingStyle.toggle_circle}
            />
            </View>
            <DividerIcon style={GeneralSettingStyle.divider} />
            <View style={GeneralSettingStyle.component}>
              <Text style={GeneralSettingStyle.sundaytext}>Monday</Text>
              <SwitchToggle
              switchOn={on}
              onPress={() => setOn(!on)}
              circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={GeneralSettingStyle.toggle_con}
              circleStyle={GeneralSettingStyle.toggle_circle}
            />
            </View>
            <View style={GeneralSettingStyle.item1}>
              <View style={GeneralSettingStyle.binditem1view}>
                <Text style={GeneralSettingStyle.Mondaytime}>9:00AM</Text>
                <Text style={GeneralSettingStyle.To}>to</Text>
                <Text style={GeneralSettingStyle.Mondaytime}>12:00PM</Text>
              </View>
              <View style={GeneralSettingStyle.Crossicon}>
                <TouchableOpacity>
                  <Entypo name="cross" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={GeneralSettingStyle.item1}>
              <View style={GeneralSettingStyle.binditem1view}>
                <Text style={GeneralSettingStyle.Mondaytime}>1:00PM</Text>
                <Text style={GeneralSettingStyle.To}>to</Text>
                <Text style={GeneralSettingStyle.Mondaytime}>4:00PM</Text>
              </View>
              <View style={GeneralSettingStyle.Crossicon}>
                <TouchableOpacity>
                  <Entypo name="cross" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <DividerIcon style={GeneralSettingStyle.divider} />
            <View style={GeneralSettingStyle.component}>
              <Text style={GeneralSettingStyle.sundaytext}>Tuesday</Text>
              <SwitchToggle
              switchOn={on}
              onPress={() => setOn(!on)}
              circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={GeneralSettingStyle.toggle_con}
              circleStyle={GeneralSettingStyle.toggle_circle}
            />
            </View>
            <View style={GeneralSettingStyle.item1}>
              <View style={GeneralSettingStyle.binditem1view}>
                <Text style={GeneralSettingStyle.Mondaytime}>9:00AM</Text>
                <Text style={GeneralSettingStyle.To}>to</Text>
                <Text style={GeneralSettingStyle.Mondaytime}>12:00PM</Text>
              </View>
              <View style={GeneralSettingStyle.Crossicon}>
                <TouchableOpacity>
                  <Entypo name="cross" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={GeneralSettingStyle.item1}>
              <View style={GeneralSettingStyle.binditem1view}>
                <Text style={GeneralSettingStyle.Mondaytime}>1:00PM</Text>
                <Text style={GeneralSettingStyle.To}>to</Text>
                <Text style={GeneralSettingStyle.Mondaytime}>4:00PM</Text>
              </View>
              <View style={GeneralSettingStyle.Crossicon}>
                <TouchableOpacity>
                  <Entypo name="cross" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <DividerIcon style={GeneralSettingStyle.divider} />
            <View style={GeneralSettingStyle.component}>
              <Text style={GeneralSettingStyle.sundaytext}>Wednesday</Text>
              <SwitchToggle
              switchOn={on}
              onPress={() => setOn(!on)}
              circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={GeneralSettingStyle.toggle_con}
              circleStyle={GeneralSettingStyle.toggle_circle}
            />
            </View>
            <View style={GeneralSettingStyle.item1}>
              <View style={GeneralSettingStyle.binditem1view}>
                <Text style={GeneralSettingStyle.Mondaytime}>9:00AM</Text>
                <Text style={GeneralSettingStyle.To}>to</Text>
                <Text style={GeneralSettingStyle.Mondaytime}>12:00PM</Text>
              </View>
              <View style={GeneralSettingStyle.Crossicon}>
                <TouchableOpacity>
                  <Entypo name="cross" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={GeneralSettingStyle.item1}>
              <View style={GeneralSettingStyle.binditem1view}>
                <Text style={GeneralSettingStyle.Mondaytime}>1:00PM</Text>
                <Text style={GeneralSettingStyle.To}>to</Text>
                <Text style={GeneralSettingStyle.Mondaytime}>4:00PM</Text>
              </View>
              <View style={GeneralSettingStyle.Crossicon}>
                <TouchableOpacity>
                  <Entypo name="cross" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <DividerIcon style={GeneralSettingStyle.divider} />
            <View style={GeneralSettingStyle.component}>
              <Text style={GeneralSettingStyle.sundaytext}>Thursday</Text>
              <SwitchToggle
              switchOn={on}
              onPress={() => setOn(!on)}
              circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={GeneralSettingStyle.toggle_con}
              circleStyle={GeneralSettingStyle.toggle_circle}
            />
            </View>
            <View style={GeneralSettingStyle.item1}>
              <View style={GeneralSettingStyle.binditem1view}>
                <Text style={GeneralSettingStyle.Mondaytime}>9:00AM</Text>
                <Text style={GeneralSettingStyle.To}>to</Text>
                <Text style={GeneralSettingStyle.Mondaytime}>12:00PM</Text>
              </View>
              <View style={GeneralSettingStyle.Crossicon}>
                <TouchableOpacity>
                  <Entypo name="cross" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={GeneralSettingStyle.item1}>
              <View style={GeneralSettingStyle.binditem1view}>
                <Text style={GeneralSettingStyle.Mondaytime}>1:00PM</Text>
                <Text style={GeneralSettingStyle.To}>to</Text>
                <Text style={GeneralSettingStyle.Mondaytime}>4:00PM</Text>
              </View>
              <View style={GeneralSettingStyle.Crossicon}>
                <TouchableOpacity>
                  <Entypo name="cross" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <DividerIcon style={GeneralSettingStyle.divider} />
            <View style={GeneralSettingStyle.component}>
              <Text style={GeneralSettingStyle.sundaytext}>Friday</Text>
              <SwitchToggle
              switchOn={on}
              onPress={() => setOn(!on)}
              circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={GeneralSettingStyle.toggle_con}
              circleStyle={GeneralSettingStyle.toggle_circle}
            />
            </View>
            <View style={GeneralSettingStyle.item1}>
              <View style={GeneralSettingStyle.binditem1view}>
                <Text style={GeneralSettingStyle.Mondaytime}>9:00AM</Text>
                <Text style={GeneralSettingStyle.To}>to</Text>
                <Text style={GeneralSettingStyle.Mondaytime}>12:00PM</Text>
              </View>
              <View style={GeneralSettingStyle.Crossicon}>
                <TouchableOpacity>
                  <Entypo name="cross" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={GeneralSettingStyle.item1}>
              <View style={GeneralSettingStyle.binditem1view}>
                <Text style={GeneralSettingStyle.Mondaytime}>1:00PM</Text>
                <Text style={GeneralSettingStyle.To}>to</Text>
                <Text style={GeneralSettingStyle.Mondaytime}>4:00PM</Text>
              </View>
              <View style={GeneralSettingStyle.Crossicon}>
                <TouchableOpacity>
                  <Entypo name="cross" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <DividerIcon style={GeneralSettingStyle.divider} />
            <View style={GeneralSettingStyle.item1}>
              <Text style={GeneralSettingStyle.sundaytext}>Saturday</Text>
              <Text style={GeneralSettingStyle.Unvl}>Unavailable</Text>
              <SwitchToggle
              switchOff={Off}
              onPress={() => setOff(!Off)}
              circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={GeneralSettingStyle.toggle_con}
              circleStyle={GeneralSettingStyle.toggle_circle}
            />
            </View>
            <DividerIcon style={GeneralSettingStyle.divider} />
            <CustomSingleButton
              _ButtonText={"Save"}
              Text_Color={_COLORS.Kodie_WhiteColor}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default GeneralSetting;
