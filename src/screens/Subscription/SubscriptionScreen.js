import React, { useState } from "react";
import { View, Button } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";

const SubscriptionScreen = () => {
  const [loading, setLoading] = useState(false);
  const { confirmPayment } = useStripe();

  const clientSecret =
    "pk_test_51OjyJLKIJa7H9ZVBjnXta8L5vHNNyrWQvKquiuFlNpfaRmtZSTO85mLiNRMb2C6xHYcGnYAr7fR8DpNo9XM0Bgt400OxyjHWqW";
  const handleSubscribe = async () => {
    setLoading(true);

    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      type: "Card",
    });

    if (error) {
      console.log("Payment failed:", error.message);
    } else {
      console.log("Payment successful:", paymentIntent);
      // Handle successful payment (e.g., update UI, navigate to next screen)
    }

    setLoading(false);
  };

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
      />
      <Button title="Subscribe" onPress={handleSubscribe} disabled={loading} />
    </View>
  );
};

export default SubscriptionScreen;
