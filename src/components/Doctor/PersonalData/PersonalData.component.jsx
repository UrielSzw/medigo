import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StyledButton, StyledText} from '../..';
import {PersonalDataIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './PersonalData.styles';
import {useSelector} from 'react-redux';

export const PersonalData = () => {
  const {doctorData} = useSelector(state => state.doctorReducer);
  const navigation = useNavigation();

  const handleBackActivity = () => {
    navigation.navigate(PATHS.PERFILDOCTOR);
  };

  const handleModifyData = () => {
    navigation.navigate(PATHS.MODIFYPERSONALDATADOC);
  };

  return (
    <View style={styles.infoDocContainer}>
      <View style={styles.textsContainer}>
        <View style={styles.detailsContainer}>
          <PersonalDataIcon />
          <StyledText bold>Datos personales</StyledText>
        </View>
        <StyledText color="grey" size="default" style={styles.paddLeft}>
          DNI: {doctorData.dni}
        </StyledText>
        <StyledText color="grey" size="default" style={styles.paddLeft}>
          Fecha de nacimiento: {doctorData.fechaNacimiento}
        </StyledText>
        <StyledText color="grey" size="default" style={styles.paddLeft}>
          Sexo: {doctorData.sexo}
        </StyledText>
        <StyledText color="grey" size="default" style={styles.paddLeft}>
          Telefono: {doctorData.telefono}
        </StyledText>
        <StyledText color="grey" size="default" style={styles.paddLeft}>
          Especialidad: {doctorData.especialidad}
        </StyledText>
        <StyledText color="grey" size="default" style={styles.paddLeft}>
          Precio: {'$' + doctorData.precio}
        </StyledText>
        <StyledText color="grey" size="default" style={styles.paddLeft}>
          Numero de Matricula: {doctorData.nroMatricula}
        </StyledText>
        <StyledText color="grey" size="default" style={styles.paddLeft}>
          Radio de accion: {doctorData.radioAccion + ' km'}
        </StyledText>
      </View>

      <View style={styles.buttonsContainer}>
        <StyledButton onPress={handleModifyData} children="Modificar datos" />

        <StyledButton
          variant="secondary"
          onPress={handleBackActivity}
          children="Volver"
        />
      </View>
    </View>
  );
};
