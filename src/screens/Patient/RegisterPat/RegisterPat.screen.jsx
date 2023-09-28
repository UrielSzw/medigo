import {TouchableOpacity, View, ScrollView} from 'react-native';
import {
  Banner,
  StyledButton,
  StyledInput,
  FlatList,
  StyledText,
  DynamicInput,
} from '../../../components';
import {styles} from './RegisterPat.styles';
import {MedigoLogoIcon} from '../../../assets';

export const RegisterPat = () => {
  return (
    <View style={styles.background}>
      <Banner />
      <View style={styles.body}>
        <ScrollView style={styles.inputWrapper}>
          <StyledInput label="Nombre completo" style={styles.input} />
          <StyledInput label="Contraseña" style={styles.input} />
          <StyledInput label="DNI" style={styles.input} />
          <StyledInput label="Telefono" style={styles.input} />
          <StyledInput label="Direccion" style={styles.input} />
          <StyledInput label="Email" style={styles.input} />
          <StyledText>Miembros del grupo familiar</StyledText>
          <DynamicInput />
        </ScrollView>
      </View>
      <View style={styles.body}>
        <StyledButton style={styles.principalButton}>Siguiente</StyledButton>
        <TouchableOpacity>
          <StyledText color="blue">Volver</StyledText>
        </TouchableOpacity>
        <MedigoLogoIcon style={styles.logo} />
      </View>
    </View>
  );
};
