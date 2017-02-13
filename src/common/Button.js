import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import theme from './defaultTheme';
import {PRIMARY_COLOR, DISABLED_PRIMARY_COLOR} from './ThemeConstants';

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ({
  disabled,
  title,
  height,
  onPress,
}) => (
  <TouchableOpacity
      onPress={!disabled ? onPress : null}
      activeOpacity={disabled ? 1 : 0}>
    <View style={[styles.container, {height, backgroundColor: !disabled ? theme[PRIMARY_COLOR] : theme[DISABLED_PRIMARY_COLOR]}]}>
      <Text style={{color: 'white'}}>{title}</Text>
    </View>
  </TouchableOpacity>
);
