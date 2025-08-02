import React from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { View, StyleSheet, ActivityIndicator, Pressable, Text } from 'react-native';
import * as Linking from 'expo-linking';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  button: {
    margin: 15,
    padding: 15,
    backgroundColor: '#0366d6',
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return <ActivityIndicator />;

  const repository = data.repository;

  const openInGitHub = () => Linking.openURL(repository.url);

return (
  <FlatList
    data={repository.reviews.edges.map(edge => edge.node)}
    renderItem={({ item }) => <ReviewItem review={item} />}
    keyExtractor={({ id }) => id}
    ListHeaderComponent={() => (
      <>
        <RepositoryItem item={repository} singleView />
        <Pressable onPress={openInGitHub} style={styles.button}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      </>
    )}
  />
)};

export default SingleRepositoryView;
