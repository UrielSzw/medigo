import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {FooterDoc, StyledButton} from '../../../components';
import {PATHS} from '../../../routes/paths';
import {styles} from './Map.Styles';

export const Map = ({navigation}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const handleNavigateRegister = () => {
    navigation.navigate(PATHS.REGISTER);
  };
  useEffect(() => {
    const getLocation = async () => {
      try {
        const permissionStatus = await check(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (permissionStatus === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setCurrentLocation({latitude, longitude});
            },
            error => {
              console.log('Error al obtener la ubicación: ', error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        } else if (permissionStatus === RESULTS.UNAVAILABLE) {
          console.log(
            'La geolocalización no está disponible en este dispositivo.',
          );
        } else {
          const permissionRequestResult = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          if (permissionRequestResult === RESULTS.GRANTED) {
            getLocation();
          } else {
            console.log('Permiso de geolocalización denegado');
          }
        }
      } catch (error) {
        console.log('Error al solicitar permisos: ', error);
      }
    };

    getLocation();

    return () => {};
  }, []);

  const handleMarkerDragEnd = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;

    console.log(
      `Nuevo marcador en Latitud: ${latitude}, Longitud: ${longitude}`,
    );
  };

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Tu ubicación actual"
            description="Descripción de tu ubicación"
            image={require('../../../assets/icons/pin_map.png')}
          />
        </MapView>
      )}

      <StyledButton
        onPress={handleNavigateRegister}
        style={styles.principalButton}>
        Confirmar Ubicación
      </StyledButton>
      <FooterDoc style={styles.footer} />
    </View>
  );
};
