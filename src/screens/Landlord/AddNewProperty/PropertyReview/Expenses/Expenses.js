import React, {useRef, useEffect, useState} from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {ExpensesStyle} from './ExpensesStyle';
import {_COLORS} from '../../../../../Themes';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import AddExpensesDetails from './AddExpensesDetails/AddExpensesDetails';
import PropertyExpenses from './PropertyExpenses/PropertyExpenses';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import moment from 'moment/moment';
import {Config} from '../../../../../Config';
export default Expenses = props => {
  const property_id = props.property_id;
  console.log('property_id in Expenses..', property_id);
  const refRBSheet = useRef();
  const [Expenses_data, setExpenses_Data] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const CloseUp = () => {
    refRBSheet.current.close();
    get_Expenses_Details();
  };

  const get_Expenses_Details = async () => {
    const url = Config.BASE_URL;
    const Expenses_Details_url = url + `getAll/Expenses/${property_id}`;
    console.log('Request URL:', Expenses_Details_url);
    await axios
      .get(Expenses_Details_url)
      .then(response => {
        console.log('API Response Expenses_Details_url:', response?.data);
        if (response?.data?.success === true) {
          setExpenses_Data(response?.data?.data);
          console.log('Expenses Details Data..', response?.data?.data);
          setIsLoading(false);
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed Expenses_Details', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    get_Expenses_Details();
  }, []);

  const property_expense_render = ({item, index}) => {
    const getExpenseCategory = lookupKey => {
      switch (lookupKey) {
        case 269:
          return 'Accounting';
        case 270:
          return 'Advertising';
        case 271:
          return 'Agent fees';
        case 272:
          return 'Bank fees';
        case 273:
          return 'Cleaning';
        case 274:
          return 'Electricity';
        case 275:
          return 'Ground rents';
        case 276:
          return 'Insurance';
        case 277:
          return 'Internet';
        case 278:
          return 'Late payment fees';
        case 279:
          return 'Legal';
        case 280:
          return 'Mortgage expenses';
        case 281:
          return 'Other';
        case 282:
          return 'Rates';
        case 283:
          return 'Rent arrears';
        case 284:
          return 'Repairs and maintenance';
        case 285:
          return 'Property tax';
        case 286:
          return 'Utilities';
        case 287:
          return 'Water';
        default:
          return '';
      }
    };
    return (
      <View style={ExpensesStyle.mainContainer}>
        <View style={ExpensesStyle.subContainer}>
          <View style={ExpensesStyle.Account_main_View}>
            <View style={ExpensesStyle.account_view}>
              <View>
                <Text style={ExpensesStyle.Accounting_Text}>
                  {getExpenseCategory(item.UPED_EXPENSE_CATEGORY)}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={ExpensesStyle.Paid_Text}>{'Paid by:'}</Text>
                  <Text style={ExpensesStyle.Paid_Text}>
                    {item.UPED_RESPONSIBLE_PAYING == 266
                      ? 'Landlord'
                      : 'Tenant'}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={ExpensesStyle.Amount_Text}>
                  {item.UPED_PAID == 0 ? 'Amount due' : 'Amount paid'}
                </Text>
                <Text style={ExpensesStyle.Accounting_Text}>
                  {item.UPED_TOTAL_AMOUNT}
                </Text>
              </View>
            </View>
          </View>
          <View style={ExpensesStyle.datePaid_main_view}>
            <View style={ExpensesStyle.paidDate_subView}>
              <View style={ExpensesStyle.paid_Date_View}>
                <Text style={ExpensesStyle.date_paid}>{'Date paid:'}</Text>
                <Text style={ExpensesStyle.Amount_Text}>
                  {moment(item.UPED_DUE_DATE.substring(0, 10)).format('DD-MMM')}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  ExpensesStyle.rent_received_view,
                  {
                    backgroundColor:
                      item.UPED_PAID == 0
                        ? '#E9F2E9'
                        : _COLORS.Kodie_LightOrange,
                  },
                ]}>
                <View style={{flexDirection: 'row'}}>
                  <Entypo
                    name="dot-single"
                    size={25}
                    color={
                      item.UPED_PAID == 1
                        ? _COLORS.Kodie_DarkOrange
                        : _COLORS.Kodie_GreenColor
                    }
                  />
                  <Text
                    style={[
                      ExpensesStyle.rent_received_text,
                      {
                        color:
                          item.UPED_PAID == 1
                            ? _COLORS.Kodie_DarkOrange
                            : _COLORS.Kodie_GreenColor,
                      },
                    ]}>
                    {item.UPED_PAID == 1 ? 'Awaiting payment' : 'Paid'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={ExpensesStyle.mainContainer}>
      <ScrollView>
        {Expenses_data?.length > 0 ? null : (
          <View style={ExpensesStyle.add_Expenses_view}>
            <Text style={ExpensesStyle.add_Expenses_Text}>
              {'Start by adding an expense '}
            </Text>
          </View>
        )}
        {Expenses_data?.length > 0 ? (
          <>
            <Text style={ExpensesStyle.heading_Text}>
              {'Property expenses'}
            </Text>
            {/* <PropertyExpenses /> */}
            <FlatList
              data={Expenses_data}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}
              keyExtractor={item => item?.id}
              renderItem={property_expense_render}
            />
          </>
        ) : null}

        <View style={ExpensesStyle.btn_View}>
          <CustomSingleButton
            _ButtonText={'+ Add expense'}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={() => {
              refRBSheet.current.open();
            }}
            height={45}
            disabled={isLoading ? true : false}
          />
        </View>
        <RBSheet
          ref={refRBSheet}
          height={760}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: ExpensesStyle.bottomModal_container,
          }}>
          <AddExpensesDetails onClose={CloseUp} property_id={property_id} />
        </RBSheet>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
