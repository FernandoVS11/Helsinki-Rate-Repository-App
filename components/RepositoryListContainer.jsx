import React from 'react';
import { FlatList, View, StyleSheet, Text, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { Picker } from '@react-native-picker/picker';

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
  searchInput: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ sortOrder, setSortOrder, searchKeyword, setSearchKeyword }) => {
  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search repositories..."
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
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
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sortOrder, setSortOrder, searchKeyword, setSearchKeyword } = this.props;

    return (
      <RepositoryListHeader
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={(item) => item.id}
      />
    );
  }
}
