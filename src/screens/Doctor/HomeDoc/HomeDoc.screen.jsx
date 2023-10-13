import React, {useState, useEffect} from 'react';
import {View, Linking} from 'react-native';
import {
  FooterDoc,
  StyledText,
  StyledModal,
  StyledButton,
  WelcomeHeader,
  PatientRequest,
  Rating,
  AcceptedPatient,
} from '../../../components';
import {PATHS} from '../../../routes/paths';
import {ClockIcon, DefaultProfile} from '../../../assets';
import {styles} from './HomeDoc.styles';

export const HomeDoc = ({navigation, route}) => {

 // var permisoDenegado = route.params ? route.params.permisoDenegado : undefined;
  const [permisoDenegado, setPermisoDenegado] = useState(route.params ? route.params.permisoDenegado : undefined);
  const [activo, setActivo] = useState(false);
  const [cuentaActivada, setCuentaActivada] = useState(false);
  const [acceptedPatient, setAcceptedPatient] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [count, setCount] = useState(60);

  const openGoogleMaps = (
    startLatitude = '-34.617865',
    startLongitude = '-58.4332',
    endLatitude = '-35.617865',
    endLongitude = '-59.4332',
  ) => {
    console.log(startLatitude);
    const url = `https://www.google.com/maps/dir/?api=1&origin=${startLatitude},${startLongitude}&destination=${endLatitude},${endLongitude}&travelmode=driving`;
    Linking.openURL(url);
  };

  useEffect(() => {
    // Si el valor de la ruta cambia, actualiza el estado
    setPermisoDenegado(route.params ? route.params.permisoDenegado : undefined);
  }, [route.params]);

  useEffect(() => {
    if (permisoDenegado === false) {
      setActivo(false);
      setCuentaActivada(false);

    }
  }, [permisoDenegado]);

  useEffect(() => {
    console.log(permisoDenegado);
    if (count <= 0) {
      console.log('Cancelado la request');
    } else {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [count]);

  const handleConfirmarClick = () => {
    if (cuentaActivada) {
      setCuentaActivada(false);
      setActivo(false);
    } else {
      setCuentaActivada(true);
      setActivo(true);
      setPermisoDenegado(true);
      navigation.navigate(PATHS.MAP);
    }
    closeModal();
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleAcceptPatientRequest = () => {
    setOpenModalDetail(false);
    setActivo(false);
    setAcceptedPatient({});
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <WelcomeHeader username="Dr.Joseph Brostito" />
      </View>
      <View style={styles.container}>
        <View style={styles.textState}>
          <StyledText size="xl" bold={true} color={activo ? 'green' : 'red'}>
            {activo ? 'ACTIVO' : 'INACTIVO'}
          </StyledText>
          {cuentaActivada && (
            <PatientRequest
              count={count}
              setOpenModalDetail={setOpenModalDetail}
            />
          )}
          {!cuentaActivada && acceptedPatient && (
            <AcceptedPatient
              onPress={() =>
                openGoogleMaps(
                  '-34.617865',
                  '-58.4332',
                  '-35.617865',
                  '-59.4332',
                )
              }
            />
          )}
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <StyledButton onPress={() => setOpenModal(true)}>
          {cuentaActivada ? 'Desactivar cuenta' : 'Activar cuenta'}
        </StyledButton>
      </View>
      <FooterDoc current="home" />
      <StyledModal
        title={
          cuentaActivada
            ? '¿Estas seguro que desea desactivar y dejar de recibir consultas?'
            : '¿Estas seguro que desea activar y comenzar a recibir consultas?'
        }
        content={
          <View style={styles.contentWrapper}>
            <View>
              <StyledButton onPress={handleConfirmarClick}>
                Confirmar
              </StyledButton>
              <StyledButton onPress={closeModal} variant="empty">
                Cancelar
              </StyledButton>
            </View>
          </View>
        }
        open={openModal}
      />
      <StyledModal
        open={openModalDetail}
        title={
          <View style={styles.headerModalWrapper}>
            <StyledText color="white" size="xs">
              Tiempo restante para acceptar:
            </StyledText>
            <StyledText size="s" color="white">
              {count}
            </StyledText>
          </View>
        }
        content={
          <View>
            <View style={styles.dataWrapper}>
              <View style={styles.nameWrapper}>
                <DefaultProfile />
                <View>
                  <StyledText bold size="md">
                    User
                  </StyledText>
                  <StyledText color="grey">Pacietne</StyledText>
                </View>
              </View>
              <View style={styles.timeWrapper}>
                <ClockIcon fill="#8696BB" style={styles.icon} />
                <StyledText color="grey">15 m</StyledText>
              </View>
            </View>
            <View style={styles.detailsWrapper}>
              <Rating rating={4} readOnly />
              <StyledText color="grey" size="default">
                DNI: 22222222
              </StyledText>
              <StyledText color="grey" size="default">
                Miembro familiar: Joe Doe
              </StyledText>
              <StyledText color="grey" size="default">
                Ubicacion de atencion: Av Corrientes 4251
              </StyledText>
              <View>
                <StyledText color="grey" size="default">
                  Motivo:
                </StyledText>
                <StyledText color="grey" size="default">
                  - Siento mucho dolor en el codo cuando me toco o hago algun
                  movimiento leve
                </StyledText>
              </View>
              <StyledText color="grey" size="default">
                Sintomas: molestia en el codo
              </StyledText>
            </View>
            <StyledButton onPress={handleAcceptPatientRequest}>
              Acceptar
            </StyledButton>
            <StyledButton
              style={styles.button}
              variant="secondary"
              onPress={() => setOpenModalDetail(false)}>
              Rechazar
            </StyledButton>
          </View>
        }
      />
    </View>
  );
};
