import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '../navigation/types';
import { useAlarms } from '../state/AlarmContext';

export default function IntegracionExitosa() {
  const navigation = useNavigation<NavigationProp>();
  const { connectCalendar } = useAlarms();

  return (
    <View style={styles.backdrop}>
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/icon-check-green.png')}
          style={styles.checkIcon}
          resizeMode="contain"
        />
        <Text style={styles.title}>¡Integración exitosa!</Text>
        <Pressable
          style={({ pressed }) => [styles.btn, pressed && styles.pressedButton]}
          onPress={() => {
            connectCalendar();
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.btnText}>Continuar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f7f2fa',
    borderRadius: 16,
    width: 280,
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 20,
    color: '#1e1e1e',
    textAlign: 'center',
    marginBottom: 24,
  },
  btn: {
    backgroundColor: '#bcbfff',
    borderRadius: 100,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 14,
    color: '#1e1e1e',
  },
  pressedButton: {
    backgroundColor: '#6F6BC1',
  },
});
