import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

const CameraComponent = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(false)
  const [hasFace, setHasFace] = useState(false);
  const [success, setSuccess] = useState(false)
  const [viewMessage, setViewMessage] = useState(false)
  const [name, setName] = useState("")
  const [viewError, setViewError] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      setHasFace(false);
    })();
  }, []);

  const takePicture = async () => {
    setSuccess(false)
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, resizeTo: (255, 255) };
      const data = await cameraRef.current.takePictureAsync(options);
      setCapturedImage(data.uri);
      sendImageToServer(data.uri)
      //loadFaceModels(photo.uri)
    }
  };

  const checkForFace = (obj) => {
    try {
      if (obj.faces.length != 0 && !hasFace) {
        setHasFace(true);
        setViewError(false)
        takePicture();
      }
    } catch (error) {
      console.error(error);
    }
  }


  const sendImageToServer = async (imageUri) => {
    setViewMessage(true)
    try {
      // Crear un objeto FormData para enviar la imagen
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'imagen.jpg'
      });
      formData.append('password', 'oscar');

      // Enviar la imagen al servidor utilizando fetch
      const response = await fetch('http://192.168.1.10:1234/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      // Manejar la respuesta del servidor si es necesario
      const responseData = await response.json();
      if (responseData.value.includes('unknown') || !responseData.value) {
        setViewError(true)
      } else {
        setSuccess(true)
        console.log('Respuesta del servidor:', responseData);
        setName(responseData.value)
        setTimeout(() => {
          const qrData = "95969854";
          setName("")
          setViewMessage(false)
          navigation.navigate('ShowCode', { data: qrData })
        }, 2500);
        
      }

    } catch (error) {
      console.error('Error al enviar la imagen al servidor:', error);
      setViewMessage(false)
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {viewError&&<Text style={{color:'red'}}>No fue posible autenticar</Text>}
      {viewMessage && <Text style={styles.successVerification}>{success ? name+' ¡Verificación Exitosa!' : 'Procesando ...'}</Text>}
      <Camera onFacesDetected={(e) => checkForFace(e)} style={{ flex: 1 }} type={Camera.Constants.Type.front} ref={cameraRef} >
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
          {!viewMessage && <TouchableOpacity
            style={{ flex: 0.5, alignSelf: 'flex-end', alignItems: 'center' }}
            onPress={() => setHasFace(false)}
          >
            <Text style={{ backgroundColor: 'blue', padding: 10, fontSize: 18, marginBottom: 10, color: 'white' }}> Volver a intentar </Text>
          </TouchableOpacity>}
        </View>
      </Camera>
      {capturedImage && (
        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: capturedImage }} style={{ width: 200, height: 200, marginTop: 10 }} />
        </View>
      )}
    </View>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  successVerification: {
    color: 'green',
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '600',
    textAlign: 'center'

  }
})
