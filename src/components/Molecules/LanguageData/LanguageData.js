import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import { IMAGES, _COLORS } from "../../../Themes/index";
import { RadioButton } from "react-native-paper";
import { LanguageDataStyle } from "./LanguageDatastyle";
import DividerIcon from "../../Atoms/Devider/DividerIcon";
// const language = [
//   "English",
//   "Spanish",
//   "French",
//   "German",
//   // Add more languages as needed
// ];
const languages = [
  {
    id: "1",
    language: "English",
    sub_lang: "english",
  },
  {
    id: "2",
    language: "English",
    sub_lang: "english",
  },
];
const LanguageData = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };
  const Language_renderData = ({ item, index }) => {
    return (
      <>
        <View>
          <View style={LanguageDataStyle.Container}>
            <View style={LanguageDataStyle.radioBtn} key={index}>
              <RadioButton
                value={item.language}
                status={
                  selectedLanguage === item.language ? "checked" : "unchecked"
                }
                onPress={() => handleLanguageChange(item.language)}
              />
              <Text style={LanguageDataStyle.languageText}>
                {item.language}
              </Text>
            </View>

            <Text style={LanguageDataStyle.sublanguage}>{item.sub_lang}</Text>
          </View>
          <DividerIcon />
        </View>
      </>
    );
  };
  return (
    <>
      <FlatList
        data={languages}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={Language_renderData}
      />
    </>
  );
};
export default LanguageData;
