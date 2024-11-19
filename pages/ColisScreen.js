import React, { useEffect,useState } from 'react';
import { View,FlatList, TouchableOpacity, Modal,ActivityIndicator,Linking, Alert } from 'react-native';
import {Text,TextInput,Button } from 'react-native-paper';
import axios from 'axios';
import styles from '../assets/Styles'; // Import the styles
import apiUrl from '../components/urlApi';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    TabsProvider,
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
  } from 'react-native-paper-tabs';
  
const ColisScreen = ({route}) => {
const { userId } = route.params;
const [parcels, setParcels] = useState([]);
const [error, setError] = useState(null);
const [selectedItem, setSelectedItem] = useState(null);
const [isModalVisible, setModalVisible] = useState(false);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false); 
const [refreshing, setRefreshing] = useState(false); 
const [hasMore, setHasMore] = useState(true);
const [updatedValue, setUpdatedValue] = useState(0);
const [recordId, setRecordId] = useState(null);



        const openModal = (item) => {
            setSelectedItem(item);
            setRecordId(item);
            setModalVisible(true);
        };

        const closeModal = () => {
            setModalVisible(false);
            setSelectedItem(null);
        };
       
  const updateDatabase = () => {
    if (recordId.id && updatedValue) {
      axios
        .post(apiUrl+`/api/updatetentative`, {
          id: recordId.id, 
          tentative: updatedValue,
        })
        .then(response => {
            setModalVisible(false);
            handleRefresh();
         
        })
        .catch(error => {
          alert('Error updating the record.');
        });
    }
    
  };

  
    const parcelsList = async (pageNumber) => {
         try {
            const response = await axios.get(apiUrl+`/api/getParcelForDelivery/${userId}?page=${pageNumber}`);
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

  
    const loadMoreData = () => {
         if (!loading && hasMore) 
            { 
                setLoading(true); 
                parcelsList(page).then(() => setLoading(false)); 
            } 
        }; 
    const handleRefresh = () => { 
            setRefreshing(true); 
            parcelsList(1, true).then(() => { setRefreshing(false); 
            setHasMore(true);
            setPage(2); 

     }); };

            

        

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
                <View style={styles.rightCardtentative}>
                {item.tentative ===3 ? (
                <Text  style={styles.modalTextRed}>Tentative: {item.tentative}</Text>
                 ) :
                 (
                    <Text  style={styles.modalTextOrange}>Tentative: {item.tentative}</Text>
                 )

                }
                
                </View>
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
      

        useEffect(() => {
            parcelsList(1);
        }, []);

        
    return (
        <>
        <TabsProvider
        defaultIndex={0}
        // onChangeIndex={handleChangeIndex} optional
      >
        <Tabs
        dark={false}
        disableSwipe={false} >
          <TabScreen label="En cours">
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
                       <Text style={styles.modalTitle}># {selectedItem.tracking_ref}</Text>
                       <Text style={styles.modalText}><Icon name={'person'} size={18}/> Expéditeur: {selectedItem.merchant}</Text>
                       <Text style={styles.modalText}><Icon name={'person'} size={18}/> Client: {selectedItem.customer_name}</Text>
                       <Text style={styles.modalText}><Icon name={'map'} size={18}/> Gouvernerat: {selectedItem.customer_gouvernerat}</Text>
                       <Text style={styles.modalText}><Icon name={'map'} size={18}/> Déligation: {selectedItem.customer_deligation}</Text>
                       <Text style={styles.modalText}><Icon name={'map'} size={18}/> Adresse: {selectedItem.customer_address}</Text>
                       <Text style={styles.modalText}><Icon name={'money'} size={18}/> Prix total de colis: {(parseFloat(selectedItem.price)+parseFloat(selectedItem.delivery_fee)).toFixed(2)} Tnd</Text>
                       <Text  style={styles.modalPhone} onPress={()=>{Linking.openURL(`tel:${selectedItem.customer_phone}`);}} ><Icon name={'phone'} size={18}/> Tél.: {selectedItem.customer_phone}</Text>
                       <Text  style={styles.modalText}><Icon name={'outbox'} size={18}/> Pickup: {selectedItem.pickup ? 'Oui' : 'Non'}</Text>
                       <Text  style={styles.modalText}><Icon name={'outbox'} size={18}/> Date de livraison: {selectedItem.delivery_date}</Text>
                       <Text  style={styles.modalText}><Icon name={'app-blocking'} size={18}/> Nombre de tentative: {selectedItem.tentative}</Text>
                       
                      {selectedItem.tentative < 3 ?
                          <>
                          <Text>Mettre à jour le tentative</Text>
                           <View style={styles.row}>
                           
                           <View style={styles.column}>
                          
                           <TextInput
                           style={styles.input}
                           value={updatedValue}
                           keyboardType="numeric"
                           onChangeText={setUpdatedValue}
                            />
                           </View>
                           <View style={styles.column}>
                           <Button  icon="update" mode="contained" theme={{ background: '#ff8c00' ,borderRadius:'5',elevation:8 }} onPress={updateDatabase}>Mettre à jour</Button>
                           </View>
                           </View>
                            </>
                            :
                           <Text style={styles.colorRed}>Le client a passé le nombre de tentatives</Text>
                      }
                      
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




          </TabScreen>
          <TabScreen label="En attente">
            <View style={{ backgroundColor: 'black', flex:1 }} />
          </TabScreen>
          <TabScreen label="Bloquée" badge={true}
           
          >
             <View style={{ backgroundColor: 'red', flex:1 }} />
          </TabScreen>
        </Tabs>
      </TabsProvider>
        
        </>
    
      );
};

export default ColisScreen;