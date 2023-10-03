/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {
  DropdownSelect,
  FooterPatient,
  StyledButton,
  StyledInput,
  StyledModal,
  StyledText,
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
  const [grupoFamiliar, setGrupoFamiliar] = useState(
    'Seleccione grupo familiar',
  );
  const [addressPreview, setAddressPreview] = useState(userData.address);

  const onSubmitAdress = () => {
    setValue('address', addressPreview);
    dispatch(setUserData({address: addressPreview}));
    setOpenModal(false);
  };

  const onSubmit = data => {
    setValue('specialty', especialidad);
    setValue('familyGroup', grupoFamiliar);
    console.log(data);
  };

  useEffect(() => {
    setValue('address', addressPreview);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View>
        <TouchableOpacity
          onPress={setOpenModal}
          style={styles.adressButtonWrapper}>
          <StyledText color="grey">{userData.address}</StyledText>
          <PencilIcon style={styles.icon} />
        </TouchableOpacity>
        <WelcomeHeader />
      </View>
      <View style={styles.buttonWrapper}>
        <StyledButton variant="primary" onPress={setOpenMedicModal}>
          Solicitar medico
        </StyledButton>
      </View>
      <FooterPatient current="home" />
      <StyledModal
        title="Ingresar informacion medica"
        content={
          <KeyboardAwareScrollView
            contentContainerStyle={styles.contentAskMedicWrapperScroll}>
            <Controller
              control={control}
              name="motive"
              render={({field}) => (
                <StyledInput label="Motivo" field={field} name="motive" />
              )}
            />
            <Controller
              control={control}
              name="symptoms"
              render={({field}) => (
                <StyledInput label="Sintomas" field={field} name="symptoms" />
              )}
            />
            <View>
              <StyledText>Especialidad</StyledText>
              <StyledButton
                variant="empty"
                onPress={() => setEspecialidadModal(true)}>
                {especialidad}
              </StyledButton>
            </View>

            <View>
              <StyledText>Miembro del grupo familiar</StyledText>
              <StyledButton
                variant="empty"
                onPress={() => setGrupoFamiliarModal(true)}>
                {grupoFamiliar}
              </StyledButton>
            </View>

            <Controller
              control={control}
              name="address"
              render={({field}) => (
                <StyledInput label="Direccion" field={field} name="address" />
              )}
            />
            <View style={styles.buttonsWrapper}>
              <StyledButton onPress={handleSubmit(onSubmit)}>
                Ver medicos disponibles
              </StyledButton>

              <StyledButton
                variant="empty"
                onPress={() => setOpenMedicModal(false)}>
                Cancelar
              </StyledButton>
            </View>
          </KeyboardAwareScrollView>
        }
        open={openMedicModal}
      />
      <StyledModal
        title="Cambiar direccion"
        content={
          <View style={styles.contentWrapper}>
            <StyledText>Direccion</StyledText>
            <TextInput
              placeholder={userData.address}
              value={addressPreview}
              onChangeText={text => setAddressPreview(text)}
              style={styles.input}
            />
            <View>
              <StyledButton onPress={onSubmitAdress}>Cambiar</StyledButton>

              <StyledButton variant="empty" onPress={() => setOpenModal(false)}>
                Cancelar
              </StyledButton>
            </View>
          </View>
        }
        open={openModal}
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
    </View>
  );
};
