import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
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
  const slideAnimationValue = new Animated.Value(0);

  const handleOnPress = option => {
    if (option) {
      setDropdownValue(option);
      handleClick && handleClick();
    }
    setVisible(false);
  };

  useEffect(() => {
    setShowOptions(options);
  }, [options]);

  //   useEffect(() => {
  //     if (visible) {
  //       Animated.timing(slideAnimationValue, {
  //         toValue: 1,
  //         duration: 400,
  //         useNativeDriver: true,
  //       }).start();
  //     }
  //   }, [visible]);

  //   const slideAnimationStyle = {
  //     transform: [
  //       {
  //         translateY: slideAnimationValue.interpolate({
  //           inputRange: [0, 1],
  //           outputRange: [300, 0],
  //         }),
  //       },
  //     ],
  //   };

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
