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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const HomePat = () => {
  const address = 'Av.Corrientes 3235';

  const [openModal, setOpenModal] = useState(false);
  const [openMedicModal, setOpenMedicModal] = useState(false);

  const [medicData, setMedicData] = useState({
    motivo: '',
    sintomas: '',
    especialidad: '',
    miembroFamiliar: '',
    direccion: '',
  });

  const handleMedicDataChange = (text, name) => {
    setMedicData(prevData => ({
      ...prevData,
      [name]: text,
    }));
  };

  const handleDataSubmit = () => {
    setOpenModal(false);
  };

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
        <StyledButton variant="primary" onPress={setOpenMedicModal}>
          Solicitar medico
        </StyledButton>
      </View>
      <FooterPatient />
      <StyledModal
        title="Ingresar informacion medica"
        content={
          <KeyboardAwareScrollView
            style={styles.contentAskMedicWrapper}
            contentContainerStyle={styles.contentAskMedicWrapperScroll}>
            <StyledInput
              label="Motivo"
              onChangeText={e =>
                handleMedicDataChange(e.target.value, 'motivo')
              }
              value={medicData.motivo}
            />
            <StyledInput
              label="Sintomas"
              onChangeText={e =>
                handleMedicDataChange(e.target.value, 'sintomas')
              }
              value={medicData.sintomas}
            />
            <StyledInput
              label="Especialidad"
              onChangeText={e =>
                handleMedicDataChange(e.target.value, 'especialidad')
              }
              value={medicData.especialidad}
            />
            <StyledInput
              label="Miembro del grupo familiar"
              onChangeText={e =>
                handleMedicDataChange(e.target.value, 'miembroFamiliar')
              }
              value={medicData.miembroFamiliar}
            />
            <StyledInput
              label="Direccion"
              onChangeText={e =>
                handleMedicDataChange(e.target.value, 'direccion')
              }
              value={medicData.direccion}
            />
            <View style={styles.buttonsWrapper}>
              <StyledButton>Ver medicos disponibles</StyledButton>

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
            <StyledInput label="Direccion" placeholder={address} />
            <View>
              <StyledButton onPress={handleDataSubmit}>Cambiar</StyledButton>

              <StyledButton variant="empty" onPress={() => setOpenModal(false)}>
                Cancelar
              </StyledButton>
            </View>
          </View>
        }
        open={openModal}
      />
    </View>
  );
};
