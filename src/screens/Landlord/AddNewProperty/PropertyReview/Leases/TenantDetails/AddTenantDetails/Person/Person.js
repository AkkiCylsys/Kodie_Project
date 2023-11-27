import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { PersonStyle } from "./PersonStyle";
import { _COLORS, LABEL_STYLES } from "../../../../../../../../Themes";
export default Person = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <View style={PersonStyle.mainConatainer}>
      <ScrollView>
        <View style={PersonStyle.card}>
          <View style={PersonStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"First name*"}</Text>
            <TextInput
              style={PersonStyle.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter tenant’s first name"
              placeholderTextColor="#999"
            />
          </View>
          <View style={PersonStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Last name*"}</Text>
            <TextInput
              style={PersonStyle.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter tenant’s last name"
              placeholderTextColor="#999"
            />
          </View>
          <View style={PersonStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Email*"}</Text>
            <TextInput
              style={PersonStyle.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter tenant’s email address"
              placeholderTextColor="#999"
            />
          </View>
          <View style={PersonStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Phone number (mobile preferred)"}
            </Text>
            <TextInput
              style={PersonStyle.input}
              value={PhoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter tenant’s mobile number"
              placeholderTextColor="#999"
            />
          </View>
          <View style={PersonStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Notes"}</Text>
            <TextInput
              style={[PersonStyle.input, { height: 100 }]}
              value={note}
              onChangeText={setNote}
              placeholder="Enter any notes about your tenant"
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View>
          <View style={PersonStyle.ButtonView}>
            <TouchableOpacity
              style={[
                PersonStyle.closeText,
                PersonStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == "cancel"
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                handleOptionClick("cancel");
              }}
            >
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  {
                    color:
                      selectedOption == "cancel"
                        ? _COLORS.Kodie_WhiteColor
                        : null,
                  },
                ]}
              >
                {"cancel"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                PersonStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == "Save"
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                handleOptionClick("Save");
              }}
            >
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  PersonStyle.text,
                  {
                    color:
                      selectedOption == "Save"
                        ? _COLORS.Kodie_WhiteColor
                        : null,
                  },
                ]}
              >
                {" Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
