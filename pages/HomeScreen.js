// DashboardScreen.js
import React,{useEffect,useState} from 'react';
import { View,Image, Text,FlatList, TouchableOpacity} from 'react-native';
import { ActivityIndicator, Appbar, Avatar } from 'react-native-paper';
import styles from '../assets/Styles'; // Import the styles
import apiUrl from '../components/urlApi';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
  
  { id: '1', title: 'Ramassage', icon: 'house', screen:'Ramassage' },
  { id: '2', title: 'Colis', icon: 'inbox', screen:'Colis' },
  { id: '3', title: 'Pickup', icon: 'check', screen:'Scan' },
  { id: '4', title: 'Paiement', icon: 'money', screen:'Reglement' },
];


const HomeScreen = ({ navigation }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}  onPress={() => navigation.navigate(item.screen, {userId:user.id } )}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={24} color="#fff" />
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <>

    <Appbar.Header>
  
      <Appbar.Content title="Tableau de bord"  titleStyle={{  fontSize:20,fontWeight:600 }} />
      {user ? (
       <Avatar.Text size={24} label="EM" />
      ):
      <Avatar.Text size={24} label="EM" />
    }
      <Appbar.Action icon="logout"  onPress={handleLogout} />
    </Appbar.Header>

    <View style={styles.container}>
    
      <Image source={{ uri: logo }} style={styles.logo} />
      
      <Text style={styles.text}>Welcome back, {user.name}</Text>
      <Text style={styles.sub_text}>Quelle est votre mission aujourd'hui</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
    </View>


    </>
  );
};


export default HomeScreen;