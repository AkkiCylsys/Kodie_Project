//ScreenNo:93
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
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
import { useNavigation } from '@react-navigation/native';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import { useSelector } from 'react-redux';

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
  useEffect(()=>{
    if(isFoucus){
      if (newStatus === 1 || newStatus == null || newStatus === '') {
        getInspectionDetails();
      }
    Area_key();
    fetchData();
    }
  },[isFoucus])
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
      url + `getAccount_details/${loginData?.Login_details?.user_account_id}`;
    console.log('PersonalDetails_url..', apiUrl);
    await axios
      .get(apiUrl)
      .then(response => {
        console.log('API Response getPersonalDetails:', response?.data?.data[0]);
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
    const AreaGetUrl = url + 'get_inspection_area';
    console.log('Request URL:', AreaGetUrl);
    setIsLoading(true);
    axios
      .get(AreaGetUrl)
      .then(response => {
        console.log('Selected_Address', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          console.log('Selected_Address....', response?.data?.data);
          setAreaKey(response?.data?.data[0]);
        } else {
          console.error('Selected_Address_error:', response?.data?.error);
          // alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Selected_Address error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };
  const toggleCheckBox = (itemId) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: !prevCheckedItems[itemId],
    }));
  };
  const getCheckedItemIds = () => {
    return Object.keys(checkedItems)
      .filter(itemId => checkedItems[itemId])
      .join(',');
  };
  const checkedItemIds = getCheckedItemIds();
  const Detail_render = ({ item, index }) => {
    const isChecked = checkedItems[item.TAM_AREA_KEY]; 
     return (
      <View style={ScheduleCss.DetailsView}>
        <TouchableOpacity 
        // onPress={() => toggleCheckBox(item.TAM_AREA_KEY)}
        >
          <MaterialIcons
            name={isChecked ? 'check-box' : 'check-box-outline-blank'}
            size={25}
            color={isChecked ? _COLORS?.Kodie_GreenColor : _COLORS.Kodie_MediumGrayColor}
          />
        </TouchableOpacity>
        <Text style={ScheduleCss.details_text}>{item.TAM_AREA_NAME}</Text>
      </View>
    );
  };
  const filteredData = AreaKey.filter(item => checkedItems[item.TAM_AREA_KEY]);
  return (
    <View style={ScheduleCss.MainContainer}>
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
          data={filteredData}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          numColumns={2}
          keyExtractor={item =>item.TAM_AREA_KEY.toString()}
          renderItem={Detail_render}
        />
        <DividerIcon />
        <Text style={ScheduleCss.inspections}>{'Notes'}</Text>
        <Text style={ScheduleCss.MBText}>{Inspection_Detail?.v_TIM_DESCRIPTION}</Text>
        <DividerIcon />
</>
        ):null}
      </View>
    </View>
  );
};
export default Schedule;
