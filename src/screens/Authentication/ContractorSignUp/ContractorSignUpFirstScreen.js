import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import StepText from '../../../components/Molecules/StepText/StepText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ContractorSignUpStyle} from './ContractorSignUpFirstScreenCSS';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import {
  FONTFAMILY,
  LABEL_STYLES,
  VIEW_STYLES,
  IMAGES,
  _COLORS,
} from './../../../Themes/index';
import {MultiSelect} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TopHeader from './../../../components/Molecules/Header/Header';
import StatusBar from './../../../components/Atoms/StatusBar/StatusBar';
const DATA = [
  {label: 'React Naive', value: '1'},
  {label: 'Javascript', value: '2'},
  {label: 'Laravel', value: '3'},
  {label: 'PHP', value: '4'},
  {label: 'jQuery', value: '5'},
  {label: 'Bootstrap', value: '6'},
  {label: 'HTML', value: '7'},
  {label: 'CSS', value: '8'},
];
import {_goBack} from './../../../services/CommonServices/index';
export default ContractorSignUpFirstScreen = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const renderDataItem = item => {
    return (
      <View style={ContractorSignUpStyle.item}>
        <Text style={ContractorSignUpStyle.selectedTextStyle}>
          {item.label}
        </Text>
        <AntDesign
          style={ContractorSignUpStyle.icon}
          color={_COLORS.Kodie_BlackColor}
          name="check"
          size={20}
        />
      </View>
    );
  };

  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <View style={ContractorSignUpStyle.container}>
      <TopHeader onPressLeftButton={() => _goBack(props)} />
      <StatusBar width={'25%'} />
      <StepText _StepNo={' 1'} _StepText={'Enter your personal information'} />
      <ScrollView>
        <View style={ContractorSignUpStyle.formContainer}>
          <View style={ContractorSignUpStyle.card}>
            <View style={ContractorSignUpStyle.inputContainer}>
              <Text
                style={[
                  LABEL_STYLES._texinputLabel,
                  ContractorSignUpStyle.cardHeight,
                ]}>
                {'Name'}
              </Text>
              <TextInput
                style={ContractorSignUpStyle.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter Your Name"
                placeholderTextColor="#999"
              />
            </View>
            <View style={ContractorSignUpStyle.inputContainer}>
              <Text
                style={[
                  LABEL_STYLES._texinputLabel,
                  ContractorSignUpStyle.cardHeight,
                ]}>
                {'Email address*'}
              </Text>
              <TextInput
                style={ContractorSignUpStyle.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                placeholderTextColor="#999"
                keyboardType='email-address'
              />
            </View>
            <View style={ContractorSignUpStyle.inputContainer}>
              <Text
                style={[
                  LABEL_STYLES._texinputLabel,
                  ContractorSignUpStyle.cardHeight,
                ]}>
                Password
              </Text>
              <View style={ContractorSignUpStyle.passwordContainer}>
                <TextInput
                  style={ContractorSignUpStyle.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={handleTogglePassword}>
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                    style={ContractorSignUpStyle.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={ContractorSignUpStyle.inputContainer}>
              <Text
                style={[
                  LABEL_STYLES._texinputLabel,
                  ContractorSignUpStyle.cardHeight,
                ]}>
                Phone number
              </Text>
              <TextInput
                style={ContractorSignUpStyle.input}
                value={phoneNo}
                onChangeText={setPhoneNo}
                placeholder="Enter your phone number"
                placeholderTextColor="#999"
                keyboardType="number-pad"
              />
            </View>
            <View style={ContractorSignUpStyle.inputContainer}>
              <Text
                style={[
                  LABEL_STYLES._texinputLabel,
                  ContractorSignUpStyle.cardHeight,
                ]}>
                Address
              </Text>
              <TextInput
                style={[
                  ContractorSignUpStyle.input,
                  ContractorSignUpStyle.addressh,
                ]}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter your address"
                placeholderTextColor="#999"
                multiline
                numberOfLines={5}
                textAlignVertical={'top'}
              />
            </View>
            <View style={ContractorSignUpStyle.inputContainer}>
              <Text
                style={[
                  LABEL_STYLES._texinputLabel,
                  ContractorSignUpStyle.cardHeight,
                ]}>
                Contractor type
              </Text>
              <MultiSelect
                style={ContractorSignUpStyle.dropdown}
                placeholderStyle={ContractorSignUpStyle.placeholderStyle}
                selectedTextStyle={ContractorSignUpStyle.selectedTextStyle}
                inputSearchStyle={ContractorSignUpStyle.inputSearchStyle}
                iconStyle={ContractorSignUpStyle.iconStyle}
                activeColor={_COLORS.Kodie_MidLightGreenColor}
                data={DATA}
                labelField="label"
                valueField="value"
                placeholder="Search"
                value={selected}
                search
                searchPlaceholder="Search..."
                onChange={item => {
                  setSelected(item);
                }}
                renderRightIcon={() => (
                  <AntDesign
                    style={ContractorSignUpStyle.icon}
                    color={_COLORS.Kodie_BlackColor}
                    name="search1"
                    size={20}
                  />
                )}
                renderItem={renderDataItem}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity onPress={() => unSelect(item)}>
                    <View style={ContractorSignUpStyle.selectedStyle}>
                      <Text style={ContractorSignUpStyle.textSelectedStyle}>
                        {item.label}
                      </Text>
                      <AntDesign color="black" name="close" size={17} />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={ContractorSignUpStyle.LastinputContainer}>
              <Text
                style={[
                  LABEL_STYLES._texinputLabel,
                  ContractorSignUpStyle.cardHeight,
                ]}>
                Bio
              </Text>
              <TextInput
                style={[
                  ContractorSignUpStyle.input,
                  ContractorSignUpStyle.addressh,
                ]}
                value={bio}
                onChangeText={setBio}
                placeholder="Enter your contractor details"
                placeholderTextColor="#999"
                multiline
                numberOfLines={5}
                textAlignVertical={'top'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={VIEW_STYLES._bottomButtonView}>
        <CustomSingleButton
          disabled={isLoading ? true : false}
          onPress={() =>
            props.navigation.navigate('ContractorSignUpSecondScreen')
          }
          _ButtonText={'Next'}
          Text_Color={_COLORS.Kodie_WhiteColor}
        />
      </View>
    </View>
  );
};
