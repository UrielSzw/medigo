import React, { useState } from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, TouchableOpacity} from 'react-native';
import {
    Banner,
    StyledButton,
    StyledInput,
    StyledText,
} from '../../../components';
import {PATHS} from '../../../routes/paths';
import {styles} from './RegisterDoc.styles';
import {MedigoLogoIcon} from '../../../assets';

export const RegisterDoc = ({navigation}) => {

    const [formData, setFormData] = useState({
        fullName: '',
        password: '',
        dni: '',
        phone: '',
        specialty: '',
        price: '',
        licenseNumber: '',
        radius: '',
        address: '',
        email: '',
    });

    const handleNavigateRegister = () => {
        navigation.navigate(PATHS.REGISTER);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <Banner />
            <View style={styles.bodyWrapper}>
                <StyledInput label="Nombre Completo" name="fullName" value={formData.fullName} onChange={handleChange} style={styles.input} />
                <StyledInput secureTextEntry label="Contraseña" name="password" value={formData.password} onChange={handleChange} style={styles.input} />
                <StyledInput label="DNI" name="dni" value={formData.dni} onChange={handleChange} style={styles.input} />
                <StyledInput label="Telefono" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} />
                <StyledInput label="Especialidad" name="specialty" value={formData.specialty} onChange={handleChange} style={styles.input} />
                <StyledInput label="Precio" name="price" value={formData.price} onChange={handleChange} style={styles.input} />
                <StyledInput label="Numero de Matricula" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} style={styles.input} />
                <StyledInput label="Radio de Accion(km)" name="radius" value={formData.radius} onChange={handleChange} style={styles.input} />
                <StyledInput label="Direccion" name="address" value={formData.address} onChange={handleChange} style={styles.input} />
                <StyledInput label="Email" name="email" value={formData.email} onChange={handleChange} style={styles.input} />
                <StyledButton onPress={handleSubmit}>Siguiente</StyledButton>
                <View style={styles.footerWrapper}>
                    <TouchableOpacity onPress={handleNavigateRegister}>
                        <StyledText color="blue">Volver</StyledText>
                    </TouchableOpacity>
                </View>
            </View>
            <MedigoLogoIcon style={styles.logo} />
        </KeyboardAwareScrollView>
    );
};
