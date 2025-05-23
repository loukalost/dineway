import { useState } from 'react'
import {
  Text,
  View
} from 'react-native'

import styles from './TextButtonStyle'
import { Button } from '@react-navigation/elements'
import { MaterialIcons as Icon } from '@expo/vector-icons/MaterialIcons'

const TextButton = (value, onPress, icon, error) => {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <View style={styles.inputContainer}>
      <Button
        title={value}
        onPress={onPress}
        style={[styles.input, isFocus && styles.focused]}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {icon && <Icon name={icon} size={20} color="#000" style={styles.icon} />}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default TextButton
