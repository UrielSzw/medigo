/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../../redux/user.slice';
import {FooterDoc, StyledButton, StyledText} from '../../../components';
import {PATHS} from '../../../routes/paths';
import {styles} from './Map.Styles';
import {setSpinner} from '../../../utils/setSpinner';
import {PinIcon} from '../../../assets';

export const Map = ({navigation}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const dispatch = useDispatch();

  const handleNavigateRegister = () => {
    navigation.navigate(PATHS.HOMEDOCTOR);
    dispatch(setUserData({location: currentLocation}));
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
            navigation.navigate(PATHS.HOMEDOCTOR, {permisoDenegado: false});
          }
        }
      } catch (error) {
        console.log('Error al solicitar permisos: ', error);
      }
    };

    getLocation();
    setSpinner(false);

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
        style={styles.principalButton}>
        Confirmar Ubicación
      </StyledButton>
      <FooterDoc style={styles.footer} />
    </View>
  );
};
