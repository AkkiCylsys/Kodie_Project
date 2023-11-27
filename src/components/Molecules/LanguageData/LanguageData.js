import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { _COLORS } from "../../../Themes/index";

import { LanguageDataStyle } from "./LanguageDatastyle";
const languages = [
  {
    id: "1",
    language: "English",
    sub_lang: "english",
  },
  {
    id: "2",
    language: "العربية",
    sub_lang: "Arabic",
  },
  {
    id: "3",
    language: "беларускі",
    sub_lang: "Belarusian",
  },
  {
    id: "4",
    language: "Hrvatski",
    sub_lang: "Croatian",
  },
  {
    id: "5",
    language: "Nederlands",
    sub_lang: "Dutch",
  },
  {
    id: "6",
    language: "Feancais",
    sub_lang: "French",
  },
  {
    id: "7",
    language: "Deutsch",
    sub_lang: "German",
  },
  {
    id: "8",
    language: "Bahasa Insonesia",
    sub_lang: "Indonesian",
  },
  {
    id: "9",
    language: "한국인",
    sub_lang: "Korean",
  },
  {
    id: "10",
    language: "فارسی",
    sub_lang: "Persian",
  },
  {
    id: "11",
    language: "Español",
    sub_lang: "Spanish",
  },
];
const LanguageData = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const Language_renderData = ({ item, index }) => {
    return (
      <>
        <View style={LanguageDataStyle.mainConatiner}>
          <View style={LanguageDataStyle.container}>
            <TouchableOpacity onPress={() => setSelectedLanguage(item.id)}>
              <View
                style={[
                  LanguageDataStyle.radio_View,
                  {
                    borderColor:
                      selectedLanguage == item.id
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_ExtraLightGrayColor,
                  },
                ]}
              >
                {selectedLanguage == item.id ? (
                  <View style={LanguageDataStyle.radioBg}></View>
                ) : null}
              </View>
            </TouchableOpacity>
            <Text style={LanguageDataStyle.languageText}>{item.language}</Text>
            <View style={LanguageDataStyle.language_SubtextView}>
              <Text style={LanguageDataStyle.language_subtext}>
                {item.sub_lang}
              </Text>
            </View>
          </View>
          <View style={LanguageDataStyle.hor_Line} />
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
