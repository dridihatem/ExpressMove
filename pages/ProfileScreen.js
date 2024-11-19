// AuthScreen.js
import React, { useEffect,useState } from 'react';
import { View,Image, StyleSheet,Alert } from 'react-native';
import { TextInput, Button, Text, Headline } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileScreen = ({navigation}) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Pencils Screen</Text>
        </View>
      );
};

export default ProfileScreen;