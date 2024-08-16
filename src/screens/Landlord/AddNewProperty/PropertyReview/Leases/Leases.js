import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { LeasesStyle } from './LeasesStyle';
import { IMAGES, _COLORS, FONTFAMILY } from '../../../../../Themes';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import AddLeaseDetails from './AddLeaseDetails/AddLeaseDetails';
import { LeaseSummaryStyle } from './LeaseSummary/LeaseSummaryStyle';
import { Config } from '../../../../../Config';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import Logrentalpayment from './Logrentalpayment/Logrentalpayment'
import { useIsFocused } from '@react-navigation/native';
import { CommonLoader } from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
const Leases = (props) => {
  const { property_id } = props;
const isFocus =useIsFocused();
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet4 = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLogSheetOpen, setIsLogSheetOpen] = useState(false);
  const [leaseSummaryData, setLeaseSummaryData] = useState([]);
  const [rentalReceiptData, setRentalReceiptData] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!isSheetOpen && !isLogSheetOpen && isFocus) {
      fetchLeaseSummary();
    }
  
  }, [isSheetOpen, isLogSheetOpen,isFocus,leaseSummaryData]);
useEffect(()=> {
  if (isFocus) {
    fetchRentalReceipt();
  }
},[isFocus])
  const handleClose = () => {
    refRBSheet.current.close();
    setIsSheetOpen(false);
    setEditMode(false);
  };

  const handleLogClose = () => {
    refRBSheet2.current.close();
    fetchRentalReceipt()
    setIsLogSheetOpen(false);
  };
  const handleEditClick =()=>{
    refRBSheet.current.open();
    setEditMode(true);
  }

  const fetchLeaseSummary = async () => {
    const url = `${Config.BASE_URL}getPaymentDueday`;
    const data = { p_UPLD_UPD_KEY: property_id };

    setIsLoading(true);
    try {
      const response = await axios.post(url, data);
      if (response.data.success) {
        setLeaseSummaryData(response.data.data);
        setIsLoading(false);
      } else {
        console.error('Error fetching lease summary:', response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('API error fetching lease summary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRentalReceipt = async () => {
    const url = `${Config.BASE_URL}get/paymentdetails/${property_id}`;

    setIsLoading(true);
    try {
      const response = await axios.get(url);
      console.log(response?.data?.data);
      if (response.data.success) {
        setRentalReceiptData(response?.data?.data);
        setIsLoading(false);
      } else {
        console.error('Error fetching rental receipt:', response.data.message);
        setIsLoading(false);

      }
    } catch (error) {
      console.error('API error fetching rental receipt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRentalReceipt = ({ item }) => (
    <View>
      <View style={LeaseSummaryStyle.Account_main_View}>
        <View style={LeaseSummaryStyle.account_view}>
          <View>
            <Text style={LeaseSummaryStyle.Accounting_Text}>
              {item.payment_type}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={LeaseSummaryStyle.Paid_Text}>Period: </Text>
              <Text style={LeaseSummaryStyle.Paid_Text}>
                {item.PLD_RENTAL_PAYMENT_PERIOD}
              </Text>
            </View>
          </View>
          <View>
            <Text style={LeaseSummaryStyle.Amount_Text}>Amount paid</Text>
            <Text style={LeaseSummaryStyle.Accounting_Text}>
              {item.PLD_TOTAL_AMOUNT}
            </Text>
          </View>
        </View>
      </View>
      <View style={LeaseSummaryStyle.datePaid_main_view}>
        <View style={LeaseSummaryStyle.paidDate_subView}>
          <View style={LeaseSummaryStyle.paid_Date_View}>
            <Text style={LeaseSummaryStyle.date_paid}>Date paid:</Text>
            <Text style={LeaseSummaryStyle.Amount_Text}>
              {item.PLD_PAYMENT_DATE
                ? moment(item.PLD_PAYMENT_DATE.substring(0, 10)).format('Do MMMM YYYY')
                : ''}
            </Text>
          </View>
          <TouchableOpacity style={LeaseSummaryStyle.rent_received_view}>
            <View style={{ flexDirection: 'row',justifyContent:'center' }}>
              <Entypo name="dot-single" size={25} color={_COLORS.Kodie_GreenColor} />
              <Text style={LeaseSummaryStyle.rent_received_text}>Paid</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <View style={LeasesStyle.mainContainer}>
        <ScrollView>
          {!leaseSummaryData?.LEASE_KEY && (
            <View>
              <View style={LeasesStyle.add_Lease_view}>
                <Text style={LeasesStyle.add_Lease_Text}>Start by adding your lease</Text>
              </View>
              <View style={LeasesStyle.btn_View}>
                <CustomSingleButton
                  _ButtonText={'+ Add lease'}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    refRBSheet.current?.open();
                    setIsSheetOpen(true);
                  }}
                  height={45}
                />
              </View>
            </View>
          )}
          {leaseSummaryData?.LEASE_KEY && (
            <>
              <Text style={[LeaseSummaryStyle.heading_Text, { marginLeft: 16 }]}>Lease summary</Text>
              <View style={LeaseSummaryStyle.subContainer}>
                <View style={LeaseSummaryStyle.Due_Summary_main_View}>
                  <View style={LeaseSummaryStyle.summary_view}>
                    <View>
                      <View style={LeaseSummaryStyle.due_View}>
                        <Text style={LeaseSummaryStyle.Due_Text}>Due in</Text>
                        <Text style={LeaseSummaryStyle.Days_Text}>
                          {`${leaseSummaryData?.DAYS_LEFT} days`}
                        </Text>
                      </View>
                      <Text style={LeaseSummaryStyle.date_cld_Text}>
                        {moment(leaseSummaryData?.NEXT_PAYMENT_DATE).format('dddd D MMMM YYYY')}
                      </Text>
                    </View>
                    <View style={LeaseSummaryStyle.due_View}>
                      <TouchableOpacity onPress={handleEditClick}>
                        <Image source={IMAGES.noteBook} style={LeaseSummaryStyle.note_b_img_sty} />
                      </TouchableOpacity>
                      {/* <TouchableOpacity onPress={() => refRBSheet4.current.open()}>
                        <Entypo name="dots-three-horizontal" size={20} color={_COLORS.Kodie_GrayColor} />
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
                <View style={LeaseSummaryStyle.Lease_Term_main_View}>
                  <View style={LeaseSummaryStyle.lease_term_View}>
                    <View>
                      <Text style={LeaseSummaryStyle.lease_term_Text}>Lease term</Text>
                      <View style={LeaseSummaryStyle.sub_View}>
                        <Text style={LeaseSummaryStyle.date_Text}>
                          {moment(leaseSummaryData?.UPLD_COMMENCEMENT_DATE).format('D MMM YYYY')}
                        </Text>
                        <Text style={LeaseSummaryStyle.date_Text}>-</Text>
                        <Text style={LeaseSummaryStyle.date_Text}>
                          {moment(leaseSummaryData?.UPLD_LEASE_END_DATE).format('D MMM YYYY')}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={LeaseSummaryStyle.lease_term_Text}>Rent remaining due</Text>
                      <Text style={[LeaseSummaryStyle.date_Text, { alignSelf: 'flex-end', fontFamily: FONTFAMILY.K_Bold }]}>
                        {leaseSummaryData?.RENTAL_AMMOUNT}
                      </Text>
                    </View>
                  </View>
                  <View style={LeaseSummaryStyle.summary_view}>
                    <View style={LeaseSummaryStyle.freq_View}>
                      <Text style={LeaseSummaryStyle.lease_term_Text}>Payment frequency</Text>
                      <Text style={LeaseSummaryStyle.date_Text}>{leaseSummaryData?.UPLD_RENTAL_PAYMENT_FREQUENCY}</Text>
                    </View>
                    <TouchableOpacity style={LeaseSummaryStyle.rent_received_view}>
                      <View style={LeaseSummaryStyle.sub_View}>
                        <Entypo name="dot-single" size={25} color={_COLORS.Kodie_DarkGreenColor} style={{ alignSelf: 'center' }} />
                        <Text style={LeaseSummaryStyle.rent_received_text}>Rent received</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <CustomSingleButton
                  onPress={() => {
                    refRBSheet2.current.open();
                    setIsLogSheetOpen(true);
                  }}
                  _ButtonText={'Log a payment'}
                  Text_Color={_COLORS.Kodie_BlackColor}
                  backgroundColor={_COLORS.Kodie_lightGreenColor}
                  height={45}
                />
              </View>
            </>
          )}
          {rentalReceiptData?.length > 0 && (
            <View style={{ marginHorizontal: 16 }}>
              <Text style={LeaseSummaryStyle.heading_Text}>Rental receipts</Text>
              <FlatList
                data={rentalReceiptData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderRentalReceipt}
              />
            </View>
          )}
        </ScrollView>
      </View>
      <RBSheet
        ref={refRBSheet}
        height={720}
        customStyles={{
          wrapper: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          draggableIcon: { backgroundColor: _COLORS.Kodie_LightGrayColor },
          container: LeasesStyle.bottomModal_container,
        }}>
        <AddLeaseDetails onClose={handleClose} property_id={property_id} leaseData={leaseSummaryData} editMode={editMode}/>
      </RBSheet>
      <RBSheet
        ref={refRBSheet2}
        height={720}
        customStyles={{
          wrapper: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          draggableIcon: { backgroundColor: _COLORS.Kodie_LightGrayColor },
          container: LeaseSummaryStyle.bottomModal_container,
        }}>
        <Logrentalpayment onClose={handleLogClose} lease_keys={leaseSummaryData?.LEASE_KEY} property_id={property_id}/>
      </RBSheet>
      {isLoading? <CommonLoader/> : null}
    </>
  );
};

export default Leases;
