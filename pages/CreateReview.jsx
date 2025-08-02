import React from 'react';
import { View, StyleSheet, TextInput, Pressable, Text } from 'react-native';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import { CREATE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner username is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Minimum rating is 0')
    .max(100, 'Maximum rating is 100'),
  text: yup.string().optional(),
});

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });

      if (data?.createReview?.repositoryId) {
        navigate(`/repositories/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Repository owner name"
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
            value={values.ownerName}
          />
          {touched.ownerName && errors.ownerName && <Text style={styles.error}>{errors.ownerName}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Repository name"
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
          />
          {touched.repositoryName && errors.repositoryName && <Text style={styles.error}>{errors.repositoryName}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
          />
          {touched.rating && errors.rating && <Text style={styles.error}>{errors.rating}</Text>}

          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Review"
            multiline
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            value={values.text}
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;
