import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
  },
  error: {
    borderColor: '#d73a4a',
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.error, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};
TextInput.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  error: PropTypes.bool,
};
export default TextInput;
