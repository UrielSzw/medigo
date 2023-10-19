/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Controller, useFieldArray} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {StyledInput} from '../StyledInput/StyledInput.component';
import {StyledText} from '../StyledText/StyledText.component';
import {styles} from '../DynamicInput/DynamicInput.styles';

export const DynamicInput = ({control, errors}) => {
  const {append, fields, remove} = useFieldArray({
    control: control,
    name: 'grupoFamiliar',
  });

  const addInputField = () => {
    append({nombre: '', apellido: '', sexo: '', fechaNacimiento: ''});
  };

  const delField = index => {
    remove(index);
  };

  return (
    <View>
      {fields.map((fie, index) => (
        <View key={fie.id}>
          <View style={styles.boxIndex}>
            <StyledText color="gray"> {index + 1}.</StyledText>
            {index === fields.length - 1 && (
              <TouchableOpacity onPress={() => delField(index)}>
                <StyledText color="red"> - Eliminar</StyledText>
              </TouchableOpacity>
            )}
          </View>
          <Controller
            control={control}
            name={`grupoFamiliar[${index}].nombre`}
            rules={{
              required: 'El nombre es obligatorio',
            }}
            render={({field}) => (
              <StyledInput
                label="Nombre"
                error={
                  errors.grupoFamiliar
                    ? errors?.grupoFamiliar[index]?.nombre?.message
                    : null
                }
                field={field}
                style={{marginBottom: 10}}
              />
            )}
          />
          <Controller
            control={control}
            name={`grupoFamiliar[${index}].apellido`}
            rules={{
              required: 'El apellido es obligatorio',
            }}
            render={({field}) => (
              <StyledInput
                label="Apellido"
                error={
                  errors.grupoFamiliar
                    ? errors?.grupoFamiliar[index]?.apellido?.message
                    : null
                }
                field={field}
                style={{marginBottom: 10}}
              />
            )}
          />
          <Controller
            control={control}
            name={`grupoFamiliar[${index}].sexo`}
            rules={{
              required: 'El sexo es obligatorio',
              validate: {
                validSex: value =>
                  ['M', 'F', 'O'].includes(value) || 'Ingresa M, F o O',
              },
            }}
            render={({field}) => (
              <StyledInput
                label="Sexo (M / F / O)"
                error={
                  errors.grupoFamiliar
                    ? errors?.grupoFamiliar[index]?.sexo?.message
                    : null
                }
                field={field}
                style={{marginBottom: 10}}
              />
            )}
          />
          <Controller
            control={control}
            name={`grupoFamiliar[${index}].fechaNacimiento`}
            rules={{
              required: 'La fecha de nacimiento es obligatoria',
              validate: {
                validDate: value => {
                  if (!value) {
                    return true;
                  }
                  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
                  if (!datePattern.test(value)) {
                    return 'El formato de fecha no es válido (YYYY-MM-DD)';
                  }
                  return true;
                },
              },
            }}
            render={({field}) => (
              <StyledInput
                label="Fecha de nacimiento (YYYY-MM-DD)"
                error={
                  errors.grupoFamiliar
                    ? errors?.grupoFamiliar[index]?.fechaNacimiento?.message
                    : null
                }
                field={field}
                style={{marginBottom: 10}}
              />
            )}
          />
        </View>
      ))}
      <TouchableOpacity onPress={addInputField}>
        <StyledText color="gray">+ Agregar</StyledText>
      </TouchableOpacity>
    </View>
  );
};
