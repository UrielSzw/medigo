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
      <View style={styles.buttonWrapper}>
        <StyledButton>Solicitar medico</StyledButton>
      </View>
      <FooterPatient />
      <StyledModal
        title="Cambiar direccion"
        content={
          <View style={styles.contentWrapper}>
            <StyledInput label="Direccion" placeholder={address} />
            <View>
              <StyledButton>Cambiar</StyledButton>
              <StyledButton variant="empty">Cancelar</StyledButton>
            </View>
          </View>
        }
        open={openModal}
      />
    </View>
  );
};
