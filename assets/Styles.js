import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        justifyContent: 'center',
        padding: 16,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      width: '100%',
      marginBottom: 10,
      paddingHorizontal: 8,
    },
    
    button: {
        marginTop: 8,
        borderRadius:0,
        backgroundColor:'#006162',
        color:'#ffffff',
        width:'100%'
    },
    headline:{
    fontSize:15,
    },
    error: {
        color: 'red',
        marginBottom: 16,
    },
    logo: {
        width: 150,
        height: 150,
        marginLeft:'auto',
        marginRight:'auto',
        resizeMode: 'contain',
      },
      appbartitle: {
        fontSize:11
      },
      text: {
        fontSize: 18,
        marginBottom: 10,
        textAlign:'center'
      },
      sub_text: {
        fontSize: 15,
        marginBottom: 10,
        textAlign:'center'
      },
      listContainer: {
        paddingHorizontal: 20,
        justifyContent:'center',
        flex:1
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2b5f60',
        padding: 15,
        borderRadius: 50,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
      },
      itemContainerClose: {
        flexDirection: 'row',
        textAlign:'center',
        alignItems: 'center',
        backgroundColor: '#2b5f60',
        padding: 15,
        borderRadius: 50,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
      },
      iconContainer: {
        backgroundColor: '#ff8c00',
        borderRadius: 20,
        padding: 8,
        marginRight: 15,
      },
     
      title: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        
      },
      rightCardtentative:{
        position: 'absolute',
        right: 10,
        top:9,
      },
      rightCard :{
        position: 'absolute',
        right: 10,
        width:'',
        textAlign:'center',
        
        top:50
      },
      cerclegreen:{
        color:'#2b5f60',
        right: 0
      },
      modalTextRed:{
        color:'#fff',
        marginBottom:5,
        backgroundColor:'#bc0606',
        borderRadius:5,
        padding:2,
        fontSize:12
      },
      modalTextGreen:{
        color:'#fff',
        marginBottom:5,
        backgroundColor:'#2b5f60',
        borderRadius:5,
        padding:2,
        fontSize:12
      },
      modalTextOrange:{
        color:'#fff',
        marginBottom:5,
        backgroundColor:'#ff8c00',
        borderRadius:5,
        padding:2,
        fontSize:12
      },
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 10,
        backgroundColor:'#ffffff',
      
        width:'98%',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        // Shadow for Android
        elevation: 4,
    },
    itemText: {
        fontSize: 18,
        fontWeight:700,
        color: '#000',
        marginBottom:5
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
      color:'#000',
      marginBottom:5
    },
    modalPhone:{
      color:'#ff8c00',
      marginBottom:5
    },
    modalDescription: {
      flexDirection: 'row',
        fontSize: 16,
        color: '#666',
    },
    modalSubDescription: {

      marginBottom: 40,
    },
    titleCard:{
      fontSize:14,
      color:'#000000'
    },
   
    details: {
      padding: 10,
      backgroundColor: '#f9f9f9',
    },
    typeWriterText: {
      color: '#000000',
      fontSize: 18,
      textAlign:'center'
    },
    typeWriterCursorText: {
      color: '#CCC',
      fontSize: 18,
      textAlign:'center'
    },
    colorRed:{
      color:'red'
    },
    row: {
      flexDirection: 'row', // Arrange children in a row
      justifyContent: 'space-between', // Add space between columns
      width: '100%',
    },
    column: {
      flex: 1, // Each column takes equal space
      alignItems: 'center',
      paddingHorizontal: 8, // Add space between columns
    },
  
});

export default styles;