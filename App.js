import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/HomeScreen';
import UserProfileScreenList from './src/components/UserProfileScreenList';
import UserProfileScreen from './src/components/UserProfileScreen';
import UserProfileScreenDescription from './src/components/UserProfileScreenDescription';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserProfileList" component={UserProfileScreenList} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="UserProfileScreenDescription" component={UserProfileScreenDescription} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
