import React, { useEffect,useState } from 'react';
import { View,Image, StyleSheet,Alert,FlatList, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Headline,ActivityIndicator } from 'react-native-paper';
import apiUrl from '../components/urlApi';
import axios from 'axios';
import styles from '../assets/Styles'; // Import the styles
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const ReglementScreen = ({route, navigation}) => {
  const { userId } = route.params;
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [refreshing, setRefreshing] = useState(false); 
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);


  const parcelsList = async (pageNumber) => {
    try {
       const response = await axios.get(apiUrl+`/api/getMerchantByDelivery/${userId}?page=${pageNumber}`);
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
    <TouchableOpacity onPress={() => navigation.navigate('DetailReglement',{merchant_id:item.merchant_id})} style={styles.item}>
    <Text style={styles.textExp}>Expéditeur: {item.merchant}</Text>
      <View style={styles.row}>
        <Text style={styles.columnSoldeGreen}>Solde:{"\n"}{(parseFloat(item.total_debit)).toFixed(2)}</Text>
        
        <View style={styles.separator} />
        <Text  style={styles.columnSoldeOrange}>Paiement:{"\n"}{(parseFloat(item.total_credit)).toFixed(2)}</Text>
        <View style={styles.separator} />
        <Text  style={styles.columnSoldeRed}>Reste:{"\n"}{((parseFloat(item.total_debit) - (parseFloat(item.total_credit)))).toFixed(2)}</Text>
      </View>
        
       
        
    </TouchableOpacity>
      
   
   
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
      onRefresh={handleRefresh}
       />
   
   
      
   </View>
   
      );
};

export default ReglementScreen;