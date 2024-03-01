import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import ContractorsComponent from '../../../components/Molecules/ContractorsComponent/ContractorsComponent';
import {Config} from '../../../Config';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    name: 'Jason Stathom',
    filedname: 'Handyman',
    startRating: '4.6',
    ratingnumber: '231',
    address: '1234, Contractor’s address. Australia',
    notverified: 'Not verified',
    verified: false,

    coverText1:
      'I am the best contractor in town, ready to go. Check my best works portfolio and...',
  },
  {
    name: 'Mesut Ozil',
    filedname: 'Plumber',
    startRating: '4.0',
    ratingnumber: '100',
    address: '1234, Contractor’s address. Australia',
    verified: true,

    coverText1:
      'I am the best contractor in town, ready to go. Check my best works portfolio and...',
  },
  {
    name: 'Jack Black',
    filedname: 'Handyman',
    startRating: '3.6',
    ratingnumber: '231',
    address: '1234, Contractor’s address. Australia',
    verified: true,

    coverText1:
      'I am the best contractor in town, ready to go. Check my best works portfolio and...',
  },
];

const PreviousContractor = () => {
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState(false);
  const [PreferredData, setPreferredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    handlePreferredData();
  }, []);
  const handlePreferredData = () => {
    const url = Config.BASE_URL;
    const PreferredUrl = url + 'previous_contractor_details';
    console.log('Request URL:', PreferredUrl);
    setIsLoading(true);
    axios
      .get(PreferredUrl)
      .then(response => {
        console.log('PreferredData', response.data);
        if (response.data.success === true) {
          setIsLoading(false);
          console.log('PreferredData....', response.data.data);
          setPreferredData(response.data.data);
        } else {
          console.error('PreferredData_error:', response.data.error);
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
      {isLoading ? <CommonLoader /> : null}
    </>
  );
};

export default PreviousContractor;
