import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { v4 as uuidv4 } from 'uuid';

const ViewPassword = ({ setView }) => {
  const [viewPassword, setViewPassword] = useState(false);

  const changeBtn = (flag) => {
    setViewPassword(flag)
    setView(flag)
  }
  return (
    <TouchableOpacity
      style={styles.btnViewPassword}
      title={viewPassword ? 'Ocultar' : 'Mostrar'}
      onPress={() => changeBtn(!viewPassword)}
    >
      <Ionicons
        name={viewPassword ? 'eye-off-outline' : 'eye-outline'}
        size={24}
        color="gray"
      />
    </TouchableOpacity>
  )
}

const Register = ({ navigation }) => {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewPasswordConfirmation, setViewPasswordConfirmation] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.input}
        placeholder='Correo electrónico'
        inputMode='email'
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder='DNI'
        keyboardType='number-pad'
        inputMode='numeric'
      ></TextInput>
      <View style={styles.containerPassword}>
        <TextInput
          style={styles.inputPassword}
          placeholder='Contraseña'
          secureTextEntry={!viewPassword}
        ></TextInput>
        <ViewPassword setView={(view) => setViewPassword(view)}></ViewPassword>
      </View>
      <View style={styles.containerPassword}>
        <TextInput
          style={styles.inputPassword}
          placeholder='Confirmar Contraseña'
          secureTextEntry={!viewPasswordConfirmation}
        ></TextInput>
        <ViewPassword setView={(view) => setViewPasswordConfirmation(view)}></ViewPassword>
      </View>
      <TouchableOpacity
        style={styles.btnLogin}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Registrarse</Text>
      </TouchableOpacity>

      <Text style={styles.questionLogin}>¿Ya se ha registrado?, Inicie sesión</Text>

      <TouchableOpacity
        style={styles.btnRegister}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Register

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
  containerPassword: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    height: 40,
  },
  inputPassword: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10
  },
  btnViewPassword: {
    marginHorizontal: 10
  }
})