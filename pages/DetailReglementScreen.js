import React, { useEffect,useState,useRef } from 'react';
import {
    View,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Modal,
    Alert,
  } from 'react-native';
import {Text} from 'react-native-paper';

import styles from '../assets/Styles'; 
import apiUrl from '../components/urlApi';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Signature from "react-native-signature-canvas";
import axios from 'axios';

const DetailsReglementScreen = ({ route,navigation}) => {
    const {merchant_id} = route.params;
    const signatureRef = useRef(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);  
    const [selectedId, setSelectedId] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState(null);

  
      const closeModal = () => {
          setModalVisible(false);
      };
 
      const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl+`/api/getDetailPaiementMerchantByDelivery/${merchant_id}`);
    
          if (!response) {
            throw new Error('Network response was not ok');
          }
          setData(response.data.data); 
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
    

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };
    
      useEffect(() => {
        fetchData();
      }, []);

      const handleOK = (signature) => {
        //console.log("Signature:", signature); // Should log a Base64 string
        if (typeof signature === "string" && signature.startsWith("data:image")) {
          saveSignature(signature);
          
         
        } else {
          Alert.alert("Error", "Failed to capture signature.");
        }
      };
    
      const saveSignature = async (signature) => {
        try {
          const response = await axios.post(
            apiUrl+"/api/saveSignature",
            { signature:signature,id:selectedId },
            { headers: { "Content-Type": "application/json" } }
          );
          /*console.log("Response:", response.data);*/

          Alert.alert("Success", "Merci! Signature enregistré");
          onRefresh();
          closeModal();
        } catch (error) {
          console.error("Error saving signature:", error);
          Alert.alert("Error", "Failed to save signature.");
        }
      };


    
      const handleEmpty = () => {
        Alert.alert("Alert", "Signature est vide!");
      };

  const openSignatureModal = (id,amount) => {
    setSelectedId(id);
    setSelectedAmount(amount);
    setModalVisible(true);
  };

    
      if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }

      return (
        <View style={styles.containerTable}>
        <ScrollView 
         refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.scrollViewContent}
        >


      
          {/* Table Header */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.nameCell]}>Débit</Text>
            <Text style={[styles.headerCell, styles.emailCell]}>Crédit</Text>
            <Text style={[styles.headerCell, styles.statusCell]}>Status</Text>
          </View>
    
          {/* Table Body */}
          {data.map((item) => (
            <View key={item.id} style={styles.rowTable}>
              <Text style={[styles.cell, styles.nameCell]}>{item.debit}</Text>
              <Text style={[styles.cell, styles.emailCell]}>{item.credit}</Text>
              <Text style={[styles.cell, styles.statusCell]}>{(item.status ==1) ? <Icon name="gesture" size={25} color={'red'}  onPress={() => openSignatureModal(item.id,item.credit)} ></Icon> : <Icon name="check" size={25} color={'green'}></Icon>}</Text>
       
            </View>
          ))}
        </ScrollView>
        <Modal
       visible={isModalVisible}
       animationType="slide"
       transparent={true}
       onRequestClose={closeModal}
   >
  
       <View style={styles.modalContainer}>
           <View style={styles.modalContent}>
           <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}> Signature Expéditeur</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

           

            <View style={styles.signaturePadContainer}>
            

            <Signature
        ref={signatureRef}
        onOK={handleOK}
        onEmpty={handleEmpty}
        descriptionText="Signature Expéditeur"
        clearText="Effacer"
        confirmText="Enregistrer"
        webStyle={styles.webStyle}
      />
            
            </View>
           
            

              
             
           </View>
       </View>
       
   </Modal>
        </View>
      );


}
export default DetailsReglementScreen;