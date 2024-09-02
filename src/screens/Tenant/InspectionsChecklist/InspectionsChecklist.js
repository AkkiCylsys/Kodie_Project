import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTabNavigator from '../../../components/Molecules/CustomTopNavigation/CustomTopNavigation';
import {InspectionsChecklistStyle} from './InspectionsChecklistStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import {_COLORS, FONTFAMILY} from '../../../Themes';
import {_goBack} from '../../../services/CommonServices';
import ManagingTenantData from '../../../components/Molecules/ManagingTenant/ManagingUserData/ManagingTenantData';

const InspectionsChecklist = props => {
  const [contractor, setContractor] = useState('');
  const [isFileVisible, setIsFileVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('Tab1');
  const [isLoading, setIsLoading] = useState(false);

  const checkTabs = () => {
    switch (activeTab) {
      case 'Tab1':
        return <Pre-move inspection />;

      case 'Tab2':
        return <Post-move inspection />;
      default:
        return <Pre-move inspection />;
    }
  };
  const handleRemoveFile = () => {
    setIsFileVisible(false);
  };
  return (
    <SafeAreaView style={InspectionsChecklistStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Inspections checklist'}
      />
      <ScrollView>
        <ManagingTenantData />
        <DividerIcon
          borderBottomWidth={3}
          color={_COLORS.Kodie_LiteWhiteColor}
        />
        <View style={{marginHorizontal: 35}}>
          <Text style={InspectionsChecklistStyle.Apartmenttext}>Apartment</Text>
          <Text style={InspectionsChecklistStyle.Citytext}>{'Sydney'}</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Entypo
              name="location-pin"
              size={18}
              color={_COLORS.Kodie_GreenColor}
            />
            <Text style={{color: _COLORS.Kodie_GrayColor}}>
              {'2118 Thornridge Cir. Syracuse'}
            </Text>
          </View>
        </View>
        <DividerIcon
          borderBottomWidth={3}
          color={_COLORS.Kodie_LiteWhiteColor}
        />
        <View style={InspectionsChecklistStyle.Movettext}>
          <View>
            <Text style={InspectionsChecklistStyle.moveTextHeading}>
              Move-in
            </Text>
            <Text style={InspectionsChecklistStyle.dataTextHeading}>
              Jan 01, 2022
            </Text>
          </View>
          <View style={InspectionsChecklistStyle.buttonView}>
            <Text style={InspectionsChecklistStyle.buttonText}>1 year</Text>
          </View>
          <View>
            <Text style={InspectionsChecklistStyle.moveTextHeading}>
              Move-out
            </Text>
            <Text style={InspectionsChecklistStyle.dataTextHeading}>
              Jan 01, 2023
            </Text>
          </View>
        </View>
        <DividerIcon
          borderBottomWidth={3}
          color={_COLORS.Kodie_LiteWhiteColor}
        />
        <View style={{marginHorizontal: 16}}>
          <CustomTabNavigator
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            Tab1={'Pre-move inspection'}
            Tab2={'Post-move inspection'}
            onPressTab1={() => setActiveTab('Tab1')}
            onPressTab2={() => setActiveTab('Tab2')}
            TabTextStyle={{fontSize: 14}}
            colorTab1={
              activeTab === 'Tab1'
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            colorTab2={
              activeTab === 'Tab2'
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            styleTab1={
              activeTab === 'Tab1' && InspectionsChecklistStyle.activeTab
            }
            styleTab2={
              activeTab === 'Tab2' && InspectionsChecklistStyle.activeTab
            }
          />
        </View>
          <View style={InspectionsChecklistStyle.Line} />
        <View style={InspectionsChecklistStyle.Container}>
          <Text style={InspectionsChecklistStyle.inspections}>
            {'Review results'}
          </Text>
          {isFileVisible && (
            <View style={InspectionsChecklistStyle.PdfContainer}>
              <View style={InspectionsChecklistStyle.Pdfview}>
                <FontAwesome
                  name={'file-pdf-o'}
                  size={35}
                  color={_COLORS.Kodie_BlackColor}
                />
                <View style={InspectionsChecklistStyle.pdfTextView}>
                  <Text style={InspectionsChecklistStyle.PDF_Text}>
                    {'Inspection report.pdf'}
                  </Text>
                  <Text style={[InspectionsChecklistStyle.MBText]}>
                    {'4,8 MB'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={InspectionsChecklistStyle.closeIconView}
                onPress={handleRemoveFile}>
                <AntDesign
                  name="closecircle"
                  size={15}
                  color={_COLORS.Kodie_MediumGrayColor}
                />
              </TouchableOpacity>
            </View>
          )}
          <DividerIcon />
          <Text style={InspectionsChecklistStyle.inspections}>
            {'Items needing urgent repair'}
          </Text>
          <RowTexts leftText={'Bedroom'} rightText={'Light fitting'} />
          <RowTexts leftText={'Bathroom'} rightText={'Toilet seat'} />
          <RowTexts leftText={'Patio'} rightText={'Outdoor table'} />
          <RowTexts leftText={'Kitchen'} rightText={'Oven thermostat'} />
          <CustomSingleButton
            _ButtonText={'+ Create new job'}
            Text_Color={_COLORS.Kodie_WhiteColor}
            backgroundColor={_COLORS.Kodie_BlackColor}
          />
          <DividerIcon color={_COLORS.Kodie_WhiteColor} />
          <Text style={InspectionsChecklistStyle.inspections}>
            {'Invite preferred contractor'}
          </Text>
          <TouchableOpacity>
            <View style={InspectionsChecklistStyle.TextInputView}>
              <TextInput
                value={contractor}
                placeholder={'Add people attending the inspection'}
                style={InspectionsChecklistStyle.input}
                onChange={text => setContractor(text)}
                placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
              />
              <Ionicons
                name="person-add-outline"
                size={20}
                color={_COLORS.Kodie_MediumGrayColor}
                style={{marginRight: 15}}
              />
            </View>
          </TouchableOpacity>
          <Text style={InspectionsChecklistStyle.inspections}>
            {'Damaged items to be noted'}
          </Text>
          <RowTexts leftText={'Bedroom'} rightText={'Cracked wall'} />
          <RowTexts leftText={'Bathroom'} rightText={'Cracked tile'} />
          <RowTexts leftText={'Patio'} rightText={'Worn out ceiling'} />
          <RowTexts leftText={'Kitchen'} rightText={'Damaged countertop'} />
          <DividerIcon />
          <Text style={InspectionsChecklistStyle.inspections}>{'Notes'}</Text>
          <Text style={InspectionsChecklistStyle.MBText}>{'No notes'}</Text>
          <CustomSingleButton
            _ButtonText={'Share inspection report'}
            Text_Color={_COLORS.Kodie_WhiteColor}
            backgroundColor={_COLORS.Kodie_BlackColor}
            marginBottom={90}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InspectionsChecklist;
