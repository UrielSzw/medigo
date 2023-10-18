import React from 'react';
import {View, TextInput} from 'react-native';
import {UserDataItem} from '../../Common/UserDataItem/UserDataItem.component';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {styles} from './AddNotesModal.styles';

export const AddNotesModal = ({setNotesModal}) => {
  const handleCloseNotesModal = () => {
    setNotesModal(false);
  };

  return (
    <View style={styles.wrapper}>
      <UserDataItem name="Jose" category="Paciente" />
      <View style={styles.textBox}>
        <StyledText style={styles.text}>Ingresar notas</StyledText>
        <TextInput multiline={true} style={styles.input} />
      </View>
      <View style={styles.footerBox}>
        <StyledButton onPress={handleCloseNotesModal}>Cerrar</StyledButton>
      </View>
    </View>
  );
};
