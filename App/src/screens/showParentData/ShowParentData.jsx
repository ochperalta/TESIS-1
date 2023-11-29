import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { v4 as uuidv4 } from 'uuid';

const ShowParentData = ({route, navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Datos del apoderado</Text>
      <Text>Nombre: Oscar Pedraza Llanos</Text>
      <Text>Parentezco: Padre</Text>
      <Text>DNI: 15489655</Text>
      <Text>Cel: 995864489</Text>
      <Text>Datos del alumno</Text>
      <Text>Nombre: Pedro Pedraza Aguilar</Text>
      <Text>DNI: 96846253</Text>
      <Text>Grado: Inicial - 5 años</Text>
      <TouchableOpacity
        style={styles.btnVerification}
        onPress={() => navigation.navigate('ScannerCode')}
      >
        <Text style={styles.loginText}>Escanear Nuevo Código</Text>
      </TouchableOpacity>

    </View>
  );
}

export default ShowParentData

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