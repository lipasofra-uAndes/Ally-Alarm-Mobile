import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Inicio: undefined;
  Home: undefined;
  CrearCategoria: undefined;
  ModalPlantilla: undefined;
  CrearForm: { category?: string } | undefined;
  Configuracion: undefined;
  SugerenciaConfirm: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
