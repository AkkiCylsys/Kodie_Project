// NoRentalApplications.js
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {FONTFAMILY, _COLORS} from '../../../Themes';
const ListEmptyComponent = props => {
  const {EmptyText} = props;
  return (
    <Text style={styles.noResultSubtext}>
      {EmptyText || "You don't have any Data."}
    </Text>
  );
};

const styles = StyleSheet.create({
  noResultSubtext: {
    fontSize: 11,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
    textAlign: 'center',
  },
});

export default ListEmptyComponent;
