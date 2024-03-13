import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProfileDocumentStyle from './ProfileDocumentStyle';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import {_COLORS, FONTFAMILY} from '../../../Themes';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import ProfileDocumentDetails from '../ProfileDocumentDetails/ProfileDocumentDetails';
import axios from 'axios';
import {Config} from '../../../Config';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ProfileDocuments = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(false);
  const [selectedTabId, setSelectedTabId] = useState(0);
  const [folderId, setFolderId] = useState(null);
  const [companyDocumentId, setCompanyDocumentId] = useState(null);
  const [identifyDocumentId, setIdentifyDocumentId] = useState([]);
  const [identifyDocumentIdLength, setIdentifyDocumentIdLength] = useState('');
  const [proofIdAddress, setProofIdAddress] = useState([]);
  const [proofIdAddressLength, setProofIdAddressLength] = useState('');
  const [bankingDocument, setBankingDocument] = useState([]);
  const [bankingDocumentLength, setBankingDocumentLength] = useState('');
  const [employmentDocument, setEmploymentDocument] = useState([]);
  const [employmentDocumentLength, setEmploymentDocumentLength] = useState('');
  const [screeningDocument, setScreeningDocument] = useState([]);
  const [screeningDocumentLength, setScreeningDocumentLength] = useState('');
  const [otherDocument, setOtherDocument] = useState([]);
  const [otherDocumentLength, setOtherDocumentLength] = useState('');
  const loginData = useSelector(state => state.authenticationReducer.data);
  // company document states here  ...
  const [companyDocument, setCompanyDocument] = useState([]);
  const [companyDocumentLength, setCompanyDocumentLength] = useState('');
  const [licenseDocument, setLicenseDocument] = useState([]);
  const [licenseDocumentLength, setLicenseDocumentLength] = useState('');
  const [certificationDocument, setCertificationDocument] = useState([]);
  const [certificationDocumentLength, setCertificationDocumentLength] =
    useState('');
  const [insuranceDocument, setInsuranceDocument] = useState([]);
  const [insuranceDocumentLength, setInsuranceDocumentLength] = useState('');

  const isfocused = useIsFocused();
  useEffect(() => {
    getUploadedDocumentsByModule('Identity_documents');
    getUploadedDocumentsByModule('Proof_of_address');
    getUploadedDocumentsByModule('Banking_documents');
    getUploadedDocumentsByModule('Employment_documents');
    getUploadedDocumentsByModule('Screening_documents');
    getUploadedDocumentsByModule('Other_documents');
    getUploadedDocumentsByModule('Company_documents');
    getUploadedDocumentsByModule('License_documents');
    getUploadedDocumentsByModule('Certification_documents');
    getUploadedDocumentsByModule('Insurance_and_indemnity');
    // getUploadedDocumentsByModule('Other_documents');
  }, [isfocused]);
  const getUploadedDocumentsByModule = moduleName => {
    const url = Config.BASE_URL;
    const getDocumentUrl = url + 'tanant_details/get/documents';
    console.log('Request URL:', getDocumentUrl);
    setIsLoading(true);
    const documentModuleData = {
      Module_Name: moduleName,
      fileReferenceKey: loginData.Login_details.user_account_id,
    };
    axios
      .post(getDocumentUrl, documentModuleData)
      .then(response => {
        console.log(`API Response for ${moduleName}:`, response.data);
        if (response.data.success == true) {
          switch (moduleName) {
            case 'Identity_documents':
              setIdentifyDocumentId(response.data.data);
              console.log('Length for property:', response.data.data.length);
              setIdentifyDocumentIdLength(response.data.data.length);
              console.log(
                'setIdentifyDocumentIdLength..',
                identifyDocumentIdLength,
              );

              break;
            case 'Proof_of_address':
              setProofIdAddress(response.data.data);
              console.log(
                'Length for proofIdAddressLength:',
                response.data.data.length,
              );
              setProofIdAddressLength(response.data.data.length);
              console.log('proofIdAddressLength...', proofIdAddressLength);
              break;
            case 'Banking_documents':
              setBankingDocument(response.data.data);
              console.log(
                'Length for propertyDocByTenant:',
                response.data.data.length,
              );
              setBankingDocumentLength(response.data.data.length);
              console.log('bankingDocumentLength..', bankingDocumentLength);
              break;
            case 'Employment_documents':
              setEmploymentDocument(response.data.data);
              console.log(
                'Length for propertyDocByTenant:',
                response.data.data.length,
              );
              setEmploymentDocumentLength(response.data.data.length);
              console.log(
                'employmentDocumentLength..',
                employmentDocumentLength,
              );
              break;
            case 'Screening_documents':
              setScreeningDocument(response.data.data);
              console.log(
                'Length for propertyDocByTenant:',
                response.data.data.length,
              );
              setScreeningDocumentLength(response.data.data.length);
              console.log('screeningDocumentLength..', screeningDocumentLength);
              break;
            case 'Other_documents':
              setOtherDocument(response.data.data);
              console.log(
                'Length for propertyDocByTenant:',
                response.data.data.length,
              );
              setOtherDocumentLength(response.data.data.length);
              console.log('otherDocumentLength..', otherDocumentLength);
              break;
            case 'Company_documents':
              setCompanyDocument(response.data.data);
              console.log(
                'Length for propertyDocByTenant:',
                response.data.data.length,
              );
              setCompanyDocumentLength(response.data.data.length);
              console.log('companyDocumentLength..', companyDocumentLength);
              break;
            case 'License_documents':
              setLicenseDocument(response.data.data);
              console.log(
                'Length for License_documents:',
                response.data.data.length,
              );
              setLicenseDocumentLength(response.data.data.length);
              console.log('licenseDocumentLength..', licenseDocumentLength);
              break;
            case 'Certification_documents':
              setCertificationDocument(response.data.data);
              console.log(
                'Length for propertyDocByTenant:',
                response.data.data.length,
              );
              setCertificationDocumentLength(response.data.data.length);
              console.log(
                'certificationDocumentLength..',
                certificationDocumentLength,
              );
              break;
            case 'Insurance_and_indemnity':
              setInsuranceDocument(response.data.data);
              console.log(
                'Length for propertyDocByTenant:',
                response.data.data.length,
              );
              setInsuranceDocumentLength(response.data.data.length);
              console.log('insuranceDocumentLength..', insuranceDocumentLength);
              break;
            case 'Other_documents_company':
              setOtherDocument(response.data.data);
              console.log(
                'Length for propertyDocByTenant:',
                response.data.data.length,
              );
              setOtherDocumentLength(response.data.data.length);
              console.log('otherDocumentLength..', otherDocumentLength);
              break;
            // Add cases for other module names if needed
            default:
              break;
          }
        }
      })
      .catch(error => {
        console.error(`API failed for ${moduleName}:`, error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const folderData = [
    {
      id: '1',
      folderHeading: 'Identity documents',
      // totalFile: '12 Files',
      totalFile: identifyDocumentIdLength,
      moduleName: 'Identity_documents',
    },
    {
      id: '2',
      folderHeading: 'Proof of address',
      // totalFile: '13 Files',
      totalFile: proofIdAddressLength,
      moduleName: 'Proof_of_address',
    },
    {
      id: '3',
      folderHeading: 'Banking documents',
      // totalFile: '15 Files',
      totalFile: bankingDocumentLength,
      moduleName: 'Banking_documents',
    },
    {
      id: '4',
      folderHeading: 'Employment documents',
      // totalFile: '15 Files',
      totalFile: employmentDocumentLength,
      moduleName: 'Employment_documents',
    },
    {
      id: '5',
      folderHeading: 'Screening documents',
      // totalFile: '15 Files',
      totalFile: screeningDocumentLength,
      moduleName: 'Screening_documents',
    },
    {
      id: '6',
      folderHeading: 'Other documents',
      // totalFile: '15 Files',
      totalFile: otherDocumentLength,
      moduleName: 'Other_documents',
    },
  ];
  const CompanyfolderData = [
    {
      id: '1',
      folderHeading: 'Company documents',
      totalFile: companyDocumentLength,
      moduleName: 'Company_documents',
    },
    {
      id: '2',
      folderHeading: 'License documents',
      totalFile: '0',
      moduleName: 'License_documents',
    },
    {
      id: '3',
      folderHeading: 'Certification documents',
      totalFile: '0',
      moduleName: 'Certification_documents',
    },
    {
      id: '4',
      folderHeading: 'Insurance and indemnity',
      totalFile: insuranceDocumentLength,
      moduleName: 'Insurance_and_indemnity',
    },
    {
      id: '5',
      folderHeading: 'Company references',
      totalFile: '0',
      moduleName: 'Company_reference',
    },
    {
      id: '6',
      folderHeading: 'Other documents',
      totalFile: otherDocumentLength,
      moduleName: 'Other_documents',
    },
  ];
  const personalDocumentRenderData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={ProfileDocumentStyle.folderView}
        onPress={() => {
          setFolderId(item.id);
          // alert(item.id);
        }}>
        <View style={ProfileDocumentStyle.folder_icon}>
          <Ionicons
            name="folder-outline"
            size={30}
            color={_COLORS.Kodie_GrayColor}
          />
          {/* <Entypo
            name="dots-three-vertical"
            size={25}
            color={_COLORS.Kodie_GrayColor}
          /> */}
        </View>
        <View>
          <Text style={ProfileDocumentStyle.propertyDocText}>
            {item?.folderHeading}
          </Text>
          {/* <Text style={ProfileDocumentStyle.files_text}>{'12 files'}</Text> */}
          <Text
            style={
              ProfileDocumentStyle.files_text
            }>{`${item.totalFile} Files`}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const CompanyDocumentRenderData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={ProfileDocumentStyle.folderView}
        onPress={() => {
          setCompanyDocumentId(item.id);
        }}>
        <View style={ProfileDocumentStyle.folder_icon}>
          <Ionicons
            name="folder-outline"
            size={30}
            color={_COLORS.Kodie_GrayColor}
          />
          {/* <Entypo
            name="dots-three-vertical"
            size={25}
            color={_COLORS.Kodie_GrayColor}
          /> */}
        </View>
        <View>
          <Text style={ProfileDocumentStyle.propertyDocText}>
            {item?.folderHeading}
          </Text>
          {/* <Text style={ProfileDocumentStyle.files_text}>{'12 files'}</Text> */}
          <Text
            style={
              ProfileDocumentStyle.files_text
            }>{`${item.totalFile} Files`}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={ProfileDocumentStyle.mainContainer}>
      <View style={ProfileDocumentStyle.btnContainer}>
        <RowButtons
          LeftButtonText={'Personal documents'}
          leftButtonbackgroundColor={
            !selectedTab
              ? _COLORS.Kodie_lightGreenColor
              : _COLORS.Kodie_WhiteColor
          }
          LeftButtonTextColor={
            !selectedTab
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_MediumGrayColor
          }
          LeftButtonborderColor={
            !selectedTab
              ? _COLORS.Kodie_GrayColor
              : _COLORS.Kodie_LightWhiteColor
          }
          onPressLeftButton={() => {
            setSelectedTab(false);
            setSelectedTabId(0);
            // alert(selectedTabId);
          }}
          RightButtonText={'Company documents'}
          RightButtonbackgroundColor={
            selectedTab
              ? _COLORS.Kodie_lightGreenColor
              : _COLORS.Kodie_WhiteColor
          }
          RightButtonTextColor={
            selectedTab
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_MediumGrayColor
          }
          RightButtonborderColor={
            selectedTab
              ? _COLORS.Kodie_GrayColor
              : _COLORS.Kodie_LightWhiteColor
          }
          onPressRightButton={() => {
            setSelectedTab(true);
            setSelectedTabId(1);
            // alert(selectedTabId);
          }}
        />
      </View>
      <DividerIcon borderBottomWidth={6} />
      {folderId == null && companyDocumentId == null ? (
        <Text style={ProfileDocumentStyle.reacentDocText}>{'All folders'}</Text>
      ) : null}
      {selectedTabId === 0 ? (
        <View>
          {folderId ? (
            <ProfileDocumentDetails
              folderId={'folderId'}
              onPress={() => {
                setFolderId(null);
              }}
              headingDocument={
                folderId == 1
                  ? 'Identity documents'
                  : folderId == 2
                  ? 'Proof of address'
                  : folderId == 3
                  ? 'Banking documents'
                  : folderId == 4
                  ? 'Banking documents'
                  : folderId == 5
                  ? 'Screening documents'
                  : folderId == 6
                  ? 'Other documents'
                  : null
              }
              documentLookUpType={
                folderId == 1
                  ? 'IDENTITY_DOCUMENTS'
                  : folderId == 2
                  ? 'PROOF_DOCUMENTS'
                  : folderId == 3
                  ? 'BANKING_DOCUMENTS'
                  : folderId == 4
                  ? 'EMPLOYMENT_DOCUMENTS'
                  : folderId == 5
                  ? 'SCREENING_DOCUMENTS'
                  : folderId == 6
                  ? 'OTHER_DOCUMENTS'
                  : null
              }
              ModuleName={
                folderId == 1
                  ? 'Identity_documents'
                  : folderId == 2
                  ? 'Proof_of_address'
                  : folderId == 3
                  ? 'Banking_documents'
                  : folderId == 4
                  ? 'Employment_documents'
                  : folderId == 5
                  ? 'Screening_documents'
                  : folderId == 6
                  ? 'Other_documents'
                  : null
              }
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignSelf: 'center',
              }}>
              <FlatList
                data={folderData}
                scrollEnabled
                // horizontal={true}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{}}
                keyExtractor={item => item?.id}
                renderItem={personalDocumentRenderData}
              />
            </View>
          )}
        </View>
      ) : (
        <View>
          {companyDocumentId ? (
            <ProfileDocumentDetails
              onPress={() => {
                setCompanyDocumentId(null);
              }}
              headingDocument={
                companyDocumentId == 1
                  ? 'Company documents'
                  : companyDocumentId == 2
                  ? 'License documents'
                  : companyDocumentId == 3
                  ? 'Certification documents'
                  : companyDocumentId == 4
                  ? 'Insurance and indemnity'
                  : companyDocumentId == 5
                  ? 'Company references'
                  : companyDocumentId == 6
                  ? 'Other documents'
                  : null
              }
              documentLookUpType={
                companyDocumentId == 1
                  ? 'COMPANY_DOCUMENTS'
                  : companyDocumentId == 2
                  ? 'LICENSES'
                  : companyDocumentId == 3
                  ? 'CERTIFICATIONS'
                  : companyDocumentId == 4
                  ? 'INSURANCE_INDEMNITY'
                  : companyDocumentId == 5
                  ? '' // manish ne bola hai chhodne ko ..... from banked side
                  : companyDocumentId == 6
                  ? 'OTHER_DOCUMENTS'
                  : null
              }
              ModuleName={
                companyDocumentId == 1
                  ? 'Company_documents'
                  : companyDocumentId == 2
                  ? 'License_documents'
                  : companyDocumentId == 3
                  ? 'Certification_documents'
                  : companyDocumentId == 4
                  ? 'Insurance_and_indemnity'
                  : companyDocumentId == 5
                  ? 'Company_reference'
                  : companyDocumentId == 6
                  ? 'Other_documents'
                  : null
              }
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignSelf: 'center',
              }}>
              <FlatList
                data={CompanyfolderData}
                scrollEnabled
                // horizontal={true}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{}}
                keyExtractor={item => item?.id}
                renderItem={CompanyDocumentRenderData}
              />
            </View>
          )}
        </View>
      )}
      {/* <View style={ProfileDocumentStyle.saveBackButton}>
        <View style={ProfileDocumentStyle.secondview}>
          <CustomSingleButton
            Text_Color={_COLORS.Kodie_WhiteColor}
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={'Save and back'}
            backgroundColor={_COLORS.Kodie_BlackColor}
            disabled={isLoading ? true : false}
          />
        </View>
      </View> */}
    </View>
  );
};

export default ProfileDocuments;

const styles = StyleSheet.create({});
