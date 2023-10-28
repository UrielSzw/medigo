/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, View, Modal} from 'react-native';
import {useSelector} from 'react-redux';
import {theme} from '../../../theme/theme';

export const Spinner = () => {
  const {showSpinner} = useSelector(state => state.commonReducer);

  return (
    <Modal visible={showSpinner}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color={theme.colors.blue} />
      </View>
    </Modal>
  );
};
