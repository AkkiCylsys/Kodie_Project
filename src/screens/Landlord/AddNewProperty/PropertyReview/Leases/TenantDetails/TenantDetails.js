import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity,FlatList} from "react-native";
import { _COLORS, IMAGES } from "../../../../../../Themes";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TenantDetailsStyle } from "./TenantDetailsStyle";
import StarRating from "react-native-star-rating";
import Entypo from "react-native-vector-icons/Entypo";
import RowButtons from "../../../../../../components/Molecules/RowButtons/RowButtons";
import DividerIcon from "../../../../../../components/Atoms/Devider/DividerIcon";

const tental_recipt_data = [
  {
    id: "1",
    heading: "Rental",
    amount_status: "Amount due",
    paidByUser: "Tenant",
    Amount: "$300",
    Date: "9 August 2023",
    payment_status: "Paid",
  },
  {
    id: "2",
    heading: "Rental",
    amount_status: "Amount paid",
    paidByUser: "LandLord",
    Amount: "$300",
    Date: "16 August 2023",
    payment_status: "Paid",
  },
  {
    id: "3",
    heading: "Rental",
    amount_status: "Amount due",
    paidByUser: "Tenant",
    Amount: "$300",
    Date: "23 August 2023",
    payment_status: "paid",
  },
  {
    id: "4",
    heading: "Rental",
    amount_status: "Amount due",
    paidByUser: "Tenant",
    Amount: "$300",
    Date: "30 August 2023",
    payment_status: "paid",
  },
];
export default TenantDetails = () => {
  const [rating, setRating] = useState(4);
  const rental_recipt_render = ({item,index}) => {
    return (
      <View>
        <View style={TenantDetailsStyle.Account_main_View}>
          <View style={TenantDetailsStyle.account_view}>
            <View>
              <Text style={TenantDetailsStyle.Accounting_Text}>{item.heading}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={TenantDetailsStyle.Paid_Text}>{"Paid by:"}</Text>
                <Text style={TenantDetailsStyle.Paid_Text}>{item.paidByUser}</Text>
              </View>
            </View>
            <View>
              <Text style={TenantDetailsStyle.Amount_Text}>
                {item.amount_status}
              </Text>
              <Text style={TenantDetailsStyle.Accounting_Text}>{item.Amount}</Text>
            </View>
          </View>
        </View>
        <View style={TenantDetailsStyle.datePaid_main_view}>
          <View style={TenantDetailsStyle.paidDate_subView}>
            <View style={TenantDetailsStyle.paid_Date_View}>
              <Text style={TenantDetailsStyle.date_paid}>{"Period:"}</Text>
              <Text style={TenantDetailsStyle.Amount_Text}>{item.Date}</Text>
            </View>
            <TouchableOpacity style={TenantDetailsStyle.rent_received_view}>
              <View style={{ flexDirection: "row" }}>
                <Entypo
                  name="dot-single"
                  size={25}
                  color={_COLORS.Kodie_GreenColor}
                />
                <Text style={TenantDetailsStyle.rent_received_text}>
                  {item.payment_status}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={TenantDetailsStyle.details_main_view}>
        <View style={TenantDetailsStyle.user_subView}>
          <Image source={IMAGES.userImage} />
          <View style={TenantDetailsStyle.name_view}>
            <Text style={TenantDetailsStyle.userName}>{"Mesut S"}</Text>
            <View style={TenantDetailsStyle.check_view}>
              <AntDesign
                name="checkcircle"
                size={25}
                color={_COLORS.Kodie_GreenColor}
              />
              <Text style={TenantDetailsStyle.verify_text}>{"Verified"}</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={TenantDetailsStyle.starStyle}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              fullStarColor={_COLORS.Kodie_lightGreenColor}
              emptyStarColor={_COLORS.Kodie_LightGrayColor}
              starSize={20}
              selectedStar={(rating) => setRating(rating)}
              starStyle={TenantDetailsStyle.startRating}
            />
          </View>
          <TouchableOpacity style={TenantDetailsStyle.rent_received_view}>
            <View style={{ flexDirection: "row" }}>
              <Entypo
                name="dot-single"
                size={25}
                color={_COLORS.Kodie_GreenColor}
              />
              <Text style={TenantDetailsStyle.rent_received_text}>
                {"Screening completed"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Text style={TenantDetailsStyle.resident_score_text}>
          {"Resident score:"}
        </Text>
        <View style={TenantDetailsStyle.score_view}>
          <Text style={TenantDetailsStyle.scoreNo}>{"721"}</Text>
        </View>
      </View>
      <RowButtons
        LeftButtonText={"View profile"}
        leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
        LeftButtonTextColor={_COLORS.Kodie_BlackColor}
        LeftButtonborderColor={_COLORS.Kodie_GrayColor}
        RightButtonText={"Message tenant"}
        RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
        RightButtonTextColor={_COLORS.Kodie_WhiteColor}
        RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
      />
      <DividerIcon />
      <View>
        <Text style={TenantDetailsStyle.heading_Text}>{"Rental receipts"}</Text>
        <FlatList
          data={tental_recipt_data}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          keyExtractor={(item) => item?.id}
          renderItem={rental_recipt_render}
        />
      </View>
    </View>
  );
};
