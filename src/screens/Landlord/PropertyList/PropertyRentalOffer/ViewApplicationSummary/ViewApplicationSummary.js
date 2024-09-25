import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {ViewApplicationSummaryStyle} from './ViewApplicationSummaryStyle';

import {_COLORS, FONTFAMILY} from '../../../../../Themes';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RowTexts from '../../../../../components/Molecules/RowTexts/RowTexts';
import {fontSize} from '../../../../../Themes/FontStyle/FontStyle';
import ToggleButton from '../../../../../components/Molecules/ToggleButton/ToggleButton';
import {brown100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import moment from 'moment';

const occupantData = [
  {
    id: 1,
    name: 'Deependra',
    email: 'deep@gmail.com',
  },
  {
    id: 2,
    name: 'uday',
    email: 'uday@gmail.com',
  },
];
const ViewApplicationSummary = props => {
  const {tenantQuestDetails} = props;
  const [acceptButtonId, setAcceptButtonId] = useState(0);
  const [reasonOfReject, setReasonOfReject] = useState('');
  const [applicationSummaryToggle, setApplicationSummaryToggle] = useState('');
  const [occupantDetailsToggle, setOccupantDetailsToggle] = useState('');
  const [referenceToggle, setReferenceToggle] = useState('');

  console.log('tenantQuestDetails....', JSON.stringify(tenantQuestDetails));
  console.log(
    'move data...',
    tenantQuestDetails?.[0]?.children?.[0]?.id == 2
      ? tenantQuestDetails?.[0]?.children?.[0]?.tqm_Question_value
      : null,
  );

  const occupantRenderItem = ({item, index}) => {
    return (
      <View style={ViewApplicationSummaryStyle.occupants_item_View}>
        <View>
          <Text style={ViewApplicationSummaryStyle.occupants_name}>
            {item?.name}
          </Text>
          <Text style={ViewApplicationSummaryStyle.occupants_email}>
            {item?.email}
          </Text>
        </View>
        <View style={{marginHorizontal: 5}}>
          <CustomSingleButton
            _ButtonText={'Contact'}
            backgroundColor={_COLORS.Kodie_WhiteColor}
            borderColor={_COLORS.Kodie_GrayColor}
            height={35}
            width={90}
            marginTop={0}
            onPress={() => {
              Alert.alert(
                'Remove person?',
                'This person will be permanently removed from the application.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Remove',
                    onPress: () => {
                      console.log('Remove');
                      //   removeOccupant(index);
                    },
                  },
                ],
              );
            }}
          />
        </View>
      </View>
    );
  };
  const referenceRenderItem = ({item, index}) => {
    return (
      <View style={ViewApplicationSummaryStyle.occupants_item_View}>
        <View>
          <Text style={ViewApplicationSummaryStyle.occupants_name}>
            {'Jason Macfie'}
          </Text>
          <Text style={ViewApplicationSummaryStyle.occupants_email}>
            {'Manager'}
          </Text>
          <Text style={ViewApplicationSummaryStyle.occupants_email}>
            {'info@kodie.com.au'}
          </Text>
          <Text style={ViewApplicationSummaryStyle.occupants_email}>
            {'0402 123 124'}
          </Text>
        </View>
        <View style={{marginHorizontal: 5, alignSelf: 'center'}}>
          <CustomSingleButton
            _ButtonText={'Contact'}
            backgroundColor={_COLORS.Kodie_WhiteColor}
            borderColor={_COLORS.Kodie_GrayColor}
            height={35}
            width={90}
            marginTop={0}
            onPress={() => {
              Alert.alert(
                'Remove person?',
                'This person will be permanently removed from the application.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Remove',
                    onPress: () => {
                      console.log('Remove');
                      //   removeOccupant(index);
                    },
                  },
                ],
              );
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={ViewApplicationSummaryStyle?.mainContainer}>
      {/* Application summary Data */}
      <View style={{}}>
        <TouchableOpacity
          style={ViewApplicationSummaryStyle.applicationSum_view}
          onPress={() => {
            setApplicationSummaryToggle(!applicationSummaryToggle);
          }}>
          <Text style={ViewApplicationSummaryStyle.applicationSumDet}>
            {'Application summary'}
          </Text>
          <TouchableOpacity
            style={ViewApplicationSummaryStyle.down_Arrow_icon}
            onPress={() => {
              setApplicationSummaryToggle(!applicationSummaryToggle);
            }}>
            <Fontisto
              name={applicationSummaryToggle ? 'angle-up' : 'angle-down'}
              size={15}
              color={_COLORS.Kodie_DarkGrayColor}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <DividerIcon />
        {applicationSummaryToggle && (
          <View>
            <View>
              <Text style={ViewApplicationSummaryStyle?.headingText}>
                {'Rental details'}
              </Text>
              <RowTexts
                leftText={'Move in date'}
                rightText={moment(
                  tenantQuestDetails?.[0]?.children?.[0]?.id == 2
                    ? tenantQuestDetails?.[0]?.children?.[0]?.tqm_Question_value
                    : '',
                ).format('DD MMMM YYYY')}
              />
              <RowTexts
                leftText={'Length of lease'}
                rightText={
                  tenantQuestDetails?.[0]?.children?.[1]?.id == 3
                    ? tenantQuestDetails[0].children[1]
                        .tqm_Question_value_data == null
                      ? '-'
                      : tenantQuestDetails[0].children[1]
                          ?.tqm_Question_value_data
                    : ''
                }
              />
              <RowTexts
                leftText={'Budget'}
                rightText={`${
                  tenantQuestDetails?.[0]?.children?.[3]?.id == 5
                    ? tenantQuestDetails?.[0]?.children?.[3]
                        ?.tqm_Question_value == null
                      ? '-'
                      : tenantQuestDetails?.[0]?.children?.[3]
                          ?.tqm_Question_value
                    : ''
                }`}
              />
              <RowTexts
                leftText={'Frequency of payments'}
                rightText={
                  tenantQuestDetails?.[0]?.children?.[4]?.id == 6
                    ? tenantQuestDetails[0].children[4]
                        .tqm_Question_value_data == null
                      ? '-'
                      : tenantQuestDetails[0].children[4]
                          ?.tqm_Question_value_data
                    : ''
                }
              />
            </View>

            <View>
              <Text style={ViewApplicationSummaryStyle?.headingText}>
                {'Employment & income'}
              </Text>
              <RowTexts
                leftText={'Employment status'}
                rightText={
                    tenantQuestDetails?.[1]?.children?.[1]?.id === 9 
                    ? (tenantQuestDetails[1].children[1].tqm_Question_value == null 
                        ? '-' 
                        : moment(tenantQuestDetails[1].children[1].tqm_Question_value).format('DD MMMM YYYY')) 
                    : ''
                }
              />
              <RowTexts
                leftText={'Employment start'}
                rightText={
                  tenantQuestDetails?.[1]?.children?.[0]?.id == 8
                    ? tenantQuestDetails[1].children[0]
                        .tqm_Question_value_data == null
                      ? '-'
                      : tenantQuestDetails[1].children[0]
                          ?.tqm_Question_value_data
                    : ''
                }
              />
              <RowTexts
                leftText={'Length of employment'}
                rightText={'1 year, 11 months'}
              />
              <RowTexts
                leftText={'Employer'}
                rightText={'Kodie Property Management'}
              />
              <RowTexts leftText={'Job title'} rightText={'Head of product'} />
              <RowTexts leftText={'Type of income'} rightText={'Salary'} />
            </View>

            <View>
              <Text style={ViewApplicationSummaryStyle?.headingText}>
                {'Rental history'}
              </Text>
              <RowTexts
                leftText={'Previous address'}
                rightText={'123 Street, Sydney, Australia, 2000'}
              />
              <RowTexts
                leftText={'Length of stay'}
                rightText={'2 years, 9 months'}
              />
              <RowTexts
                leftText={'Reason for move'}
                rightText={'Bigger place needed'}
              />
              <RowTexts leftText={'Broken rental agreement'} rightText={'No'} />
              <RowTexts leftText={'Prior evictions'} rightText={'No'} />
            </View>

            <View>
              <Text style={ViewApplicationSummaryStyle?.headingText}>
                {'Preferences'}
              </Text>
              <RowTexts leftText={'Smoking?'} rightText={'Non-smoking'} />
              <RowTexts leftText={'Pets'} rightText={'Yes'} />
              <RowTexts leftText={'# of pets'} rightText={'1'} />
              <RowTexts leftText={'Type of pet'} rightText={'Dog'} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  ViewApplicationSummaryStyle?.headingText,
                  {alignSelf: 'center'},
                ]}>
                {'Screening result'}
              </Text>
              <View style={ViewApplicationSummaryStyle?.toggleButtonView}>
                <ToggleButton
                  tabValue={acceptButtonId}
                  setTabValue={setAcceptButtonId}
                  activeColor={_COLORS.Kodie_GreenColor}
                  inactiveColor={_COLORS.Kodie_WhiteColor}
                  activeTextColor={_COLORS.Kodie_WhiteColor}
                  inactiveTextColor={_COLORS.Kodie_BlackColor}
                  firstTabLabel="Accept"
                  secondTabLabel="Reject"
                  width={200}
                />
              </View>
            </View>
            <View>
              <Text style={ViewApplicationSummaryStyle?.headingText}>
                {'Reason for rejection'}
              </Text>
              <TextInput
                value={reasonOfReject}
                onChangeText={text => setReasonOfReject(text)}
                placeholder="Please enter the Reason for rejection."
                numberOfLines={5}
                textAlignVertical="top"
                style={ViewApplicationSummaryStyle?.reasonRejectStyle}
              />
            </View>
          </View>
        )}
      </View>

      {/* Occupante Data  */}
      <View>
        <View>
          <TouchableOpacity
            style={ViewApplicationSummaryStyle.applicationSum_view}
            onPress={() => {
              setOccupantDetailsToggle(!occupantDetailsToggle);
            }}>
            <Text style={ViewApplicationSummaryStyle.applicationSumDet}>
              {'Occupant details'}
            </Text>
            <TouchableOpacity
              style={ViewApplicationSummaryStyle.down_Arrow_icon}
              onPress={() => {
                setOccupantDetailsToggle(!occupantDetailsToggle);
              }}>
              <Fontisto
                name={occupantDetailsToggle ? 'angle-up' : 'angle-down'}
                size={15}
                color={_COLORS.Kodie_DarkGrayColor}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <DividerIcon />
          {occupantDetailsToggle && (
            <View>
              <View>
                <View style={ViewApplicationSummaryStyle?.rowStyle}>
                  <Text
                    style={[
                      ViewApplicationSummaryStyle?.headingText,
                      {color: _COLORS?.Kodie_MediumGrayColor},
                    ]}>
                    {'# of occupants'}
                  </Text>
                  <Text
                    style={ViewApplicationSummaryStyle?.occupantNumberStyle}>
                    {'2'}
                  </Text>
                </View>
                <FlatList
                  data={occupantData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={occupantRenderItem}
                />
              </View>
              {/* Leaseholders Data  */}
              <View>
                <Text
                  style={[
                    ViewApplicationSummaryStyle.applicationSumDet,
                    {marginTop: 5},
                  ]}>
                  {'Leaseholders'}
                </Text>
                <View style={ViewApplicationSummaryStyle?.rowStyle}>
                  <Text
                    style={[
                      ViewApplicationSummaryStyle?.headingText,
                      {color: _COLORS?.Kodie_MediumGrayColor},
                    ]}>
                    {'# of leaseholders'}
                  </Text>
                  <Text
                    style={ViewApplicationSummaryStyle?.occupantNumberStyle}>
                    {'2'}
                  </Text>
                </View>
                <FlatList
                  data={occupantData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={occupantRenderItem}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      ViewApplicationSummaryStyle?.headingText,
                      {alignSelf: 'center'},
                    ]}>
                    {'Screening result'}
                  </Text>
                  <View style={ViewApplicationSummaryStyle?.toggleButtonView}>
                    <ToggleButton
                      tabValue={acceptButtonId}
                      setTabValue={setAcceptButtonId}
                      activeColor={_COLORS.Kodie_GreenColor}
                      inactiveColor={_COLORS.Kodie_WhiteColor}
                      activeTextColor={_COLORS.Kodie_WhiteColor}
                      inactiveTextColor={_COLORS.Kodie_BlackColor}
                      firstTabLabel="Accept"
                      secondTabLabel="Reject"
                      width={200}
                    />
                  </View>
                </View>
              </View>
              <View>
                <Text style={ViewApplicationSummaryStyle?.headingText}>
                  {'Reason for rejection'}
                </Text>
                <TextInput
                  value={reasonOfReject}
                  onChangeText={text => setReasonOfReject(text)}
                  placeholder="Please enter the Reason for rejection."
                  numberOfLines={5}
                  textAlignVertical="top"
                  style={ViewApplicationSummaryStyle?.reasonRejectStyle}
                />
              </View>
            </View>
          )}
        </View>
      </View>
      {/* References Data */}
      <View>
        <TouchableOpacity
          style={ViewApplicationSummaryStyle.applicationSum_view}
          onPress={() => {
            setReferenceToggle(!referenceToggle);
          }}>
          <Text style={ViewApplicationSummaryStyle.applicationSumDet}>
            {'References'}
          </Text>
          <TouchableOpacity
            style={ViewApplicationSummaryStyle.down_Arrow_icon}
            onPress={() => {
              setReferenceToggle(!referenceToggle);
            }}>
            <Fontisto
              name={referenceToggle ? 'angle-up' : 'angle-down'}
              size={15}
              color={_COLORS.Kodie_DarkGrayColor}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <DividerIcon />
        {referenceToggle && (
          <View>
            <View>
              <Text
                style={[
                  ViewApplicationSummaryStyle.applicationSumDet,
                  {marginVertical: 10},
                ]}>
                {'Employment references'}
              </Text>
              <FlatList
                data={occupantData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={referenceRenderItem}
              />
            </View>
            <View>
              <Text style={ViewApplicationSummaryStyle.applicationSumDet}>
                {'Rental references'}
              </Text>
              <FlatList
                data={occupantData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={referenceRenderItem}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  ViewApplicationSummaryStyle?.headingText,
                  {alignSelf: 'center'},
                ]}>
                {'Screening result'}
              </Text>
              <View style={ViewApplicationSummaryStyle?.toggleButtonView}>
                <ToggleButton
                  tabValue={acceptButtonId}
                  setTabValue={setAcceptButtonId}
                  activeColor={_COLORS.Kodie_GreenColor}
                  inactiveColor={_COLORS.Kodie_WhiteColor}
                  activeTextColor={_COLORS.Kodie_WhiteColor}
                  inactiveTextColor={_COLORS.Kodie_BlackColor}
                  firstTabLabel="Accept"
                  secondTabLabel="Reject"
                  width={200}
                />
              </View>
            </View>
            <View>
              <Text style={ViewApplicationSummaryStyle?.headingText}>
                {'Reason for rejection'}
              </Text>
              <TextInput
                value={reasonOfReject}
                onChangeText={text => setReasonOfReject(text)}
                placeholder="Please enter the Reason for rejection."
                numberOfLines={5}
                textAlignVertical="top"
                style={ViewApplicationSummaryStyle?.reasonRejectStyle}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ViewApplicationSummary;
