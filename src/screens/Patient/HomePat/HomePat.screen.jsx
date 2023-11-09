/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
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
import {calculateTimeDifference} from '../../../utils/commonMethods';
import {
  setDoctorDetails,
  setListOfDoctorsData,
  setRequestDetails,
  setUserState,
  toggleUserModal,
} from '../../../redux/user.slice';
import {setEspecialidades} from '../../../redux/common.slice';
import {styles} from './HomePat.styles';
import {setModal} from '../../../utils/setModal';

export const HomePat = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    reset,
    formState: {errors},
  } = useForm();
  const {userData, userState, doctorDetails, requestDetails, userModals} =
    useSelector(state => state.userReducer);
  const {especialidades} = useSelector(state => state.commonReducer);
  const dispatch = useDispatch();

  const [waiting, setWaiting] = useState(false);
  const [especialidad, setEspecialidad] = useState('Seleccione especialidad');
  const [grupoFamiliar, setGrupoFamiliar] = useState(
    'Seleccione grupo familiar',
  );
  // const [listOfDoctorsData, setListOfDoctorsData] = useState([]);
  const [filter, setFilter] = useState('Tiempo');
  // const [doctorDetails, setDoctorDetails] = useState(undefined);

  const toggleModal = name => {
    dispatch(toggleUserModal(name));
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
        const latitude = locationData[0].lat;
        const longitude = locationData[0].lon;

        if (!latitude || !longitude) {
          setModal({
            title: 'Direccion no encontrada',
            message:
              'La direccion ingresada es invalida, revisa los datos y volve a intentar',
            show: true,
          });
          return;
        }

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

        console.log('formData', formData);

        dispatch(setRequestDetails(formData));
        const responseDoctors = await apiListOfDoctors(formData);

        if (responseDoctors.result) {
          console.log('responseDoctors.result', responseDoctors.result);
          dispatch(setUserState({listOfDoctorsState: true}));
          toggleModal('request');
          dispatch(setListOfDoctorsData(responseDoctors.result));
        }
      } else {
        setModal({
          title: 'Direccion no encontrada',
          message:
            'La direccion ingresada es invalida, revisa los datos y volve a intentar',
          show: true,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setSpinner(false);
    }
  };

  const handleViewMoreDetails = doctor => {
    dispatch(setDoctorDetails(doctor));
    toggleModal('doctorDetails');
  };

  const [waitingTime, setWaitingTime] = useState(0);

  const handleRequestDoctor = async () => {
    try {
      setSpinner(true);
      console.log('doctorDetails.nroMatricula', {
        nroMatricula: doctorDetails.nroMatricula,
        tiempoLLegada: doctorDetails.tiempo,
      });
      const response = await apiRequestDoctor({
        nroMatricula: doctorDetails.nroMatricula,
        tiempoLLegada: doctorDetails.tiempo,
      });
      console.log('response', response);

      if (response.estado === 'solicitando medico') {
        toggleModal('doctorDetails');
        console.log('solicitando medico', response.estado);
        console.log('response.hora', response.hora);
        setWaitingTime(calculateTimeDifference(response.hora));
        setWaiting(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  const [familyMembersOptions, setFamilyMembersOptions] = useState([]);

  const setModalDropdownsFamilyOptions = () => {
    let familyOptions = [];

    if (userData.grupoFamiliar.length > 0) {
      userData.grupoFamiliar.forEach(fam => {
        familyOptions.push(`${fam.nombre} ${fam.apellido}`);
      });
    }

    if (familyOptions.length === 1) {
      setGrupoFamiliar(familyOptions[0]);
    }

    setFamilyMembersOptions(familyOptions);
  };

  useEffect(() => {
    setModalDropdownsFamilyOptions();
    if (especialidades.length === 0) {
      const setModalDropdownsSpecialtyOptions = async () => {
        try {
          const response = await apiEspecialidades();

          if (response) {
            dispatch(setEspecialidades(response));
          }
        } catch (e) {
          console.log(e);
        }
      };

      setModalDropdownsSpecialtyOptions();
    }
  }, []);

  useEffect(() => {
    if (grupoFamiliar !== 'Seleccione grupo familiar') {
      clearErrors('familyGroup');
    }
    if (especialidad !== 'Seleccione especialidad') {
      clearErrors('especialidad');
    }
  }, [grupoFamiliar, especialidad]);

  useEffect(() => {
    setModalDropdownsFamilyOptions();
  }, [userData.grupoFamiliar]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.body}>
        {!userState.listOfDoctorsState && !userState.appointmentState && (
          <TouchableOpacity
            onPress={() => toggleModal('address')}
            style={styles.adressButtonWrapper}>
            <StyledText color="grey">{userData.direccion}</StyledText>
            <PencilIcon style={styles.icon} />
          </TouchableOpacity>
        )}

        {(userState.listOfDoctorsState || userState.appointmentState) && (
          <View style={styles.adressButtonWrapper}>
            <StyledText color="grey">{requestDetails.direccion}</StyledText>
          </View>
        )}

        <WelcomeHeader username={`${userData.nombre} ${userData.apellido}`} />

        {userState.listOfDoctorsState && (
          <ListOfDoctors
            filter={filter}
            handleViewMoreDetails={handleViewMoreDetails}
            setFilterModal={() => toggleModal('filter')}
            especialidad={especialidad}
          />
        )}

        {userState.appointmentState && (
          <AppointmentConfirmed
            setDoctorReviewModal={() => toggleModal('review')}
          />
        )}
      </View>

      {!userState.listOfDoctorsState && !userState.appointmentState && (
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
            familyMembersOptions={familyMembersOptions}
            setValue={setValue}
          />
        }
        open={userModals.request}
      />
      <StyledModal
        title="Cambiar direccion"
        content={
          <ChangeAdressModal toggleModal={() => toggleModal('address')} />
        }
        open={userModals.address}
      />
      <StyledModal
        title="Informacion del medico"
        content={
          <DoctorDetails
            handleRequestDoctor={handleRequestDoctor}
            setDoctorDetailsModal={() => toggleModal('doctorDetails')}
          />
        }
        open={userModals.doctorDetails}
      />
      <StyledModal
        title="Calificar medico"
        content={
          <PatientReview setDoctorReviewModal={() => toggleModal('review')} />
        }
        open={userModals.review}
      />
      <DropdownSelect
        dropdownValue={especialidad}
        setDropdownValue={setEspecialidad}
        title="Seleciona una especialidad"
        options={especialidades}
        visible={userModals.specialty}
        setVisible={() => toggleModal('specialty')}
      />
      <DropdownSelect
        dropdownValue={grupoFamiliar}
        setDropdownValue={setGrupoFamiliar}
        title="Seleciona un grupoFamiliar"
        options={familyMembersOptions}
        visible={userModals.familyMembers}
        setVisible={() => toggleModal('familyMembers')}
      />
      <DropdownSelect
        dropdownValue={filter}
        setDropdownValue={setFilter}
        title="Seleciona un grupoFamiliar"
        options={['Precio', 'Tiempo', 'Calificacion']}
        visible={userModals.filter}
        setVisible={() => toggleModal('filter')}
      />
      <WaitingModal
        visible={waiting}
        setVisible={setWaiting}
        countNumber={waitingTime}
      />
    </View>
  );
};
