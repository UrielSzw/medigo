import React, {useRef, useState} from 'react';
import {View, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {UserDataItem} from '../../Common/UserDataItem/UserDataItem.component';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {setSpinner} from '../../../utils/setSpinner';
import {apiUpdateNotes} from '../../../utils/api/doctorRoutes';
import {styles} from './AddNotesModal.styles';
import {setRequestData} from '../../../redux/doctor.slice';

export const AddNotesModal = ({setNotesModal}) => {
  const {requestData} = useSelector(state => state.doctorReducer);
  const dispatch = useDispatch();
  const [notes, setNotes] = useState(requestData.observacion);
  const prevNotes = useRef(notes);

  const handleCloseNotesModal = async () => {
    try {
      if (notes === prevNotes.current) {
        return setNotesModal();
      }
      setSpinner(true);

      const response = await apiUpdateNotes({
        observacion: notes,
      });

      if (response.success) {
        dispatch(setRequestData({observacion: notes}));
        setNotesModal();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <UserDataItem
        name={`${requestData.nombre} ${requestData.apellido}`}
        category="Paciente"
      />
      <View style={styles.textBox}>
        <StyledText style={styles.text}>Ingresar notas</StyledText>
        <TextInput
          multiline={true}
          style={styles.input}
          value={notes}
          onChangeText={text => setNotes(text)}
        />
      </View>
      <View style={styles.footerBox}>
        <StyledButton onPress={handleCloseNotesModal}>Cerrar</StyledButton>
      </View>
    </View>
  );
};
