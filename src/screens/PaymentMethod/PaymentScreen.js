import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
const PaymentScreen = (props) => {
  const [cardInfo, setCardInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clintsecretkey, setclintsecretkey] = useState("");
  const [paymethod, setpaymethod] = useState("");
  const [transactionID, settransactionID] = useState("");
  const [amount, setamount] = useState(Math.round(50) * 100);
  const [paymentDetailsData, setPaymentDetailsData] = useState("");

  const { confirmPayment, loading } = useConfirmPayment();

  const publishableKey =
    "pk_test_51OfGf5Dgq6jpphimcWFMZZWwZaalNDAgck8321AtYxdQSCyJpcwZoPKpuih5jhxFPD3XSTnUWVTINztQSFpvwfP600vLxObKoL";

  const secretKey =
    "sk_test_51OfGf5Dgq6jpphimSSMtArZPmwLOtmlpwgComIMYI0q14Ofa4HXZXE5QaaLNbAgBCkBVcd4GQHQ8s2ueqCmDBtNX00CVSGYO3X";

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
  // const fetchPaymentIntentClientSecret = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://api.stripe.com/v1/create-payment-intent",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${secretKey}`,
  //         },
  //         body: JSON.stringify({
  //           amount: 1900,
  //           currency: "AUD",
  //           payment_method_types: "card",
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch payment intent client secret");
  //     }
  //     const responseData = await response.json();
  //     console.log("Response data:", responseData);

  //     const { client_secret } = responseData;
  //     console.log("Client secret:", client_secret);

  //     return client_secret;
  //   } catch (error) {
  //     console.log(
  //       "Error fetching payment intent client secret:",
  //       error.message
  //     );
  //     throw error;
  //   }
  // };

  const getPaymentIntent = async () => {
    // const SECRET_KEY = process.env.STRIPE_PAYMENT_SECRET_KEY;
    console.log("amount.....", amount);
    // var data = `amount=${amount}&currency=Inr&payment_method_types%5B%5D=card`;
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
  const addPaymentDetails = () => {
    const url = Config.BASE_URL;
    const paymentDetaills_Url = url + "payment_details";
    console.log("Request URL:", paymentDetaills_Url);
    setIsLoading(true);
    const paymentDetails_Data = {
      user_key: 0,
      amount: "string",
      currency: "string",
      payment_method: "string",
      customer_id: "string",
      payment_date: "string",
      status: "string",
      is_active: "string",
      created_by: "string",
    };
    axios
      .post(paymentDetaills_Url, paymentDetails_Data)
      .then((response) => {
        console.log("API Response paymentDetails_Data:", response.data);
        if (response.data.status === true) {
          // setPaymentDetailsData(response.data.lookup_details);
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed paymentDetails", error);
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
      email: "jenny.rosen@example.com",
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
        alert(confirmPaymentIntent.paymentIntent.status);
      }
    } catch (error) {
      console.log("Payment error", error);
    } finally {
      setIsLoading(false);
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
