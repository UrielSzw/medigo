import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {StyledText} from '../StyledText/StyledText.component';
import {styles} from './DropdownSelect.style';

const OPTIONS = [
  '1 unit',
  '2 units',
  '3 units',
  '4 units',
  '5 units',
  '6 units',
];

export const DropdownSelect = ({
  setDropdownValue,
  dropdownValue,
  options = OPTIONS,
  title = 'Selecciona una opción',
  visible,
  setVisible,
  handleClick,
}) => {
  const [showOptions, setShowOptions] = useState([]);

  const handleOnPress = option => {
    if (option) {
      setDropdownValue(option);
      handleClick && handleClick();
    }
    setVisible();
  };

  useEffect(() => {
    setShowOptions(options);
  }, [options]);

  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity
        style={styles.background}
        onPress={() => handleOnPress()}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <StyledText color="white" style={styles.title}>
              {title}
            </StyledText>
          </TouchableWithoutFeedback>
          <ScrollView contentContainerStyle={styles.options}>
            {showOptions?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={
                  dropdownValue === option
                    ? styles.optionSelected
                    : styles.option
                }
                onPress={() => handleOnPress(option)}>
                <StyledText>{option}</StyledText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
