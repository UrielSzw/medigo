import React from 'react';
import {View} from 'react-native';
import {StyledText} from '../StyledText/StyledText.component';
import {styles} from './StyledModal.styles';
import {StyledButton} from '../StyledButton/StyledButton.component';

const DefaultContent = () => {
  return (
    <View>
      <StyledText style={styles.defaultText}>Esto es un modal</StyledText>
      <StyledButton>Cerrar modal</StyledButton>
    </View>
  );
};

export const StyledModal = ({title = 'Titulo del modal', content, open}) => {
  return (
    <>
      {open && (
        <View style={styles.background}>
          <View style={styles.wrapper}>
            <View style={styles.header}>
              <StyledText size="md" color="white">
                {title}
              </StyledText>
            </View>
            <View style={styles.body}>
              {content ? content : <DefaultContent />}
            </View>
          </View>
        </View>
      )}
    </>
  );
};
