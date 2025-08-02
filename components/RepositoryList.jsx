import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  picker: {
    padding: 10,
    marginVertical: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ sortOrder, setSortOrder }) => (
  <View style={styles.headerContainer}>
    <Text>Sort repositories by:</Text>
    <Picker
      selectedValue={sortOrder}
      style={styles.picker}
      onValueChange={(itemValue) => setSortOrder(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  </View>
);

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState('latest');
  const { repositories } = useRepositories(sortOrder);
  const navigate = useNavigate();

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <RepositoryListHeader
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      }
    />
  );
};

export default RepositoryList;
