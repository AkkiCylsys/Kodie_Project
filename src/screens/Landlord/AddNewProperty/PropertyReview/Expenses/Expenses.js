import React, { useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import { ExpensesStyle } from "./ExpensesStyle";
import { _COLORS } from "../../../../../Themes";
import CustomSingleButton from "../../../../../components/Atoms/CustomButton/CustomSingleButton";
import RBSheet from "react-native-raw-bottom-sheet";
import AddExpensesDetails from "./AddExpensesDetails/AddExpensesDetails";
export default Expenses = () => {
  const refRBSheet = useRef();
  return (
    <View style={ExpensesStyle.mainContainer}>
      <ScrollView>
        <View style={ExpensesStyle.add_Expenses_view}>
          <Text style={ExpensesStyle.add_Expenses_Text}>
            {"Start by adding an expense "}
          </Text>
        </View>
        <View style={ExpensesStyle.btn_View}>
          <CustomSingleButton
            _ButtonText={"+ Add expense"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={() => {
              refRBSheet.current.open();
            }}
          />
        </View>
        <RBSheet
          ref={refRBSheet}
          height={510}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: ExpensesStyle.bottomModal_container,
          }}
        >
          <AddExpensesDetails/>
        </RBSheet>
      </ScrollView>
    </View>
  );
};
