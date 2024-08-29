import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';
import React from 'react';
import TopHeader from '../../../components/Molecules/Header/Header';
import {RenthistoryStyle} from './RenthistoryStyle';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { _COLORS } from '../../../Themes';

const Renthistory = () => {
  const expenseCategory = 'Rental';
  const responsiblePaying = ' Week 2, August';
  const amountStatus = 'Amount due';
  const totalAmount = '$800';
  const datePaid = moment().format('DD-MMM-YYYY');
  const isPaid = false;
  const invoices = [
    {id: '1', name: 'Rental Invoice.pdf', size: '4.8MB'},
    {id: '2', name: 'Rental Invoice.pdf', size: '4.8MB'},
  ];

  const renderItem = ({item}) => (
    <View style={RenthistoryStyle.invoiceContainer}>
      <View style={RenthistoryStyle.fileDetails}>
        <FontAwesome name="file-pdf-o" size={25} color="black" />
        <View style={RenthistoryStyle.fileInfo}>
          <Text style={RenthistoryStyle.fileName}>{item.name}</Text>
          <Text style={RenthistoryStyle.fileSize}>{item.size}</Text>
        </View>
      </View>
      <TouchableOpacity style={RenthistoryStyle.menuButton}>
        <MaterialIcons name="more-vert" size={24} color={_COLORS.Kodie_LightGrayColor}/>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={RenthistoryStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Rent history'}
      />
      <ScrollView style={RenthistoryStyle.container}>
        <View style={RenthistoryStyle.titleView}>
          <Text style={RenthistoryStyle.title}>Rental history</Text>
          <Text style={RenthistoryStyle.titleother}>Weekly payment</Text>
        </View>

        <View style={RenthistoryStyle.row}>
          <View style={RenthistoryStyle.boxContainer1}>
            <View style={RenthistoryStyle.textContainer}>
              <Text style={RenthistoryStyle.label}>Total Rent</Text>
              <Text style={RenthistoryStyle.valueGreen}>$5600.00</Text>
              <Text style={RenthistoryStyle.datetext}>
                As of 21-September 2023
              </Text>
            </View>
          </View>

          <View style={RenthistoryStyle.boxContainer2}>
            <View style={RenthistoryStyle.textContainer}>
              <Text style={RenthistoryStyle.label}>Rental payments</Text>
              <Text style={RenthistoryStyle.valueOrange}>$800.00</Text>
              <Text style={RenthistoryStyle.datetext}>
                As of 21-September 2023
              </Text>
            </View>
          </View>

          <View style={RenthistoryStyle.boxContainer3}>
            <View style={RenthistoryStyle.textContainer}>
              <Text style={RenthistoryStyle.label}>Deposit method</Text>
              <Text style={RenthistoryStyle.valueGrey}>1502********4832</Text>
            </View>
          </View>
        </View>
        <DividerIcon />
        <View style={RenthistoryStyle.subContainer}>
          <View style={RenthistoryStyle.Account_main_View}>
            <View style={RenthistoryStyle.account_view}>
              <View>
                <Text style={RenthistoryStyle.Accounting_Text}>
                  {expenseCategory}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={RenthistoryStyle.Paid_Text}>{'Period:'}</Text>
                  <Text style={RenthistoryStyle.Paid_Text}>
                    {responsiblePaying}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={RenthistoryStyle.Amount_Text}>{amountStatus}</Text>
                <Text style={RenthistoryStyle.Accounting_Text}>
                  {totalAmount}
                </Text>
              </View>
            </View>
          </View>
          <View style={RenthistoryStyle.datePaid_main_view}>
            <View style={RenthistoryStyle.paidDate_subView}>
              <View style={RenthistoryStyle.paid_Date_View}>
                <Text style={RenthistoryStyle.date_paid}>{'Date paid:'}</Text>
                <Text style={RenthistoryStyle.Amount_Text}>
                  {isPaid ? '-' : datePaid}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  RenthistoryStyle.rent_received_view,
                  {
                    backgroundColor: isPaid ? '#F4A300' : '#E9F2E9',
                  },
                ]}>
                <View style={{flexDirection: 'row'}}>
                  <Entypo
                    name="dot-single"
                    size={25}
                    color={isPaid ? '#F4A300' : '#4CAF50'}
                  />
                  <Text
                    style={[
                      RenthistoryStyle.rent_received_text,
                      {
                        color: isPaid ? '#F4A300' : '#4CAF50',
                      },
                    ]}>
                    {isPaid ? 'Awaiting payment' : 'Paid'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <DividerIcon />
        <FlatList
          data={invoices}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <Text style={RenthistoryStyle.header}>Rental invoices</Text>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Renthistory;
