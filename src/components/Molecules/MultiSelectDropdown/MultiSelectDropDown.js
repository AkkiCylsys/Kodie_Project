import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FONTFAMILY, _COLORS } from "../../../Themes";

const options = [
  { name: "All Select" },
  { name: "Option 1" },
  { name: "Option 2" },
  { name: "Option 3" },
];

const MultiSelectDropDown = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // A separate state to track temporary selections before clicking "OK"
  const [tempSelectedOptions, setTempSelectedOptions] = useState([]);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const toggleOption = (optionName) => {
    if (optionName === "All Select") {
      // Handle the "All Select" option separately
      setTempSelectedOptions(options.slice(1).map((item) => item.name));
    } else {
      const updatedTempSelectedOptions = [...tempSelectedOptions];
      const index = updatedTempSelectedOptions.indexOf(optionName);

      if (index !== -1) {
        updatedTempSelectedOptions.splice(index, 1); // Deselect
      } else {
        updatedTempSelectedOptions.push(optionName); // Select
      }

      setTempSelectedOptions(updatedTempSelectedOptions);
    }
  };

  const handleOkPress = () => {
    // After clicking "OK," update the selectedOptions array with the temporary selections
    setSelectedOptions(tempSelectedOptions);
    toggleModal();
  };

  useEffect(() => {
    // When selectedOptions change, update tempSelectedOptions to reflect the current selection
    setTempSelectedOptions(selectedOptions);
  }, [selectedOptions]);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={toggleModal}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: _COLORS.Kodie_GrayColor,
          }}
        >
          <TextInput
            value={selectedOptions ? selectedOptions.join(", ") : ""}
            placeholder={"Selected Items"}
            style={{
              flex: 1,
              fontSize: 14,
              color: _COLORS.Kodie_BlackColor,

              fontFamily: FONTFAMILY.K_Medium,
            }}
            onChange={(text) => setSelectedOptions(text)}
            editable={false}
            placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
          />
          <Icon
            name="chevron-down"
            size={24}
            color="black"
            style={{ marginLeft: 5, marginRight: 5 }}
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: _COLORS.Kodie_WhiteColor,
            marginTop: props.modalmarginTop,
          }}
        >
          <View style={{ backgroundColor: "white" }}>
            <FlatList
              data={props.options}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => toggleOption(item.name)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 3,
                  }}
                >
                  <Icon
                    name={
                      tempSelectedOptions.includes(item.name)
                        ? "check-circle"
                        : "checkbox-blank-circle-outline"
                    }
                    size={24}
                    color={
                      tempSelectedOptions.includes(item.name)
                        ? "green"
                        : "black"
                    }
                  />
                  <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <TouchableOpacity onPress={toggleModal}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleOkPress}>
                <Text>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MultiSelectDropDown;
