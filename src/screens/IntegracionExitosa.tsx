import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '../navigation/types';

export default function IntegracionExitosa() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <Pressable style={styles.backdrop} onPress={() => navigation.goBack()}>
      <Pressable style={styles.card} onPress={() => {}}>
        <Image
          source={require('../../assets/images/icon-check-green.png')}
          style={styles.checkIcon}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          ¡Integración exitosa!
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
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f7f2fa',
    borderRadius: 16,
    width: 290,
    height: 229,
    paddingVertical: 48,
    paddingHorizontal: 16,
    marginLeft: -3,
    marginTop: 1,
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
    letterSpacing: -0.3,
    width: '100%',
    marginBottom: 0,
  },
  pressedButton: {
    backgroundColor: '#6F6BC1',
  },
});
