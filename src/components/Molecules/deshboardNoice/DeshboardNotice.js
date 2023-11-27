import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { _COLORS } from "../../../Themes";
import { DeshBoardNoticeCss } from "./DeshboardNoticeCss";
import Entypo from "react-native-vector-icons/Entypo";
const DeshboardNotice = (props) => {
  const [progress, setProgress] = useState(0.4);

  const handlePress = () => {
    setProgress((prevProgress) => prevProgress + 0.1);
  };

  return (
    <>
      <View style={DeshBoardNoticeCss.MainView}>
        <View style={DeshBoardNoticeCss.progressView}>
          <View style={DeshBoardNoticeCss?.PercenView}>
            <View style={DeshBoardNoticeCss?.percentageText}>
              <Text style={DeshBoardNoticeCss.progressText}>
                {(progress * 100).toFixed(0)}% complete, nice work!
              </Text>
            </View>
            <TouchableOpacity
              onPress={props._closeButton}
              style={[DeshBoardNoticeCss.crossview]}
            >
              <Entypo name="cross" size={15} color={_COLORS.Kodie_WhiteColor} />
            </TouchableOpacity>
          </View>
          <ProgressBar
            progress={0.4}
            width={300}
            height={8}
            color={_COLORS.Kodie_lightGreenColor}
            style={DeshBoardNoticeCss.progresBar}
            borderColor="black"
          />
          <Text style={DeshBoardNoticeCss.profileText}>
            We are happy to have you on board. You have almost completed your
            profile set up.
            <TouchableOpacity>
              <Text style={DeshBoardNoticeCss.continueText}>
                Tap to continue
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
        <View style={DeshBoardNoticeCss.spaceLine} />
        <View style={DeshBoardNoticeCss.trialView}>
          <Text style={DeshBoardNoticeCss.trialText}>
            Your free trial ends in 12 days.
          </Text>
          <TouchableOpacity style={DeshBoardNoticeCss.upgradeView}>
            <Text style={DeshBoardNoticeCss.upgradeText}>Upgrade now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default DeshboardNotice;
