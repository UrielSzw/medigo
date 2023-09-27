import React from 'react';

import {styles} from './SelectDoc.styles.js';
import {View} from 'react-native';
import {
  DoctorListItem,
  FooterPatient,
  StyledText,
  WelcomeHeader,
} from '../../../components';
import {FilterIcon} from '../../../assets/index.js';

export const SelectDoc = () => {
  return (
    <View style={styles.selectDocWrapper}>
      <View style={styles.selectDocContainer}>
        <StyledText style={styles.addressTop} color="grey">
          Av.Corrientes 4251
        </StyledText>
        <WelcomeHeader />
        <View style={styles.specialtyFilterContainer}>
          <StyledText color="grey" style={styles.specialty}>
            Kinesiologo
          </StyledText>
          <View style={styles.filterContainer}>
            <FilterIcon />
            <StyledText color="grey">Filtro</StyledText>
          </View>
        </View>
        <View style={styles.nearDocsContainer}>
          <StyledText bold size="md">
            Doctores cercanos
          </StyledText>
          <DoctorListItem />
          <DoctorListItem />
        </View>
      </View>
      <FooterPatient />
    </View>
  );
};
