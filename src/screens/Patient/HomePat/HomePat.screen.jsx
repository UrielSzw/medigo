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
  } = useForm({
    address: '',
    motive: '',
    symptoms: '',
    specialty: '',
    familyGroup: '',
  });
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
  const [doctorReviewModal, setDoctorReviewModal] = useState(false);
  const [grupoFamiliar, setGrupoFamiliar] = useState(
    'Seleccione grupo familiar',
  );
  const [filter, setFilter] = useState('Tiempo');
  const [addressPreview, setAddressPreview] = useState(userData.address);
  const [listOfDoctorsState, setListOfDoctorsState] = useState(false);
  const [appointmentState, setAppointmentState] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(undefined);

  const onSubmitAdress = () => {
    setValue('address', addressPreview);
    dispatch(setUserData({address: addressPreview}));
    setOpenModal(false);
  };

  const onSubmit = data => {
    if (especialidad === 'Seleccione especialidad') {
      setError('specialty', {
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

    setValue('specialty', especialidad);
    setValue('familyGroup', grupoFamiliar);
    setListOfDoctorsState(true);
    setOpenMedicModal(false);
    console.log(data, especialidad, grupoFamiliar);
  };

  useEffect(() => {
    setValue('address', addressPreview);
  }, []);

  const handleViewMoreDetails = doctor => {
    setDoctorDetails(doctor);
    setDoctorDetailsModal(true);
  };

  useEffect(() => {
    if (grupoFamiliar !== 'Seleccione grupo familiar') {
      clearErrors('familyGroup');
    }
    if (especialidad !== 'Seleccione especialidad') {
      clearErrors('specialty');
    }
  }, [grupoFamiliar, especialidad]);

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

        {listOfDoctorsState ||
          (appointmentState && (
            <View style={styles.adressButtonWrapper}>
              <StyledText color="grey">{userData.address}</StyledText>
            </View>
          ))}

        <WelcomeHeader />

        {listOfDoctorsState && (
          <ListOfDoctors
            filter={filter}
            handleViewMoreDetails={handleViewMoreDetails}
            setFilterModal={setFilterModal}
            especialidad={especialidad}
          />
        )}

        {appointmentState && <AppointmentConfirmed doctor={doctorDetails} />}
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
            setOpenWaiting={setOpenWaiting}
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
