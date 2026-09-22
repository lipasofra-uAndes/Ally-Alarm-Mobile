import { useState } from 'react';
import { Pressable, View, Text, Switch, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NavigationProp } from '../navigation/types';
import TabBar from '../components/TabBar';

export default function Configuracion() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [sugerencias, setSugerencias] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.headerTitle}>Configuración</Text>
      </View>

      {/* Settings card */}
      <View style={styles.card}>
        {/* Integración calendario */}
        <Pressable
          style={({ pressed }) => [styles.row, pressed && styles.pressedRow]}
          onPress={() => navigation.navigate('IntCalendario')}
        >
          <Text style={styles.rowLabel}>Integración calendario</Text>
          <Text style={styles.rowChevron}>›</Text>
        </Pressable>

        <View style={styles.divider} />

        {/* Sugerencias inteligentes */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Sugerencias inteligentes</Text>
          <Switch
            value={sugerencias}
            onValueChange={setSugerencias}
            trackColor={{ false: '#e0d8e8', true: '#6750a4' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.divider} />

        {/* Privacidad */}
        <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressedRow]}>
          <Text style={styles.rowLabel}>Privacidad y datos</Text>
          <Text style={styles.rowChevron}>›</Text>
        </Pressable>

        <View style={styles.divider} />

        {/* Cerrar sesión */}
        <Pressable
          style={({ pressed }) => [styles.row, pressed && styles.pressedRow]}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Inicio' }] })}
        >
          <Text style={[styles.rowLabel, styles.rowLabelDanger]}>Cerrar sesión</Text>
        </Pressable>
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
  card: {
    marginHorizontal: 47,
    marginTop: 50,
    backgroundColor: '#f7f2fa',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  rowLabel: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 14,
    color: '#1d1b20',
    letterSpacing: 0.1,
  },
  rowLabelDanger: {
    color: '#c0392b',
  },
  pressedRow: {
    backgroundColor: '#6F6BC1',
  },
  rowChevron: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 22,
    color: '#1d1b20',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginHorizontal: 16,
  },
});
