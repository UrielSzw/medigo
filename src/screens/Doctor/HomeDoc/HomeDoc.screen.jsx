import React, {useState, useEffect} from 'react';
import {View, Linking} from 'react-native';
import {
  FooterDoc,
  StyledText,
  StyledModal,
  StyledButton,
  WelcomeHeader,
  PatientRequest,
} from '../../../components';
import {styles} from './HomeDoc.styles';
import {PATHS} from '../../../routes/paths';

export const HomeDoc = ({navigation}) => {
  const [activo, setActivo] = useState(false);
  const [cuentaActivada, setCuentaActivada] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [count, setCount] = useState(60);

  const openGoogleMaps = (
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
  ) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${startLatitude},${startLongitude}&destination=${endLatitude},${endLongitude}&travelmode=driving`;
    Linking.openURL(url);
  };

  useEffect(() => {
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
      navigation.navigate(PATHS.MAP);
    }
    closeModal();
  };

  const closeModal = () => {
    setOpenModal(false);
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
            <StyledText>Detalles</StyledText>
            <StyledButton onPress={() => setOpenModalDetail(false)}>
              Cerrar Modal
            </StyledButton>
          </View>
        }
      />
    </View>
  );
};
