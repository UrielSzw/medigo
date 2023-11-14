import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {ClockIcon, DefaultProfile} from '../../../assets';
import {formatTime} from '../../../utils/commonMethods';
import {styles} from './PatientRequest.styles';

export const PatientRequest = ({logo, setOpenModalDetail}) => {
  const {requestData} = useSelector(state => state.doctorReducer);

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerWrapper}>
        <StyledText size="s">Tiempo restante para aceptar:</StyledText>
        <StyledText>{requestData.fechaSeleccion}</StyledText>
      </View>
      <View style={styles.dataWrapper}>
        <View style={styles.nameWrapper}>
          {logo ? logo : <DefaultProfile />}
          <View>
            <StyledText bold color="white" size="md">
              {`${requestData.nombre} ${requestData.apellido}`}
            </StyledText>
          </View>
        </View>
        <View style={styles.timeWrapper}>
          <ClockIcon fill="#FFF" style={styles.icon} />
          <StyledText color="white">
            {formatTime(Number(requestData.tiempoLlegada))} m
          </StyledText>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <StyledButton
          style={styles.button}
          variant="empty"
          onPress={setOpenModalDetail}>
          Ver mas
        </StyledButton>
      </View>
    </View>
  );
};
