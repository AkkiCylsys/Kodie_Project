import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
import {
  CardField,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { useSelector } from "react-redux";
import TopHeader from "../../components/Molecules/Header/Header";
import { CommonLoader } from "../../components/Molecules/ActiveLoader/ActiveLoader";
import { StripeProvider } from "@stripe/stripe-react-native";
import { _COLORS } from "../../Themes";
import { _goBack } from "../../services/CommonServices";
import axios from "axios";
const SubscriptionScreen = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);

  const customerID = props.route.params.customerID;
  console.log("customerID in subscription screen...", customerID);

  console.log(
    "loginResponse.....",
    loginData?.Account_details[0]?.UAD_FIRST_NAME
  );
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [priceId, setPriceId] = useState("");
  const [cardInfo, setCardInfo] = useState(null);
  const [clientSecretKey, setClientSecretKey] = useState("");
  const { confirmPayment, loading } = useConfirmPayment();
  const [paymentMethodId, setPaymentMethodId] = useState("");

  const publishableKey =
    "pk_test_51OjyJLKIJa7H9ZVBjnXta8L5vHNNyrWQvKquiuFlNpfaRmtZSTO85mLiNRMb2C6xHYcGnYAr7fR8DpNo9XM0Bgt400OxyjHWqW";

  const secretKey =
    "sk_test_51OjyJLKIJa7H9ZVBnDiBLNOg5vJf2AZF5vV5z9zPzmPaGko2Ky95lyKmxRs3DaY3c1A269lP8g4l5NeXz6S7VDTu00w9XBNXYZ";

  useEffect(() => {
    getClientSecret();
  }, []);
  const fetchCardDetail = (cardDetail) => {
    if (cardDetail?.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  const getClientSecret = () => {
    const url = "https://kodieapis.cylsys.com/api/v1/payment_intent";
    console.log("Request URL:", url);
    setIsLoading(true);
    const client_data = {
      amount: "69",
      currency: "AUD",
    };
    axios
      .post(url, client_data)
      .then((response) => {
        console.log("API Response client_data", response.data);
        if (response.data.success === true) {
          console.log(
            "client secret key ....",
            response.data.message?.client_secret
          );
          setClientSecretKey(response.data.message?.client_secret);
          // alert(JSON.stringify(response.data.lookup_details));
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed client_data", error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePayPress = async () => {
    setIsLoading(true);
    const billingDetails = {
      Name: loginData?.Account_details[0]?.UAD_FIRST_NAME,
      email: loginData?.Login_details?.email,
    };
    try {
      // console.log("clientSecret data....", clintsecretkey);
      let confirmPaymentIntent = await confirmPayment(clientSecretKey, {
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
        Alert.alert("Success", "Payment successful. Subscription created.");
      }
    } catch (error) {
      console.log("Payment error", error);
    } finally {
      setIsLoading(false);
    }
  };
  const subscribeCustomer = (paymentMethodId) => {
    const url = "https://kodieapis.cylsys.com/api/v1/create_subscription";
    console.log("Request URL:", url);
    setIsLoading(true);
    console.log("customer id inside..", customerID);
    const subscribeCustomer_data = {
      // customer_id: customerID,
      customer_id: "cus_PenbsmBdrGURhV",
      price: "price_1Oqa9iKIJa7H9ZVBdnDQYQg9",
    };
    axios
      .post(url, subscribeCustomer_data)
      .then((response) => {
        console.log("API Response subscribeCustomer", response.data);
        if (response.data.success === true) {
          console.log("subscribeCustomer success");
        } else {
          console.log("subscribeCustomer failed");
        }
      })
      .catch((error) => {
        console.error("API failed subscribeCustomer", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  // const subscribeCustomer = async (paymentMethodId) => {
  //   const url = Config.BASE_URL;
  //   const Subscription_Url =
  //     url + "https://kodieapis.cylsys.com/api/v1/create_subscription";
  //   console.log("Subscription_Url...", Subscription_Url);
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(Subscription_Url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         // paymentMethodId: paymentMethodId,
  //         user_id: loginData.Login_details.user_id,
  //         account_id: loginData.Login_details.user_account_id,
  //         subscription_id: paymentMethodId,
  //         startDate: "1/03/2024",
  //         endDate: "5/03/2024",
  //         collection_method: "weekly",
  //         subscribe_type: "card",
  //       }),
  //     });
  //     console.log("response..", response.data);
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
      <View style={{ marginHorizontal: 16 }}>
        <CustomSingleButton
          isLeftImage={true}
          Text_Color={_COLORS.Kodie_WhiteColor}
          borderColor={_COLORS.Kodie_TransparentColor}
          _ButtonText={"Subscribe"}
          backgroundColor={_COLORS.Kodie_BlackColor}
          onPress={() => {
            handlePayPress();
          }}
        />
      </View>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({});
