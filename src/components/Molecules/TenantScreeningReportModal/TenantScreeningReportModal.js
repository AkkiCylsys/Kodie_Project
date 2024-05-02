import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TenantScreeningReportModalStyle} from './TenantScreeningReportModalStyle';
import {FONTFAMILY, _COLORS} from '../../../Themes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {fontFamily, fontSize} from '../../../Themes/FontStyle/FontStyle';
import CustomSingleButton from '../../Atoms/CustomButton/CustomSingleButton';
import { useState } from 'react';
const TenantScreeningReportModal = () => {
    Const[isLoading,setIsLoading]=useState(false)
  return (
    <View style={TenantScreeningReportModalStyle.mainConatiner}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            marginHorizontal: 16,
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <AntDesign
              name="checkcircle"
              size={15}
              color={_COLORS.Kodie_lightGreenColor}
              style={{alignSelf: 'center'}}
            />
            <Text style={TenantScreeningReportModalStyle.standOutText}>
              {'Stand out from the rest. '}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <AntDesign
              name="checkcircle"
              size={15}
              color={_COLORS.Kodie_lightGreenColor}
              style={{alignSelf: 'center'}}
            />
            <Text style={TenantScreeningReportModalStyle.standOutText}>
              {'Get verified faster. '}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <AntDesign
              name="checkcircle"
              size={15}
              color={_COLORS.Kodie_lightGreenColor}
              style={{alignSelf: 'center'}}
            />
            <Text
              style={[
                TenantScreeningReportModalStyle.standOutText,
                {color: _COLORS.Kodie_lightGreenColor},
              ]}>
              {'Screening report'}
            </Text>
            <Text
              style={[
                TenantScreeningReportModalStyle.standOutText,
                {color: _COLORS.Kodie_BlackColor},
              ]}>
              {'in less than 3 minutes'}
            </Text>
          </View>
          <Text
            style={[
              TenantScreeningReportModalStyle.standOutText,
              {fontSize: 12, fontFamily: FONTFAMILY.K_Regular, marginTop: 20},
            ]}>
            {
              'Run your own check through Equifax, Australia’s leading tenancy database, to verify your identity and uncover the records property managers and owners care about most:'
            }
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Entypo
              name="dot-single"
              size={25}
              color={_COLORS.Kodie_BlackColor}
              style={{alignSelf: 'center'}}
            />
            <Text
              style={[
                TenantScreeningReportModalStyle.standOutText,
                {fontSize: 12, fontFamily: FONTFAMILY.K_Regular},
              ]}>
              {'Tenancy database'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Entypo
              name="dot-single"
              size={25}
              color={_COLORS.Kodie_BlackColor}
              style={{alignSelf: 'center'}}
            />
            <Text
              style={[
                TenantScreeningReportModalStyle.standOutText,
                {fontSize: 12, fontFamily: FONTFAMILY.K_Regular},
              ]}>
              {'Bankruptcy notices'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Entypo
              name="dot-single"
              size={25}
              color={_COLORS.Kodie_BlackColor}
              style={{alignSelf: 'center'}}
            />
            <Text
              style={[
                TenantScreeningReportModalStyle.standOutText,
                {fontSize: 12, fontFamily: FONTFAMILY.K_Regular},
              ]}>
              {'Court records'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Entypo
              name="dot-single"
              size={25}
              color={_COLORS.Kodie_BlackColor}
              style={{alignSelf: 'center'}}
            />
            <Text
              style={[
                TenantScreeningReportModalStyle.standOutText,
                {fontSize: 12, fontFamily: FONTFAMILY.K_Regular},
              ]}>
              {'Directorships'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <View style={TenantScreeningReportModalStyle.AverageView}>
              <Text
                style={[
                  (TenantScreeningReportModalStyle.AverageText,
                  {
                    fontSize: 12,
                    fontFamily: FONTFAMILY.K_Medium,
                    alignSelf: 'center',
                  }),
                ]}>
                {'Average time'}
              </Text>
              <Text style={TenantScreeningReportModalStyle.AverageText}>
                {'3 minutes'}
              </Text>
            </View>
            <View
              style={[
                TenantScreeningReportModalStyle.AverageView,
                {marginHorizontal: 5},
              ]}>
              <Text
                style={[
                  (TenantScreeningReportModalStyle.AverageText,
                  {
                    fontSize: 12,
                    fontFamily: FONTFAMILY.K_Medium,
                    alignSelf: 'center',
                  }),
                ]}>
                {'Average time'}
              </Text>
              <Text style={TenantScreeningReportModalStyle.AverageText}>
                {'3 minutes'}
              </Text>
            </View>
            <View style={[TenantScreeningReportModalStyle.AverageView]}>
              <Text
                style={[
                  (TenantScreeningReportModalStyle.AverageText,
                  {
                    fontSize: 12,
                    fontFamily: FONTFAMILY.K_Medium,
                    alignSelf: 'center',
                  }),
                ]}>
                {'Average time'}
              </Text>
              <Text style={TenantScreeningReportModalStyle.AverageText}>
                {'3 minutes'}
              </Text>
            </View>
          </View>
          <View>
            <CustomSingleButton
              _ButtonText={'Start check now'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              disabled={isLoading ? true : false}
              onPress={() => {
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TenantScreeningReportModal;

const styles = StyleSheet.create({});
