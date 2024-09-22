import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, ActivityIndicator } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const HomeScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get current location
      let currentLocation = await Location.getCurrentPositionAsync({  accuracy: Location.Accuracy.High});
      setLocation(currentLocation);
    })();
  }, []);

  if (errorMsg) {
    return <Text>Error: {errorMsg}</Text>;
  }

  if (!location) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  

  return (
    <>

    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider="google"
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}

        showsCompass={true}
        showsIndoors={true}
        showsUserLocation={true}


        

      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="My Location"
          description="I'm here"
   
        />
      </MapView>
     
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',},
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  box : {
    width: 360,
    height: 300,
    padding: 10,
   
  }
});

export default HomeScreen;

