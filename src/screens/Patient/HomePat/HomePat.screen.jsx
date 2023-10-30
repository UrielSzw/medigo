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
import {setUserData} from '../../../redux/user.slice';
import {styles} from './HomePat.styles';
import {WaitingModal} from '../../../components/Patient/WaitingModal/WaitingModal.component';
import {apiEspecialidades} from '../../../utils/api/userRoutes';
import {
  apiListOfDoctors,
  apiRequestDoctor,
} from '../../../utils/api/patientRoutes';
import {setSpinner} from '../../../utils/setSpinner';

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
  const [filter, setFilter] = useState('Tiempo');
  const [addressPreview, setAddressPreview] = useState(userData.direccion);
  const [listOfDoctorsState, setListOfDoctorsState] = useState(false);
  const [appointmentState, setAppointmentState] = useState(false); // Cambiar a true para evaluar vista de consulta en sesion
  const [doctorDetails, setDoctorDetails] = useState(undefined);

  const toggleModal = name => {
    setModal(prev => {
      return {...prev, [name]: !prev[name]};
    });
  };

  const onSubmitAdress = () => {
    setValue('direccion', addressPreview);
    dispatch(setUserData({direccion: addressPreview}));
    toggleModal('address');
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
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${data.direccion}&format=jsonv2`,
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

        const responseDoctors = await apiListOfDoctors(formData);

        if (responseDoctors) {
          setListOfDoctorsState(true);
          toggleModal('request');
          console.log('responseDoctors', responseDoctors);
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
    }
  };

  const handleViewMoreDetails = doctor => {
    toggleModal('doctorDetails');
    setDoctorDetails(doctor);
  };

  const handleRequestDoctor = async () => {
    try {
      setSpinner(true);
      const response = await apiRequestDoctor(doctorDetails.nroMatricula);

      if (response) {
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
    setValue('direccion', addressPreview);
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

  // LOGICA PARA EL LLAMADO CADA 20 SEGUNDOS PARA SABER SI FINALIZO LA CONSULTA
  const [running, setRunning] = useState(false);
  const handleEndOfAppointment = async () => {
    try {
      const endAppointment = 'endAppointmentEndpoint()';
      if (endAppointment === 'finalizo') {
        console.log('finalizo');
        setRunning(false);
        toggleModal('review');
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
          <ChangeAdressModal
            addressPreview={addressPreview}
            setAddressPreview={setAddressPreview}
            onSubmitAdress={onSubmitAdress}
            toggleModal={() => toggleModal('address')}
          />
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
