import React from 'react';
import { FlatList, View, StyleSheet, Linking } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from '../components/RepositoryItem';
import Text from '../components/Text';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryPage = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId: id },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const repository = data?.repository;

  const handleOpenGithub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      keyExtractor={() => repository.id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} showGithubButton onPressGithub={handleOpenGithub} />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryPage;
