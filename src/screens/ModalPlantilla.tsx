import { Pressable, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
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
        <View style={styles.subtitleBlock}>
          <Text style={styles.subtitle}>Al elegir esta categoría, se crearán</Text>
          <Text style={styles.subtitleStrong}>3 alarmas automáticamente</Text>
        </View>

        {/* Template table */}
        <View style={styles.table}>
          {templateRows.map((row, i) => (
            <View key={i} style={styles.tableRowWrapper}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableCellLeft]}>
                  <Text
                    style={styles.tableMins}
                    numberOfLines={1}
                    ellipsizeMode="clip"
                  >
                    {row.mins}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableAction}>{row.action}</Text>
                </View>
              </View>
              {i < templateRows.length - 1 && <View style={styles.tableDivider} />}
            </View>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [styles.continueBtn, pressed && styles.pressedButton]}
          onPress={() => navigation.replace('CrearForm', { category: 'entrenamiento' })}
        >
          <Text style={styles.continueBtnText}>¡Genial, continuar!</Text>
        </Pressable>

        <Text
          style={[
            styles.footer,
            Platform.OS === 'web' && ({ whiteSpace: 'nowrap', textOverflow: 'clip' } as any),
          ]}
        >
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
    paddingBottom: 21,
  },
  card: {
    backgroundColor: '#f5eff7',
    borderRadius: 10,
    width: 358,
    height: 404,
    paddingTop: 30,
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
    lineHeight: 30,
    color: '#1e1e1e',
    textAlign: 'center',
  },
  subtitleBlock: {
    alignItems: 'center',
    gap: 6.94,
    marginTop: 21,
    marginBottom: 17,
  },
  subtitle: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 16.055,
    fontWeight: '300',
    color: '#1e1e1e',
    textAlign: 'center',
    lineHeight: 19.266,
    letterSpacing: -0.321,
  },
  subtitleStrong: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16.055,
    fontWeight: '700',
    color: '#1e1e1e',
    textAlign: 'center',
    lineHeight: 19.266,
    letterSpacing: -0.321,
  },
  table: {
    width: 297,
    alignSelf: 'center',
    backgroundColor: '#bcbfff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 30,
  },
  tableRow: {
    flexDirection: 'row',
    columnGap: 18.53,
  },
  tableRowWrapper: {
    alignItems: 'center',
  },
  tableDivider: {
    width: 297.635,
    height: 1.235,
    backgroundColor: '#F5EFF7',
  },
  tableCell: {
    flex: 1,
    paddingBottom: 6,
    paddingVertical: 12,
  },
  tableCellLeft: {
    alignItems: 'flex-end',
  },
  tableMins: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 16.055,
    fontWeight: '300',
    lineHeight: 19.266,
    letterSpacing: -0.321,
    color: '#1e1e1e',
    textAlign: 'center',
    flexShrink: 0,
    width: 150,
  },
  tableAction: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 16.055,
    fontWeight: '300',
    lineHeight: 19.266,
    letterSpacing: -0.321,
    color: '#1e1e1e',
    textAlign: 'center',
    transform: [{ translateX: -16 }],
  },
  continueBtn: {
    backgroundColor: '#6f6bc1',
    borderRadius: 8,
    height: 42,
    marginHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },
  continueBtnText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
    color: '#1e1e1e',
  },
  footer: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
    color: 'rgba(20,18,24,0.6)',
    textAlign: 'center',
    width: 340,
    alignSelf: 'center',
    flexShrink: 0,
  },
  pressedButton: {
    backgroundColor: '#6F6BC1',
  },
});
