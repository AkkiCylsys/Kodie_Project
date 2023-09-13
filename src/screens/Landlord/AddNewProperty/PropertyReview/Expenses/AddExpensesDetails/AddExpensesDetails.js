import React, { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { AddExpensesDetailsStyle } from "./AddExpensesDetailsStyle";
import { _COLORS } from "../../../../../../Themes";
import { LABEL_STYLES } from "../../../../../../Themes";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default AddExpensesDetails = () => {
  const [totalAmount, setTotalAmount] = useState("");
  return (
    <View style={AddExpensesDetailsStyle.mainContainer}>
      <ScrollView>
        <View style={AddExpensesDetailsStyle.heading_View}>
          <Text style={AddExpensesDetailsStyle.heading_Text}>
            {"Add lease details"}
          </Text>
          <AntDesign
            name="close"
            size={22}
            color={_COLORS.Kodie_BlackColor}
            style={{ alignSelf: "center" }}
          />
        </View>
        <View style={AddExpensesDetailsStyle.card}>
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Total amount*"}</Text>
            <TextInput
              style={AddExpensesDetailsStyle.input}
              value={totalAmount}
              onChangeText={setTotalAmount}
              placeholder="Enter the total amount of the expense"
              placeholderTextColor="#999"
            />
          </View>
        </View>
      </ScrollView>
      <Text>{"AddexpensesDetails"}</Text>
    </View>
  );
};
