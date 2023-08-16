import React, { useState } from "react";
import { View, Text } from "react-native";
import { Languagestyle } from "./LanguageStyle";
import { _COLORS } from "../../../Themes";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SwitchToggle from "react-native-switch-toggle";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import LanguageData from "../../../components/Molecules/LanguageData/LanguageData";
export default Language = () => {
  const [on, setOn] = useState(true);
  <SwitchToggle switchOn={on} onPress={() => setOn(!on)} />;
  return (
    <View style={Languagestyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Language"}
      />
      <View style={Languagestyle.subConatainer}>
        <View style={Languagestyle.translate_view}>
          <Text style={Languagestyle.translate_Text}>
            {"Translate Message"}
          </Text>
          <View style={Languagestyle.premium_view}>
            <MaterialIcons
              name="lock"
              size={15}
              color={_COLORS.Kodie_GreenColor}
              style={Languagestyle.lock_Icon}
            />
            <Text style={Languagestyle.premium_Text}>{"Premium"}</Text>
          </View>
        </View>
        <View style={Languagestyle.tranlateBtn_View}>
          <Text style={Languagestyle.translateBtn_Text}>
            {"Show Translate  Button"}
          </Text>
          <SwitchToggle
            switchOn={on}
            onPress={() => setOn(!on)}
            circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
            circleColorOn={_COLORS.Kodie_GreenColor}
            backgroundColorOn="#F1F1F1"
            backgroundColorOff="#F1F1F1"
            containerStyle={Languagestyle.toggle_con}
            circleStyle={Languagestyle.toggle_circle}
          />
        </View>
        <View style={Languagestyle.tranlateBtn_View}>
          <Text style={Languagestyle.translateBtn_Text}>
            {"Translate Entire Chats"}
          </Text>
          <SwitchToggle
            switchOn={on}
            onPress={() => setOn(!on)}
            circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
            circleColorOn={_COLORS.Kodie_GreenColor}
            backgroundColorOn="#F1F1F1"
            backgroundColorOff="#F1F1F1"
            containerStyle={Languagestyle.toggle_con}
            circleStyle={Languagestyle.toggle_circle}
          />
        </View>
      </View>
      <DividerIcon />
      <View style={Languagestyle.language_view}>
        <Text style={Languagestyle.language_Text}>{"Language"}</Text>
      </View>
      <SearchBar backSearchIcon />
      <LanguageData/>
    </View>
  );
};
