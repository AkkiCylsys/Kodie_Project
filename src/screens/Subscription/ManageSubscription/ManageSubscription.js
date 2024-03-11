import {View, Text, Image, ScrollView} from 'react-native';
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
import {useSelector} from 'react-redux';
import axios from 'axios';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {Config} from '../../../Config';
//ScreenNo:209

const subscriptionData = [
  {
    id: 1,
    cardHeading: 'Property Essential',
    amount: '69',
    duration: 'Month',
    description: 'The best place to get started',
    rule_desc: 'You get:',
    rule_no_1: 'Easily manage up to 3 properties',
    rule_no_2: 'Single user',
    rule_no_3: 'Standard financial dashboards(revenues & expenses)',
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
    amount: '149',
    duration: 'Month',
    description: 'The best place to get started',
    rule_desc: 'You get:',
    rule_no_1: 'Easily manage up to 3 properties',
    rule_no_2: 'Single user',
    rule_no_3: 'Standard financial dashboards(revenues & expenses)',
    rule_no_4: 'Service & maintenance requests with ease',
    rule_no_5: 'Standard access to contractors',
    rule_no_6: 'Income & expense tracking',
    rule_no_7: 'Tenant screening',
    rule_no_8: 'Standard document management',
    rule_no_9:
      'Standard rental property listings on Kodie Property Marketplace',
  },
  {
    id: 3,
    cardHeading: 'Property Mogul',
    amount: '69',
    duration: 'Month',
    description: 'The best place to get started',
    rule_desc: 'You get:',
    rule_no_1: 'Easily manage up to 3 properties',
    rule_no_2: 'Single user',
    rule_no_3: 'Standard financial dashboards(revenues & expenses)',
    rule_no_4: 'Service & maintenance requests with ease',
    rule_no_5: 'Standard access to contractors',
    rule_no_6: 'Income & expense tracking',
    rule_no_7: 'Tenant screening',
    rule_no_8: 'Standard document management',
    rule_no_9:
      'Standard rental property listings on Kodie Property Marketplace',
  },
];
const ManageSubscription = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponse.....', loginData);
  const [isLoading, setIsLoading] = useState(false);
  const [priceRanges, setPriceRanges] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [customerID, setCustomerID] = useState('');
  const [SubscriptionID, setSubscriptionID] = useState('');

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

      demoSubscription(selectedPriceId);
    };
    return (
      <View style={ManageSubscriptionStyle.SubscriptionDataView}>
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
        <RowsData DataTexts="Easily manage up to 3 properties" />
        <RowsData DataTexts="Single user" />
        <RowsData DataTexts="Standard financial dashboard (revenues & expenses)" />
        <RowsData DataTexts="Service & maintenance requests with ease" />
        <RowsData DataTexts="Standard access to contractors" />
        <RowsData DataTexts="Income & expense tracking" />
        <RowsData DataTexts="Tenant screening" />
        <RowsData DataTexts="Standard document management" />
        <RowsData DataTexts="Standard rental property listings on Kodie Property Marketplace" />
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
              // props.navigation.navigate("ContractorProfile")
              alert('Contact us pressed')
            }
            onPressRightButton={handleSubscribePress}
          />
        </View>
      </View>
    );
  };
  useEffect(() => {
    createCustomer();
  }, []);
  const createCustomer = () => {
    const baseUrl = Config.BASE_URL;
    const url = baseUrl + 'create_customer';
    console.log('Request URL:', url);
    setIsLoading(true);
    const createCustomer_data = {
      name: loginData?.Account_details[0]?.UAD_FIRST_NAME,
      email: loginData?.Login_details?.email,
    };
    axios
      .post(url, createCustomer_data)
      .then(response => {
        console.log('API Response createCustomer', response.data);
        if (response.data.success === true) {
          console.log('customer ID ....', response.data.data.id);
          setCustomerID(response.data.data.id);
          // props.navigation.navigate('SubscriptionScreen', {
          //   customerID: response.data.data.id,
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
    const url = baseUrl + 'demo';
    console.log('Request URL:', url);
    console.log(id);
    setIsLoading(true);
    const createSubscription_data = {
      customer_id: customerID,
      price_id: priceId,
    };
    console.log(createSubscription_data);
    axios
      .post(url, createSubscription_data)
      .then(response => {
        console.log('API Response createSubscription_data', response.data);
        if (response.data.success === true) {
          console.log('Subscription ID ....', response.data.data.id);
          setSubscriptionID(response.data.data.id);

          Insertdemodata();
          alert('Successfully subscriped');
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
  const Insertdemodata = () => {
    const baseUrl = Config.BASE_URL;
    const url = baseUrl + 'insert_subscription';
    console.log('Request URL:', url);
    console.log(id);
    setIsLoading(true);
    const Insert_data = {
      user_id: loginData.Login_details?.user_id,
      account_id: loginData.Login_details?.user_account_id,
      customer_id: customerID,
      subscription_id: SubscriptionID,
      startDate: 'string',
      endDate: 'string',
      collection_method: 'string',
      subscribe_type: 'string',
    };
    axios
      .post(url, Insert_data)
      .then(response => {
        console.log('API Response createSubscription_data', response.data);
        if (response.data.success === true) {
          console.log('insertData ....', response.data.message);
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
      <View style={ManageSubscriptionStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={'Manage Subscription'}
        />

        <ScrollView style={{paddingHorizontal: 10}}>
          <Image
            source={IMAGES.Subscription}
            style={ManageSubscriptionStyle.SubscriptionImage}
            resizeMode="contain"
          />
          <Text style={ManageSubscriptionStyle.MainHeading}>
            {'Subscribe to Kodie'}
          </Text>
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
          <Text style={[ManageSubscriptionStyle.SubUnderlineHeading]}>
            14-days unlimited FREE trial, then only $69 / month
          </Text>
          <View style={ManageSubscriptionStyle.RangeSliderView}>
            <View style={ManageSubscriptionStyle.switchBtn_view}>
              <SwitchButton
                leftBtnText={'Not approved'}
                rightBtnText={'Approved'}
              />
            </View>

            <RangeSlider
              from={1}
              to={20}
              onPriceRangeChange={handlePriceRangeChange}
              onHighRange={handlemaxRange}
              onLowRange={handleminRange}
              onLowrange={2}
            />
          </View>
          {/* <ScrollView style={{ width: "100%" }} horizontal={true}>
            <View style={ManageSubscriptionStyle.SubscriptionDataView}>
              <Text style={ManageSubscriptionStyle.Heading}>
                {"Property Essential"}
              </Text>
              <Text style={ManageSubscriptionStyle.Subscriptionprice}>
                $69
                <Text style={ManageSubscriptionStyle.SubscriptionpriceText}>
                  /Month
                </Text>
              </Text>
              <Text style={ManageSubscriptionStyle.SubDataText}>
                The best place to get started
              </Text>
              <View style={ManageSubscriptionStyle.ShadowLine} />
              <Text style={ManageSubscriptionStyle.getText}>You get:</Text>
              <RowsData DataTexts="Easily manage up to 3 properties" />
              <RowsData DataTexts="Single user" />
              <RowsData DataTexts="Standard financial dashboard (revenues & expenses)" />
              <RowsData DataTexts="Service & maintenance requests with ease" />
              <RowsData DataTexts="Standard access to contractors" />
              <RowsData DataTexts="Income & expense tracking" />
              <RowsData DataTexts="Tenant screening" />
              <RowsData DataTexts="Standard document management" />
              <RowsData DataTexts="Standard rental property listings on Kodie Property Marketplace" />
              <View style={{ padding: 5 }}>
                <RowButtons
                  leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
                  RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
                  LeftButtonTextColor={_COLORS.Kodie_BlackColor}
                  RightButtonTextColor={_COLORS.Kodie_WhiteColor}
                  LeftButtonborderColor={_COLORS.Kodie_TransparentColor}
                  RightButtonborderColor={_COLORS.Kodie_BlackColor}
                  LeftButtonText={"Contact us"}
                  RightButtonText={"Subscribe"}
                  onPressLeftButton={() =>
                    props.navigation.navigate("ContractorProfile")
                  }
                  onPressRightButton={() => {
                    props.navigation.navigate("HireContractor");
                  }}
                />
              </View>
            </View>

            <View
              style={[
                ManageSubscriptionStyle.SubscriptionDataView,
                ManageSubscriptionStyle.secondcard,
              ]}
            >
              <Text style={ManageSubscriptionStyle.Heading}>
                {"Property Essential"}
              </Text>
              <Text style={ManageSubscriptionStyle.Subscriptionprice}>
                $149
                <Text style={ManageSubscriptionStyle.SubscriptionpriceText}>
                  /Month
                </Text>
              </Text>
              <Text style={ManageSubscriptionStyle.SubDataText}>
                The best place to get started
              </Text>
              <View style={ManageSubscriptionStyle.ShadowLine} />
              <Text style={ManageSubscriptionStyle.getText}>You get:</Text>
              <RowsData DataTexts="Easily manage up to 3 properties" />
              <RowsData DataTexts="Single user" />
              <RowsData DataTexts="Standard financial dashboard (revenues & expenses)" />
              <RowsData DataTexts="Service & maintenance requests with ease" />
              <RowsData DataTexts="Standard access to contractors" />
              <RowsData DataTexts="Income & expense tracking" />
              <RowsData DataTexts="Tenant screening" />
              <RowsData DataTexts="Standard document management" />
              <RowsData DataTexts="Standard rental property listings on Kodie Property Marketplace" />
              <View style={{ padding: 5 }}>
                <RowButtons
                  leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
                  RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
                  LeftButtonTextColor={_COLORS.Kodie_BlackColor}
                  RightButtonTextColor={_COLORS.Kodie_WhiteColor}
                  LeftButtonborderColor={_COLORS.Kodie_TransparentColor}
                  RightButtonborderColor={_COLORS.Kodie_BlackColor}
                  LeftButtonText={"Contact us"}
                  RightButtonText={"Subscribe"}
                  onPressLeftButton={() =>
                    alert("Contact us pressed")
                  }
                  onPressRightButton={() => {
                    alert("Subscribe pressed");
                  }}
                />
              </View>
            </View>

            <View style={ManageSubscriptionStyle.SubscriptionDataView}>
              <Text style={ManageSubscriptionStyle.Heading}>
                {"Property Mogul"}
              </Text>
              <Text style={ManageSubscriptionStyle.Subscriptionprice}>
                Contact Us
              </Text>
              <Text style={ManageSubscriptionStyle.SubDataText}>
                The best place to get started
              </Text>
              <View style={ManageSubscriptionStyle.ShadowLine} />
              <Text style={ManageSubscriptionStyle.getText}>You get:</Text>
              <RowsData DataTexts="Easily manage up to 3 properties" />
              <RowsData DataTexts="Single user" />
              <RowsData DataTexts="Standard financial dashboard (revenues & expenses)" />
              <RowsData DataTexts="Service & maintenance requests with ease" />
              <RowsData DataTexts="Standard access to contractors" />
              <RowsData DataTexts="Income & expense tracking" />
              <RowsData DataTexts="Tenant screening" />
              <RowsData DataTexts="Standard document management" />
              <RowsData DataTexts="Standard rental property listings on Kodie Property Marketplace" />
              <View style={{ padding: 5 }}>
                <RowButtons
                  leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
                  RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
                  LeftButtonTextColor={_COLORS.Kodie_BlackColor}
                  RightButtonTextColor={_COLORS.Kodie_WhiteColor}
                  LeftButtonborderColor={_COLORS.Kodie_TransparentColor}
                  RightButtonborderColor={_COLORS.Kodie_BlackColor}
                  LeftButtonText={"Contact us"}
                  RightButtonText={"Subscribe"}
                  onPressLeftButton={() =>
                    props.navigation.navigate("ContractorProfile")
                  }
                  onPressRightButton={() => {
                    props.navigation.navigate("HireContractor");
                  }}
                />
              </View>
            </View>
          </ScrollView> */}

          <FlatList
            horizontal={true}
            data={subscriptionData}
            keyExtractor={(item, index) => item.id}
            renderItem={subscriptionCardRender}
          />
          <View style={{marginBottom: 10}}>
            <CustomSingleButton
              onPress={() => props.navigation.navigate('BottomNav')}
              _ButtonText={'Subscribe for only $69 / month'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              disabled={isLoading ? true : false}
            />
          </View>
        </ScrollView>
        {isLoading ? <CommonLoader /> : null}
      </View>
    </>
  );
};

export default ManageSubscription;
