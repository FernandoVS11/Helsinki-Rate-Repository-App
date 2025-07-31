import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { useNavigate } from 'react-router-native';
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});
const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      if (data?.authenticate?.accessToken) {
        navigate('/');
      }
    } catch (e) {
      console.error('Login failed:', e.message);
    }
  };


  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry />
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
