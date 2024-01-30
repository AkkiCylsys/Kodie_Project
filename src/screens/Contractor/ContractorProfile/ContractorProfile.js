import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import { ContractorProfileStyle } from "./ContractorProfileStyle";
import { _COLORS, IMAGES, BANNERS } from "../../../Themes";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import axios from "axios";
import { Config } from "../../../Config";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
const data = [
  { id: "1", image: BANNERS.previewImage },
  { id: "2", image: BANNERS.previewImage },
];
export default ContractorProfile = (props) => {
  const [ContractorData, setContractorData] = useState([]);
  let account_id = props?.route?.params?.account_id;
  const [isLoading, setIsLoading] = useState(false);
  console.log(account_id, "jgfdsmnmhffiudffhju");
  useEffect(() => {
    getContractorProfile();
  }, []);
  const getContractorProfile = () => {
    const url = Config.BASE_URL;
    const dataProfile = {
      account_id: account_id,
    };
    const ContractorUrl = url + `Contractor_details_by_account_id`;
    console.log("Request URL:", ContractorUrl);
    setIsLoading(true);
    axios
      .post(ContractorUrl, dataProfile)
      .then((response) => {
        console.log("API Response ContractorProfile:", response.data);
        if (response.data.success === true) {
          setContractorData(response.data.data);
          console.log("ContractorProfile..", response.data.data);
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("ContractorProfile errorr", error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const proposalData = ({ item, index }) => {
    return (
      <>
        <View style={ContractorProfileStyle.container}>
          <ImageBackground
            source={item.image}
            style={ContractorProfileStyle.imageBackground}
            resizeMode="cover"
          >
            <TouchableOpacity
              style={ContractorProfileStyle.playButtonContainer}
            >
              <AntDesign
                name="play"
                size={35}
                color={_COLORS.Kodie_WhiteColor}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </>
    );
  };
  return (
    <View style={ContractorProfileStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Contractor Profile"}
      />
      <ScrollView>
        <View style={ContractorProfileStyle.profileView}>
          <TouchableOpacity style={ContractorProfileStyle.profileImage}>
            <Image
              source={{ uri: ContractorData.profile_path }}
              style={ContractorProfileStyle.profileImage}
            />
          </TouchableOpacity>
        </View>
        <Text style={ContractorProfileStyle.userName}>
          {`${ContractorData.first_name} ${ContractorData.last_name}`}
        </Text>
        <View style={ContractorProfileStyle.Propose_Con}>
          <Text style={ContractorProfileStyle.profileName}>
            {"Plasterer specialist"}
          </Text>
          <View style={ContractorProfileStyle.verticalLine} />
          <View style={ContractorProfileStyle.ratingView}>
            <AntDesign
              color={_COLORS.Kodie_lightGreenColor}
              name="star"
              size={20}
            />
            <Text style={ContractorProfileStyle.ratingText}>{"4.6 (231)"}</Text>
          </View>
        </View>
        <View
          style={[
            ContractorProfileStyle.Propose_Con,
            { paddingHorizontal: 80 },
          ]}
        >
          <Entypo
            color={_COLORS.Kodie_lightGreenColor}
            name="location-pin"
            size={20}
            style={{ marginTop: 10 }}
          />
          <Text style={ContractorProfileStyle.ProposeText}>
            {ContractorData.address}
          </Text>
        </View>
        <View style={ContractorProfileStyle.hor_Line} />
        <View style={ContractorProfileStyle.proposalView}>
          <Text style={ContractorProfileStyle.proposalText}>
            {"Cover leter"}
          </Text>
          <Text style={ContractorProfileStyle.descriptionText}>
            {
              "I am the best contractor in town, ready to go. Check my best works portfolio and. Check out my job history and I think you'll find I'm a great fit for this job."
            }
          </Text>
          <Text style={ContractorProfileStyle.descriptionText}>
            {"I've worked on a lot of houses and they liked it."}
          </Text>
          <Text style={ContractorProfileStyle.descriptionText}>
            {"I look forward to hearing from you if this is a good fit."}
          </Text>
          <DividerIcon />
          <Text style={ContractorProfileStyle.proposalText}>{"Preview"}</Text>
        </View>

        <FlatList
          data={data}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          horizontal={true}
          keyExtractor={(item) => item?.id}
          renderItem={proposalData}
        />
      </ScrollView>
      <View style={ContractorProfileStyle.rowBtnView}>
        <RowButtons
          leftButtonHeight={50}
          RightButtonHeight={50}
          leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
          RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
          LeftButtonTextColor={_COLORS.Kodie_BlackColor}
          RightButtonTextColor={_COLORS.Kodie_WhiteColor}
          LeftButtonborderColor={_COLORS.Kodie_BlackColor}
          RightButtonborderColor={_COLORS.Kodie_BlackColor}
          LeftButtonText={"Message"}
          RightButtonText={"Request quote"}
        />
      </View>
    </View>
  );
};
