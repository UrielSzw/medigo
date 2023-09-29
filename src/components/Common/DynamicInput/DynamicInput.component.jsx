/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Controller, useFieldArray} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {StyledInput} from '../StyledInput/StyledInput.component';
import {StyledText} from '../StyledText/StyledText.component';
import {styles} from '../DynamicInput/DynamicInput.styles';

export const DynamicInput = ({control}) => {
  const {append, fields, remove} = useFieldArray({
    control: control,
    name: 'family',
  });

  const addInputField = () => {
    append({name: '', dni: ''});
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
          <StyledText>Nombre Completo</StyledText>
          <Controller
            control={control}
            name={`family[${index}].name`}
            render={({field}) => (
              <StyledInput field={field} style={{marginBottom: 10}} />
            )}
          />
          <StyledText>DNI</StyledText>
          <Controller
            control={control}
            name={`family[${index}].dni`}
            render={({field}) => (
              <StyledInput field={field} style={{marginBottom: 10}} />
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
