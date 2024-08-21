import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {_COLORS, FONTFAMILY, LABEL_STYLES} from '../../../Themes';
import {ApplicationSubmitModalStyle} from './ApplicationSubmitModalStyle';
import Feather from 'react-native-vector-icons/Feather';
import CustomSingleButton from '../../Atoms/CustomButton/CustomSingleButton';
import {useNavigation} from '@react-navigation/native';
const ApplicationSubmitModal = props => {
  const navigation = useNavigation();
  const onClose = () => {
    props.onClose();
  };
  return (
    <View style={ApplicationSubmitModalStyle.mainConatainer}>
      {/* <ScrollView> */}
      <View
        style={{
          alignSelf: 'center',
          marginHorizontal: 16,
        }}>
        <Text style={ApplicationSubmitModalStyle.ApplicationText}>
          {'Application submitted'}
        </Text>
        <Text
          style={[
            ApplicationSubmitModalStyle.ApplicationText,
            {
              fontFamily: FONTFAMILY.K_Regular,
              fontSize: 14,
              color: _COLORS.Kodie_LightGrayColor,
              marginTop:10,
              textAlign:"center"
            },
          ]}>
          {
            'Congratulations! You have successfully submitted your rental application. The property owner will contact you soon.'
          }
        </Text>
        <View
          style={{
            alignSelf: 'center',
            marginVertical:10
          }}>
          <Feather
            name="check-circle"
            size={150}
            color={_COLORS.Kodie_lightGreenColor}
          />
        </View>
        <View>
          <CustomSingleButton
            _ButtonText={'Continue'}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={() => {
              navigation.navigate('Properties', {
                tab3: 'tab3',
              });
              onClose();
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            marginBottom: 30,
          }}
          onPress={onClose}>
          <Text
            style={[
              ApplicationSubmitModalStyle.ApplicationText,
              {fontFamily: FONTFAMILY.K_SemiBold,fontSize:16,marginTop:10},
            ]}>
            {'Return'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default ApplicationSubmitModal;

const styles = StyleSheet.create({});
