/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  DynamicInput,
  FooterPatient,
  StyledButton,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {PersonalDataIcon} from '../../../assets';
import {styles} from './ModifyFamily.styles';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {setSpinner} from '../../../utils/setSpinner';
import {useNavigation} from '@react-navigation/native';
import {PATHS} from '../../../routes/paths';
import {apiPatientUpdate} from '../../../utils/api/patientRoutes';
import {setUserData} from '../../../redux/user.slice';

export const ModifyFamily = () => {
  const {userData} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleBackFamilyMembers = () => {
    navigation.navigate(PATHS.FAMILYMEMBERS);
  };

  const onSubmit = async data => {
    try {
      setSpinner(true);
      const newFamilyMembers = [
        ...userData.grupoFamiliar,
        ...data.grupoFamiliar,
      ];

      //   const response = await apiPatientUpdate({
      //     grupoFamiliar: newFamilyMembers,
      //   });

      const response = true;

      if (response) {
        dispatch(
          setUserData({
            grupoFamiliar: newFamilyMembers,
          }),
        );
        handleBackFamilyMembers();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{paddingTop: 5}}>
      <WelcomePerfilHeader
        username={`${userData.nombre} ${userData.apellido}`}
        email={userData.username}
      />
      <View style={styles.wrapper}>
        <View style={styles.wrapperTitle}>
          <PersonalDataIcon />
          <StyledText bold>Datos personales del grupo familiar</StyledText>
        </View>
        <StyledText>Miembros del grupo familiar</StyledText>
        <ScrollView>
          <DynamicInput errors={errors} control={control} />
        </ScrollView>
        <View style={styles.wrapperButtons}>
          <StyledButton children="Confirmar" onPress={handleSubmit(onSubmit)} />

          <StyledButton
            variant="secondary"
            onPress={handleBackFamilyMembers}
            children="Volver"
          />
        </View>
        <FooterPatient current="profile" />
      </View>
    </KeyboardAwareScrollView>
  );
};
