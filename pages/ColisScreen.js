import React, { useEffect,useState } from 'react';
import { View,FlatList, TouchableOpacity, Modal,ActivityIndicator,Linking, Alert } from 'react-native';
import {Text,TextInput,Button } from 'react-native-paper';
import axios from 'axios';
import styles from '../assets/Styles'; 
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
const [parcelsEnattente, setParcelsEnattente] = useState([]);
const [parcelsBloque, setParcelsBloque] = useState([]);
const [error, setError] = useState(null);
const [selectedItem, setSelectedItem] = useState(null);
const [isModalVisible, setModalVisible] = useState(false);
const [isModalVisibleEnattente, setModalVisibleEnattente] = useState(false);
const [isModalVisibleBloque, setModalVisibleBloque] = useState(false);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false); 
const [pageEnattente, setPageEnattente] = useState(1);
const [loadingEnattente, setLoadingEnattente] = useState(false); 
const [pageBloque, setPageBloque] = useState(1);
const [loadingBloque, setLoadingBloque] = useState(false); 
const [refreshing, setRefreshing] = useState(false); 
const [refreshingEnattente, setRefreshingEnattente] = useState(false); 
const [refreshingBloque, setRefreshingBloque] = useState(false); 
const [hasMore, setHasMore] = useState(true);
const [hasMoreEnAttente, setHasMoreEnAttente] = useState(true);
const [hasMoreBloque, setHasMoreBloque] = useState(true);
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
        const openModalEnattente = (item) => {
            setSelectedItem(item);
            setRecordId(item);
            setModalVisibleEnattente(true);
        };

        const closeModalEnattente = () => {
            setModalVisibleEnattente(false);
            setSelectedItem(null);
        };
        const openModalBloque = (item) => {
            setSelectedItem(item);
            setRecordId(item);
            setModalVisibleBloque(true);
        };

        const closeModalBloque = () => {
            setModalVisibleBloque(false);
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
  const updateDatabaseEnattente = () => {
    if (recordId.id && updatedValue) {
      axios
        .post(apiUrl+`/api/updatetentative`, {
          id: recordId.id, 
          tentative: updatedValue,
        })
        .then(response => {
            setModalVisibleEnattente(false);
            handleRefreshEnattente();
         
        })
        .catch(error => {
          alert('Error updating the record.');
        });
    }
    
  };

  const updateDatabaseBloque = () => {
    if (recordId.id && updatedValue) {
      axios
        .post(apiUrl+`/api/updatetentative`, {
          id: recordId.id, 
          tentative: updatedValue,
        })
        .then(response => {
            setModalVisibleBloque(false);
            handleRefreshBloque();
         
        })
        .catch(error => {
          alert('Error updating the record.');
        });
    }
    
  };

  const updateDelivery = async(id) => {
    console.log(id);
    try {       
        const response = await axios.post(apiUrl+`/api/updateDelivery`, {
          id: id
        }
    );
        setModalVisible(false);
        handleRefresh();
        Alert.alert('Succès','Colis livré avec succès');
        }  
    catch (error) {
    console.error("Error saving signature:", error);
    Alert.alert("Error", "Failed to save signature.");
    }
    }
    
  
  
    const parcelsListEncours = async (pageNumber) => {
         try {
            const response = await axios.get(apiUrl+`/api/getParcelForDeliveryEncours/${userId}?page=${pageNumber}`);
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

    const parcelsListEnattente = async (pageNumber) => {
        try {
           const response = await axios.get(apiUrl+`/api/getParcelForDeliveryEnattente/${userId}?page=${pageNumber}`);
           const newData = response.data.data;
          
           if (newData.length === 0) 
               { 
                   setHasMoreEnAttente(false); 
               } 
           else 
           {
            setParcelsEnattente(newData); 
               setPageEnattente(pageNumber + 1); 
           } 
           } 
       catch (error) { 
           console.error(error); 

       }
   };

   const parcelsListBloque = async (pageNumber) => {
    try {
       const response = await axios.get(apiUrl+`/api/getParcelForDeliveryBloque/${userId}?page=${pageNumber}`);
       const newData = response.data.data;
      
       if (newData.length === 0) 
           { 
               setHasMoreBloque(false); 
           } 
       else 
       {
        setParcelsBloque(newData); 
           setPageBloque(pageNumber + 1); 
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
                parcelsListEncours(page).then(() => setLoading(false)); 
            } 
        }; 

        const loadMoreDataEnattente = () => {
            if (!loading && hasMoreEnAttente) 
               { 
                   setLoadingEnattente(true); 
                   parcelsListEnattente(page).then(() => setLoadingEnattente(false)); 
               } 
           }; 
           const loadMoreDataBloque = () => {
            if (!loading && hasMoreBloque) 
               { 
                   setLoadingBloque(true); 
                   parcelsListBloque(page).then(() => setLoadingBloque(false)); 
               } 
           }; 

         

        const handleRefresh = () => { 
                setRefreshing(true); 
                parcelsListEncours(1, true).then(() => { setRefreshing(false); 
                setHasMore(true);
                setPage(2); 

        }); };
        const handleRefreshEnattente = () => { 
            setRefreshingEnattente(true); 
            parcelsListEnattente(1, true).then(() => { setRefreshingEnattente(false); 
            setHasMoreEnAttente(true);
            setPageEnattente(2); 

    }); };

        const handleRefreshBloque = () => { 
            setRefreshingBloque(true); 
            parcelsListBloque(1, true).then(() => { setRefreshingBloque(false); 
            setHasMoreBloque(true);
            setPageBloque(2); 

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

        
        const renderItemEnattente = ({ item }) => (
            
            <>
              <TouchableOpacity onPress={() => openModalEnattente(item)} style={styles.item}>
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
          const renderItemBloque = ({ item }) => (
            
            <>
              <TouchableOpacity onPress={() => openModalBloque(item)} style={styles.item}>
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
            parcelsListEncours(1);
            parcelsListEnattente(1);
            parcelsListBloque(1);
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
                       <Text style={styles.modalTitleColis}># {selectedItem.tracking_ref}</Text>
                       <Button  icon="update" mode="contained" theme={{ background: '#ff8c00' ,borderRadius:'5',elevation:8 }} onPress={() => updateDelivery(selectedItem.id)}> Marquer comme livré</Button>
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
                           <Button  icon="update" mode="contained" theme={{ background: '#ff8c00' ,borderRadius:'5',elevation:8 }}  onPress={updateDatabase} >Mettre à jour</Button>
                           </View>
                           </View>
                           
                      
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
          <View  scrollEnabled={true}>
   
   <FlatList 
   data={parcelsEnattente} 
   keyExtractor={(item, index) => index.toString()} 
   renderItem={renderItemEnattente} 
   onEndReached={loadMoreDataEnattente} 
   onEndReachedThreshold={0.5} 
   ListFooterComponent={loadingEnattente ? <ActivityIndicator animating={true} size="large" /> : null} 
   refreshing={refreshingEnattente} 
   onRefresh={handleRefreshEnattente} />


   <Modal
       visible={isModalVisibleEnattente}
       animationType="slide"
       transparent={true}
       onRequestClose={closeModalEnattente}
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
                           <Button  icon="update" mode="contained" theme={{ background: '#ff8c00' ,borderRadius:'5',elevation:8 }} onPress={updateDatabaseEnattente}>Mettre à jour</Button>
                           </View>
                           </View>
                            </>
                            :
                           <Text style={styles.colorRed}>Le client a passé le nombre de tentatives</Text>
                      }
                      
                   </View> 
                   </>
               )}
               <TouchableOpacity style={styles.itemContainerClose}  onPress={closeModalEnattente} >
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
          <TabScreen label="Bloquée" badge={true}>
            <View  scrollEnabled={true}>
   
   <FlatList 
   data={parcelsBloque} 
   keyExtractor={(item, index) => index.toString()} 
   renderItem={renderItemBloque} 
   onEndReached={loadMoreDataBloque} 
   onEndReachedThreshold={0.5} 
   ListFooterComponent={loadingBloque ? <ActivityIndicator animating={true} size="large" /> : null} 
   refreshing={refreshingBloque} 
   onRefresh={handleRefreshBloque} />


   <Modal
       visible={isModalVisibleBloque}
       animationType="slide"
       transparent={true}
       onRequestClose={closeModalBloque}
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
                           <Button  icon="update" mode="contained" theme={{ background: '#ff8c00' ,borderRadius:'5',elevation:8 }} onPress={updateDatabaseBloque}>Mettre à jour</Button>
                           </View>
                           </View>
                            </>
                            :
                           <Text style={styles.colorRed}>Le client a passé le nombre de tentatives</Text>
                      }
                      
                   </View> 
                   </>
               )}
               <TouchableOpacity style={styles.itemContainerClose}  onPress={closeModalBloque} >
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
        </Tabs>
      </TabsProvider>
        
        </>
    
      );
};

export default ColisScreen;