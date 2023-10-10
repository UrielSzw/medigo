import React from 'react';
import {View, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  StyledButton,
  StyledText, 
  StyledInput,
} from '../..';
import {PersonalDataIcon} from '../../../assets';
import {styles} from './ModifyPersonalData.styles';

export const ModifyPersonalData = ({
    navigation,
}) => {
    const telefono="121312313213",
        especialidades="Cardiología, Dermatología, ...",
        precio="2500",
        nroMatricula="177777777" ,
        radioDeAccion="2";

  const {control, handleSubmit} = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  const handleBackActivity = () => {
    // Go Back
  };

  return (
      <View style={styles.infoDocContainer}>
          <View style={styles.detailsContainer}>
            <PersonalDataIcon />
            <StyledText bold>Datos personales</StyledText>
          </View>
          <View style={styles.body}>
            <ScrollView style={styles.inputWrapper}>
                <Controller
                    control={control}
                    name="telefono"
                    render={({field}) => (
                    <StyledInput
                        field={field}
                        label= "Telefono"
                        style={styles.input}
                        placeholder={telefono}
                        name="telefono"
                    />
                    )}
                />
                <Controller
                    control={control}
                    name="especialidades"
                    render={({field}) => (
                    <StyledInput
                        field={field}
                        label= "Especialidades"
                        style={styles.input}
                        placeholder={especialidades}
                        name="especialidades"
                    />
                    )}
                />
                <Controller
                    control={control}
                    name="dni"
                    render={({field}) => (
                    <StyledInput
                        field={field}
                        label= "Telefono"
                        style={styles.input}
                        placeholder={telefono}
                        name="dni"
                    />
                    )}
                />
                <Controller
                    control={control}
                    name="precio"
                    render={({field}) => (
                    <StyledInput
                        field={field}
                        label= "Precio"
                        style={styles.input}
                        placeholder={"$" + precio}
                        name="precio"
                    />
                    )}
                />
                <Controller
                    control={control}
                    name="nroMatricula"
                    render={({field}) => (
                    <StyledInput
                        field={field}
                        label= "Numero de Matricula"
                        style={styles.input}
                        placeholder={nroMatricula}
                        name="nroMatricula"
                    />
                    )}
                />
                <Controller
                    control={control}
                    name="radioDeAccion"
                    render={({field}) => (
                    <StyledInput
                        field={field}
                        label= "Radio de Accion (km)"
                        style={styles.input}
                        placeholder={radioDeAccion + " km"}
                        name="radioDeAccion"
                    />
                    )}
                />
            </ScrollView>
          </View>

        <View style={styles.buttonsContainer}>
          <StyledButton
            onPress={handleSubmit(onSubmit)}
            children="Confirmar"
          />

          <StyledButton
            variant="secondary"
            onPress={handleBackActivity}
            children="Volver"
          />
        </View>
      </View>
  );
};
