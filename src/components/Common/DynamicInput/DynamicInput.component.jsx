import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {StyledText} from '../StyledText/StyledText.component';
import {StyledInput} from '../StyledInput/StyledInput.component';
import {styles} from '../DynamicInput/DynamicInput.styles';

export const DynamicInput = () => {
  const [inputFields, setInputFields] = useState([]);

  const addInputField = () => {
    setInputFields([...inputFields, {name: '', dni: ''}]);
  };

  const delField = index => {
    const updatedFields = [...inputFields];
    updatedFields.splice(index, 1);
    setInputFields(updatedFields);
  };

  const handleInputChange = (text, index, fieldName) => {
    const updatedFields = [...inputFields];
    updatedFields[index][fieldName] = text;
    setInputFields(updatedFields);
  };

  return (
    <View>
      {inputFields.map((field, index) => (
        <View key={index}>
          <View style={styles.boxIndex}>
            <StyledText color="gray"> {index + 1}.</StyledText>
            {index === inputFields.length - 1 && (
              <TouchableOpacity onPress={() => delField(index)}>
                <StyledText color="red"> - Eliminar</StyledText>
              </TouchableOpacity>
            )}
          </View>
          <StyledText>Nombre Completo</StyledText>
          <StyledInput
            value={field.name}
            onChangeText={text => handleInputChange(text, index, 'name')}
            style={{marginBottom: 10}}
          />
          <StyledText>DNI</StyledText>
          <StyledInput
            value={field.dni}
            onChangeText={text => handleInputChange(text, index, 'dni')}
            style={{marginBottom: 10}}
          />
        </View>
      ))}
      <TouchableOpacity onPress={addInputField}>
        <StyledText color="gray">+ Agregar</StyledText>
      </TouchableOpacity>
    </View>
  );
};
