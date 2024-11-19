// AuthScreen.js
import React, { useEffect,useState } from 'react';
import { View,Image, StyleSheet,Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Headline } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/Styles'; // Import the styles
import apiUrl from '../components/urlApi';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        // Fetch logo from Laravel API
        const fetchLogo = async () => {
          try {
            const response = await axios.get(apiUrl+'/api/logo');
            setLogo(response.data.logo); 
          } catch (error) {
            console.error("Error fetching the logo", error);
          }
        };
        fetchLogo();
    });
    const handleLogin = async () => {
       
           try {
                if (!email || !password) {
                    setError('Please enter both email and password.');
                    return;
                }

            const response = await axios.post(apiUrl+'/api/login', {
              email,
              password,
            });
                     
            if (response.data.status === 'success') {
              await AsyncStorage.setItem('token', response.data.token);
             
              navigation.replace('Home');
            } else {
              setError('Invalid credentials');
            }
          } catch (error) {
            setError('An error occurred. Please try again.');
          }
    };

    return (
        <View style={styles.container}>
             <Image source={{ uri: logo }} style={styles.logo} />
            <Headline style={styles.headline}>Merci de se connecter</Headline>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                mode="flat"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                mode="flat"
                style={styles.input}
                secureTextEntry
            />
            <TouchableOpacity style={styles.itemContainer}  onPress={handleLogin}>
            <View style={styles.iconContainer}>
              <Icon name={'chevron-right'} size={24} color="#fff" />
            </View>
            <Text style={styles.title}>Se connecter</Text>
          </TouchableOpacity>
        
           

            
           
        </View>
    );
};



export default LoginScreen;