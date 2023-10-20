import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { SelectPropertiesStyle } from "./SelectPropertiesStyle";
import Entypo from "react-native-vector-icons/Entypo";
import { _COLORS } from "../../../Themes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Divider } from "react-native-paper";

const SelectProperties = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [show , setShow ] = useState(false);
  const [inglewood, setInglewood] = useState(false);
  const [cir, setCir] = useState(false);
  const [qld, setQld] = useState(false);

  const toggleAll = () => {
    const selectAll = !show;
    setShow(selectAll);
    setInglewood(selectAll);
    setCir(selectAll);
    setQld(selectAll);
  };
  const toggleinglewood = () => {
    setInglewood(!inglewood);
  };
  const togglecir = () => {
    setCir(!cir);
  };
  const toggleqld = () => {
    setQld(!qld);
  };
  const handleClosePopup = () => {
    setPopupVisible(true);
  };

  return (
    <View>
      <View style={SelectPropertiesStyle.headingview}>
        <Text style={SelectPropertiesStyle.headingtext}>
        Select properties
        </Text>
        <TouchableOpacity onPress={handleClosePopup}>
          <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
        </TouchableOpacity>
      </View>

        <View style={SelectPropertiesStyle.optionsmainview}>
      <ScrollView>
          <View style={SelectPropertiesStyle.optionsview}>
            <TouchableOpacity onPress={toggleAll}>
              <View style={SelectPropertiesStyle.optionsiconview}>
                <MaterialCommunityIcons
                  size={25}
                  color={_COLORS.Kodie_GrayColor}
                  name={show ? "checkbox-marked" : "checkbox-blank-outline"}
                />
              </View>
            </TouchableOpacity>
            <Text style={SelectPropertiesStyle.textoption}>All</Text>
          </View>
          <Divider  style={SelectPropertiesStyle.Divider}/>

          <View style={SelectPropertiesStyle.optionsview}>
          <TouchableOpacity onPress={toggleinglewood}>
              <View style={SelectPropertiesStyle.optionsiconview}>
                <MaterialCommunityIcons
                  size={25}
                  color={_COLORS.Kodie_GrayColor}
                  name={inglewood ? "checkbox-marked" : "checkbox-blank-outline"}
                />
              </View>
            </TouchableOpacity>
            <Text style={SelectPropertiesStyle.textoption}>
              8052 Preston Rd. Inglewood
            </Text>
          </View>

          <View style={SelectPropertiesStyle.optionsview}>
          <TouchableOpacity onPress={togglecir}>
              <View style={SelectPropertiesStyle.optionsiconview}>
                <MaterialCommunityIcons
                  size={25}
                  color={_COLORS.Kodie_GrayColor}
                  name={cir ? "checkbox-marked" : "checkbox-blank-outline"}
                />
              </View>
            </TouchableOpacity>
            <Text style={SelectPropertiesStyle.textoption}>
              2118 Thornridge Cir. Syracuse
            </Text>
          </View>

          <View style={SelectPropertiesStyle.optionsview}>
          <TouchableOpacity onPress={toggleqld}>
              <View style={SelectPropertiesStyle.optionsiconview}>
                <MaterialCommunityIcons
                  size={25}
                  color={_COLORS.Kodie_GrayColor}
                  name={qld ? "checkbox-marked" : "checkbox-blank-outline"}
                />
              </View>
            </TouchableOpacity>
            <Text style={SelectPropertiesStyle.textoption}>
              1729 Sickle St, QLD
            </Text>
          </View>
      </ScrollView>
        </View>
    </View>
  );
};

export default SelectProperties;
