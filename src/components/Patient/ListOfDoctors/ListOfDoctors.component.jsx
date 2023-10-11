import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {DoctorListItem} from '../../Doctor/DoctorListItem/DoctorListItem.component';
import {styles} from './ListOfDoctors.styles';
import {FilterIcon} from '../../../assets';

export const ListOfDoctors = ({
  especialidad,
  setFilterModal,
  handleViewMoreDetails,
}) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <View style={styles.headerWrapper}>
          <StyledText color="grey" style={styles.button}>
            {especialidad}
          </StyledText>
          <TouchableOpacity onPress={() => setFilterModal(true)}>
            <View style={styles.filterButton}>
              <FilterIcon />
              <StyledText color="grey">Filtro</StyledText>
            </View>
          </TouchableOpacity>
        </View>
        <StyledText bold size="md">
          Doctores cercanos
        </StyledText>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <DoctorListItem
          showTime
          showInfo
          category={especialidad}
          onPress={handleViewMoreDetails}
        />
        <DoctorListItem
          showTime
          showInfo
          category={especialidad}
          onPress={handleViewMoreDetails}
        />
        <DoctorListItem
          showTime
          showInfo
          category={especialidad}
          onPress={handleViewMoreDetails}
        />
      </ScrollView>
    </View>
  );
};
