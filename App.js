// App.js
import React, { useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreenComponent  from './pages/SplashScreenComponent';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import AuthCheckScreen from './pages/AuthCheckScreen';
import ProfileScreen from './pages/ProfileScreen';
import ColisScreen from './pages/ColisScreen';
import ScanScreen from './pages/ScanScreen';
import ReglementScreen from './pages/ReglementScreen';


const Stack = createStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setUserToken(token);
      } catch (error) {
        console.error('Failed to fetch the token');
        navigator.replace('Login');
      } finally {
      }
    };

    fetchToken();
  }, []);
  return (
  <SafeAreaProvider>
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Splash">  


        <Stack.Screen
          name="Splash"
          component={SplashScreenComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AuthCheck" 
          component={AuthCheckScreen} 
          options={{ headerShown: false }} 
        /> 
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
      
       

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        
        <Stack.Screen
            name="Colis"
            component={ColisScreen}
            options={{ headerShown: true }}
          />

        <Stack.Screen
            name="Scan"
            component={ScanScreen}
            options={{ headerShown: true }}
          />
          
        <Stack.Screen
            name="Reglement"
            component={ReglementScreen}
            options={{ headerShown: true }}
          />
        



         


     
  </Stack.Navigator>    
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;