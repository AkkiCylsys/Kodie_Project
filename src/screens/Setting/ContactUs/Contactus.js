import {View, Text, TextInput, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {ContactusStyle} from './ContactusStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import {CustomButtonstyles} from '../../../components/Atoms/CustomButton/CustomButtonCss';
import {_COLORS, LABEL_STYLES} from '../../../Themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {_goBack} from '../../../services/CommonServices';
import DeviceInfo from 'react-native-device-info';
import {Config} from '../../../Config';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useDispatch, useSelector} from 'react-redux';
import axiosInstance from '../../../services/axiosInstance';
const Contactus = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const accountEmail = loginData?.Login_details?.email;
  const [check, setCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aboutHelp, setAboutHelp] = useState('');
  const [aboutHelpError, setAboutHelpError] = useState('');
  const osName = DeviceInfo.getSystemName();
  console.log('Operating System:', osName);

  const handleCheck = () => {
    setCheck(!check);
  };
  // validation...

  const handleAbouthelp = text => {
    setAboutHelp(text);
    if (text == '') {
      setAboutHelpError('Message is required!');
    } else {
      setAboutHelpError('');
    }
  };

  const handleSubmit = () => {
    if (aboutHelp.trim() == '') {
      setAboutHelpError('Message is required!');
    } else {
      handleContactus();
    }
  };
  // Api intrigation ....
  const handleContactus = () => {
    const url = Config.BASE_URL;
    const contactUsUrl ='Contact_Us';
    console.log('Request URL:', contactUsUrl);
    setIsLoading(true);
    const contactus_data = {
      email: accountEmail,
      message: aboutHelp,
      device_information: check ? osName : null,
    };
    axiosInstance
      .post(contactUsUrl, contactus_data)
      .then(response => {
        console.log('API Response contact us:', response.data);
        if (response?.data?.success === true) {
          alert(response?.data?.message);
          setAboutHelp('');
          setCheck(false)
          props.navigation.navigate("Help_FeedBack")
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed contact us', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1,  backgroundColor:_COLORS?.Kodie_WhiteColor}}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Contact us'}
      />
      <View style={ContactusStyle.inputContainer}>
        <Text style={LABEL_STYLES.commontext}>{'Tell us how we can help'}
        <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
        </Text>
        <TextInput
          style={[ContactusStyle.input, {height: 119,}]}
          value={aboutHelp}
          onChangeText={text => {
            handleAbouthelp(text);
          }}
          placeholder="Tell us how we can help"
          placeholderTextColor="#999"
          multiline
          numberOfLines={5}
          textAlignVertical={'top'}
        />
      </View>
      {aboutHelpError ? (
        <Text style={ContactusStyle.error_text}>{aboutHelpError}</Text>
      ) : null}
      <View style={ContactusStyle.checkboxview}>
        <TouchableOpacity
          onPress={() => {
            handleCheck();
          }}>
          <View style={ContactusStyle.checkboxTouch}>
            {check && (
              <Entypo name="check" color={_COLORS.Kodie_GreenColor} size={22} />
            )}
          </View>
        </TouchableOpacity>
        <View style={ContactusStyle.checkboxtextview}>
          <Text style={ContactusStyle.optionaltext}>
            Include device information? (optional)
          </Text>
          <Text style={ContactusStyle.answertext}>
            Technical details like your model and setting can help us answer
            your question.
          </Text>
        </View>
      </View>

      <View style={ContactusStyle.viaemailview}>
        <Text style={ContactusStyle.viaemailtext}>
          We will get back to you via email.
        </Text>
      </View>
      <View style={ContactusStyle.buttonview}>
        <CustomSingleButton
          _ButtonText={'Submit'}
          Text_Color={_COLORS.Kodie_WhiteColor}
          disabled={isLoading ? true : false}
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
export default Contactus;
