import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {LeasesStyle} from './LeasesStyle';
import {IMAGES, _COLORS, FONTFAMILY} from '../../../../../Themes';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import AddLeaseDetails from './AddLeaseDetails/AddLeaseDetails';
import LeaseSummary from './LeaseSummary/LeaseSummary';
import {LeaseSummaryStyle} from './LeaseSummary/LeaseSummaryStyle';
import {Config} from '../../../../../Config';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment/moment';
import Logrentalpayment from './Logrentalpayment/Logrentalpayment';
import TenantDetails from './TenantDetails/TenantDetails';
import InviteTenantModal from '../../../../../components/Molecules/InviteTenantModal/InviteTenantModal';
import {TenantDetailsStyle} from './TenantDetails/TenantDetailsStyle';
import StarRating from 'react-native-star-rating';
import RowButtons from '../../../../../components/Molecules/RowButtons/RowButtons';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import LeaseBottomModal from '../../../../../components/Molecules/BottomModal/LeaseBottomModal/LeaseBottomModal';
export default Leases = props => {
  // alert(JSON.stringify(props.property_id));
  const [isLoading, setIsLoading] = useState(false);
  const property_id = props.property_id;
  console.log('property_id.._lease.....', property_id);
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const refRBSheet4 = useRef();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [islogSheetOpen, setIslogSheetOpen] = useState(false);
  const [isTenantsSheetOpen, setIsTenantsSheetOpen] = useState(false);
  const [lease_summary_data, setLease_summary_data] = useState([]);
  const [lease_key, setLease_key] = useState('');
  const [rental_Receipt_data, setRental_Receipt_data] = useState([]);
  const [manuallyTenantDetails, setManuallyTenantDetails] = useState([]);
  const [rating, setRating] = useState(4);
  console.log(lease_summary_data?.DAYS_LEFT, 'lease_summary_data?.DAYS_LEFT');
  useEffect(() => {
    if (!isSheetOpen || !islogSheetOpen || isTenantsSheetOpen) {
      console.log('RBSheet closed, rendering LeaseSummary');
      lease_summary();
      get_retal_receipt();
      get_manually_tenantsDetails();
    }
  }, [isSheetOpen, islogSheetOpen, isTenantsSheetOpen]);
  const handleClose = () => {
    refRBSheet.current.close();
    setIsSheetOpen(false);
  };
  const handleLogClose = () => {
    refRBSheet2.current.close();
    setIslogSheetOpen(false);
  };
  const handleTenantClose = () => {
    refRBSheet3.current.close();
    setIsTenantsSheetOpen(false);
  };
  const handleLeaseClose = () => {
    refRBSheet4.current.close();
  };
  // Api intrigation.....
  const lease_summary = () => {
    const url = Config.BASE_URL;
    const LeaseSummary_Data = {
      p_UPLD_UPD_KEY: 1713,
    };
    const lease_summary_url =
      // url + `property_lease_details/getAll/${property_id}`;
      url + 'getPaymentDueday';
    console.log('Request URL:', lease_summary_url);
    setIsLoading(true);
    axios
      .post(lease_summary_url, LeaseSummary_Data)
      .then(response => {
        console.log('API Response lease_summary:', response?.data);
        if (response?.data?.success === true) {
          setLease_summary_data(response?.data?.data);
          console.log('lease_summaryData..', response?.data?.data);
          // alert(JSON.stringify(response?.data?.data));
        } else {
          // alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed lease_summary', error);
        setIsLoading(false);
        // alert(error);
      });
    // .finally(() => {
    //   setIsLoading(false);
    // });
  };
  const get_retal_receipt = () => {
    const url = Config.BASE_URL;
    const retal_receip_url =
      url + `property_lease_details/get/paymentdetails/${property_id}`;
    console.log('Request URL:', retal_receip_url);
    setIsLoading(true);
    axios
      .get(retal_receip_url)
      .then(response => {
        console.log('API Response retal_receip_url:', response?.data);
        if (response?.data?.success === true) {
          setRental_Receipt_data(response?.data?.data);
          console.log('rental receipt Data..', response?.data?.data);
          // alert(JSON.stringify(response?.data?.data));
        } else {
          // alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed retal_receipt', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const get_manually_tenantsDetails = () => {
    const url = Config.BASE_URL;
    const manually_tenantsDetails_url =
      url + `tanant_details/get/tenantmanually/${property_id}`;
    console.log('Request URL:', manually_tenantsDetails_url);
    setIsLoading(true);
    axios
      .get(manually_tenantsDetails_url)
      .then(response => {
        console.log(
          'API Response manually_tenantsDetails_url:',
          response?.data,
        );
        if (response?.data?.success === true) {
          setManuallyTenantDetails(response?.data?.data);
          console.log(
            'manually_tenantsDetails_url Data..',
            response?.data?.data,
          );
          // alert(JSON.stringify(response?.data?.data));
        } else {
          // alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed manually_tenantsDetails_url', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // Data render.......
  const LeaseSummary_render = props => {
    const {DAYS_LEFT} = props?.lease_summary_data;
    setLease_key(item?.UPLD_LEASE_KEY);
    return (
      <View style={LeaseSummaryStyle.subContainer}>
        <View style={LeaseSummaryStyle.Due_Summary_main_View}>
          <View style={LeaseSummaryStyle.summary_view}>
            <View>
              <View style={LeaseSummaryStyle.due_View}>
                <Text style={LeaseSummaryStyle.Due_Text}>{'Due in'}</Text>
                <Text
                  style={
                    LeaseSummaryStyle.Days_Text
                  }>{`${DAYS_LEFT} days`}</Text>
              </View>
              <Text style={LeaseSummaryStyle.date_cld_Text}>
                {moment(item?.UPLD_PAYMENT_DUE_DAY).format('dddd D MMMM YYYY')}
              </Text>
            </View>
            <View style={LeaseSummaryStyle.due_View}>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.open();
                }}>
                <Image
                  source={IMAGES.noteBook}
                  style={LeaseSummaryStyle.note_b_img_sty}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet4.current.open();
                }}>
                <Entypo
                  name="dots-three-horizontal"
                  size={20}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={LeaseSummaryStyle.Lease_Term_main_View}>
          <View style={LeaseSummaryStyle.lease_term_View}>
            <View>
              <Text style={LeaseSummaryStyle.lease_term_Text}>
                {'Lease term'}
              </Text>
              <View style={LeaseSummaryStyle.sub_View}>
                <Text style={LeaseSummaryStyle.date_Text}>
                  {item?.UPLD_COMMENCEMENT_DATE === null
                    ? ''
                    : moment(item?.UPLD_COMMENCEMENT_DATE).format('D MMM YYYY')}
                </Text>
                <Text style={LeaseSummaryStyle.date_Text}>-</Text>
                <Text style={LeaseSummaryStyle.date_Text}>
                  {item?.lease_term === null
                    ? ''
                    : moment(item?.lease_term).format('D MMM YYYY')}
                </Text>
              </View>
            </View>
            <View>
              <Text style={LeaseSummaryStyle.lease_term_Text}>
                {'Rent remaining due'}
              </Text>
              <Text
                style={[
                  LeaseSummaryStyle.date_Text,
                  {alignSelf: 'flex-end', fontFamily: FONTFAMILY.K_Bold},
                ]}>{`$ ${item.UPLD_RENTAL_AMMOUNT}`}</Text>
            </View>
          </View>
          <View style={LeaseSummaryStyle.summary_view}>
            <View style={LeaseSummaryStyle.freq_View}>
              <Text style={LeaseSummaryStyle.lease_term_Text}>
                {'Payment frequency'}
              </Text>
              <Text style={LeaseSummaryStyle.date_Text}>
                {item.UPLD_RENTAL_PAYMENT_FREQUENCY == 1 ? 'Weekly' : 'Monthly'}
              </Text>
            </View>
            <TouchableOpacity style={LeaseSummaryStyle.rent_received_view}>
              <View style={LeaseSummaryStyle.sub_View}>
                <Entypo
                  name="dot-single"
                  size={25}
                  color={_COLORS.Kodie_DarkGreenColor}
                  style={{alignSelf: 'center'}}
                />
                <Text style={LeaseSummaryStyle.rent_received_text}>
                  {'Rent received'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <CustomSingleButton
          onPress={() => {
            refRBSheet2.current.open();
            setIslogSheetOpen(true);
          }}
          _ButtonText={'Log a payment'}
          Text_Color={_COLORS.Kodie_BlackColor}
          backgroundColor={_COLORS.Kodie_lightGreenColor}
          height={45}
          disabled={isLoading ? true : false}
        />
      </View>
    );
  };
  const rental_recipt_render = ({item, index}) => {
    return (
      <View style={{}}>
        <View style={LeaseSummaryStyle.Account_main_View}>
          <View style={LeaseSummaryStyle.account_view}>
            <View>
              <Text style={LeaseSummaryStyle.Accounting_Text}>
                {item.Payment_type}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={LeaseSummaryStyle.Paid_Text}>{'Period: '}</Text>
                <Text style={LeaseSummaryStyle.Paid_Text}>
                  {item.UPLD_RENTAL_PAYMENT_PERIOD}
                </Text>
              </View>
            </View>
            <View>
              <Text style={LeaseSummaryStyle.Amount_Text}>{'Amount paid'}</Text>
              <Text style={LeaseSummaryStyle.Accounting_Text}>
                {` $ ${item.UPLD_TOTAL_AMOUNT}`}
              </Text>
            </View>
          </View>
        </View>
        <View style={LeaseSummaryStyle.datePaid_main_view}>
          <View style={LeaseSummaryStyle.paidDate_subView}>
            <View style={LeaseSummaryStyle.paid_Date_View}>
              <Text style={LeaseSummaryStyle.date_paid}>{'Date paid:'}</Text>
              <Text style={LeaseSummaryStyle.Amount_Text}>
                {item.UPLD_PAYMENT_DATE == null
                  ? ''
                  : moment(item.UPLD_PAYMENT_DATE.substring(0, 10)).format(
                      ' Do   MMMM   YYYY',
                    )}
              </Text>
            </View>
            <TouchableOpacity style={LeaseSummaryStyle.rent_received_view}>
              <View style={{flexDirection: 'row'}}>
                <Entypo
                  name="dot-single"
                  size={25}
                  color={_COLORS.Kodie_GreenColor}
                />
                <Text style={LeaseSummaryStyle.rent_received_text}>
                  {'Paid'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const tenantDetails = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <View style={TenantDetailsStyle.details_main_view}>
          <View style={TenantDetailsStyle.user_subView}>
            <Image source={IMAGES.userImage} />
            <View style={TenantDetailsStyle.name_view}>
              <View style={{flex: 0.9}}>
                <Text style={TenantDetailsStyle.userName}>
                  {`${item.ATD_FIRST_NAME}  ${item.ATD_LAST_NAME}`}
                </Text>
              </View>
              <View style={TenantDetailsStyle.check_view}>
                <AntDesign
                  name="checkcircle"
                  size={25}
                  color={_COLORS.Kodie_GreenColor}
                />
                <Text style={TenantDetailsStyle.verify_text}>{'Verified'}</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1, marginRight: 10}}>
            <View
              style={[
                TenantDetailsStyle.starStyle,
                {
                  alignSelf: 'flex-end',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                },
              ]}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={rating}
                fullStarColor={_COLORS.Kodie_lightGreenColor}
                emptyStarColor={_COLORS.Kodie_LightGrayColor}
                starSize={18}
                selectedStar={rating => setRating(rating)}
                starStyle={TenantDetailsStyle.startRating}
              />
            </View>
            <TouchableOpacity
              style={[TenantDetailsStyle.rent_received_view, {marginTop: 5}]}>
              <View style={{flexDirection: 'row'}}>
                <Entypo
                  name="dot-single"
                  size={25}
                  color={_COLORS.Kodie_GreenColor}
                  style={{alignSelf: 'center'}}
                />
                <Text
                  style={[
                    TenantDetailsStyle.rent_received_text,
                    {fontSize: Platform.OS === 'ios' ? 11 : 8},
                  ]}>
                  {'Screening completed'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={TenantDetailsStyle.resident_score_text}>
            {'Resident score:'}
          </Text>
          <View style={TenantDetailsStyle.score_view}>
            <Text style={TenantDetailsStyle.scoreNo}>{'721'}</Text>
          </View>
        </View>
        <RowButtons
          LeftButtonText={'View profile'}
          leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
          LeftButtonTextColor={_COLORS.Kodie_BlackColor}
          LeftButtonborderColor={_COLORS.Kodie_GrayColor}
          RightButtonText={'Message tenant'}
          RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
          RightButtonTextColor={_COLORS.Kodie_WhiteColor}
          RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
        />
        <DividerIcon />
      </View>
    );
  };
  return (
    <>
      <View style={LeasesStyle.mainContainer}>
        <ScrollView>
          {!lease_summary_data.length >= 0 ? (
            <View>
              <View style={LeasesStyle.add_Lease_view}>
                <Text style={LeasesStyle.add_Lease_Text}>
                  {'Start by adding your lease '}
                </Text>
              </View>
              <View style={LeasesStyle.btn_View}>
                <CustomSingleButton
                  _ButtonText={'+ Add lease'}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    // alert('kjgjhgjh')
                    refRBSheet.current?.open();
                    setIsSheetOpen(true);
                  }}
                  height={45}
                  // disabled={isLoading ? true : false}
                />
              </View>
            </View>
          ) : null}

          {lease_summary_data.length >= 0 ? (
            <>
              <Text style={[LeaseSummaryStyle.heading_Text, {marginLeft: 16}]}>
                {'Lease summary'}
              </Text>
              {/* <View style={{flex: 1}}>
                <FlatList
                  data={lease_summary_data}
                  showsVerticalScrollIndicator={false}
                  // keyExtractor={(item,index) => item?.UPLD_LEASE_KEY.toString()}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={LeaseSummary_render}
                /> */}
              {/* <View style={{marginHorizontal: 16, marginTop: 16}}>
                  <Text style={LeaseSummaryStyle.heading_Text}>
                    {'Tenant details'}
                  </Text>
                  {!manuallyTenantDetails.length > 0 ? (
                    <Text style={LeaseSummaryStyle.invite_tenant_Text}>
                      {'Invite tenant to connect to this property'}
                    </Text>
                  ) : null}
                  {manuallyTenantDetails.length > 0 ? (
                    <FlatList
                      data={manuallyTenantDetails}
                      scrollEnabled
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{}}
                      // keyExtractor={(item,index) => item?.id}
                      keyExtractor={(item, index) => index}
                      renderItem={tenantDetails}
                    />
                  ) : null}
                  {manuallyTenantDetails.length > 0 ? null : (
                    <View style={LeaseSummaryStyle.btn_View}>
                      <CustomSingleButton
                        _ButtonText={'+ Add tenant'}
                        Text_Color={_COLORS.Kodie_WhiteColor}
                        height={45}
                        onPress={() => {
                          refRBSheet3.current.open();
                          setIsTenantsSheetOpen(true);
                        }}
                        disabled={isLoading ? true : false}
                      />
                    </View>
                  )}
                </View> */}
              {/* </View> */}
              <View style={LeaseSummaryStyle.subContainer}>
                <View style={LeaseSummaryStyle.Due_Summary_main_View}>
                  <View style={LeaseSummaryStyle.summary_view}>
                    <View>
                      <View style={LeaseSummaryStyle.due_View}>
                        <Text style={LeaseSummaryStyle.Due_Text}>
                          {'Due in'}
                        </Text>
                        {/* <Text style={LeaseSummaryStyle.Days_Text}>
                          {lease_summary_data?.DAYS_LEFT !== null
                            ? `${lease_summary_data?.DAYS_LEFT} days`
                            : 'Loading...'}
                        </Text> */}
                        <Text>{lease_summary_data?.DAYS_LEFT}</Text>
                      </View>
                      <Text style={LeaseSummaryStyle.date_cld_Text}>
                        {moment(lease_summary_data?.NEXT_PAYMENT_DATE).format(
                          'dddd D MMMM YYYY',
                        )}
                      </Text>
                    </View>
                    <View style={LeaseSummaryStyle.due_View}>
                      <TouchableOpacity
                        onPress={() => {
                          refRBSheet.current.open();
                        }}>
                        <Image
                          source={IMAGES.noteBook}
                          style={LeaseSummaryStyle.note_b_img_sty}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          refRBSheet4.current.open();
                        }}>
                        <Entypo
                          name="dots-three-horizontal"
                          size={20}
                          color={_COLORS.Kodie_GrayColor}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={LeaseSummaryStyle.Lease_Term_main_View}>
                  <View style={LeaseSummaryStyle.lease_term_View}>
                    <View>
                      <Text style={LeaseSummaryStyle.lease_term_Text}>
                        {'Lease term'}
                      </Text>
                      <View style={LeaseSummaryStyle.sub_View}>
                        <Text style={LeaseSummaryStyle.date_Text}>
                          {moment(
                            lease_summary_data?.UPLD_COMMENCEMENT_DATE,
                          ).format('D MMM YYYY')}
                        </Text>
                        <Text style={LeaseSummaryStyle.date_Text}>-</Text>
                        <Text style={LeaseSummaryStyle.date_Text}>
                          {moment(
                            lease_summary_data?.UPLD_LEASE_END_DATE,
                          ).format('D MMM YYYY')}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={LeaseSummaryStyle.lease_term_Text}>
                        {'Rent remaining due'}
                      </Text>
                      <Text
                        style={[
                          LeaseSummaryStyle.date_Text,
                          {
                            alignSelf: 'flex-end',
                            fontFamily: FONTFAMILY.K_Bold,
                          },
                        ]}>{`$ ${lease_summary_data?.RENTAL_AMMOUNT}`}</Text>
                    </View>
                  </View>
                  <View style={LeaseSummaryStyle.summary_view}>
                    <View style={LeaseSummaryStyle.freq_View}>
                      <Text style={LeaseSummaryStyle.lease_term_Text}>
                        {'Payment frequency'}
                      </Text>
                      <Text style={LeaseSummaryStyle.date_Text}>
                        {lease_summary_data?.UPLD_RENTAL_PAYMENT_FREQUENCY}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={LeaseSummaryStyle.rent_received_view}>
                      <View style={LeaseSummaryStyle.sub_View}>
                        <Entypo
                          name="dot-single"
                          size={25}
                          color={_COLORS.Kodie_DarkGreenColor}
                          style={{alignSelf: 'center'}}
                        />
                        <Text style={LeaseSummaryStyle.rent_received_text}>
                          {'Rent received'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <CustomSingleButton
                  onPress={() => {
                    refRBSheet2.current.open();
                    setIslogSheetOpen(true);
                  }}
                  _ButtonText={'Log a payment'}
                  Text_Color={_COLORS.Kodie_BlackColor}
                  backgroundColor={_COLORS.Kodie_lightGreenColor}
                  height={45}
                  disabled={isLoading ? true : false}
                />
              </View>
            </>
          ) : null}
          {rental_Receipt_data.length > 0 ? (
            <View style={{marginHorizontal: 16}}>
              <Text style={LeaseSummaryStyle.heading_Text}>
                {'Rental receipts'}
              </Text>
              <FlatList
                data={rental_Receipt_data}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}
                // keyExtractor={(item,index) => item?.id}
                keyExtractor={(item, index) => index}
                renderItem={rental_recipt_render}
              />
            </View>
          ) : null}
        </ScrollView>
      </View>
      <RBSheet
        ref={refRBSheet}
        height={720}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: LeasesStyle.bottomModal_container,
        }}>
        <AddLeaseDetails onClose={handleClose} property_id={property_id} />
      </RBSheet>
      <RBSheet
        ref={refRBSheet2}
        height={510}
        closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: LeaseSummaryStyle.bottomModal_container,
        }}>
        <Logrentalpayment onClose={handleLogClose} lease_keys={lease_key} />
      </RBSheet>
      <RBSheet
        ref={refRBSheet3}
        height={240}
        closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: LeaseSummaryStyle.bottomModal_container,
        }}>
        <InviteTenantModal
          closeRBSheet={() => refRBSheet.current.close()}
          onClose={handleTenantClose}
          property_id={property_id}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheet4}
        height={180}
        closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: LeaseSummaryStyle.bottomModal_container,
        }}>
        <LeaseBottomModal onClose={handleLeaseClose} />
      </RBSheet>
    </>
  );
};
