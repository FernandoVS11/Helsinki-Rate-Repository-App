import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import Text from './Text';
import PropTypes from 'prop-types';
const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: '#d73a4a',
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};
FormikTextInput.propTypes = {
  name: PropTypes.string.isRequired,
};
export default FormikTextInput;
