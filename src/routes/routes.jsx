/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomePat,
  Login,
  Register,
  RegisterDoc,
  HomeDoc,
  RegisterPat,
  Map,
  PerfilDoc,
  ProfilePat,
  ActivityPat,
  DocInfoPat,
  ActivityDoc,
  PersonalDataDoc,
  ModifyPersonalDataDoc,
  PersonalData,
  HelpPat,
  FamilyMembers,
  FamilyMemberAct,
  ModifyData,
  HelpDoc,
  PatInfoDoc,
  FamilyMemberInfo,
  ModifyFamily,
} from '../screens';
import {GenericModal, Spinner} from '../components';
import {PATHS} from './paths';
import {apiEspecialidades} from '../utils/api/userRoutes';
import {setEspecialidades} from '../redux/common.slice';

export const Routes = () => {
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();
  const {userData} = useSelector(state => state.userReducer);
  const {doctorData} = useSelector(state => state.doctorReducer);

  const setModalDropdownsSpecialtyOptions = async () => {
    try {
      const response = await apiEspecialidades();

      if (response) {
        dispatch(setEspecialidades(response));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setModalDropdownsSpecialtyOptions();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {doctorData.nombre ? (
          <>
            <Stack.Screen name={PATHS.HOMEDOCTOR} component={HomeDoc} />
            <Stack.Screen name={PATHS.PERFILDOCTOR} component={PerfilDoc} />
            <Stack.Screen
              name={PATHS.PERSONALDATADOC}
              component={PersonalDataDoc}
            />
            <Stack.Screen
              name={PATHS.MODIFYPERSONALDATADOC}
              component={ModifyPersonalDataDoc}
            />
            <Stack.Screen name={PATHS.ACTIVITYDOC} component={ActivityDoc} />
            <Stack.Screen name={PATHS.MAP} component={Map} />
            <Stack.Screen name={PATHS.HELPDOC} component={HelpDoc} />
            <Stack.Screen name={PATHS.PATINFOINDOC} component={PatInfoDoc} />
          </>
        ) : userData.nombre ? (
          <>
            <Stack.Screen name={PATHS.HOMEPATIENT} component={HomePat} />
            <Stack.Screen name={PATHS.PERFILPATIENT} component={ProfilePat} />
            <Stack.Screen name={PATHS.ACTIVITYPAT} component={ActivityPat} />
            <Stack.Screen name={PATHS.DOCINFOINPAT} component={DocInfoPat} />
            <Stack.Screen name={PATHS.PERSONALDATA} component={PersonalData} />
            <Stack.Screen name={PATHS.HELPPAT} component={HelpPat} />
            <Stack.Screen
              name={PATHS.FAMILYMEMBERS}
              component={FamilyMembers}
            />
            <Stack.Screen
              name={PATHS.FAMILYMEMBERINFO}
              component={FamilyMemberInfo}
            />
            <Stack.Screen
              name={PATHS.FAMILYMEMBERACTIVITY}
              component={FamilyMemberAct}
            />
            <Stack.Screen name={PATHS.MODIFYPATDATA} component={ModifyData} />
            <Stack.Screen name={PATHS.MODIFYFAMILY} component={ModifyFamily} />
          </>
        ) : (
          <>
            <Stack.Screen name={PATHS.LOGIN} component={Login} />
            <Stack.Screen name={PATHS.REGISTER} component={Register} />
            <Stack.Screen name={PATHS.REGISTER_PAT} component={RegisterPat} />
            <Stack.Screen name={PATHS.REGISTERDOCTOR} component={RegisterDoc} />
          </>
        )}
      </Stack.Navigator>
      <Spinner />
      <GenericModal />
    </NavigationContainer>
  );
};
