import { useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';

import type { RootStackParamList } from './src/navigation/types';
import InicioScreen from './src/screens/InicioScreen';
import HomeAlarmas from './src/screens/HomeAlarmas';
import CrearAlarmaCategoria from './src/screens/CrearAlarmaCategoria';
import ModalPlantilla from './src/screens/ModalPlantilla';
import CrearAlarmaForm from './src/screens/CrearAlarmaForm';
import Configuracion from './src/screens/Configuracion';
import IntegracionCalendario from './src/screens/IntegracionCalendario';
import SeleccionProveedor from './src/screens/SeleccionProveedor';
import IntegracionExitosa from './src/screens/IntegracionExitosa';
import SugerenciaConfirm from './src/screens/SugerenciaConfirm';
import { AlarmProvider } from './src/state/AlarmContext';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();
const paperTheme = {
  ...MD3LightTheme,
  colors: { ...MD3LightTheme.colors, primary: '#7055b5', primaryContainer: '#bcbfff' },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Comfortaa-Light': require('./assets/fonts/Comfortaa-Light.ttf'),
    'Comfortaa-Regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
    'Comfortaa-Medium': require('./assets/fonts/Comfortaa-Medium.ttf'),
    'Comfortaa-SemiBold': require('./assets/fonts/Comfortaa-SemiBold.ttf'),
    'Comfortaa-Bold': require('./assets/fonts/Comfortaa-Bold.ttf'),
    Roboto: require('./assets/fonts/Roboto-VariableFont_wdth,wght.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
      <AlarmProvider>
        <View style={styles.root} onLayout={onLayoutRootView}>
        <StatusBar style="auto" hidden={Platform.OS === 'web'} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
          >
            <Stack.Screen name="Inicio" component={InicioScreen} />
            <Stack.Screen name="Home" component={HomeAlarmas} />
            <Stack.Screen name="CrearCategoria" component={CrearAlarmaCategoria} />
            <Stack.Screen
              name="ModalPlantilla"
              component={ModalPlantilla}
              options={{ presentation: 'transparentModal', animation: 'fade' }}
            />
            <Stack.Screen name="CrearForm" component={CrearAlarmaForm} />
            <Stack.Screen name="Configuracion" component={Configuracion} />
            <Stack.Screen name="IntCalendario" component={IntegracionCalendario} />
            <Stack.Screen name="SelecProveedor" component={SeleccionProveedor} />
            <Stack.Screen
              name="IntegracionExitosa"
              component={IntegracionExitosa}
              options={{ presentation: 'transparentModal', animation: 'fade' }}
            />
            <Stack.Screen
              name="SugerenciaConfirm"
              component={SugerenciaConfirm}
              options={{ presentation: 'transparentModal', animation: 'fade' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </View>
      </AlarmProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ebeeff',
  },
});
