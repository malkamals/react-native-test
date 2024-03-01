import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './screen/WelcomeScreen'; 
import LoginScreen from './screen/LoginFormScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/HomeScreen';
import HistoryScreen from './screen/HistoryScreen';
import NewsScreen from './screen/NewsScreen';
import AccountScreen from './screen/AccountScreen';
import EditProfileScreen from './screen/EditProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  const [profileData, setProfileData] = useState({
    // Initialize with default profile data or fetch from storage
    username: '',
    password: '',
  });

  const updateProfile = (newProfileData) => {
    setProfileData(newProfileData);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="News" component={NewsScreen} options={{ headerShown: false }}/>
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{ headerShown: false }}
          initialParams={{ profileData, updateProfile }}
        />
        <Stack.Screen name="Edit Profile" component={EditProfileScreen} initialParams={{ updateProfile }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
