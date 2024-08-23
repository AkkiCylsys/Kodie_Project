import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {FONTFAMILY, _COLORS} from '../../../Themes';

const ListEmptyComponent = props => {
  const {EmptyText} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.noResultSubtext}>
        {EmptyText || "You don't have any Data."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultSubtext: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    textAlign: 'center',
  },
});

export default ListEmptyComponent;
