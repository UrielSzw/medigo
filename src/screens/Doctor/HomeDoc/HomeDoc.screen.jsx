import React, {useState} from 'react';
import {View} from 'react-native';
import {
    FooterDoc,
    StyledText,
    StyledModal,
    StyledButton,
    WelcomeHeader,
} from '../../../components';
import {styles} from './HomeDoc.styles';

export const HomeDoc = () => {
    const inactivo = "INACTIVO";

    const [openModal, setOpenModal] = useState(false);
        
    return (
        <View style={styles.wrapper}>
        <View>
            <WelcomeHeader username='Dr.Joseph Brostito'/>
        </View>
        <View style={styles.container}>
            <View style={styles.textState}>
                <StyledText size='xl' bold={true} color="red">{inactivo}</StyledText>
            </View>
        </View>
        <View style={styles.buttonWrapper}>
            <StyledButton onPress={() => setOpenModal(true)}>Activar cuenta</StyledButton>
        </View>
        <FooterDoc />
        <StyledModal
            title="¿Estas seguro que desea activar y comenzar a recibir consultas?"
            content={
            <View style={styles.contentWrapper}>
                <View>
                <StyledButton>Confirmar</StyledButton>
                <StyledButton variant="empty">Cancelar</StyledButton>
                </View>
            </View>
            }
            open={openModal}
        />
        </View>
    );
};
