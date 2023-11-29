import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { v4 as uuidv4 } from 'uuid';
import Login from '../screens/login/Login';
import GenerateCode from '../screens/generateCode/GenerateCode';
import Register from '../screens/register/Register';
import ShowCode from '../screens/showCode/ShowCode';
import ScannerCode from '../screens/scannerCode/ScannerCode';
import ShowParentData from '../screens/showParentData/ShowParentData';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerTitleAlign: 'center',
            title: 'Inicio de Sesión'
          }}
          name="Login"
          component={Login} />
        <Stack.Screen
          options={{
            headerTitleAlign: 'center',
            title: 'Generar Código'
          }}
          name="GenerateCode"
          component={GenerateCode} />
        <Stack.Screen
          options={{
            headerTitleAlign: 'center',
            title: 'Registro'
          }}
          name="Register"
          component={Register} />
        <Stack.Screen
          options={{
            headerTitleAlign: 'center',
            title: 'Código de verificación'
          }}
          name="ShowCode"
          component={ShowCode} />
        <Stack.Screen
          options={{
            headerTitleAlign: 'center',
            title: 'Código de verificación'
          }}
          name="ScannerCode"
          component={ScannerCode} />
        <Stack.Screen
          options={{
            headerTitleAlign: 'center',
            title: 'Código de verificación'
          }}
          name="ShowParentData"
          component={ShowParentData} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator