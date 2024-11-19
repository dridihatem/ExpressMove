import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet , Text,Alert} from 'react-native';
import apiUrl from '../components/urlApi';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthCheckScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get(apiUrl+'/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.status === 'authenticated') {
            // If user is authenticated, navigate to Dashboard
           navigation.replace('Home');
          } else {
            // If not authenticated, remove token and navigate to Login
            await AsyncStorage.removeItem('token');
            navigation.replace('Login');
          }
        } catch (error) {
          // Token is invalid, remove token and navigate to Login
          await AsyncStorage.removeItem('token');
         navigation.replace('Login');
        }
      } else {
        // No token, navigate to Login
       navigation.replace('Login');
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthCheckScreen;