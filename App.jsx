import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './components/AppBar';
import SignIn from './pages/SignIn';
import RepositoryList from './pages/RepositoryList';
import SingleRepository from './pages/SingleRepository';
import ReviewForm from './pages/ReviewForm';
import SignUp from './pages/SignUp';
import useAuthUser from './hooks/useAuthUser';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
});

const App = () => {
  const { data: authorizedUser } = useAuthUser();

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/repositories/:id" element={<SingleRepository />} />
        <Route path="/create-review" element={<ReviewForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default App;
