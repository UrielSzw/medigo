/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';
import {FooterDoc, StyledButton, StyledText} from '../../../components';
import {PATHS} from '../../../routes/paths';
import {styles} from './Map.Styles';
import {setSpinner} from '../../../utils/setSpinner';
import {PinIcon} from '../../../assets';
import {theme} from '../../../theme/theme';
import {setDoctorData} from '../../../redux/doctor.slice';
import {setModal} from '../../../utils/setModal';
import {apiDoctorsUpdate} from '../../../utils/api/doctorRoutes';

export const Map = ({navigation}) => {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapSpinner, setMapSpinner] = useState(false);

  const handleNavigateRegister = async () => {
    try {
      const response = await apiDoctorsUpdate({
        latitud: currentLocation?.latitude,
        longitud: currentLocation?.longitude,
      });

      if (response.success) {
        navigation.navigate(PATHS.HOMEDOCTOR);
        dispatch(
          setDoctorData({
            location: {
              latitude: currentLocation?.latitude,
              longitud: currentLocation?.longitude,
            },
          }),
        );
      }
    } catch (e) {
      console.log(e);
    }
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
            {enableHighAccuracy: false, timeout: 5000, maximumAge: 0},
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
            navigation.navigate(PATHS.HOMEDOCTOR, {permisoDenegado: false});
          }
        }
      } catch (error) {
        console.log('Error al solicitar permisos: ', error);
        setModal({
          show: true,
          title: 'Error al cargar el mapa',
          message: 'La API de Google fallo',
        });
      }
    };

    getLocation();
    setSpinner(false);
    setMapSpinner(true);

    return () => {};
  }, []);

  const handleMarkerDragEnd = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setCurrentLocation({latitude, longitude});
  };

  return (
    <View style={styles.container}>
      <View style={styles.confirmLocation}>
        <StyledText color="white">Tu ubicación actual:</StyledText>
      </View>
      {currentLocation && (
        <MapView
          style={styles.map}
          onMapLoaded={() => setMapSpinner(false)}
          provider="google"
          mapType="standard"
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
            description="Manten para mover">
            <PinIcon />
          </Marker>
        </MapView>
      )}

      <StyledButton
        onPress={handleNavigateRegister}
        // disabled={mapSpinner}
        style={{...styles.principalButton, opacity: mapSpinner ? 0.7 : 1}}>
        Confirmar Ubicación
      </StyledButton>
      <FooterDoc style={styles.footer} current="map" />
      {mapSpinner && (
        <ActivityIndicator
          size="large"
          color={theme.colors.blue}
          style={styles.spinner}
        />
      )}
    </View>
  );
};
