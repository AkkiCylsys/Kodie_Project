//ScreenNo:93
import React, {useState, useRef} from 'react';
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
import {IMAGES, LABEL_STYLES, _COLORS} from '../../../../Themes';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import RowTexts from '../../../../components/Molecules/RowTexts/RowTexts';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
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
const Schedule = () => {
  const [contractor, setContractor] = useState('');
  const [email, setEmail] = useState('');

  const refRBSheet = useRef();
  const Detail_rander = ({item, index}) => {
    return (
      <>
        <View style={ScheduleCss.DetailsView}>
          <MaterialIcons
            name={'check-box-outline-blank'}
            size={25}
            color={_COLORS.Kodie_MediumGrayColor}
          />
          <Text style={ScheduleCss.details_text}>{item.name}</Text>
        </View>
      </>
    );
  };
  return (
    <View style={ScheduleCss.MainContainer}>
      <View style={ScheduleCss.Container}>
        <Text style={ScheduleCss.inspections}>
          {'Date and time of inspection'}
        </Text>
        <RowTexts
          leftText={'Proposed date'}
          rightText={'Monday, 3 September 2023'}
        />
        <RowTexts leftText={'Proposed time'} rightText={'8:30am'} />
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
        <RowTexts leftText={'Tenant Rep'} rightText={'Jane Smith'} />
        <DividerIcon color={_COLORS.Kodie_WhiteColor} />

        <Text style={ScheduleCss.inspections}>{'Add attendees'}</Text>
        <TouchableOpacity>
          <View style={ScheduleCss.TextInputView}>
            <TextInput
              value={contractor}
              placeholder={'Add people attending the inspection'}
              style={ScheduleCss.input}
              onChange={text => setContractor(text)}
              palceholderColor={_COLORS.Kodie_MediumGrayColor}
            />
            <Image
              source={IMAGES.userIcons}
              style={ScheduleCss.userStyle}
              resizeMode={'center'}
            />
          </View>
        </TouchableOpacity>
        <DividerIcon />

        <Text style={ScheduleCss.inspections}>
          {'Areas included in inspection'}
        </Text>
        <FlatList
          data={Detail}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          numColumns={2}
          keyExtractor={item => item?.id}
          renderItem={Detail_rander}
        />
        <DividerIcon />
        <Text style={ScheduleCss.inspections}>{'Notes'}</Text>
        <Text style={ScheduleCss.MBText}>{'No notes'}</Text>
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
