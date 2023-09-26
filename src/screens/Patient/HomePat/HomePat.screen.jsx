import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  FooterPatient,
  StyledButton,
  StyledInput,
  StyledModal,
  StyledText,
  WelcomeHeader,
} from '../../../components';
import {PencilIcon} from '../../../assets';
import {styles} from './HomePat.styles';

export const HomePat = () => {
  const address = 'Av.Corrientes 3235';

  const [openModal, setOpenModal] = useState(false);
  const [openMedicModal, setOpenMedicModal] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View>
        <TouchableOpacity
          onPress={setOpenModal}
          style={styles.adressButtonWrapper}>
          <StyledText color="grey">{address}</StyledText>
          <PencilIcon style={styles.icon} />
        </TouchableOpacity>
        <WelcomeHeader />
      </View>
      <TouchableOpacity onPress={setOpenMedicModal}>
        <View style={styles.buttonWrapper}>
          <StyledText>Solicitar medico</StyledText>
        </View>
      </TouchableOpacity>
      <FooterPatient />
      <StyledModal
        title="Ingresar informacion medica"
        content={
          <View style={styles.contentAskMedicWrapper}>
            <StyledInput label="Motivo" />
            <StyledInput label="Sintomas" />
            <StyledInput label="Especialidad" />
            <StyledInput label="Miembro del grupo familiar" />
            <StyledInput label="Direccion" />
            <View>
              <StyledButton>Ver medicos disponibles</StyledButton>
              <TouchableOpacity onPress={() => setOpenMedicModal(false)}>
                <StyledText style={styles.cancelButton} color="grey">
                  Cancelar
                </StyledText>
              </TouchableOpacity>
            </View>
          </View>
        }
        open={openMedicModal}
      />
      <StyledModal
        title="Cambiar direccion"
        content={
          <View style={styles.contentWrapper}>
            <StyledInput label="Direccion" placeholder={address} />
            <View>
              <StyledButton>Cambiar</StyledButton>
              <TouchableOpacity onPress={() => setOpenModal(false)}>
                <StyledText style={styles.cancelButton} color="grey">
                  Cancelar
                </StyledText>
              </TouchableOpacity>
            </View>
          </View>
        }
        open={openModal}
      />
    </View>
  );
};
