import React, {useState} from 'react';
import {View} from 'react-native';
import {
    FooterDoc,
    StyledText,
    StyledModal,
    StyledButton,
    WelcomeHeader,
    DoctorListItem,
} from '../../../components';
import {styles} from './HomeDoc.styles';
import {PATHS} from '../../../routes/paths';

export const HomeDoc = ({navigation}) => {
    const [activo, setActivo] = useState(false);
    const [cuentaActivada, setCuentaActivada] = useState(false); 
    const [openModal, setOpenModal] = useState(false);
   

    const handleConfirmarClick = () => {
        if (cuentaActivada) {
            setCuentaActivada(false);
            setActivo(false); 
        } else {
            setCuentaActivada(true);
            setActivo(true); 
            navigation.navigate(PATHS.MAP);
        }
        closeModal();

        
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <View style={styles.wrapper}>
        <View>
            <WelcomeHeader username='Dr.Joseph Brostito'/>
        </View>
        <View style={styles.container}>
            <View style={styles.textState}>
                <StyledText size='xl' bold={true} color={activo ? 'green' : 'red'}>
                    {activo ? 'ACTIVO' : 'INACTIVO'}
                </StyledText>
            </View>
        </View>
        <View style={styles.buttonWrapper}>
            <StyledButton onPress={() => setOpenModal(true)}>
                {cuentaActivada ? 'Desactivar cuenta' : 'Activar cuenta'}
            </StyledButton>
        </View>
        <FooterDoc />
        <StyledModal
            title="¿Estas seguro que desea activar y comenzar a recibir consultas?"
            content={
            <View style={styles.contentWrapper}>
                <View>
                <StyledButton onPress={handleConfirmarClick}>Confirmar</StyledButton>
                <StyledButton onPress={closeModal} variant="empty">Cancelar</StyledButton>
                </View>
            </View>
            }
            open={openModal}
        />
        </View>
    );
};
