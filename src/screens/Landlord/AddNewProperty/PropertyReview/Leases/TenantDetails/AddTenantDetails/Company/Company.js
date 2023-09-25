import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { CompanyStyle } from "./CompanyStyle";
import { _COLORS, LABEL_STYLES } from "../../../../../../../../Themes";
export default Company = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [note, setNote] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <View style={CompanyStyle.mainConatainer}>
      <ScrollView>
        <View style={CompanyStyle.card}>
          <View style={CompanyStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Organisation name*"}</Text>
            <TextInput
              style={CompanyStyle.input}
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="Enter company’s name"
              placeholderTextColor="#999"
            />
          </View>
          <View style={CompanyStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Email*"}</Text>
            <TextInput
              style={CompanyStyle.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter company’s email address"
              placeholderTextColor="#999"
            />
          </View>
          <View style={CompanyStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Phone number"}</Text>
            <TextInput
              style={CompanyStyle.input}
              value={PhoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter company’s phone number"
              placeholderTextColor="#999"
            />
          </View>
          <View style={CompanyStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Mobile number"}</Text>
            <TextInput
              style={CompanyStyle.input}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              placeholder="Enter company’s mobile number"
              placeholderTextColor="#999"
            />
          </View>
          <View style={CompanyStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Notes"}</Text>
            <TextInput
              style={[CompanyStyle.input, { height: 100 }]}
              value={note}
              onChangeText={setNote}
              placeholder="Enter any notes about your tenant"
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View>
          <View style={CompanyStyle.ButtonView}>
            <TouchableOpacity
              style={[
                CompanyStyle.closeText,
                CompanyStyle.applyText,
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
                CompanyStyle.applyText,
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
                  CompanyStyle.text,
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
