// screens/DetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import styles from '../assets/Styles'; 
import apiUrl from '../components/urlApi';
import axios from 'axios';


const DetailsScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl+'/api/parcels'); // Replace with your API
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <View><Text>Error: {error}</Text></View>;
    }


    return (   
        <DataTable>
        <DataTable.Header>
            <DataTable.Title>id</DataTable.Title>
            <DataTable.Title>tracking ref</DataTable.Title>
            <DataTable.Title>customer</DataTable.Title>
        </DataTable.Header>

        {data.map((item, index) => (
            <DataTable.Row key={index}>
                <DataTable.Cell>{item.id}</DataTable.Cell>
                <DataTable.Cell>{item.tracking_ref}</DataTable.Cell>
                <DataTable.Cell numeric>{item.customer_name}</DataTable.Cell>
            </DataTable.Row>
        ))}
    </DataTable>
    );
};

export default DetailsScreen;