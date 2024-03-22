//ScreenNo:227
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopHeader from '../../../components/Molecules/Header/Header';
import {SocialMediaStyle} from './SocialMediaStyles';
import {IMAGES} from '../../../Themes/index';

import RowTab from '../../../components/Molecules/RowTab/RowTab';

import {_goBack} from '../../../services/CommonServices/CommonMethods';
import axios from 'axios';
import {Config} from '../../../Config';
import Entypo from 'react-native-vector-icons/Entypo';
import {_COLORS} from '../../../Themes/index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
const SocialMedia = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkdin, setLinkdin] = useState('');
  useEffect(() => {
    handle_SocialMedia();
  }, []);
  const handle_SocialMedia = () => {
    const url = Config.BASE_URL;
    const SocialMedia_url = url + 'lookup_details';
    console.log('Request URL:', SocialMedia_url);
    setIsLoading(true);
    const SocialMedia_data = {
      P_PARENT_CODE: 'INVITE',
      P_TYPE: 'OPTION',
    };
    axios
      .post(SocialMedia_url, SocialMedia_data)
      .then(response => {
        console.log('API Response SocialMedia Data:', response.data);
        if (response?.data?.status === true) {
          setSocialMediaData(response?.data?.lookup_details);
          // alert(JSON.stringify(response?.data?.lookup_details));
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed SocialMedia', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const socialMediaRender = ({item}) => {
    return (
      <View style={{marginHorizontal: 16}}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(item.lookup_description);
          }}
          style={SocialMediaStyle.Helpview}>
          <View style={SocialMediaStyle.Helpselctionview}>
            <View style={SocialMediaStyle.Helpimgview}>
              {item.lookup_key == 362 ? (
                <AntDesign
                  name={'instagram'}
                  size={18}
                  color={_COLORS.Kodie_GreenColor}
                />
              ) : item.lookup_key == 363 ? (
                <Feather
                  name={'facebook'}
                  size={18}
                  color={_COLORS.Kodie_GreenColor}
                />
              ) : item.lookup_key == 364 ? (
                <Entypo
                  name={'linkedin'}
                  size={18}
                  color={_COLORS.Kodie_GreenColor}
                />
              ) : item.lookup_key == 365 ? (
                <Fontisto
                  name={'twitter'}
                  size={18}
                  color={_COLORS.Kodie_GreenColor}
                />
              ) : null}
            </View>
            <View style={SocialMediaStyle.TextViewMain}>
              <Text style={SocialMediaStyle.Helptext}>
                {item.lookup_key == 362
                  ? 'Instagram'
                  : item.lookup_key == 363
                  ? 'Facebook'
                  : item.lookup_key == 364
                  ? 'Linkedin'
                  : item.lookup_key == 365
                  ? 'X'
                  : null}
              </Text>
            </View>
          </View>
          <View style={SocialMediaStyle.arrowiconview}>
            <Entypo name={'chevron-small-right'} size={20} color={'#787D8B'} />
          </View>
        </TouchableOpacity>
        <DividerIcon style={{marginBottom: 10}} />
      </View>
    );
  };

  return (
    <>
      <View style={SocialMediaStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={'Follow us on social media'}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={socialMediaData}
          keyExtractor={(index, item) => index.toString()}
          renderItem={socialMediaRender}
        />
      </View>
      {isLoading ? <CommonLoader /> : null}
    </>
  );
};

export default SocialMedia;
