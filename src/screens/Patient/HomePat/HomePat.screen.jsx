/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {
  AppointmentConfirmed,
  ChangeAdressModal,
  DoctorDetails,
  DropdownSelect,
  FooterPatient,
  ListOfDoctors,
  PatientReview,
  StyledButton,
  StyledModal,
  StyledText,
  SubmitDoctorDataModal,
  WelcomeHeader,
} from '../../../components';
import {PencilIcon} from '../../../assets';
import {WaitingModal} from '../../../components/Patient/WaitingModal/WaitingModal.component';
import {apiEspecialidades} from '../../../utils/api/userRoutes';
import {
  apiListOfDoctors,
  apiRequestDoctor,
} from '../../../utils/api/patientRoutes';
import {setSpinner} from '../../../utils/setSpinner';
import {styles} from './HomePat.styles';

export const HomePat = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: {errors},
  } = useForm();
  const {userData} = useSelector(state => state.userReducer);
  const [modal, setModal] = useState({
    filter: false,
    familyMembers: false,
    specialty: false,
    review: false,
    doctorDetails: false,
    address: false,
    request: false,
  });

  const [waiting, setWaiting] = useState(false);
  const [especialidad, setEspecialidad] = useState('Seleccione especialidad');
  const [grupoFamiliar, setGrupoFamiliar] = useState(
    'Seleccione grupo familiar',
  );
  const [listOfDoctorsData, setListOfDoctorsData] = useState([]);
  const [filter, setFilter] = useState('Tiempo');
  const [listOfDoctorsState, setListOfDoctorsState] = useState(false);
  const [appointmentState, setAppointmentState] = useState(false); // Cambiar a true para evaluar vista de consulta en sesion
  const [doctorDetails, setDoctorDetails] = useState(undefined);

  const toggleModal = name => {
    setModal(prev => {
      return {...prev, [name]: !prev[name]};
    });
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

    try {
      setSpinner(true);
      const direccionConsulta = data.direccion.replace(/\s+/g, '+');
      const ciudadConsulta = data.ciudad.replace(/\s+/g, '+');
      const codigoPostalConsulta = data.codigoPostal.replace(/\s+/g, '+');

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${direccionConsulta}+${ciudadConsulta}+${codigoPostalConsulta}&format=jsonv2`,
      );
      const locationData = await response.json();

      if (locationData && locationData.length > 0) {
        // Si se encontró una ubicación, toma la primera coincidencia
        const latitude = locationData[0].boundingbox[0];
        const longitude = locationData[0].boundingbox[2];

        const nombrePaciente = grupoFamiliar.split(' ')[0];
        const apellidoPaciente = grupoFamiliar.split(' ')[1];

        const formData = {
          sintomas: data.sintomas,
          motivo: data.motivo,
          especialidad: especialidad,
          latitud: latitude,
          longitud: longitude,
          nombre: nombrePaciente,
          apellido: apellidoPaciente,
          direccion: data.direccion,
        };

        const responseDoctors = await apiListOfDoctors(formData);

        if (responseDoctors.result) {
          console.log('responseDoctors.result', responseDoctors.result);
          setListOfDoctorsState(true);
          toggleModal('request');
          setListOfDoctorsData(responseDoctors.result);
        }
      } else {
        // No se encontró una ubicación, maneja el error o muestra un mensaje
        setError('direccion', {
          type: 'manual',
          message: 'Dirección no encontrada',
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  const handleViewMoreDetails = doctor => {
    toggleModal('doctorDetails');
    setDoctorDetails(doctor);
  };

  const handleRequestDoctor = async () => {
    try {
      setSpinner(true);
      const response = await apiRequestDoctor({
        nroMatricula: doctorDetails.nroMatricula,
      });

      if (response.state === 'solicitando medico') {
        toggleModal('doctorDetails');
        setWaiting(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  const [familyMembersOptions, setFamilyMembersOptions] = useState([]);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);

  const setModalDropdownsFamilyOptions = () => {
    let familyOptions = [];
    if (userData) {
      familyOptions.push(`${userData.nombre} ${userData.apellido}`);

      if (userData.grupoFamiliar.length > 0) {
        userData.grupoFamiliar.forEach(fam => {
          familyOptions.push(`${fam.nombre} ${fam.apellido}`);
        });
      }

      setFamilyMembersOptions(familyOptions);
    }
  };

  const setModalDropdownsSpecialtyOptions = async () => {
    try {
      const response = await apiEspecialidades();

      if (response) {
        setSpecialtyOptions(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setModalDropdownsFamilyOptions();
    setModalDropdownsSpecialtyOptions();
  }, []);

  useEffect(() => {
    if (grupoFamiliar !== 'Seleccione grupo familiar') {
      clearErrors('familyGroup');
    }
    if (especialidad !== 'Seleccione especialidad') {
      clearErrors('especialidad');
    }
  }, [grupoFamiliar, especialidad]);

  const handleEndOfAppointment = async () => {
    try {
      const endAppointment = 'endAppointmentEndpoint()';
      if (endAppointment === 'finalizo') {
        console.log('finalizo');
        toggleModal('review');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.body}>
        {!listOfDoctorsState && !appointmentState && (
          <TouchableOpacity
            onPress={() => toggleModal('address')}
            style={styles.adressButtonWrapper}>
            <StyledText color="grey">{userData.direccion}</StyledText>
            <PencilIcon style={styles.icon} />
          </TouchableOpacity>
        )}

        {(listOfDoctorsState || appointmentState) && (
          <View style={styles.adressButtonWrapper}>
            <StyledText color="grey">{userData.direccion}</StyledText>
          </View>
        )}

        <WelcomeHeader username={`${userData.nombre} ${userData.apellido}`} />

        {listOfDoctorsState && (
          <ListOfDoctors
            filter={filter}
            handleViewMoreDetails={handleViewMoreDetails}
            setFilterModal={() => toggleModal('review')}
            especialidad={especialidad}
            listOfDoctorsData={listOfDoctorsData}
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
          <StyledButton
            variant="primary"
            onPress={() => toggleModal('request')}>
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
            setEspecialidadModal={() => toggleModal('specialty')}
            setGrupoFamiliarModal={() => toggleModal('familyMembers')}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            setOpenMedicModal={() => toggleModal('request')}
          />
        }
        open={modal.request}
      />
      <StyledModal
        title="Cambiar direccion"
        content={
          <ChangeAdressModal toggleModal={() => toggleModal('address')} />
        }
        open={modal.address}
      />
      <StyledModal
        title="Informacion del medico"
        content={
          <DoctorDetails
            doctor={doctorDetails}
            handleRequestDoctor={handleRequestDoctor}
            setDoctorDetailsModal={() => toggleModal('doctorDetails')}
          />
        }
        open={modal.doctorDetails}
      />
      <StyledModal
        title="Calificar medico"
        content={
          <PatientReview
            doctor={doctorDetails}
            setDoctorReviewModal={() => toggleModal('review')}
          />
        }
        open={modal.review}
      />
      <DropdownSelect
        dropdownValue={especialidad}
        setDropdownValue={setEspecialidad}
        title="Seleciona una especialidad"
        options={specialtyOptions}
        visible={modal.specialty}
        setVisible={() => toggleModal('specialty')}
      />
      <DropdownSelect
        dropdownValue={grupoFamiliar}
        setDropdownValue={setGrupoFamiliar}
        title="Seleciona un grupoFamiliar"
        options={familyMembersOptions}
        visible={modal.familyMembers}
        setVisible={() => toggleModal('familyMembers')}
      />
      <DropdownSelect
        dropdownValue={filter}
        setDropdownValue={setFilter}
        title="Seleciona un grupoFamiliar"
        options={['Precio', 'Tiempo', 'Calificacion']}
        visible={modal.filter}
        setVisible={() => toggleModal('filter')}
      />
      <WaitingModal visible={waiting} setVisible={setWaiting} />
    </View>
  );
};
