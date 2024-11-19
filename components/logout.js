const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    console.log('logout');
    navigation.navigate('Login');
  };

export default handleLogout; 
