import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
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
} from '../screens';
import {PATHS} from './paths';
import {UserContext} from '../context/UserProvider';
import {Spinner} from '../components';

export const Routes = () => {
  const Stack = createNativeStackNavigator();
  const {userData} = useSelector(state => state.userReducer);
  // const {tokenUsuario} = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userData.type === 'doctor' ? (
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
        ) : userData.nombre.length > 0 ? (
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
              name={PATHS.FAMILYMEMBERACTIVITY}
              component={FamilyMemberAct}
            />
            <Stack.Screen name={PATHS.MODIFYPATDATA} component={ModifyData} />
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
    </NavigationContainer>
  );
};
