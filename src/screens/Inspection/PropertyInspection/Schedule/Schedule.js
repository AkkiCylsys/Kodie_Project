//ScreenNo:93
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import {ScheduleCss} from './ScheduleCss';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {IMAGES, LABEL_STYLES, _COLORS} from '../../../../Themes';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import RowTexts from '../../../../components/Molecules/RowTexts/RowTexts';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import moment from 'moment/moment';
import { Config } from '../../../../Config';
import axios from 'axios';
const Detail = [
  {
    id: '1',
    name: 'Bathroom',
  },
  {
    id: '2',
    name: 'Garden',
  },
  {
    id: '3',
    name: 'Bedroom',
  },
  {
    id: '4',
    name: 'Kitchen',
  },
  {
    id: '5',
    name: 'Dining Room',
  },
  {
    id: '6',
    name: 'Living Room',
  },
  {
    id: '7',
    name: 'Exterior',
  },
  {
    id: '8',
    name: 'Roof ',
  },
  {
    id: '9',
    name: 'Garage',
  },
];
const Schedule = (props) => {
  const [contractor, setContractor] = useState('');
  const [email, setEmail] = useState('');
  const [Inspection_Detail, setInspection_Details] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [AreaKey, setAreaKey] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

const TIM_KEY = props?.TIM_KEY;
const account_id = props?.account_id;
console.log("account_id",account_id);
  const refRBSheet = useRef();
  useEffect(()=>{getInspectionDetails();
    getPersonalDetails();
    Area_key();
  },[])
  const getPersonalDetails = async () => {
    setIsLoading(true);
    const url = Config.BASE_URL;
    const apiUrl =
      url + `getAccount_details/${account_id}`;
    console.log('PersonalDetails_url..', apiUrl);
    await axios
      .get(apiUrl)
      .then(response => {
        console.log('API getAccount_details:', response?.data?.data[0]);
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
        console.log('API Response:', response?.data?.data[0]);
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
          setAreaKey(response?.data?.data);
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
  console.log(checkedItemIds);
  const Detail_render = ({ item, index }) => {
    const isChecked = checkedItems[item.TAM_AREA_KEY]; // Use a unique identifier for each item
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
        <Text style={ScheduleCss.inspections}>
          {'Date and time of inspection'}
        </Text>
        <RowTexts
          leftText={'Proposed date'}
          rightText={moment(Inspection_Detail?.v_TIM_SCHEDULE_DATE).format('dddd, D MMMM YYYY')}
        />
        <RowTexts leftText={'Proposed time'} rightText={Inspection_Detail?.v_TIM_SCHEDULE_TIME} />
        <View style={ScheduleCss.margin}>
          <RowButtons
            LeftButtonText={'Cancel inspection'}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
            RightButtonText={'Reschedule Inspection'}
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
            RightButtonborderColor={_COLORS.Kodie_BlackColor}
          />
        </View>
        <DividerIcon />
        <Text style={ScheduleCss.inspections}>{'People attending'}</Text>
        <RowTexts leftText={'Landlord Rep'} rightText={'John MacDonald'} />
        <RowTexts leftText={'Tenant Rep'} rightText={Inspection_Detail?.v_TIM_ADD_ATTENDENCE} />
        <DividerIcon color={_COLORS.Kodie_WhiteColor} />

        {/* <Text style={ScheduleCss.inspections}>{'Add attendees'}</Text>
        <TouchableOpacity>
          <View style={ScheduleCss.TextInputView}>
            <TextInput
              value={Inspection_Detail?.v_TIM_ADD_ATTENDENCE}
              placeholder={'Add people attending the inspection'}
              style={ScheduleCss.input}
              // onChange={text => setContractor(text)}
              palceholderColor={_COLORS.Kodie_MediumGrayColor}
              editable={false}
            />
            <Feather
                  name={'user-plus'}
                  size={22}
                  color={_COLORS.Kodie_GrayColor}
                  style={{ marginRight: 10 }}
                />
          </View>
        </TouchableOpacity> */}
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

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={250}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: ScheduleCss.bottomModal_container,
          }}>
          <View style={ScheduleCss.Container}>
            <View style={ScheduleCss.ModalContainer}>
              <Text style={ScheduleCss.ShareText}>Share report</Text>
              <AntDesign
                name="close"
                size={20}
                color={_COLORS.Kodie_BlackColor}
              />
            </View>
            <View style={ScheduleCss.inputContainer}>
              <Text
                style={[LABEL_STYLES._texinputLabel, ScheduleCss.cardHeight]}>
                {'Email address*'}
              </Text>
              <TextInput
                style={ScheduleCss.emailinput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
              />
            </View>
            <View style={ScheduleCss.ButtonView}>
              <TouchableOpacity style={ScheduleCss.cancelView}>
                <Text style={[ScheduleCss.cancelText]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ScheduleCss.SaveView}>
                <Text style={ScheduleCss.DoneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
    </View>
  );
};
export default Schedule;
