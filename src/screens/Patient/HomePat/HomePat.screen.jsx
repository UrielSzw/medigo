/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {
  ChangeAdressModal,
  DoctorDetails,
  DoctorListItem,
  DropdownSelect,
  FooterPatient,
  ListOfDoctors,
  StyledButton,
  StyledInput,
  StyledModal,
  StyledText,
  SubmitDoctorDataModal,
  WelcomeHeader,
} from '../../../components';
import {PencilIcon} from '../../../assets';
import {setUserData} from '../../../redux/user.slice';
import {styles} from './HomePat.styles';

export const HomePat = () => {
  const {control, handleSubmit, setValue} = useForm({
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
  const [especialidad, setEspecialidad] = useState('Seleccione especialidad');
  const [especialidadModal, setEspecialidadModal] = useState(false);
  const [grupoFamiliarModal, setGrupoFamiliarModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [doctorDetailsModal, setDoctorDetailsModal] = useState(false);
  const [grupoFamiliar, setGrupoFamiliar] = useState(
    'Seleccione grupo familiar',
  );
  const [filter, setFilter] = useState('Tiempo');
  const [addressPreview, setAddressPreview] = useState(userData.address);
  const [listOfDoctorsState, setListOfDoctorsState] = useState(false);

  const onSubmitAdress = () => {
    setValue('address', addressPreview);
    dispatch(setUserData({address: addressPreview}));
    setOpenModal(false);
  };

  const onSubmit = data => {
    setValue('specialty', especialidad);
    setValue('familyGroup', grupoFamiliar);
    setListOfDoctorsState(true);
    setOpenMedicModal(false);
    console.log(data);
  };

  useEffect(() => {
    setValue('address', addressPreview);
  }, []);

  const handleViewMoreDetails = () => {
    setDoctorDetailsModal(true);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.body}>
        {!listOfDoctorsState && (
          <TouchableOpacity
            onPress={setOpenModal}
            style={styles.adressButtonWrapper}>
            <StyledText color="grey">{userData.address}</StyledText>
            <PencilIcon style={styles.icon} />
          </TouchableOpacity>
        )}

        {listOfDoctorsState && (
          <View style={styles.adressButtonWrapper}>
            <StyledText color="grey">{userData.address}</StyledText>
          </View>
        )}

        <WelcomeHeader />

        {listOfDoctorsState && (
          <ListOfDoctors
            handleViewMoreDetails={handleViewMoreDetails}
            setFilterModal={setFilterModal}
            especialidad={especialidad}
          />
        )}
      </View>

      {!listOfDoctorsState && (
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
          <DoctorDetails setDoctorDetailsModal={setDoctorDetailsModal} />
        }
        open={doctorDetailsModal}
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
    </View>
  );
};
