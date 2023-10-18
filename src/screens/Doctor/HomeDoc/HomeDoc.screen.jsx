/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Linking} from 'react-native';
import {
  FooterDoc,
  StyledText,
  StyledModal,
  StyledButton,
  WelcomeHeader,
  PatientRequest,
  AcceptedPatient,
  PatientDetailsModal,
  DoctorReview,
  AddNotesModal,
} from '../../../components';
import {PATHS} from '../../../routes/paths';
import {styles} from './HomeDoc.styles';

export const HomeDoc = ({navigation, route}) => {
  const [permisoDenegado, setPermisoDenegado] = useState(
    route.params ? route.params.permisoDenegado : undefined,
  );
  const [activo, setActivo] = useState(false);
  const [cuentaActivada, setCuentaActivada] = useState(false);
  const [acceptedPatient, setAcceptedPatient] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalErrorGeo, setOpenModalErrorGeo] = useState(false);
  const [patientReviewModal, setPatientReviewModal] = useState(false);
  const [notesModal, setNotesModal] = useState(false);
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
      setOpenModalErrorGeo(true);
    }
  }, [permisoDenegado]);

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
      navigation.navigate(PATHS.MAP);
      setCuentaActivada(true);
      setActivo(true);
      setPermisoDenegado(true);
    }
    closeModal();
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleAcceptPatientRequest = () => {
    setOpenModalDetail(false);
    setActivo(false);
    setAcceptedPatient({name: 'Nombre'});
  };

  const handleEndAppointment = () => {
    setPatientReviewModal(true);
  };

  const handleAddNotes = () => {
    setNotesModal(true);
  };

  const handleSetActiveAfterEnd = () => {
    setActivo(true);
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
          {activo && (
            <PatientRequest
              count={count}
              setOpenModalDetail={setOpenModalDetail}
            />
          )}
          {!activo && acceptedPatient.name && (
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
        {!acceptedPatient.name && (
          <StyledButton onPress={() => setOpenModal(true)}>
            {cuentaActivada ? 'Desactivar cuenta' : 'Activar cuenta'}
          </StyledButton>
        )}
        {acceptedPatient.name && (
          <View style={styles.buttonAccepted}>
            <StyledButton onPress={handleEndAppointment}>
              Finalizar
            </StyledButton>
            <StyledButton variant="secondary" onPress={handleAddNotes}>
              Agregar notas
            </StyledButton>
          </View>
        )}
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
          <PatientDetailsModal
            handleAcceptPatientRequest={handleAcceptPatientRequest}
            setOpenModalDetail={setOpenModalDetail}
          />
        }
      />
      <StyledModal
        open={openModalErrorGeo}
        title="Error de geolocalización"
        content={
          <View style={{gap: 40}}>
            <StyledText style={{textAlign: 'center'}}>
              Para poder acceptar clientes, debes permitir la geolocalización
            </StyledText>
            <StyledButton
              variant="warning"
              onPress={() => setOpenModalErrorGeo(false)}>
              Cerrar
            </StyledButton>
          </View>
        }
      />
      <StyledModal
        title="Calificar paciente"
        content={
          <DoctorReview
            handleSetActiveAfterEnd={handleSetActiveAfterEnd}
            setPatientReviewModal={setPatientReviewModal}
          />
        }
        open={patientReviewModal}
      />
      <StyledModal
        title="Agregar Notas"
        content={<AddNotesModal setNotesModal={setNotesModal} />}
        open={notesModal}
      />
    </View>
  );
};
