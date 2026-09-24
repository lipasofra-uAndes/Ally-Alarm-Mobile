import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NavigationProp } from '../navigation/types';
import TabBar from '../components/TabBar';

export default function IntegracionCalendario() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 68 }]}>
        <Text style={styles.headerTitle}>Configuración</Text>
        <Text style={styles.headerSubtitle}>Integración del calendario</Text>
      </View>

      {/* Calendar icon */}
      <View style={styles.iconWrapper}>
        <Image
          source={require('../../assets/images/icon-calendar2.png')}
          style={styles.calendarIcon}
          resizeMode="contain"
        />
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Conecta tu calendario para crear{`\n`}alarmas a partir de tus eventos
      </Text>

      {/* Connect button */}
      <View style={styles.buttonWrapper}>
        <Pressable
          style={({ pressed }) => [styles.connectBtn, pressed && styles.pressedButton]}
          onPress={() => navigation.navigate('SelecProveedor', { selected: null })}
        >
          <Text style={styles.connectBtnText}>Conectar</Text>
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
    paddingLeft: 18,
    paddingRight: 20,
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
    marginTop: 8,
    textAlign: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    marginTop: 68,
  },
  calendarIcon: {
    width: 113,
    height: 113,
  },
  description: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 15,
    color: '#1e1e1e',
    textAlign: 'center',
    lineHeight: 20,
    marginHorizontal: 55,
    marginTop: 52,
  },
  buttonWrapper: {
    paddingHorizontal: 47,
    marginTop: 146,
  },
  connectBtn: {
    backgroundColor: '#bcbfff',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectBtnText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 14,
    color: '#1e1e1e',
  },
  pressedButton: {
    backgroundColor: '#6F6BC1',
  },
});
