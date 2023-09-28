import React from 'react';
import {View, TouchableOpacity, Alert } from 'react-native';
import {
    FooterDoc,
    StyledText,
    WelcomePerfilHeader,
} from '../../../components';
import {HelpIcon, PersonalDataIcon, ActivityIcon, NextIcon} from '../../../assets'
import {styles} from './PerfilDoc.styles';

const ProfileOption = ({ iconComponent, text, onPress }) => (
    <View style={styles.profileItem}>
        <TouchableOpacity onPress={onPress}>
            <View style={styles.option}>
                {iconComponent}
                <StyledText style={styles.optionText}>{text}</StyledText>
                <NextIcon/>
            </View>
        </TouchableOpacity>
    </View>
  );

export const PerfilDoc = () => {
    const handleActividadPress = () => {
    };
    
    const handleDatosPersonalesPress = () => {
    };
    
    const handleAyudaPress = () => {
    };
    
    return (
        <View style={styles.wrapper}>
            <WelcomePerfilHeader username='Dr.Joseph Brostito' email='fedepr2345@gmail.com' />
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                <ProfileOption
                    iconComponent={<ActivityIcon style={styles.optionIcon} />}
                    text="Actividad"
                    onPress={handleActividadPress}
                />
                <ProfileOption
                    iconComponent={<PersonalDataIcon style={styles.optionIcon} />}
                    text="Datos Personales"
                    onPress={handleDatosPersonalesPress}
                />
                <ProfileOption
                    iconComponent={<HelpIcon style={styles.optionIcon} />}
                    text="Ayuda"
                    onPress={handleAyudaPress}
                />
                </View>
            </View>
            <FooterDoc current='profile' />
        </View>
    );
};
