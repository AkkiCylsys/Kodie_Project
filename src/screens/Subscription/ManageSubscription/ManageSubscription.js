import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopHeader from '../../../components/Molecules/Header/Header';
import {ManageSubscriptionStyle} from './ManageSubscriptionStyle';
import {IMAGES, FONTFAMILY, _COLORS} from '../../../Themes/index';
import RangeSlider from '../../../components/Molecules/RangeSlider/RangeSlider';
import {_goBack} from '../../../services/CommonServices/CommonMethods';
import SwitchButton from '../../../components/Molecules/SwitchButton/SwitchButton';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import {FlatList} from 'react-native-gesture-handler';

import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {Config} from '../../../Config';
import {useDispatch, useSelector} from 'react-redux';
import {userSubscribedCreator} from '../../../redux/Actions/Subscription/SubscriptionApiCreator';
import axiosInstance from '../../../services/axiosInstance';

//ScreenNo:209

const subscriptionData = [
  {
    id: 1,
    cardHeading: 'Property Essential',
    amount: 69,
    duration: 'Month',
    description: 'The best place to get started',
    rule_desc: 'You get:',
    rule_no_1: 'Easily manage up to 3 properties',
    rule_no_2: 'Single user',
    rule_no_3: 'Standard financial dashboards (revenues & expenses)',
    rule_no_4: 'Service & maintenance requests with ease',
    rule_no_5: 'Standard access to contractors',
    rule_no_6: 'Income & expense tracking',
    rule_no_7: 'Tenant screening',
    rule_no_8: 'Standard document management',
    rule_no_9:
      'Standard rental property listings on Kodie Property Marketplace',
  },
  {
    id: 2,
    cardHeading: 'Portfolio Pioneer',
    amount: 149,
    duration: 'Month',
    description: 'For the property up-and-comer',
    rule_desc: 'You get:',
    rule_no_1: 'Up to 10 properties',
    rule_no_2: 'Up to 3 users',
    rule_no_3: 'Advanced data insights and dynamic dashboards',
    rule_no_4: 'Service & maintenance requests with ease',
    rule_no_5: '5% off for all contractors',
    rule_no_6: 'Dynamic unit inspection checklists',
    rule_no_7: 'Reporting features including report download',
    rule_no_8: 'Unlimited document storage',
    rule_no_9: '',
  },
  {
    id: 3,
    cardHeading: 'Property Mogul',
    amount: 249,
    duration: 'Month',
    description: 'For the experienced property moguls',
    rule_desc: 'You get:',
    rule_no_1: 'Unlimited properties',
    rule_no_2: 'Unlimited users',
    rule_no_3: 'Customisable dashboards with report download',
    rule_no_4: '10% off for all contractors',
    rule_no_5: 'Dedicated customer support',
    rule_no_6:
      'Preferential rental property listings on Kodie Property Marketplace',
    rule_no_7: '',
    rule_no_8: '',
    rule_no_9: '',
  },
];
const ManageSubscription = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  // console.log('loginResponse.....', loginData);
  const [isLoading, setIsLoading] = useState(false);
  const [priceRanges, setPriceRanges] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [customerID, setCustomerID] = useState('');
  const [SubscriptionID, setSubscriptionID] = useState('');
  const [SubscriptionStatus, setSubscriptionStatus] = useState('');
  const [SubscribedPLan, setsetSubscribedPLan] = useState('');

  const dispatch = useDispatch();
  const handlePriceRangeChange = priceRange => {
    console.log('Price Range in Parent Component:', priceRange);
    setPriceRanges(priceRange);
    // Do something with the price range in the parent component
  };
  const handlemaxRange = high => {
    console.log('High Range in Parent Component:', high);
    setMax(high);
  };
  const handleminRange = low => {
    console.log('Low Range in Parent Component:', low);
    setMin(low);
  };
  const RowsData = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}>
        <Image
          source={IMAGES.Done}
          style={ManageSubscriptionStyle.DoneImage}
          resizeMode="contain"
        />
        <Text style={ManageSubscriptionStyle.SubDataText}>
          {props.DataTexts}
        </Text>
      </View>
    );
  };

  const subscriptionCardRender = ({item}) => {
    const handleSubscribePress = () => {
      let selectedPriceId = '';
      if (item.id === 1) {
        selectedPriceId = 'price_1OqYNXKIJa7H9ZVB62NnN2rw';
      } else if (item.id === 2) {
        selectedPriceId = 'price_1Oqa9iKIJa7H9ZVBdnDQYQg9';
      } else if (item.id === 3) {
        selectedPriceId = 'price_1Ot4ufKIJa7H9ZVBM0ihuIVb';
      }
      // Add any other conditions as needed
      {
        Platform.OS == 'ios'
          ? props.navigation.navigate(
              'Subscriptions',
              // , {
              //     productId: selectedPriceId,
              //   }
            )
          : demoSubscription(selectedPriceId);
      }
    };
    return (
      <View
        style={[
          ManageSubscriptionStyle.SubscriptionDataView,
          {
            borderWidth: 2,
            borderColor:
              item.amount == SubscribedPLan ? 'green' : 'transparent',
          },
        ]}>
        <Text style={ManageSubscriptionStyle.Heading}>{item.cardHeading}</Text>
        <Text style={ManageSubscriptionStyle.Subscriptionprice}>
          ${item.amount}
          <Text style={ManageSubscriptionStyle.SubscriptionpriceText}>
            /{item.duration}
          </Text>
        </Text>
        <Text style={ManageSubscriptionStyle.SubDataText}>
          {item.description}
        </Text>
        <View style={ManageSubscriptionStyle.ShadowLine} />
        <Text style={ManageSubscriptionStyle.getText}>{item.rule_desc}</Text>
        <RowsData DataTexts={item.rule_no_1} />
        <RowsData DataTexts={item.rule_no_2} />
        <RowsData DataTexts={item.rule_no_3} />
        <RowsData DataTexts={item.rule_no_4} />
        <RowsData DataTexts={item.rule_no_5} />
        <RowsData DataTexts={item.rule_no_6} />
        {item.rule_no_7 == '' ? (
          <Text style={{marginTop: 10}}></Text>
        ) : (
          <RowsData DataTexts={item.rule_no_7} />
        )}
        {item.rule_no_8 == '' ? (
          <Text style={{marginTop: 10}}></Text>
        ) : (
          <RowsData DataTexts={item.rule_no_8} />
        )}
        {item.rule_no_9 == '' ? (
          <Text style={{marginTop: 10}}></Text>
        ) : (
          <RowsData DataTexts={item.rule_no_9} />
        )}

        {item.id == 3 ? (
          <View style={{padding: 5, marginTop: 20}}>
            <RowButtons
              leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
              RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
              LeftButtonTextColor={_COLORS.Kodie_BlackColor}
              RightButtonTextColor={_COLORS.Kodie_WhiteColor}
              LeftButtonborderColor={_COLORS.Kodie_TransparentColor}
              RightButtonborderColor={_COLORS.Kodie_BlackColor}
              LeftButtonText={'Contact us'}
              RightButtonText={'Subscribe'}
              onPressLeftButton={() =>
                props.navigation.navigate("Contactus")
                // alert('Coming soon')
              }
              isShowRightButton={SubscriptionStatus == 'active' ? false : true}
              onPressRightButton={handleSubscribePress}
            />
          </View>
        ) : (
          <View style={{padding: 5}}>
            <RowButtons
              leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
              RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
              LeftButtonTextColor={_COLORS.Kodie_BlackColor}
              RightButtonTextColor={_COLORS.Kodie_WhiteColor}
              LeftButtonborderColor={_COLORS.Kodie_TransparentColor}
              RightButtonborderColor={_COLORS.Kodie_BlackColor}
              LeftButtonText={'Contact us'}
              RightButtonText={'Subscribe'}
              onPressLeftButton={() =>
                props.navigation.navigate("Contactus")
                // alert('Contact us pressed')
              }
              isShowRightButton={SubscriptionStatus == 'active' ? false : true}
              onPressRightButton={handleSubscribePress}
            />
          </View>
        )}
      </View>
    );
  };
  useEffect(() => {
    createCustomer();
    // checkSubscribedCustomer();
  }, []);
  useEffect(() => {
    // createCustomer();
    checkSubscribedCustomer();
  }, []);

  const checkSubscribedCustomer = async () => {
    let check_Subs = {
      // account_id:711
      account_id: loginData?.Login_details?.user_account_id,
    };
    const res = await dispatch(userSubscribedCreator(check_Subs));
    console.log('000000000', JSON.stringify(res?.data?.data?.plan));
    //alert(JSON.stringify((res?.data?.data?.plan?.amount)/100))
    setSubscriptionStatus(res?.data?.data?.status);
    setsetSubscribedPLan(res?.data?.data?.plan?.amount / 100);
  };
  const createCustomer = () => {
    const baseUrl = Config.BASE_URL;
    const url =  'create_customer';
    console.log('Request URL:', loginData?.Login_details?.email);
    setIsLoading(true);
    const createCustomer_data = {
      name: loginData?.Account_details[0]?.UAD_FIRST_NAME,
      email: loginData?.Login_details?.email,
    };
    axiosInstance
      .post(url, createCustomer_data)
      .then(response => {
        console.log('API Response createCustomer', response.data);
        if (response?.data?.success === true) {
          console.log('customer ID ....', response?.data?.data.id);
          setCustomerID(response?.data?.data.id);
          // props.navigation.navigate('SubscriptionScreen', {
          //   customerID: response?.data?.data.id,
          // });
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed createCustomer', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const demoSubscription = priceId => {
    const baseUrl = Config.BASE_URL;
    const url ='demo';
    console.log('Request URL:', url);
    console.log(customerID);
    setIsLoading(true);
    const createSubscription_data = {
      customer_id: customerID,
      price_id: priceId,
    };
    console.log(createSubscription_data, 'createSubscription_data');
    axiosInstance
      .post(url, createSubscription_data)
      .then(response => {
        console.log('API Response createSubscription_data', response.data);
        if (response?.data?.success === true) {
          console.log('Subscription ID ....', response?.data?.data.id);
          setSubscriptionID(response?.data?.data?.id);

          Insertdemodata(response?.data?.data?.id);
          saveSubscriptionData();
          Alert.alert("Success",'You have successfully subscribed.');
          props.navigation.navigate('Dashboard');
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed createSubscription_data', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const saveSubscriptionData = async () => {
    let check_Subs = {
      account_id: loginData?.Login_details?.user_account_id,
    };
    const res = await dispatch(userSubscribedCreator(check_Subs));
  };

  const Insertdemodata = _Subscrip_id => {
    const baseUrl = Config.BASE_URL;
    const url ='insert_subscription';
    console.log('Request URL:', url);
    // console.log(id);
    setIsLoading(true);
    const Insert_data = {
      user_id: loginData.Login_details?.user_id,
      account_id: loginData.Login_details?.user_account_id,
      customer_id: customerID,
      subscription_id: _Subscrip_id,
      startDate: 'string',
      endDate: 'string',
      collection_method: 'string',
      subscribe_type: 'string',
    };
    axiosInstance
      .post(url, Insert_data)
      .then(response => {
        console.log('API Response insert_subscription', response.data);
        if (response?.data?.success === true) {
          console.log('insertData ....', response?.data?.message);
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed createSubscription_data', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <SafeAreaView style={ManageSubscriptionStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={
            SubscriptionStatus == 'active'
              ? 'Your Subscription'
              : 'Manage Subscription'
          }
        />

        <ScrollView style={{paddingHorizontal: 10}}>
          <Image
            source={IMAGES.Subscription}
            style={ManageSubscriptionStyle.SubscriptionImage}
            resizeMode="contain"
          />
          <Text style={ManageSubscriptionStyle.MainHeading}>
            {SubscriptionStatus == 'active'
              ? 'Your Current Subscription'
              : 'Subscribe to Kodie'}
          </Text>
          {SubscriptionStatus == 'active' ? null : (
            <Text style={ManageSubscriptionStyle.SubHeading}>
              Go beyond the limits, get{' '}
              <Text
                style={[
                  ManageSubscriptionStyle.SubHeading,
                  {color: _COLORS.Kodie_GreenColor},
                ]}>
                {' '}
                exclusive features
              </Text>{' '}
              by subscribing to{' '}
              <Text
                style={[
                  ManageSubscriptionStyle.SubHeading,
                  {
                    color: _COLORS.Kodie_GreenColor,
                    fontFamily: FONTFAMILY.K_Bold,
                  },
                ]}>
                Kodie
              </Text>
              .
            </Text>
          )}
          {SubscriptionStatus == 'active' ? null : (
            <Text style={[ManageSubscriptionStyle.SubUnderlineHeading]}>
              14-days unlimited FREE trial. Thereafter, only S69 / month
            </Text>
          )}
          <View style={ManageSubscriptionStyle.RangeSliderView}>
            {SubscriptionStatus == 'active' ? null : (
              <View style={ManageSubscriptionStyle.switchBtn_view}>
                <SwitchButton leftBtnText={'Monthly'} rightBtnText={'Yearly'} />
              </View>
            )}

            {/* <RangeSlider
              from={1}
              to={20}
              onPriceRangeChange={handlePriceRangeChange}
              onHighRange={handlemaxRange}
              onLowRange={handleminRange}
              onLowrange={2}
            /> */}
          </View>
          <FlatList
            horizontal={true}
            data={subscriptionData}
            keyExtractor={(item, index) => item.id}
            renderItem={subscriptionCardRender}
          />
          {/* <View style={{marginBottom: 10}}>
            <CustomSingleButton
              onPress={() => props.navigation.navigate('BottomNav')}
              _ButtonText={'Subscribe for only $69 / month'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              disabled={isLoading ? true : false}
            />
          </View> */}
        </ScrollView>
        {isLoading ? <CommonLoader /> : null}
      </SafeAreaView>
    </>
  );
};

export default ManageSubscription;
