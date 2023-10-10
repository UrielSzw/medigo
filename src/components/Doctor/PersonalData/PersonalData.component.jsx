import React from 'react';
import {View} from 'react-native';
import {
  StyledButton,
  StyledText,
} from '../..';
import {PersonalDataIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './PersonalData.styles';

export const PersonalData = ({
    navigation,
    dni,
    telefono,
    especialidades,
    precio,
    nroMatricula,
    radioDeAccion
}) => {
  const handleBackActivity = () => {
    // Go Back
  };

  return (
      <View style={styles.infoDocContainer}>
        <View style={styles.textsContainer}>
          <View style={styles.detailsContainer}>
            <PersonalDataIcon />
            <StyledText bold>Datos personales</StyledText>
          </View>
          <StyledText color="grey" size="default" style={styles.paddLeft}>
            DNI: {dni}
          </StyledText>
          <StyledText color="grey" size="default" style={styles.paddLeft}>
            Telefono: {telefono}
          </StyledText>
          <StyledText color="grey" size="default" style={styles.paddLeft}>
            Especialidades: {especialidades.join(', ')}
          </StyledText>
          <StyledText color="grey" size="default" style={styles.paddLeft}>
            Precio: {"$" + precio}
          </StyledText>
          <StyledText color="grey" size="default" style={styles.paddLeft}>
            Numero de Matricula: {nroMatricula}
          </StyledText>
          <StyledText color="grey" size="default" style={styles.paddLeft}>
            Radio de accion: {radioDeAccion + " km"}
          </StyledText>
        </View>

        <View style={styles.buttonsContainer}>
          <StyledButton
            onPress={handleBackActivity}
            children="Modificar datos"
          />

          <StyledButton
            variant="secondary"
            onPress={handleBackActivity}
            children="Volver"
          />
        </View>
      </View>
  );
};
