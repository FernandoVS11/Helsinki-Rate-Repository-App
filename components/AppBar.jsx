import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, ScrollView, Pressable, Text } from 'react-native';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
  tab: {
    padding: 15,
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const AppBarTab = ({ to, children, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.tab}>
        {to ? (
          <Link to={to}>
            <Text style={styles.tabText}>{children}</Text>
          </Link>
        ) : (
          <Text style={styles.tabText}>{children}</Text>
        )}
      </View>
    </Pressable>
  );
};

const AppBar = () => {
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {data?.me ? (
          <>
            <AppBarTab to="/create-review">Create a review</AppBarTab>
            <AppBarTab onPress={handleSignOut}>Sign out</AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab to="/signin">Sign in</AppBarTab>
            <AppBarTab to="/signup">Sign up</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
