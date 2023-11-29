import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { v4 as uuidv4 } from 'uuid';

const Login = ({ navigation }) => {
  const [parent, setParent] = useState(true)

  function typeLogin(){
    if(parent){
      navigation.navigate('GenerateCode')
    }else{
      navigation.navigate('ScannerCode')
    }
  } 

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.input}
        placeholder={parent?'DNI':'Código de I. E.'}
        keyboardType='number-pad'
        inputMode='numeric'
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        secureTextEntry={true}
      ></TextInput>
      <View style={{ flexDirection: 'row', width: '70%' }}>
        <TouchableOpacity
          style={parent ? styles.btnTypeLoginActive : styles.btnTypeLoginInactive}
          onPress={() => setParent(true)}
        >
          <Text style={parent ? styles.typeText : null} >Apoderado</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={parent ? styles.btnTypeLoginInactive : styles.btnTypeLoginActive}
          onPress={() => setParent(false)}
        >
          <Text style={parent ? null : styles.typeText}>I. E.</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.btnLogin}
        onPress={typeLogin}
      >
        <Text style={styles.loginText}>Ingresar</Text>
      </TouchableOpacity>

      <Text style={styles.questionLogin}>¿Aún no se ha registro?, Regístrese</Text>

      <TouchableOpacity
        style={styles.btnRegister}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 10,
    width: '70%'
  },
  btnLogin: {
    backgroundColor: 'blue',
    marginVertical: 10,
    padding: 10,
    width: '70%',
    color: 'white'
  },
  loginText: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center'
  },
  questionLogin: {
    marginVertical: 10,
  },
  btnRegister: {
    marginVertical: 10,
    padding: 10,
    width: '70%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'green'
  },
  registerText: {
    textAlign: 'center',
    color: 'green'
  },
  btnTypeLoginActive: {
    flex: 1, // Establece que cada sub-View ocupa la mitad del espacio disponible
    backgroundColor: 'blue', // Puedes establecer un color de fondo para visualizar mejor cada sub-View
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    height: 40,
  },
  btnTypeLoginInactive: {
    flex: 1, // Establece que cada sub-View ocupa la mitad del espacio disponible
    backgroundColor: 'lightgray', // Puedes establecer un color de fondo para visualizar mejor cada sub-View
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    height: 40,
  },
  typeText: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center'
  }
})