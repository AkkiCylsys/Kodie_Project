import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import { _COLORS } from "../../Themes";
import AntDesign from "react-native-vector-icons/AntDesign";
import { StripeProvider } from "@stripe/stripe-react-native";
import {
  CardField,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
import { CommonLoader } from "../../components/Molecules/ActiveLoader/ActiveLoader";
import { useEffect } from "react";
import axios from "axios";
import { Config } from "../../Config";
import { useSelector } from "react-redux";
const PaymentScreen = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  // console.log("loginResponse.....", loginData);
  const [cardInfo, setCardInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clintsecretkey, setclintsecretkey] = useState("");
  const [paymethod, setpaymethod] = useState("");
  const [transactionID, settransactionID] = useState("");
  const [amount, setamount] = useState(Math.round(50) * 100);
  const [paymentDetailsData, setPaymentDetailsData] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");

  const { confirmPayment, loading } = useConfirmPayment();

  const publishableKey =
    "pk_test_51OjyJLKIJa7H9ZVBjnXta8L5vHNNyrWQvKquiuFlNpfaRmtZSTO85mLiNRMb2C6xHYcGnYAr7fR8DpNo9XM0Bgt400OxyjHWqW";

  const secretKey =
    "sk_test_51OjyJLKIJa7H9ZVBnDiBLNOg5vJf2AZF5vV5z9zPzmPaGko2Ky95lyKmxRs3DaY3c1A269lP8g4l5NeXz6S7VDTu00w9XBNXYZ";

  const fetchCardDetail = (cardDetail) => {
    if (cardDetail?.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };
  useEffect(() => {
    getPaymentIntent();
  }, []);
  const getPaymentIntent = async () => {
    console.log("amount.....", amount);
    var data = `amount=${amount}&currency=usd&payment_method_types%5B%5D=card`;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this?.readyState === 4) {
        console.log("responseText.....\n", this?.responseText);
        let djh = JSON.parse(this?.responseText);
        console.log(
          "payment_method_types......",
          djh?.payment_method_types.toString()
        );
        console.log("client_secret......", djh?.client_secret.toString());
        setpaymethod(djh?.payment_method_types.toString());
        setclintsecretkey(djh?.client_secret);
        console.log("secret key.......", djh?.client_secret);
        console.log("djh.id", djh?.id);
        // settransactionID(djh?.id);
      }
    });
    xhr.open("POST", "https://api.stripe.com/v1/payment_intents");
    // xhr.open("POST", "https://api.stripe.com/v1/create-payment-intent");
    xhr.setRequestHeader(
      "Authorization",
      // SECRET_KEY
      `Bearer ${secretKey}`
      // "Bearer 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"
    );
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
  };
  const handlePayPress = async () => {
    setIsLoading(true);
    const billingDetails = {
      // email: "info@kodie.com.au",
      email: "rohanRamraj@gmail.com",
    };
    try {
      console.log("clientSecret data....", clintsecretkey);
      let confirmPaymentIntent = await confirmPayment(clintsecretkey, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails,
        },
      });
      console.log("confirmPaymentIntent....", confirmPaymentIntent);
      if (confirmPaymentIntent.paymentIntent.status == "Succeeded") {
        console.log(
          "Payment successful",
          confirmPaymentIntent.paymentIntent.status
        );
        setPaymentMethodId(confirmPaymentIntent.paymentIntent.paymentMethodId);
        // alert(confirmPaymentIntent.paymentIntent.status);
        await subscribeCustomer(paymentMethodId);
        // Alert.alert("Success", "Payment successful. Subscription created.");
      }
    } catch (error) {
      console.log("Payment error", error);
    } finally {
      setIsLoading(false);
    }
  };
  // const subscribeCustomer = async (paymentMethodId) => {
  //   const url = Config.BASE_URL;
  //   const Subscription_Url = url + "your_backend_url/subscribe";
  //   console.log("Subscription_Url...", Subscription_Url);
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(Subscription_Url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         paymentMethodId: paymentMethodId,
  //         // user_id: loginData.Login_details.user_id,
  //         // account_id: loginData.Login_details.user_account_id,
  //         // subscription_id: paymentMethodId,
  //         // startDate: "1/03/2024",
  //         // endDate: "5/03/2024",
  //         // collection_method: "weekly",
  //         // subscribe_type: "card",
  //       }),
  //     });
  //     console.log("response..",response.data)
  //     if (response.ok) {
  //       alert("Subscription created successfully");
  //       setIsLoading(false);
  //     } else {
  //       const responseData = await response.json();
  //       console.error("Subscription error:", responseData.error);
  //       Alert.alert(
  //         "Error",
  //         "Failed to subscribe to the plan. Please try again."
  //       );
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Subscription error:", error);
  //     Alert.alert("Error", "An unexpected error occurred. Please try again.");
  //   }
  // };
  const subscribeCustomer = async (paymentMethodId) => {
    try {
      const response = await fetch("your_backend_url/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethodId,
          // Other subscription parameters if needed
        }),
      });

      if (response.ok) {
        // Subscription created successfully
        console.log("Subscription successful");
      } else {
        const responseData = await response.json();
        console.error("Subscription error:", responseData.error);
        // Assuming Alert is defined somewhere else in your code
        Alert.alert(
          "Error",
          "Failed to subscribe to the plan. Please try again."
        );
      }
    } catch (error) {
      console.error("Subscription error:", error);
      // Assuming Alert is defined somewhere else in your code
      // Alert.alert("Error");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Billing information"}
      />
      <View style={{ justifyContent: "flex-start" }}>
        <StripeProvider
          publishableKey={publishableKey}
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
          merchantIdentifier="merchant.com.kodie" // required for Apple Pay
        >
          <View style={{}}>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: "4242 4242 4242 4242",
              }}
              cardStyle={{
                backgroundColor: "#FFFFFF",
                textColor: "#000000",
              }}
              style={{
                width: "100%",
                height: 50,
                marginVertical: 30,
              }}
              onCardChange={(cardDetails) => {
                console.log("cardDetails", cardDetails);
                fetchCardDetail(cardDetails);
              }}
              onFocus={(focusedField) => {
                console.log("focusField", focusedField);
              }}
            />
          </View>
        </StripeProvider>
      </View>
      <CustomSingleButton
        isLeftImage={true}
        Text_Color={_COLORS.Kodie_WhiteColor}
        borderColor={_COLORS.Kodie_TransparentColor}
        _ButtonText={"Pay"}
        backgroundColor={_COLORS.Kodie_BlackColor}
        onPress={() => {
          handlePayPress();
        }}
      />
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default PaymentScreen;
