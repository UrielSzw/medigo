import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {ClockIcon, DefaultProfile} from '../../../assets';
import {styles} from './AppointmentConfirmed.styles';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';

export const AppointmentConfirmed = ({
  logo,
  name = 'Doctor',
  category = 'Clinico',
  time = '15',
}) => {
  const [count, setCount] = useState(120);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (count <= 0) {
      setDisabled(true);
    } else {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [count]);

  return (
    <View style={styles.container}>
      <View>
        <StyledText size="md" bold>
          Doctor en camino
        </StyledText>

        <View style={styles.wrapper}>
          <View style={styles.dataWrapper}>
            {logo ? logo : <DefaultProfile />}
            <View>
              <StyledText color="white" bold size="md">
                {name}
              </StyledText>
              <StyledText color="white">{category}</StyledText>
            </View>
          </View>
          <View style={styles.time}>
            <ClockIcon fill="#FFF" style={styles.icon} />
            <StyledText color="white">{time} m</StyledText>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <StyledText color="grey">
          Tiempo restante para cancelar: 2 minutos
        </StyledText>
        <StyledButton disabled={disabled} variant="warning">
          Cancelar
        </StyledButton>
      </View>
    </View>
  );
};
