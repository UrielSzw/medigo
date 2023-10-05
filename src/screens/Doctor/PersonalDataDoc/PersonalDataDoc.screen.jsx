import React from 'react';
import {View} from 'react-native';
import {
  FooterDoc,
  WelcomePerfilHeader,
  PersonalData
} from '../../../components';
import {PersonalDataIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './PersonalDataDoc.styles';

export const PersonalDataDoc = ({navigation}) => {
  const handleBackActivity = () => {
    // Go Back
  };

  return (
    <View style={styles.wrapper}>
      <WelcomePerfilHeader
        username="Dr.Joseph Brostito"
        email="fedepr2345@gmail.com"
      />
      <PersonalData 
        dni="1111111111" 
        telefono="121312313213" 
        especialidades={["Cardiología", "Dermatología", "Oftalmología"]}
        precio="2500" 
        nroMatricula="177777777" 
        radioDeAccion="2"
      />
      <FooterDoc current="profile" />
    </View>
  );
};
