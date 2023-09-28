import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './HomePat.styles';

export const HomePat = () => {
  const address = 'Av.Corrientes 3235';

  const [openModal, setOpenModal] = useState(false);
  const [openMedicModal, setOpenMedicModal] = useState(false);
  const [especialidad, setEspecialidad] = useState('Seleccione especialidad');
  const [especialidadModal, setEspecialidadModal] = useState(false);
  const [grupoFamiliarModal, setGrupoFamiliarModal] = useState(false);
  const [grupoFamiliar, setGrupoFamiliar] = useState(
    'Seleccione grupo familiar',
  );

  const [medicData, setMedicData] = useState({
    motivo: '',
    sintomas: '',
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
