import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {ClockIcon, DefaultProfile} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {formatTime} from '../../../utils/commonMethods';
import {styles} from './AcceptedPatient.styles';

export const AcceptedPatient = ({onPress}) => {
  const {requestData} = useSelector(state => state.doctorReducer);

  return (
    <View style={styles.container}>
      <View style={styles.dataWrapper}>
        <View style={styles.nameWrapper}>
          <DefaultProfile />
          <StyledText bold size="md" color="white">
            {`${requestData.nombre} ${requestData.apellido}`}
          </StyledText>
        </View>
        <View style={styles.timeWrapper}>
          <ClockIcon style={styles.icon} />
          <StyledText color="white">
            {formatTime(Number(requestData.tiempoLlegada))} m
          </StyledText>
        </View>
      </View>
      <StyledButton onPress={onPress} variant="secondary">
        Abrir ubicación
      </StyledButton>
    </View>
  );
};
