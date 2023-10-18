import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {DoctorListItem} from '../../Doctor/DoctorListItem/DoctorListItem.component';
import {styles} from './ListOfDoctors.styles';
import {FilterIcon} from '../../../assets';

const DOCTORS_LIST = [
  {
    time: '15',
    price: '1700',
    reviews: '(120 reseñas)',
    rating: '4,8',
    name: 'Jorge',
    category: 'Clinico',
    dni: '36985214',
  },
  {
    time: '22',
    price: '1700',
    reviews: '(10 reseñas)',
    rating: '3,5',
    name: 'Fernando ',
    category: 'Clinico',
    dni: '15486532',
  },
  {
    time: '45',
    price: '3300',
    reviews: '(1 reseñas)',
    rating: '4',
    name: 'Raul ',
    category: 'Clinico',
    dni: '23124556',
  },
  {
    time: '27',
    price: '1200',
    reviews: '(0 reseñas)',
    rating: 'n/a',
    name: 'Mariano ',
    category: 'Clinico',
    dni: '75326895',
  },
];

export const ListOfDoctors = ({
  especialidad,
  setFilterModal,
  handleViewMoreDetails,
  filter,
}) => {
  const [data, setData] = useState([]);

  const sortDoctorsList = filterParam => {
    switch (filterParam) {
      case 'Precio':
        return DOCTORS_LIST.slice().sort(
          (a, b) => parseInt(a.price, 10) - parseInt(b.price, 10),
        );
      case 'Tiempo':
        return DOCTORS_LIST.slice().sort(
          (a, b) => parseInt(a.time, 10) - parseInt(b.time, 10),
        );
      case 'Calificacion':
        return DOCTORS_LIST.slice().sort((a, b) => {
          const ratingA = a.rating === 'n/a' ? -1 : parseFloat(a.rating);
          const ratingB = b.rating === 'n/a' ? -1 : parseFloat(b.rating);
          return ratingB - ratingA;
        });
      default:
        return DOCTORS_LIST;
    }
  };

  useEffect(() => {
    setData(sortDoctorsList(filter));
  }, [filter]);

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
            name={doctor.name}
            time={doctor.time}
            price={doctor.price}
            reviews={doctor.reviews}
            rating={doctor.rating}
            category={doctor.category}
            onPress={() => handleViewMoreDetails(doctor)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
