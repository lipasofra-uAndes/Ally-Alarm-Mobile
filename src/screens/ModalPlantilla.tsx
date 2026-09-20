import { Pressable, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '../navigation/types';

const templateRows = [
  { mins: '45 mins antes', action: 'Despertarse' },
  { mins: '30 mins antes', action: 'Desayunar' },
  { mins: '15 mins antes', action: 'Salir de casa' },
];

export default function ModalPlantilla() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Pressable style={styles.backdrop} onPress={() => navigation.goBack()}>
      <Pressable style={styles.card} onPress={() => {}}>
        <Text style={styles.title}>Entrenamiento usa{`\n`}una plantilla</Text>
        <Text style={styles.subtitle}>
          Al elegir esta categoría, se crearán{`\n`}
          <Text style={styles.subtitleStrong}>3 alarmas automáticamente</Text>
        </Text>

        {/* Template table */}
        <View style={styles.table}>
          {templateRows.map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableMins}>{row.mins}</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellRight]}>
                <Text style={styles.tableAction}>{row.action}</Text>
              </View>
            </View>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [styles.continueBtn, pressed && styles.pressedButton]}
          onPress={() => navigation.replace('CrearForm', { category: 'entrenamiento' })}
        >
          <Text style={styles.continueBtnText}>¡Genial, continuar!</Text>
        </Pressable>

        <Text style={styles.footer}>
          Si deseas cambiar la plantilla ve a la aplicación web
        </Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 34,
  },
  card: {
    backgroundColor: '#f5eff7',
    borderRadius: 10,
    width: 369,
    height: 414,
    paddingTop: 25,
    paddingHorizontal: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 24,
    color: '#1e1e1e',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 14,
    color: 'rgba(20,18,24,0.6)',
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 14,
    marginBottom: 17,
  },
  subtitleStrong: {
    fontFamily: 'Comfortaa-SemiBold',
  },
  table: {
    backgroundColor: '#bcbfff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 31,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.4)',
  },
  tableCell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  tableCellRight: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.4)',
  },
  tableMins: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 13,
    color: '#1e1e1e',
  },
  tableAction: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 13,
    color: '#1e1e1e',
  },
  continueBtn: {
    backgroundColor: '#6f6bc1',
    borderRadius: 100,
    height: 42,
    marginHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  continueBtnText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
    color: 'rgba(20,18,24,0.6)',
    textAlign: 'center',
  },
  pressedButton: {
    backgroundColor: '#6F6BC1',
  },
});
