import React from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Text from './Text';
import PropTypes from 'prop-types';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import AuthStorage from '../utils/authStorage';
import { useNavigate } from 'react-router-native';
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingBottom: 15,
    paddingLeft: 10,
  },
  scroll: {
    flexDirection: 'row',
  },
  tab: {
    marginRight: 20,
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const AppBarTab = ({ to, children }) => (
  <Link to={to} component={TouchableWithoutFeedback} style={styles.tab}>
    <Text style={styles.tabText}>{children}</Text>
  </Link>
);

const AppBar = () => {
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/signin');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab to="/">Repositories</AppBarTab>

        {data?.me ? (
          <TouchableWithoutFeedback onPress={handleSignOut}>
            <Text style={styles.tabText}>Sign out</Text>
          </TouchableWithoutFeedback>
        ) : (
          <AppBarTab to="/signin">Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

AppBarTab.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default AppBar;
