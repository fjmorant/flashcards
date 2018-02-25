import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import theme from './defaultTheme'
import {DISABLED_PRIMARY_COLOR, PRIMARY_COLOR} from './ThemeConstants'

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ({disabled, title, titleSize = 20, height, onPress}) => (
  <TouchableOpacity
    activeOpacity={disabled ? 1 : 0}
    onPress={!disabled ? onPress : null}>
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor: !disabled
            ? theme[PRIMARY_COLOR]
            : theme[DISABLED_PRIMARY_COLOR],
        },
      ]}>
      <Text style={{color: 'rgb(255, 255, 255)', fontSize: titleSize}}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
)
