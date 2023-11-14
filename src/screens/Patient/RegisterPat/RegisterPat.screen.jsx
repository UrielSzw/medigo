import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  Banner,
  StyledButton,
  StyledText,
  StyledInput,
  DynamicInput,
} from '../../../components';
import {PATHS} from '../../../routes/paths';
import {MedigoLogoIcon} from '../../../assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {apiPatientRegister} from '../../../utils/api/patientRoutes';
import {setSpinner} from '../../../utils/setSpinner';
import {setModal} from '../../../utils/setModal';
import {styles} from './RegisterPat.styles';
import {formatToDate} from '../../../utils/commonMethods';

export const RegisterPat = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const formatAllDates = formData => {
    let familyGroupDates = [];

    const firstDate = formatToDate(formData.fechaNacimiento);

    if (formData.grupoFamiliar.length >= 1) {
      formData.grupoFamiliar.map(fam => {
        familyGroupDates.push({
          ...fam,
          fechaNacimiento: formatToDate(fam.fechaNacimiento),
        });
      });
    }

    return {
      ...formData,
      fechaNacimiento: firstDate,
      grupoFamiliar: familyGroupDates,
    };
  };

  const onSubmit = async data => {
    if (data) {
      try {
        setSpinner(true);

        const response = await apiPatientRegister(formatAllDates(data));

        if (!response.success) {
          setModal({
            title: 'El email escrito ya existe',
            message: 'El email ya esta en uso, intente ingresar otro email',
            show: true,
          });
        } else if (response.success) {
          navigation.navigate(PATHS.LOGIN);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setSpinner(false);
      }
    }
  };

  const handleNavigateRegister = () => {
    navigation.navigate(PATHS.REGISTER);
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Banner />
        <View style={styles.bodyTop}>
          <KeyboardAwareScrollView style={styles.inputWrapper}>
            <Controller
              control={control}
              name="nombre"
              rules={{
                required: 'El nombre es obligatorio',
              }}
              render={({field}) => (
                <StyledInput
                  field={field}
                  label="Nombre"
                  style={styles.input}
                  name="nombre"
                  error={errors.nombre?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="apellido"
              rules={{
                required: 'El apellido es obligatorio',
              }}
              render={({field}) => (
                <StyledInput
                  field={field}
                  label="Apellido"
                  style={styles.input}
                  name="apellido"
                  error={errors.apellido?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="sexo"
              rules={{
                required: 'El sexo es obligatorio',
                validate: {
                  validSex: value =>
                    ['M', 'F', 'O'].includes(value) || 'Ingresa M, F o O',
                },
              }}
              render={({field}) => (
                <StyledInput
                  field={field}
                  label="Sexo (M / F / O)"
                  style={styles.input}
                  name="sexo"
                  error={errors.sexo?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="fechaNacimiento"
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
                      currentDate.getFullYear() - 18 < year;

                    const oneHundredTwentyYearsAgo =
                      year >= currentDate.getFullYear() - 120;

                    if (eighteenYearsAgo) {
                      return 'Debe ser mayor de 18 años';
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
                  field={field}
                  label="Fecha de nacimiento (DD-MM-YYYY)"
                  style={styles.input}
                  name="fechaNacimiento"
                  error={errors.fechaNacimiento?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="username"
              rules={{
                required: 'El correo electrónico es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              }}
              render={({field}) => (
                <StyledInput
                  label="Email"
                  style={styles.input}
                  field={field}
                  name="username"
                  error={errors.username?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              }}
              render={({field}) => (
                <StyledInput
                  label="Contraseña"
                  style={styles.input}
                  secureTextEntry
                  field={field}
                  name="password"
                  error={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="telefono"
              rules={{
                required: 'El teléfono es obligatorio',
                pattern: {
                  value: /^[0-9]{9,10}$/,
                  message: 'Número de teléfono inválido',
                },
              }}
              render={({field}) => (
                <StyledInput
                  label="Teléfono"
                  keyboardType="numeric"
                  style={styles.input}
                  field={field}
                  name="telefono"
                  error={errors.telefono?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="dni"
              rules={{
                required: 'El DNI es obligatorio',
                pattern: {
                  value: /^\d{8}$/,
                  message: 'DNI inválido (debe contener 8 dígitos)',
                },
              }}
              render={({field}) => (
                <StyledInput
                  keyboardType="numeric"
                  label="DNI"
                  style={styles.input}
                  field={field}
                  name="dni"
                  error={errors.dni?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="direccion"
              rules={{
                required: 'La dirección es obligatoria',
                validate: address => {
                  const regex = /^(?=.*[a-zA-Z])(?=.*\d).+/;
                  const isValid = regex.test(address);
                  const hasRightAv = /avda|avenida/i.test(address);

                  if (!isValid) {
                    return 'La dirección debe contener calle y altura';
                  }

                  if (hasRightAv) {
                    return 'La avenida debe escribirse como "Av" o "Av."';
                  }

                  return true;
                },
              }}
              render={({field}) => (
                <StyledInput
                  label="Dirección"
                  style={styles.input}
                  field={field}
                  name="direccion"
                  error={errors.direccion?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="piso"
              render={({field}) => (
                <StyledInput
                  error={errors.piso?.message}
                  label="Piso (opcional)"
                  style={styles.input}
                  field={field}
                  name="piso"
                />
              )}
            />

            <Controller
              control={control}
              name="departamento"
              render={({field}) => (
                <StyledInput
                  error={errors.departamento?.message}
                  label="Departamento (opcional)"
                  style={styles.input}
                  field={field}
                  name="departamento"
                />
              )}
            />

            <Controller
              control={control}
              name="ciudad"
              rules={{
                required: 'La ciudad es obligatoria',
              }}
              render={({field}) => (
                <StyledInput
                  label="Ciudad"
                  style={styles.input}
                  field={field}
                  name="ciudad"
                  error={errors.ciudad?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="codigoPostal"
              rules={{
                required: 'El codigo postal es obligatorio',
              }}
              render={({field}) => (
                <StyledInput
                  label="Codigo postal"
                  keyboardType="numeric"
                  style={styles.input}
                  field={field}
                  name="codigoPostal"
                  error={errors.codigoPostal?.message}
                />
              )}
            />
            <StyledText>Miembros del grupo familiar</StyledText>
            <DynamicInput errors={errors} control={control} />
            <View style={styles.body}>
              <StyledButton
                style={styles.principalButton}
                onPress={handleSubmit(onSubmit)}>
                Registrarse
              </StyledButton>
              <TouchableOpacity onPress={handleNavigateRegister}>
                <StyledText color="blue">Volver</StyledText>
              </TouchableOpacity>
              <MedigoLogoIcon style={styles.logo} />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );
};
