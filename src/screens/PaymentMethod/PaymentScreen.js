import {View, Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import TopHeader from '../../components/Molecules/Header/Header';
import {_goBack} from '../../services/CommonServices';
import {_COLORS} from '../../Themes';
import {StripeProvider} from '@stripe/stripe-react-native';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import CustomSingleButton from '../../components/Atoms/CustomButton/CustomSingleButton';
import {CommonLoader} from '../../components/Molecules/ActiveLoader/ActiveLoader';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
const PaymentScreen = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const [cardInfo, setCardInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clintsecretkey, setclintsecretkey] = useState('');
  const [paymethod, setpaymethod] = useState('');
  const [transactionID, settransactionID] = useState('');
  const [amount, setamount] = useState(Math.round(50) * 100);
  const [paymentDetailsData, setPaymentDetailsData] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('');

  const {confirmPayment, loading} = useConfirmPayment();

  const publishableKey =
    'pk_test_51OjyJLKIJa7H9ZVBjnXta8L5vHNNyrWQvKquiuFlNpfaRmtZSTO85mLiNRMb2C6xHYcGnYAr7fR8DpNo9XM0Bgt400OxyjHWqW';

  const secretKey =
    'sk_test_51OjyJLKIJa7H9ZVBnDiBLNOg5vJf2AZF5vV5z9zPzmPaGko2Ky95lyKmxRs3DaY3c1A269lP8g4l5NeXz6S7VDTu00w9XBNXYZ';

  const fetchCardDetail = cardDetail => {
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
    console.log('amount.....', amount);
    var data = `amount=${amount}&currency=usd&payment_method_types%5B%5D=card`;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function () {
      if (this?.readyState === 4) {
        console.log('responseText.....\n', this?.responseText);
        let djh = JSON.parse(this?.responseText);
        console.log(
          'payment_method_types......',
          djh?.payment_method_types.toString(),
        );
        console.log('client_secret......', djh?.client_secret.toString());
        setpaymethod(djh?.payment_method_types.toString());
        setclintsecretkey(djh?.client_secret);
        console.log('secret key.......', djh?.client_secret);
        console.log('djh.id', djh?.id);
      }
    });
    xhr.open('POST', 'https://api.stripe.com/v1/payment_intents');
    xhr.setRequestHeader('Authorization', `Bearer ${secretKey}`);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send(data);
  };
  const handlePayPress = async () => {
    setIsLoading(true);
    const billingDetails = {
      email: 'rohanRamraj@gmail.com',
    };
    try {
      console.log('clientSecret data....', clintsecretkey);
      let confirmPaymentIntent = await confirmPayment(clintsecretkey, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails,
        },
      });
      console.log('confirmPaymentIntent....', confirmPaymentIntent);
      if (confirmPaymentIntent.paymentIntent.status == 'Succeeded') {
        console.log(
          'Payment successful',
          confirmPaymentIntent.paymentIntent.status,
        );
        setPaymentMethodId(confirmPaymentIntent.paymentIntent.paymentMethodId);
        await subscribeCustomer(paymentMethodId);
      }
    } catch (error) {
      console.log('Payment error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeCustomer = async paymentMethodId => {
    try {
      const response = await fetch('your_backend_url/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethodId,
        }),
      });

      if (response.ok) {
        console.log('Subscription successful');
      } else {
        const responseData = await response.json();
        console.error('Subscription error:', responseData.error);
        Alert.alert(
          'Error',
          'Failed to subscribe to the plan. Please try again.',
        );
      }
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Billing information'}
      />
      <View style={{justifyContent: 'flex-start'}}>
        <StripeProvider
          publishableKey={publishableKey}
          urlScheme="your-url-scheme"
          merchantIdentifier="merchant.com.kodie">
          <View style={{}}>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
              }}
              onCardChange={cardDetails => {
                console.log('cardDetails', cardDetails);
                fetchCardDetail(cardDetails);
              }}
              onFocus={focusedField => {
                console.log('focusField', focusedField);
              }}
            />
          </View>
        </StripeProvider>
      </View>
      <CustomSingleButton
        isLeftImage={true}
        Text_Color={_COLORS.Kodie_WhiteColor}
        borderColor={_COLORS.Kodie_TransparentColor}
        _ButtonText={'Pay'}
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
