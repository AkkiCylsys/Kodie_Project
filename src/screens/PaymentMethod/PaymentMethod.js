import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import TopHeader from '../../components/Molecules/Header/Header';
import {_goBack} from '../../services/CommonServices';
import PaymentMethods from '../../components/Molecules/PaymentMethod/PaymentMethods';
import {_COLORS, IMAGES} from '../../Themes';
import {PaymentMethodStyle} from './PaymentMethodStyle';
import CustomSingleButton from '../../components/Atoms/CustomButton/CustomSingleButton';
import {useState} from 'react';
const PaymentMethod = props => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={PaymentMethodStyle.main}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Select payment method'}
      />
      <ScrollView style={PaymentMethodStyle.maincontainer}>
        <View style={PaymentMethodStyle.bindview}>
          <PaymentMethods imagesource={IMAGES.GCash} heading="GCash" />
        </View>

        <View style={PaymentMethodStyle.bindview}>
          <PaymentMethods imagesource={IMAGES.PayPal} heading="Paypal" />
        </View>

        <View style={PaymentMethodStyle.bindview}>
          <PaymentMethods imagesource={IMAGES.visa} heading="Visa" />
        </View>

        <View style={PaymentMethodStyle.bindview}>
          <PaymentMethods
            imagesource={IMAGES.Mastercard}
            heading="MasterCard"
          />
        </View>

        <View style={PaymentMethodStyle.bindview}>
          <PaymentMethods imagesource={IMAGES.Base} heading="Autopay" />
        </View>

        <View style={PaymentMethodStyle.btnview}>
          <CustomSingleButton
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={'Continue'}
            backgroundColor={_COLORS.Kodie_BlackColor}
            Text_Color={_COLORS.Kodie_WhiteColor}
            disabled={isLoading ? true : false}
            onPress={() => {
              props.navigation.navigate('PaymentScreen');
              // props.navigation.navigate("paymentdetails")
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentMethod;
