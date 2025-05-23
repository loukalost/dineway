import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  inputContainer: {
    flex: 0,
    gap: 8
  },
  inputWrapper: {
    gap: 1
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    padding: 10
  },
  textarea: {
    minHeight: 150,
    verticalAlign: 'top'
  },
  inputFocused: {
    borderColor: '#222'
  },
  inputError: {
    borderColor: '#ff0000'
  },
  error: {
    color: 'red'
  },
  label: {
    color: '#222'
  }
})
