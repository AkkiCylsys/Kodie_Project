import React from "react";
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
import { _COLORS, IMAGES, BANNERS } from "../../Themes";
import AntDesign from "react-native-vector-icons/AntDesign";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import RowButtons from "../../components/Molecules/RowButtons/RowButtons";
const data = [
  { id: "1", image: BANNERS.previewImage },
  { id: "2", image: BANNERS.previewImage },
];
export default ContractorProfile = (props) => {
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
        MiddleText={"Proposal Detail"}
      />
      <ScrollView>
        <View style={ContractorProfileStyle.profileView}>
          <TouchableOpacity>
            <Image
              source={IMAGES.userImage}
              style={ContractorProfileStyle.profileImage}
            />
          </TouchableOpacity>
        </View>
        <Text style={ContractorProfileStyle.userName}>{"Jason Statham"}</Text>
        <Text style={ContractorProfileStyle.profileName}>
          {"Plasterer specialist"}
        </Text>
        <View style={ContractorProfileStyle.Propose_Con}>
          <Text style={ContractorProfileStyle.ProposeText}>{"Proposed:"}</Text>
          <Text style={ContractorProfileStyle.prize}>{"$200"}</Text>
          <View style={ContractorProfileStyle.autoView}>
            <TouchableOpacity style={ContractorProfileStyle.button}>
              <Text style={ContractorProfileStyle.buttonText}>Auto</Text>
            </TouchableOpacity>
          </View>
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
        <View style={ContractorProfileStyle.hor_Line} />
        <View style={ContractorProfileStyle.proposalView}>
          <Text style={ContractorProfileStyle.proposalText}>{"Proposal"}</Text>
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
          RightButtonText={"Hire"}
          onPressRightButton={() => {
            props.navigation.navigate("DocumentList");
          }}
        />
      </View>
    </View>
  );
};
