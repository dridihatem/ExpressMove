// DashboardScreen.js
import React,{useEffect,useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Modal,
    TouchableOpacity,
    Dimensions,Alert
  } from "react-native";
import styles from '../assets/Styles'; 
import apiUrl from '../components/urlApi';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import axios from 'axios';
import { CameraView, Camera } from "expo-camera";

const ScanScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    useEffect(() => {
        const getCameraPermissions  = async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        };
    
        getCameraPermissions();
      }, []);
    
      const handleBarCodeScanned = async({ type, data }) => {
        setScanned(true);
        try {
            const response = await axios.post(apiUrl+'/api/updatePickup', {
              scanned_data: data, 
            });
           
  
            if (response.data.success) {
                Alert.alert('Success', response.data.message);
                setScanned(true);
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Could not update status. Please try again.');
        }
   
      };
    
      if (hasPermission === null) {
        return (
          <View style={styles.container}>
            <Text>Requesting for camera permission</Text>
        </View>
        ) 
      }
      if (hasPermission === false) {
        return 
        (
          <View style={styles.container}>
        <Text>No access to camera</Text>
          </View>
        ) 
      }
  

  return (
  

    <View style={styles.container}>
     
     <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      
        <>
        <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.itemContainer}  onPress={() =>navigation.navigate('Home')}>
      <View style={styles.iconContainer}>
        <Icon name={'chevron-left'} size={24} color="#fff" />
      </View>
      <Text style={styles.title}>{"Retour"}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.itemContainer}  onPress={() =>setScanned(false)}>
      <View style={styles.iconContainer}>
        <Icon name={'fullscreen'} size={24} color="#fff" />
      </View>
      <Text style={styles.title}>{"Scan Qrcode"}</Text>
    </TouchableOpacity>
    </View>
        
        </>
      
    </View>


 
  );
};


export default ScanScreen;