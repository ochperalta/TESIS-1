import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { v4 as uuidv4 } from 'uuid';

const { width } = Dimensions.get('window');

const GeneradorQR = ({qrData}) => {

  return (
    <View>
      <QRCode
        value={qrData}
        size={width - 40}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

const ShowCode = ({route, navigation}) => {
  const {data} = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.successVerification}>¡Codigo generado!, úsalo para identificarte</Text>
      <GeneradorQR qrData = {data}></GeneradorQR>
      <TouchableOpacity
        style={styles.btnVerification}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Generar Nuevo Código</Text>
      </TouchableOpacity>

    </View>
  );
}

export default ShowCode

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
  successVerification: {
    color: 'green',
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '600',
    textAlign: 'center'

  }
})