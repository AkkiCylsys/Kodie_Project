import React, {useState, useEffect, useRef} from 'react';
import {View, Text, FlatList} from 'react-native';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import ContractorsComponent from '../../../components/Molecules/ContractorsComponent/ContractorsComponent';
import {Config} from '../../../Config';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ContractorCurrent from '../../../components/Molecules/Contractors/ContractorCurrentTab/ContractorCurrent';
import {_COLORS} from '../../../Themes';
import { CurrentStyle } from './CurrentStyle';
import axiosInstance from '../../../services/axiosInstance';

const data = [
  {
    name: 'Jason Stathom',
    filedname: 'Handyman',
    startRating: '4.6',
    ratingnumber: '231',
    address: '1234, Contractor’s address. Australia',
    notverified: 'Not verified',
    verified: false,
    coverText1: 'I am the best contractor in town, ready to go. Check my best works portfolio and...',
  },
  {
    name: 'Mesut Ozil',
    filedname: 'Plumber',
    startRating: '4.0',
    ratingnumber: '100',
    address: '1234, Contractor’s address. Australia',
    verified: true,
    coverText1: 'I am the best contractor in town, ready to go. Check my best works portfolio and...',
  },
  {
    name: 'Jack Black',
    filedname: 'Handyman',
    startRating: '3.6',
    ratingnumber: '231',
    address: '1234, Contractor’s address. Australia',
    verified: true,
    coverText1: 'I am the best contractor in town, ready to go. Check my best works portfolio and...',
  },
];

const CurrentContractor = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [expanded, setExpanded] = useState(false);
  const [PreferredData, setPreferredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ContractorId, setContractorId] = useState();

  useEffect(() => {
    handlePreferredData();
  }, []);

  const handlePreferredData = () => {
    const url = Config.BASE_URL;
    const PreferredUrl ='current_contractor_details';
    console.log('Request URL:', PreferredUrl);
    setIsLoading(true);
    axiosInstance
      .get(PreferredUrl)
      .then(response => {
        console.log('PreferredData', response.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          console.log('PreferredData....', response?.data?.data);
          setPreferredData(response?.data?.data);
        } else {
          console.error('PreferredData_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('PreferredData error:', error);
        setIsLoading(false);
      });
  };

  const toggleItems = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    const DeleteContractor = {
      p_CONTRACTOR_ID: ContractorId,
    };
    const url = Config.BASE_URL;
    const DeleteUrl ='invitecontractor_details_delete';
    console.log('Request URL:', DeleteUrl);
    setIsLoading(true);
    axiosInstance
      .post(DeleteUrl, DeleteContractor)
      .then(response => {
        console.log('DeleteData', response.data);
        if (response?.data?.success === true) {
          alert(response?.data?.message);
          handlePreferredData();
          refRBSheet.current.close();
          setIsLoading(false);
        } else {
          console.error('DeleteData_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('DeleteData error:', error);
        setIsLoading(false);
      });
  };

  const renderItem = ({item}) => (
    <View>
      <ContractorsComponent
        name={`${item.UAD_FIRST_NAME} ${item.UAD_LAST_NAME}`}
        userImage={{uri: item.UAD_PROFILE_PHOTO_PATH}}
        filedname={item.filedname}
        startRating={item.startRating}
        ratingnumber={item.ratingnumber}
        address={item.UAD_CURR_PHYSICAL_ADD}
        notverified={item.notverified}
        verified={item.verified}
        CoverText1={item.coverText1}
        MessageBtn={() => {
          navigation.navigate('Chat', {
            userid: item.UAD_KEY,
            name: `${item.UAD_FIRST_NAME} ${item.UAD_LAST_NAME}`,
            chatname: 'chatName',
          });
          // alert(item.UAD_KEY);
        }}
        onPress={() => {
          setContractorId(item.id);
          refRBSheet.current.open();
        }}
      />
      <DividerIcon
        IsShowIcon
        iconName={expanded ? 'chevron-up' : 'chevron-down'}
        onPress={toggleItems}
      />
    </View>
  );

  return (
    <>
      <FlatList
        data={PreferredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={250}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: CurrentStyle.bottomModal_container,
        }}>
        <ContractorCurrent onDelete={() => handleDelete()} />
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </>
  );
};

export default CurrentContractor;
