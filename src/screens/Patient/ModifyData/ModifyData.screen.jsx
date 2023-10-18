import React from 'react';
import {View} from 'react-native';
import {
  FooterPatient,
  StyledButton,
  StyledInput,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {PersonalDataIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './ModifyData.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Controller, useForm} from 'react-hook-form';

export const ModifyData = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleBackPersonalData = () => {
    navigation.navigate(PATHS.PERSONALDATA);
  };

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.docInfoPatWrapper}>
        <WelcomePerfilHeader username="Joe Doe" email="joedoe@gmail.com" />
        <View style={styles.infoDocContainer}>
          <View style={styles.textsContainer}>
            <View style={styles.detailsContainer}>
              <PersonalDataIcon />
              <StyledText bold>Datos personales</StyledText>
            </View>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'El correo electrónico es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              }}
              render={({field}) => (
                <StyledInput
                  field={field}
                  name="email"
                  style={styles.inputStyle}
                  label="Email"
                  placeholder="joedoe@gmail.com"
                  error={errors.email?.message}
                />
              )}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <StyledButton
              onPress={handleSubmit(onSubmit)}
              children="Confirmar"
            />

            <StyledButton
              variant="secondary"
              onPress={handleBackPersonalData}
              children="Volver"
            />
          </View>
        </View>
        <FooterPatient current="profile" />
      </View>
    </KeyboardAwareScrollView>
  );
};
