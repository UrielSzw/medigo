import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {
  FooterDoc,
  StyledText,
  StyledModal,
  StyledButton,
  WelcomeHeader,
  PatientRequest,
} from '../../../components';
import {styles} from './HomeDoc.styles';

export const HomeDoc = () => {
  const [activo, setActivo] = useState(false);
  const [cuentaActivada, setCuentaActivada] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [count, setCount] = useState(60);

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
          <PatientRequest
            count={count}
            setOpenModalDetail={setOpenModalDetail}
          />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <StyledButton onPress={() => setOpenModal(true)}>
          {cuentaActivada ? 'Desactivar cuenta' : 'Activar cuenta'}
        </StyledButton>
      </View>
      <FooterDoc current="home" />
      <StyledModal
        title="¿Estas seguro que desea activar y comenzar a recibir consultas?"
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
