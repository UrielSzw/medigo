import React, {useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {
  FooterDoc,
  WelcomePerfilHeader,
  ModifyPersonalData,
} from '../../../components';
import {styles} from './ModifyPersonalData.styles';

export const ModifyPersonalDataDoc = () => {
  const {doctorData} = useSelector(state => state.doctorReducer);
  const [hideFooter, setHideFooter] = useState(false);

  return (
    <View style={styles.wrapper}>
      <WelcomePerfilHeader
        username={`${doctorData.nombre} ${doctorData.apellido}`}
        email={doctorData.username}
      />
      <ModifyPersonalData setHideFooter={setHideFooter} />
      {!hideFooter && <FooterDoc current="profile" />}
    </View>
  );
};
