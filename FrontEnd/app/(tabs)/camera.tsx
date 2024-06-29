import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NutritionCard } from '@/components/Card';
import { BottomDrawer } from '@/components/BottomDrawer';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(true); // State to control camera view
  const cameraRef = useRef(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const getBase64FromUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;
  
    try {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo.uri);
      const base64Image = await getBase64FromUrl(photo.uri);
      
      try {      
        axios.post('https://dark-ducks-feel.loca.lt/photo', { imageBase64: base64Image })
          .then(response => {
            console.log('Response:', response.data);
            if (Object.keys(response.data.message).length > 0) {
              setNutritionData(response.data.message);
              setDrawerVisible(true);
            } else {
              // Handle case where message is an empty object
              alert("Please take a picture of food.");
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      
      } catch (error) {
        console.error('Error uploading the image:', error);
      }
      setShowCamera(false); // Hide camera view after capturing photo
    } catch (error) {
      console.error('Failed to take picture:', error);
    }
  };
  

  const retakePicture = () => {
    setCapturedPhoto(null); // Clear captured photo
    setShowCamera(true); // Show camera view again
    setNutritionData(null);
    setDrawerVisible(false);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={takePicture}>
              <Ionicons name="radio-button-off-outline" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
              <Ionicons name="images-outline" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.camera}>
          <TouchableOpacity style={styles.retakeButton} onPress={retakePicture}>
            <Text style={styles.retakeButtonText}>Take Another Photo</Text>
          </TouchableOpacity>
          <Image source={{ uri: capturedPhoto }} style={{ flex: 1 }} />
          {nutritionData && ( 
            <BottomDrawer height={300} isVisible={drawerVisible} onClose={closeDrawer}>
              <NutritionCard data={nutritionData} />
            </BottomDrawer>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 15,
  },
  retakeButton: {
  position: 'absolute',
  top: 50,
  left: 20,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Same as other buttons
  borderRadius: 50,
  padding: 15,
  zIndex: 1,
},
  retakeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
