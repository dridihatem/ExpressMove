// AuthScreen.js
import React, { useEffect,useState,useCallback } from 'react';
import { View,FlatList, TouchableOpacity, Modal,ActivityIndicator,Linking, Alert } from 'react-native';
import {Text,TextInput,Button } from 'react-native-paper';
import axios from 'axios';
import styles from '../assets/Styles'; 
import apiUrl from '../components/urlApi';
import Icon from 'react-native-vector-icons/MaterialIcons';
const RamassageScreen = ({route,navigation}) => {
  const { userId } = route.params;
  const [parcels, setParcels] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [refreshing, setRefreshing] = useState(false); 
  const [hasMore, setHasMore] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);


  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
};

  const closeModal = () => {
      setModalVisible(false);
      setSelectedItem(null);
  };


  const parcelsList = async (pageNumber) => {
    try {
       const response = await axios.get(apiUrl+`/api/getParcelsRamassage/${userId}?page=${pageNumber}`);
       const newData = response.data.data;
      
       if (newData.length === 0) 
           { 
               setHasMore(false); 
           } 
       else 
       {
           setParcels(newData); 
           setPage(pageNumber + 1); 
       } 
       } 
   catch (error) { 
       console.error(error); 

   }
};



const renderItem = ({ item }) => (
            
  <>
    <TouchableOpacity onPress={() => openModal(item)} style={styles.item}>
        <Text style={styles.itemText}>
        {item.pickup ?  (<Icon name="circle" size={15} style={styles.cerclegreen} /> ) : ( '')}# {item.tracking_ref}</Text>
        <Text style={styles.modalText}><Icon name={'person'} size={16}/> Client: {item.customer_name}</Text>
        <Text style={styles.modalText}><Icon name={'map'} size={16}/> Adresse: {item.customer_address}</Text>
        <Text style={styles.modalText}><Icon name={'money'} size={16}/> Prix de colis: {(parseFloat(item.price)+parseFloat(item.delivery_fee)).toFixed(2)} Tnd</Text>
        <Text style={styles.modalText}><Icon name={'pending'} size={16}/> Date livraison: {item.delivery_date}</Text>
        
    </TouchableOpacity>
        
        {item.pickup ? (
        <View style={styles.rightCard}>
        <Text  style={styles.modalTextGreen}><Icon name={'outbox'} size={18}/> Pickup: Oui</Text>
        </View>
        ):
        (
            <View style={styles.rightCard}></View>
        )
    }
   
    </>
   
);

    const loadMoreData = () => {
      if (!loading && hasMore) 
        { 
            setLoading(true); 
            parcelsList(page).then(() => setLoading(false)); 
        } 
    }; 

    const handleRefresh =  async () => { 
      setRefreshing(true); 
      parcelsList(1, true).then(() => { setRefreshing(false); 
      setHasMore(true);
      setPage(2); 

}); };
   

      useEffect(() => {
        parcelsList(1);
      }, []);




    return (
      <View  scrollEnabled={true}>
   
      <FlatList 
      data={parcels} 
      keyExtractor={(item, index) => index.toString()} 
      renderItem={renderItem} 
      onEndReached={loadMoreData} 
      onEndReachedThreshold={0.5} 
      ListFooterComponent={loading ? <ActivityIndicator animating={true} size="large" /> : null} 
      refreshing={refreshing} 
      onRefresh={handleRefresh} />
   
   
      <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
      >
          <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                  {selectedItem && (
                      <>
                      <View style={styles.modalSubDescription}>
                          <Text style={styles.modalTitleColis}># {selectedItem.tracking_ref}</Text>
                          <Text style={styles.modalText}><Icon name={'person'} size={18}/> Expéditeur: {selectedItem.merchant}</Text>
                          <Text style={styles.modalText}><Icon name={'person'} size={18}/> Client: {selectedItem.customer_name}</Text>
                          <Text style={styles.modalText}><Icon name={'map'} size={18}/> Gouvernerat: {selectedItem.customer_gouvernerat}</Text>
                          <Text style={styles.modalText}><Icon name={'map'} size={18}/> Déligation: {selectedItem.customer_deligation}</Text>
                          <Text style={styles.modalText}><Icon name={'map'} size={18}/> Adresse: {selectedItem.customer_address}</Text>
                          <Text style={styles.modalText}><Icon name={'money'} size={18}/> Prix total de colis: {(parseFloat(selectedItem.price)+parseFloat(selectedItem.delivery_fee)).toFixed(2)} Tnd</Text>
                          <Text  style={styles.modalPhone} onPress={()=>{Linking.openURL(`tel:${selectedItem.customer_phone}`);}} ><Icon name={'phone'} size={18}/> Tél.: {selectedItem.customer_phone}</Text>
                          <Text  style={styles.modalText}><Icon name={'outbox'} size={18}/> Date de livraison: {selectedItem.delivery_date}</Text>
                          <Button   icon="update" mode="contained" theme={{ background: '#ff8c00' ,borderRadius:'5',elevation:8 }}  onPress={()=> navigation.navigate('Scan')}>Pickup</Button>
                      </View> 
                      </>
                  )}
                  <TouchableOpacity style={styles.itemContainerClose}  onPress={closeModal} >
                      <View style={styles.iconContainer}>
                      <Icon name={'close'} size={24} color="#fff" />
                      </View>
                      <Text style={styles.title}>Fermer</Text>
                  </TouchableOpacity>
   
                
              </View>
          </View>
      </Modal>
   </View>
   
      );
};

export default RamassageScreen;