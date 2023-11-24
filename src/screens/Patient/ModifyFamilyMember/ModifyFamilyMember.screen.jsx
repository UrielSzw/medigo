/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  FooterPatient,
  StyledButton,
  StyledInput,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {PersonalDataIcon} from '../../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {setSpinner} from '../../../utils/setSpinner';
import {useNavigation} from '@react-navigation/native';
import {PATHS} from '../../../routes/paths';
import {styles} from './ModifyFamilyMember.styles';
import {apiUpdateFamilyMember} from '../../../utils/api/patientRoutes';
import {updateFamilyMember} from '../../../redux/user.slice';
import {formatDate, formatToDate} from '../../../utils/commonMethods';

export const ModifyFamilyMember = () => {
  const {userData, familyMemberSelected} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [prevData, setPrevData] = useState({
    nombreViejo: '',
    apellidoViejo: '',
    fechaNacimientoViejo: '',
  });

  const handleBackFamilyMembers = () => {
    navigation.navigate(PATHS.FAMILYMEMBERINFO);
  };

  const onSubmit = async data => {
    try {
      setSpinner(true);

      const famToEdit = {
        ...prevData,
        fechaNacimientoViejo: formatToDate(prevData.fechaNacimientoViejo),
        nombreNuevo: data.nombre,
        apellidoNuevo: data.apellido,
        sexoNuevo: data.sexo,
        fechaNacimientoNuevo: formatToDate(data.fechaNacimiento),
      };

      const famToEditLocal = {
        ...prevData,
        nombreNuevo: data.nombre,
        apellidoNuevo: data.apellido,
        sexoNuevo: data.sexo,
        fechaNacimientoNuevo: data.fechaNacimiento,
      };

      const response = await apiUpdateFamilyMember(famToEdit);

      if (response.success) {
        dispatch(updateFamilyMember(famToEditLocal));
        handleBackFamilyMembers();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    setPrevData({
      nombreViejo: familyMemberSelected.nombre,
      apellidoViejo: familyMemberSelected.apellido,
      fechaNacimientoViejo: familyMemberSelected.fechaNacimiento,
    });
  }, []);

  return (
    <View style={styles.container}>
      <WelcomePerfilHeader
        username={`${userData.nombre} ${userData.apellido}`}
        email={userData.username}
      />
      <View style={styles.wrapper}>
        <View style={styles.wrapperTitle}>
          <PersonalDataIcon />
          <StyledText size="md" bold style={styles.wrapperTitleText}>
            Modificar miembro familiar
          </StyledText>
        </View>
        <KeyboardAwareScrollView>
          <View>
            <Controller
              control={control}
              defaultValue={familyMemberSelected.nombre}
              name="nombre"
              rules={{
                required: 'El nombre es obligatorio',
              }}
              render={({field}) => (
                <StyledInput
                  label="Nombre"
                  error={errors?.nombre?.message}
                  field={field}
                  style={{marginBottom: 10}}
                />
              )}
            />
            <Controller
              control={control}
              name="apellido"
              defaultValue={familyMemberSelected.apellido}
              rules={{
                required: 'El apellido es obligatorio',
              }}
              render={({field}) => (
                <StyledInput
                  label="Apellido"
                  error={errors?.apellido?.message}
                  field={field}
                  style={{marginBottom: 10}}
                />
              )}
            />
            <Controller
              control={control}
              name="sexo"
              defaultValue={familyMemberSelected.sexo[0].toUpperCase()}
              rules={{
                required: 'El sexo es obligatorio',
                validate: {
                  validSex: value =>
                    ['M', 'F', 'O'].includes(value) || 'Ingresa M, F o O',
                },
              }}
              render={({field}) => (
                <StyledInput
                  label="Sexo (M / F / O)"
                  error={errors?.sexo?.message}
                  field={field}
                  style={{marginBottom: 10}}
                />
              )}
            />
            <Controller
              control={control}
              name="fechaNacimiento"
              defaultValue={
                familyMemberSelected.fechaNacimiento.length > 12
                  ? formatDate(familyMemberSelected.fechaNacimiento)
                  : familyMemberSelected.fechaNacimiento
              }
              rules={{
                required: 'La fecha de nacimiento es obligatoria',
                validate: {
                  validDate: value => {
                    if (!value) {
                      return 'La fecha de nacimiento es obligatoria';
                    }
                    const datePattern = /^\d{2}-\d{2}-\d{4}$/;
                    if (!datePattern.test(value)) {
                      return 'El formato de fecha no es válido (DD-MM-YYYY)';
                    }

                    const parts = value.split('-');
                    const day = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10);
                    const year = parseInt(parts[2], 10);

                    if (
                      isNaN(day) ||
                      isNaN(month) ||
                      isNaN(year) ||
                      month < 1 ||
                      month > 12 ||
                      day < 1 ||
                      day > 31
                    ) {
                      return 'La fecha no es válida (DD-MM-YYYY)';
                    }

                    const currentDate = new Date();

                    const eighteenYearsAgo =
                      currentDate.getFullYear() - 1 < year;

                    const oneHundredTwentyYearsAgo =
                      year >= currentDate.getFullYear() - 120;

                    if (eighteenYearsAgo) {
                      return 'Debe ser mayor de 1 año';
                    }

                    if (!oneHundredTwentyYearsAgo) {
                      return 'Debe ser menor de 120 años';
                    }

                    return true;
                  },
                },
              }}
              render={({field}) => (
                <StyledInput
                  label="Fecha de nacimiento (DD-MM-YYYY)"
                  error={errors.fechaNacimiento?.message}
                  field={field}
                  style={{marginBottom: 10}}
                />
              )}
            />
          </View>
          <View style={styles.wrapperButtons}>
            <StyledButton
              children="Confirmar"
              onPress={handleSubmit(onSubmit)}
            />

            <StyledButton
              variant="secondary"
              onPress={handleBackFamilyMembers}
              children="Volver"
            />
          </View>
        </KeyboardAwareScrollView>
        <FooterPatient current="profile" />
      </View>
    </View>
  );
};
