import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, NavigationProp } from '../navigation/types';
import TabBar from '../components/TabBar';

type Props = NativeStackScreenProps<RootStackParamList, 'SelecProveedor'>;

const providers = [
  { id: 'google', label: 'Google Calendar' },
  { id: 'microsoft', label: 'Microsoft Outlook' },
  { id: 'apple', label: 'Apple iCloud Calendar' },
  { id: 'otro', label: 'Otro proveedor' },
];

export default function SeleccionProveedor({ route }: Props) {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { selected } = route.params;

  const handleSelect = (id: string) => {
    navigation.navigate('IntegracionExitosa');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.headerTitle}>Configuración</Text>
        <Text style={styles.headerSubtitle}>Selecciona tu proveedor</Text>
      </View>

      {/* Provider list */}
      <View style={styles.listWrapper}>
        <View style={styles.card}>
          {providers.map((provider, index) => (
            <Pressable
              key={provider.id}
              style={({ pressed }) => [
                styles.row,
                selected === provider.id && styles.rowSelected,
                index < providers.length - 1 && styles.rowBorder,
                pressed && styles.pressedRow,
              ]}
              onPress={() => handleSelect(provider.id)}
            >
              <Text style={styles.rowLabel}>{provider.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <TabBar activeTab="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeeff',
  },
  header: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 36,
    color: '#1e1e1e',
    letterSpacing: -0.72,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 20,
    color: 'rgba(20,18,24,0.6)',
    letterSpacing: -0.4,
    marginTop: 4,
    textAlign: 'center',
  },
  listWrapper: {
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#f7f2fa',
    borderRadius: 16,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: '#f7f2fa',
  },
  rowSelected: {
    backgroundColor: '#bcbfff',
  },
  pressedRow: {
    backgroundColor: '#6F6BC1',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0d8e8',
  },
  rowLabel: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 14,
    color: '#1d1b20',
    letterSpacing: 0.1,
  },
});
