import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';
import PropTypes from 'prop-types';
const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
});

const Text = ({ style, ...props }) => {
  const textStyle = [styles.text, style];

  return <NativeText style={textStyle} {...props} />;
};
Text.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};
export default Text;
