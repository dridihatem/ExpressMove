// SplashScreen.js
import React, { useEffect, useState } from 'react';
import { View,Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen'; // If using the native splash screen
import apiUrl from '../components/urlApi';
const SplashScreenComponent = ({ navigation }) => {
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch logo from Laravel API
    const fetchLogo = async () => {
      try {
        const response = await axios.get(apiUrl+'/api/logo');
      
        setLogo(response.data.logo); // Assuming your API returns a 'logo' key
      } catch (error) {
        console.error("Error fetching the logo", error);
      } finally {
        setLoading(false);
       // SplashScreen.hide(); // Hide native splash screen
      }
    };

    fetchLogo();

    // Set a timeout to navigate to Auth screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 5000);

    // Clear the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    
    <View style={styles.container}>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
        <Image source={{ uri: logo }} style={styles.logo} />
       
      </>
      )}

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreenComponent;