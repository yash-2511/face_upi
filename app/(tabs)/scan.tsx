import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as Contacts from 'expo-contacts';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [faces, setFaces] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        const { status: contactsStatus } = await Contacts.requestPermissionsAsync();

        if (cameraStatus === 'granted' && contactsStatus === 'granted') {
          setHasPermission(true);

          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
          });

          if (data.length > 0) {
            setContacts(data);
          }
        } else {
          setHasPermission(false);
        }
      }
    })();

    return () => {
      setFaces([]); // Reset faces on unmount
    };
  }, []);

  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      setFaces(faces);
    } else {
      setFaces([]);
    }
  };

  if (!hasPermission) {
    return <View style={styles.container}><Text>No access to camera or contacts.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => setCameraRef(ref)}
        style={styles.camera}
        type={cameraType}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.accurate,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
        }}
      />
      <TouchableOpacity style={styles.button} onPress={() => setCameraType(
        cameraType === Camera.Constants.Type.front ? Camera.Constants.Type.back : Camera.Constants.Type.front
      )}>
        <Text style={styles.buttonText}>Flip Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: { width: '100%', height: '80%' },
  button: { position: 'absolute', bottom: 50, backgroundColor: 'blue', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontSize: 16 },
});
