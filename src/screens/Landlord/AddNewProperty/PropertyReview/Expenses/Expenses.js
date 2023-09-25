import React, { useRef } from "react";
import { View, Text, ScrollView,FlatList,TouchableOpacity} from "react-native";
import { ExpensesStyle } from "./ExpensesStyle";
import { _COLORS } from "../../../../../Themes";
import CustomSingleButton from "../../../../../components/Atoms/CustomButton/CustomSingleButton";
import RBSheet from "react-native-raw-bottom-sheet";
import AddExpensesDetails from "./AddExpensesDetails/AddExpensesDetails";
import PropertyExpenses from "./PropertyExpenses/PropertyExpenses";
import Entypo from "react-native-vector-icons/Entypo";

const proper_expens_data = [
  {
    id: "1",
    heading: "Accounting",
    amount_status: "Amount due",
    paidByUser: "Tenant",
    Amount: "$100",
    Date: "9 August 2023",
    payment_status: "Awaiting Payment",
  },
  {
    id: "2",
    heading: "Repairs and maintenance",
    amount_status: "Amount paid",
    paidByUser: "LandLord",
    Amount: "$200",
    Date: "16 August 2023",
    payment_status: "Paid",
  },
  {
    id: "3",
    heading: "Cleaning",
    amount_status: "Amount due",
    paidByUser: "Tenant",
    Amount: "$300",
    Date: "23 August 2023",
    payment_status: "paid",
  },
  {
    id: "4",
    heading: "Repairs and maintenance",
    amount_status: "Amount due",
    paidByUser: "Tenant",
    Amount: "$150",
    Date: "30 August 2023",
    payment_status: "paid",
  },
];
export default Expenses = () => {
  const refRBSheet = useRef();
  const property_expense_render = ({ item, index }) => {
    return (
      <View style={ExpensesStyle.mainContainer}>
        <View style={ExpensesStyle.subContainer}>
          <View style={ExpensesStyle.Account_main_View}>
            <View style={ExpensesStyle.account_view}>
              <View>
                <Text style={ExpensesStyle.Accounting_Text}>
                  {item.heading}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={ExpensesStyle.Paid_Text}>{"Paid by:"}</Text>
                  <Text style={ExpensesStyle.Paid_Text}>{item.paidByUser}</Text>
                </View>
              </View>
              <View>
                <Text style={ExpensesStyle.Amount_Text}>{item.amount_status}</Text>
                <Text style={ExpensesStyle.Accounting_Text}>{item.Amount}</Text>
              </View>
            </View>
          </View>
          <View style={ExpensesStyle.datePaid_main_view}>
            <View style={ExpensesStyle.paidDate_subView}>
              <View style={ExpensesStyle.paid_Date_View}>
                <Text style={ExpensesStyle.date_paid}>{"Date paid:"}</Text>
                <Text style={ExpensesStyle.Amount_Text}>{item.Date}</Text>
              </View>
              <TouchableOpacity style={ExpensesStyle.rent_received_view}>
                <View style={{ flexDirection: "row" }}>
                  <Entypo
                    name="dot-single"
                    size={25}
                    color={_COLORS.Kodie_DarkOrange}
                  />
                  <Text style={ExpensesStyle.rent_received_text}>
                    {item.payment_status}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={ExpensesStyle.mainContainer}>
      <ScrollView>
        <View style={ExpensesStyle.add_Expenses_view}>
          <Text style={ExpensesStyle.add_Expenses_Text}>
            {"Start by adding an expense "}
          </Text>
        </View>
        <Text style={ExpensesStyle.heading_Text}>{"Property expenses"}</Text>
        {/* <PropertyExpenses /> */}
        <FlatList
          data={proper_expens_data}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          keyExtractor={(item) => item?.id}
          renderItem={property_expense_render}
        />
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
          <AddExpensesDetails />
        </RBSheet>
      </ScrollView>
    </View>
  );
};
