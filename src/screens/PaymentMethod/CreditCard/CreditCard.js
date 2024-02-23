import { View, Text, TextInput, Image } from "react-native";
import React, { useRef } from "react";
import { CreditCardStyle } from "./CreditCardStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { _COLORS, IMAGES } from "../../../Themes";
import RBSheet from "react-native-raw-bottom-sheet";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
const CreditCard = () => {
  const refRBSheet = useRef();
  return (
    <View>
      <View style={{ marginTop: 30 }}>
        <Text style={CreditCardStyle.inputtext}>Card number</Text>
        <View style={CreditCardStyle.inputContainer}>
          <TextInput
            style={CreditCardStyle.Input}
            placeholder="0000   0000   0000    0000"
            placeholderTextColor="#999"
          />
          <MaterialCommunityIcons
            name="credit-card-scan"
            size={22}
            color={_COLORS.Kodie_LightGrayColor}
            style={CreditCardStyle.cardIcon}
          />
         
        </View>
      </View>

      <View>
        <Text style={CreditCardStyle.inputtext}>Cardholder name</Text>
        <View style={CreditCardStyle.inputContainer}>
          <TextInput
            style={CreditCardStyle.Input}
            placeholder="ex. Jonathan Paul Ive"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={CreditCardStyle.inputtext}>Expiry date</Text>
          <View style={CreditCardStyle.inputCarddate}>
            <TextInput
              style={CreditCardStyle.Input}
              placeholder="MM   /   YYYY"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={CreditCardStyle.inputtext}>CVV / CVC</Text>
            <AntDesign
              name={"questioncircleo"}
              size={20}
              color={_COLORS.Kodie_lightGreenColor}
              style={{ marginRight: 25 }}
            />
          </View>
          <View style={CreditCardStyle.inputCarddate}>
            <TextInput
              style={CreditCardStyle.Input}
              placeholder="3-4 digits"
              placeholderTextColor="#999"
            />
          </View>
        </View>
      </View>

      <View style={CreditCardStyle.ViewTextstyle}>
        <Text style={CreditCardStyle.Textstyle}>
          We will send you an order details to your email after the successful
          payment
        </Text>
      </View>
      <View style={CreditCardStyle.btnview}>
        <CustomSingleButton
          borderColor={_COLORS.Kodie_TransparentColor}
          _ButtonText={"Complete payment"}
          backgroundColor={_COLORS.Kodie_BlackColor}
          Text_Color={_COLORS.Kodie_WhiteColor}
          // disabled={isLoading ? true : false}
          onPress={() => {
            refRBSheet.current.open();
          }}
        />
      </View>

      <RBSheet
        ref={refRBSheet}
        height={400}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: CreditCardStyle.bottomModal_container,
        }}
      >
        <View style={CreditCardStyle.modalContainer}>
          <Text style={CreditCardStyle.modalMainText}>Payment Successful!</Text>
          <Text style={CreditCardStyle.modalMainText2}>
            Successfully made payment and scheduled job.
          </Text>
          <Image
            source={IMAGES.CheckIcon}
            resizeMode={"center"}
            style={CreditCardStyle.checkStl}
          />
          <CustomSingleButton
            _ButtonText={"View history"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            height={48}
            onPress={() => {
              refRBSheet.current.close();
              _goBack(props);
            }}
          />
          <CustomSingleButton
            // disabled={isLoading ? true : false}
            _ButtonText={"Return home"}
            Text_Color={_COLORS.Kodie_BlackColor}
            height={48}
            borderColor={_COLORS.Kodie_WhiteColor}
            backgroundColor={_COLORS.Kodie_WhiteColor}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default CreditCard;
