/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {
  AppointmentConfirmed,
  ChangeAdressModal,
  DoctorDetails,
  DropdownSelect,
  FooterPatient,
  ListOfDoctors,
  PatientReview,
  Rating,
  StyledButton,
  StyledModal,
  StyledText,
  SubmitDoctorDataModal,
  UserDataItem,
  WelcomeHeader,
} from '../../../components';
import {PencilIcon} from '../../../assets';
import {setUserData} from '../../../redux/user.slice';
import {styles} from './HomePat.styles';
import {WaitingModal} from '../../../components/Patient/WaitingModal/WaitingModal.component';

export const HomePat = () => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: {errors},
  } = useForm();

  const {userData} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openMedicModal, setOpenMedicModal] = useState(false);
  const [openWaiting, setOpenWaiting] = useState(false);
  const [especialidad, setEspecialidad] = useState('Seleccione especialidad');
  const [especialidadModal, setEspecialidadModal] = useState(false);
  const [grupoFamiliarModal, setGrupoFamiliarModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [doctorDetailsModal, setDoctorDetailsModal] = useState(false);
  const [doctorReviewModal, setDoctorReviewModal] = useState(false); // Cambiar a true para evaluar vista del modal de Review
  const [grupoFamiliar, setGrupoFamiliar] = useState(
    'Seleccione grupo familiar',
  );
  const [filter, setFilter] = useState('Tiempo');
  const [addressPreview, setAddressPreview] = useState(userData.address);
  const [listOfDoctorsState, setListOfDoctorsState] = useState(false);
  const [appointmentState, setAppointmentState] = useState(false); // Cambiar a true para evaluar vista de consulta en sesion
  const [doctorDetails, setDoctorDetails] = useState(undefined);

  const onSubmitAdress = () => {
    setValue('direccion', addressPreview);
    dispatch(setUserData({address: addressPreview}));
    setOpenModal(false);
  };

  const onSubmit = async data => {
    if (especialidad === 'Seleccione especialidad') {
      setError('especialidad', {
        type: 'manual',
        message: 'La especialidad es obligatoria',
      });

      if (grupoFamiliar === 'Seleccione grupo familiar') {
        setError('familyGroup', {
          type: 'manual',
          message: 'El grupo familiar es obligatorio',
        });
      }

      return;
    }

    if (grupoFamiliar === 'Seleccione grupo familiar') {
      setError('familyGroup', {
        type: 'manual',
        message: 'El grupo familiar es obligatorio',
      });
      return;
    }

    setValue('especialidad', especialidad);
    setValue('familyGroup', grupoFamiliar);

    try {
      const inputAddress = 'Av+Corrientes+5300+CABA';

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${inputAddress}&format=jsonv2`,
      );
      const locationData = await response.json();

      if (locationData && locationData.length > 0) {
        // Si se encontró una ubicación, toma la primera coincidencia
        const latitude = locationData[0].boundingbox[0];
        const longitude = locationData[0].boundingbox[2];

        setValue('direccion', data.direccion);
        setValue('especialidad', especialidad);
        setValue('familyGroup', grupoFamiliar);

        const formData = {
          sintomas: data.sintomas,
          motivo: data.motivo,
          especialidad: especialidad,
          latitud: latitude,
          longitud: longitude,
          nombre: 'nombre',
          apellido: 'apellido',
          direccion: data.direccion,
        };

        setListOfDoctorsState(true);
        setOpenMedicModal(false);
        console.log(formData);
      } else {
        // No se encontró una ubicación, maneja el error o muestra un mensaje
        setError('direccion', {
          type: 'manual',
          message: 'Dirección no encontrada',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setValue('direccion', addressPreview);
  }, []);

  const handleViewMoreDetails = doctor => {
    setDoctorDetails(doctor);
    setDoctorDetailsModal(true);
  };

  const handleRequestDoctor = () => {
    try {
      //Solicitar medico con numero de matricula
      const requestDoctor = 'requestDoctorEndpoint(doctor.nroMatricula)';
      if (requestDoctor) {
        setDoctorDetailsModal(false);
        setOpenWaiting(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (grupoFamiliar !== 'Seleccione grupo familiar') {
      clearErrors('familyGroup');
    }
    if (especialidad !== 'Seleccione especialidad') {
      clearErrors('especialidad');
    }
  }, [grupoFamiliar, especialidad]);

  // LOGICA PARA EL LLAMADO CADA 20 SEGUNDOS PARA SABER SI FINALIZO LA CONSULTA
  const [running, setRunning] = useState(false);
  const handleEndOfAppointment = async () => {
    try {
      const endAppointment = 'endAppointmentEndpoint()';
      if (endAppointment === 'finalizo') {
        console.log('finalizo');
        setRunning(false);
        setDoctorReviewModal(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    let intervalId;

    const startInterval = () => {
      intervalId = setInterval(() => {
        // Tu función a ejecutar cada 20 segundos
        handleEndOfAppointment();
        console.log('La función se ejecutará cada 20 segundos');

        // Comprueba si la variable booleana cambió
        if (!running) {
          clearInterval(intervalId); // Detén el intervalo
        }
      }, 20000); // 20 segundos en milisegundos
    };

    if (running) {
      startInterval(); // Inicia el intervalo cuando el componente se monta
    }

    return () => {
      setRunning(false); // Cambia la variable booleana a false cuando el componente se desmonta
      clearInterval(intervalId); // Asegúrate de detener el intervalo al desmontar el componente
    };
  }, [running]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.body}>
        {!listOfDoctorsState && !appointmentState && (
          <TouchableOpacity
            onPress={setOpenModal}
            style={styles.adressButtonWrapper}>
            <StyledText color="grey">{userData.address}</StyledText>
            <PencilIcon style={styles.icon} />
          </TouchableOpacity>
        )}

        {(listOfDoctorsState || appointmentState) && (
          <View style={styles.adressButtonWrapper}>
            <StyledText color="grey">{userData.address}</StyledText>
          </View>
        )}

        <WelcomeHeader />

        {listOfDoctorsState && (
          <ListOfDoctors
            filter={filter}
            handleViewMoreDetails={handleViewMoreDetails}
            setFilterModal={setFilterModal}
            especialidad={especialidad}
          />
        )}

        {appointmentState && (
          <AppointmentConfirmed
            setAppointmentState={setAppointmentState}
            setDoctorDetails={setDoctorDetails}
            doctor={doctorDetails}
          />
        )}
      </View>

      {!listOfDoctorsState && !appointmentState && (
        <View style={styles.buttonWrapper}>
          <StyledButton variant="primary" onPress={setOpenMedicModal}>
            Solicitar medico
          </StyledButton>
        </View>
      )}
      <FooterPatient current="home" />

      <StyledModal
        title="Ingresar informacion medica"
        content={
          <SubmitDoctorDataModal
            control={control}
            errors={errors}
            especialidad={especialidad}
            grupoFamiliar={grupoFamiliar}
            setEspecialidadModal={setEspecialidadModal}
            setGrupoFamiliarModal={setGrupoFamiliarModal}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            setOpenMedicModal={setOpenMedicModal}
          />
        }
        open={openMedicModal}
      />
      <StyledModal
        title="Cambiar direccion"
        content={
          <ChangeAdressModal
            userData={userData}
            addressPreview={addressPreview}
            setAddressPreview={setAddressPreview}
            onSubmitAdress={onSubmitAdress}
            setOpenModal={setOpenModal}
          />
        }
        open={openModal}
      />
      <StyledModal
        title="Informacion del medico"
        content={
          <DoctorDetails
            doctor={doctorDetails}
            handleRequestDoctor={handleRequestDoctor}
            setDoctorDetailsModal={setDoctorDetailsModal}
          />
        }
        open={doctorDetailsModal}
      />
      <StyledModal
        title="Calificar medico"
        content={
          <PatientReview
            doctor={doctorDetails}
            setDoctorReviewModal={setDoctorReviewModal}
          />
        }
        open={doctorReviewModal}
      />
      <DropdownSelect
        dropdownValue={especialidad}
        setDropdownValue={setEspecialidad}
        title="Seleciona una especialidad"
        options={['Kinesiologia', 'Clinico', 'Traumatologo', 'Alergista']}
        visible={especialidadModal}
        setVisible={setEspecialidadModal}
      />
      <DropdownSelect
        dropdownValue={grupoFamiliar}
        setDropdownValue={setGrupoFamiliar}
        title="Seleciona un grupoFamiliar"
        options={['Yo', 'Hijo', 'Esposo']}
        visible={grupoFamiliarModal}
        setVisible={setGrupoFamiliarModal}
      />
      <DropdownSelect
        dropdownValue={filter}
        setDropdownValue={setFilter}
        title="Seleciona un grupoFamiliar"
        options={['Precio', 'Tiempo', 'Calificacion']}
        visible={filterModal}
        setVisible={setFilterModal}
      />
      <WaitingModal visible={openWaiting} setVisible={setOpenWaiting} />
    </View>
  );
};
