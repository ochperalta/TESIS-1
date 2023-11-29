import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { v4 as uuidv4 } from 'uuid';
import CameraComponent from './CameraComponent';

const { width, height } = Dimensions.get('window');

const GenerateCode = ({ navigation }) => {
  const [success, setSuccess] = useState(false)

  const handlerVerification = () => {
    setSuccess(true)
    setTimeout(() => {
      const qrData = "95969854" ;
      navigation.navigate('ShowCode', { data: qrData })
    }, 2500);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={success ? styles.successVerification : styles.waitVerification}>¡Verificación Exitosa!</Text>
      <View style={styles.photoScanner}>

        <CameraComponent navigation={navigation}></CameraComponent>
        {/* <TouchableOpacity
          style={styles.btnVerification}
          onPress={() => handlerVerification()}
        >
          <Text style={styles.loginText}>Iniciar Verificación</Text>
        </TouchableOpacity> */}
      </View>

    </View>
  );
}

export default GenerateCode

const styles = StyleSheet.create({
  loginText: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center'
  },

  btnVerification: {
    backgroundColor: 'blue',
    marginVertical: 20,
    padding: 10,
    width: '70%',
    color: 'white'
  },
  photoScanner: {
    width: width - 40, // Ancho igual al radio del círculo
    height: height - 100, // Altura igual al radio del círculo
    //borderRadius: (width - 40)/2, // Mitad del valor de la altura o el ancho para hacerlo circular
    backgroundColor: 'white',
    marginVertical: 10
  },
  successVerification: {
    color: 'green',
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '600',
    textAlign: 'center'

  },
  waitVerification: {
    color: 'rgba(0,0,0,0)',
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '600'
  }
})