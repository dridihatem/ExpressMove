import React,{useEffect,useState} from 'react';
import {View, ActivityIndicator, Appbar, Avatar } from 'react-native-paper';
import apiUrl from '../components/urlApi';
import axios from 'axios';

import styles from '../assets/Styles'; // Import the styles
import AsyncStorage from '@react-native-async-storage/async-storage';


const Barre = () => {
    
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);





useEffect(() => {
    const fetchUserDetails = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(apiUrl+'/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.status === 'authenticated') {
            setUser(response.data.user);
          } else {
            setError('Failed to authenticate');
          }
        } catch (err) {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('No token found');
        navigation.replace('Login');
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);


  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  
 
if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }
return (
  
<Appbar.Header>
     
<Appbar.Content title="Tableau de bord" />

<Avatar.Text size={24} label="EM" />
<Appbar.Action icon="logout"  onPress={handleLogout} />
</Appbar.Header>  
)

}

export default Barre;
