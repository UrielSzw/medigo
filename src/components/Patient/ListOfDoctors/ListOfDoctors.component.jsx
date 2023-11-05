/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {DoctorListItem} from '../../Doctor/DoctorListItem/DoctorListItem.component';
import {FilterIcon} from '../../../assets';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {removeRequestDetails, setUserState} from '../../../redux/user.slice';
import {styles} from './ListOfDoctors.styles';

export const ListOfDoctors = ({
  especialidad,
  setFilterModal,
  handleViewMoreDetails,
  filter,
}) => {
  const {listOfDoctorsData, avoidDoctors} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const sortDoctorsList = filterParam => {
    switch (filterParam) {
      case 'Precio':
        return listOfDoctorsData
          .slice()
          .sort((a, b) => parseInt(a.precio, 10) - parseInt(b.precio, 10));
      case 'Tiempo':
        return listOfDoctorsData
          .slice()
          .sort((a, b) => parseInt(a.tiempo, 10) - parseInt(b.tiempo, 10));
      case 'Calificacion':
        return listOfDoctorsData.slice().sort((a, b) => {
          const ratingA =
            a.valoracion === 'n/a' ? -1 : parseFloat(a.valoracion);
          const ratingB =
            b.valoracion === 'n/a' ? -1 : parseFloat(b.valoracion);
          return ratingB - ratingA;
        });
      default:
        return listOfDoctorsData;
    }
  };

  const formatTime = minutes => {
    if (minutes <= 2) {
      return '2 - 4';
    } else {
      const minutesFrom = Math.floor(minutes - minutes * 0.1);
      const minutesTo = Math.ceil(minutes + minutes * 0.1);

      return `${minutesFrom} - ${minutesTo}`;
    }
  };

  useEffect(() => {
    let dataFiltered = sortDoctorsList(filter);

    if (avoidDoctors.license.length > 0) {
      dataFiltered = dataFiltered.filter(
        dataFil => !avoidDoctors.license.includes(dataFil.nroMatricula),
      );
    }

    setData(dataFiltered);
  }, [filter, listOfDoctorsData]);

  const handleBackToStart = () => {
    dispatch(setUserState({listOfDoctorsState: false}));
    dispatch(removeRequestDetails());
  };

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
        {data.map((doctor, index) => (
          <DoctorListItem
            key={index}
            showTime
            showInfo
            name={`${doctor.nombre} ${doctor.apellido}`}
            time={formatTime(doctor.tiempo)}
            price={doctor.precio}
            reviews={doctor.resenas}
            rating={doctor.valoracion}
            category={doctor.especialidad}
            onPress={() => handleViewMoreDetails(doctor)}
          />
        ))}
        {data.length <= 0 && (
          <StyledText color="red">
            No se encuentran doctores en este momento
          </StyledText>
        )}
      </ScrollView>

      <StyledButton onPress={handleBackToStart}>Volver</StyledButton>
    </View>
  );
};
