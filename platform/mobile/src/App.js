import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import BorrowerDashboard from './screens/dashboard/BorrowerDashboard';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BorrowerDashboard"
      component={BorrowerDashboard}
      options={{ title: 'Личный кабинет' }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

