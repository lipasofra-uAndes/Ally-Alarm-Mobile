import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '../navigation/types';

export default function InicioScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {/* Background landscape image */}
      <Image
        source={require('../../assets/images/background-mountain.png')}
        style={styles.background}
        resizeMode="cover"
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../../assets/images/ally-alarm-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Sign in label */}
        <Text style={styles.signinLabel}>Inicia sesión</Text>

        {/* Provider icons */}
        <View style={styles.providersRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
            <Image
              source={require('../../assets/images/google-icon.png')}
              style={styles.googleIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
            <Image
              source={require('../../assets/images/icloud-icon.png')}
              style={styles.icloudIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
            <Image
              source={require('../../assets/images/yahoo-icon.png')}
              style={styles.yahooIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <Text style={styles.terms}>
          Al iniciar sesión, aceptas nuestros{' '}
          <Text style={styles.termsUnderline}>Términos de servicio y Política de privacidad</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    top: -26,
    left: -133,
    width: 665,
    height: 927,
    aspectRatio: 33 / 46,
    backgroundColor: '#d3d3d3',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 133,
    paddingBottom: 82,
    transform: [{ translateY: -24 }],
  },
  logo: {
    width: 335,
    height: 329,
    transform: [{ translateY: -42 }],
  },
  signinLabel: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 24,
    color: '#fff',
    marginTop:20,
  },
  providersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 44,
    marginTop: 24,
    height: 55,
    transform: [{ translateY: -6 }],
  },
  googleIcon: {
    width: 37,
    height: 37,
  },
  icloudIcon: {
    width: 53,
    height: 53,
  },
  yahooIcon: {
    width: 55,
    height: 55,
  },
  terms: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    width: 213,
    marginTop: 'auto',
    transform: [{ translateY: 24 }],
  },
  termsUnderline: {
    textDecorationLine: 'underline',
  },
});
