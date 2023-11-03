/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {DoctorListItem} from '../../Doctor/DoctorListItem/DoctorListItem.component';
import {FilterIcon} from '../../../assets';
import {styles} from './ListOfDoctors.styles';

// const DOCTORS_LIST = [
//   {
//     nroMatricula: '36985214',
//     nombre: 'Jorge',
//     apellido: 'ApellidoJorge',
//     especialidad: 'Clinico',
//     tiempo: '15',
//     precio: '1700',
//     valoracion: '4,8',
//     resenas: '(120 reseñas)',
//     comentarios: [],
//   },
//   {
//     nroMatricula: '15486532',
//     nombre: 'Fernando',
//     apellido: 'ApellidoFernando',
//     especialidad: 'Clinico',
//     tiempo: '22',
//     precio: '1700',
//     valoracion: '3,5',
//     resenas: '(10 reseñas)',
//     comentarios: [],
//   },
//   {
//     nroMatricula: '23124556',
//     nombre: 'Raul',
//     apellido: 'ApellidoRaul',
//     especialidad: 'Clinico',
//     tiempo: '45',
//     precio: '3300',
//     valoracion: '4',
//     resenas: '(1 reseñas)',
//     comentarios: [],
//   },
//   {
//     nroMatricula: '75326895',
//     nombre: 'Mariano',
//     apellido: 'ApellidoMariano',
//     especialidad: 'Clinico',
//     tiempo: '27',
//     precio: '1200',
//     valoracion: 'n/a',
//     resenas: '(0 reseñas)',
//     comentarios: [],
//   },
// ];

export const ListOfDoctors = ({
  especialidad,
  setFilterModal,
  handleViewMoreDetails,
  filter,
}) => {
  const {listOfDoctorsData, avoidDoctors} = useSelector(
    state => state.userReducer,
  );
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

  useEffect(() => {
    let dataFiltered = sortDoctorsList(filter);

    if (avoidDoctors.length > 0) {
      dataFiltered = dataFiltered.filter(
        dataFil => !avoidDoctors.includes(dataFil.nroMatricula),
      );
    }

    setData(dataFiltered);
  }, [filter, listOfDoctorsData]);

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
            time={doctor.tiempo}
            price={doctor.precio}
            reviews={doctor.resenas}
            rating={doctor.valoracion}
            category={doctor.especialidad}
            onPress={() => handleViewMoreDetails(doctor)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
