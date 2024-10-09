//ScreenNo:93
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {ScheduleCss} from './ScheduleCss';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {_COLORS} from '../../../../Themes';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import RowTexts from '../../../../components/Molecules/RowTexts/RowTexts';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import moment from 'moment/moment';
import { Config } from '../../../../Config';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../../services/axiosInstance';

const Schedule = (props) => {
  const isFoucus = useNavigation()
  const [Inspection_Detail, setInspection_Details] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [AreaKey, setAreaKey] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const loginData = useSelector(state => state.authenticationReducer.data);
  const [accountDetails, setAccountDetails] = useState(null);

const TIM_KEY = props?.TIM_KEY;
const newStatus = props?.newStatus;
console.log("newStatus",newStatus);
useFocusEffect(
  React.useCallback(() => {
    if (newStatus === 1 || newStatus == null || newStatus === '') {
      getInspectionDetails(); // Only call when the screen is focused
    }
    Area_key(); // Call whenever screen is focused
    fetchData(); // Call whenever screen is focused
  }, [newStatus]) // Dependencies: newStatus can trigger this when it changes
);
  const fetchData = async () => {
    if (
      loginData?.Login_details?.user_id ||
      loginData?.Login_details?.user_account_id
    ) {
      await getPersonalDetails();
    }
  };
  const getPersonalDetails = async () => {
    setIsLoading(true);
    const url = Config.BASE_URL;
    const apiUrl =
     `getAccount_details/${loginData?.Login_details?.user_account_id}`;
    console.log('PersonalDetails_url..', apiUrl);
    await axiosInstance
      .get(apiUrl)
      .then(response => {
        // console.log('API Response getPersonalDetails:', response?.data?.data[0]);
        if (
          response?.data?.data &&
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setAccountDetails(response?.data?.data[0]);
        } else {
          console.error('Invalid response data format:', response?.data);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('API Error PersonalDetails Dash:', error);
        setIsLoading(false);
      });
  };
  const getInspectionDetails = () => {
    setIsLoading(true);
    const url = Config.BASE_URL;

    const apiUrl =
      url + `get_inspection_details/${TIM_KEY}`;

    axios
      .get(apiUrl)
      .then(response => {
        console.log('API Response: dfdd', response?.data?.data[0]);
        setInspection_Details(response?.data?.data[0]);
        setCheckedItems(response?.data?.data[0]?.cur_TAM_AREA_KEY)
        setIsLoading(false);
      })
      .catch(error => {
        // Handle error
        console.error('API Error PersonalDetails CIP:', error);
      });
  };
  const Area_key = () => {
    const url = Config.BASE_URL;
    const AreaGetUrl = url + `get_inspection_area_details/${TIM_KEY}`;
    console.log('Request URL:', AreaGetUrl);
    setIsLoading(true);
    axios
      .get(AreaGetUrl)
      .then(response => {
        console.log('Selected_Address', response?.data);
        if (response?.data?.success === true) {
          console.log('Selected_Address....', response?.data?.data);
          setAreaKey(response?.data?.data);
          setIsLoading(false);
        } else {
          console.error('Selected_Address_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Selected_Address error:', error);
        setIsLoading(false);
      });
  };

 
  const Detail_render = ({ item, index }) => {
   
     return (
      <View style={ScheduleCss.DetailsView} key={item?.area_key_id}>
        <TouchableOpacity 
        >
          <MaterialIcons
            name={'check-box' }
            size={25}
            color={_COLORS?.Kodie_GreenColor }
          />
        </TouchableOpacity>
        <Text style={ScheduleCss.details_text}>{item.area_name}</Text>
      </View>
    );
  };
  return (
    <ScrollView style={ScheduleCss.MainContainer}>
      <View style={ScheduleCss.Container}>
      {(newStatus === 1 || newStatus == null || newStatus === '') &&
        <>
        <Text style={ScheduleCss.inspections}>
          {'Date and time of inspection'}
        </Text>
        <RowTexts
          leftText={'Proposed date'}
          rightText={moment(Inspection_Detail?.v_TIM_SCHEDULE_DATE).format('dddd, D MMMM YYYY')}
        />
        <RowTexts leftText={'Proposed time'} rightText={Inspection_Detail?.v_TIM_SCHEDULE_TIME} />
        <View style={ScheduleCss.margin}>
           </View>
        </>
      }
       {(newStatus === 1 || newStatus == null || newStatus === '') ?(
          <RowButtons
            LeftButtonText={ 'Cancel inspection'}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
            RightButtonText={'Reschedule Inspection'}
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
            RightButtonborderColor={_COLORS.Kodie_BlackColor}
            onPressRightButton={props?.rescheduleInspection}
            onPressLeftButton={props?.CancelInspection}
          />):
          ( <CustomSingleButton
            disabled={isLoading ? true : false}
            _ButtonText={'Activate'}
            Text_Color={_COLORS.Kodie_WhiteColor}
            height={48}
            borderColor={_COLORS.Kodie_BlackColor}
            backgroundColor={_COLORS.Kodie_BlackColor}
            onPress={props?.CancelInspection}
          />)}
       
        <DividerIcon />
        {(newStatus === 1 || newStatus == null || newStatus === '') ? (
          <>
        <Text style={ScheduleCss.inspections}>{'People attending'}</Text>
        <RowTexts leftText={'Landlord Rep'} rightText={`${accountDetails?.UAD_FIRST_NAME} ${accountDetails?.UAD_LAST_NAME}`} />
        <RowTexts leftText={'Tenant Rep'} rightText={Inspection_Detail?.v_TIM_ADD_ATTENDENCE} />
        <DividerIcon color={_COLORS.Kodie_WhiteColor} />
        <DividerIcon />

        <Text style={ScheduleCss.inspections}>
          {'Areas included in inspection'}
        </Text>
        <FlatList
          data={AreaKey}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          numColumns={2}
          keyExtractor={item =>item?.area_key_id}
          renderItem={Detail_render}
        />
        <DividerIcon />
        <Text style={ScheduleCss.inspections}>{'Notes'}</Text>
        <Text style={ScheduleCss.MBText}>{Inspection_Detail?.v_TIM_DESCRIPTION? Inspection_Detail?.v_TIM_DESCRIPTION: 'No notes'}</Text>
        <DividerIcon />
</>
        ):null}
      </View>
    </ScrollView>
  );
};
export default Schedule;
