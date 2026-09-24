import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '../navigation/types';
import { useAlarms } from '../state/AlarmContext';

export default function SugerenciaConfirm() {
  const navigation = useNavigation<NavigationProp>();
  const { addAlarm } = useAlarms();

  const addSuggestedAlarm = () => {
    addAlarm({
      id: 'suggested-training',
      name: 'Entrenamiento',
      time: '5:30am',
      color: '#c2ebbc',
      image: require('../../assets/images/icon-gym.png'),
      rotated: true,
    });
    navigation.goBack();
  };

  return (
    <Pressable style={styles.backdrop} onPress={() => navigation.goBack()}>
      <Pressable style={styles.card} onPress={() => {}}>
        <View style={styles.heading}>
          <Image
            source={require('../../assets/images/icon-sparkles.png')}
            style={styles.sparklesIcon}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sugerencia inteligente</Text>
        </View>
        <Text style={styles.question}>
          ¿Estás seguro que quieres crear la alarma recomendada?
        </Text>
        <Text style={styles.detail}>
          Se creará una alarma con categoría entrenamiento a las 5:30am
        </Text>

        <View style={styles.buttonsRow}>
          <Pressable
            style={styles.noBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.noBtnText}>No, gracias</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.yesBtn, pressed && styles.pressedButton]}
            onPress={addSuggestedAlarm}
          >
            <Text style={styles.yesBtnText}>Agregar</Text>
          </Pressable>
        </View>
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
    borderRadius: 8,
    width: 298,
    height: 237,
    paddingTop: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  heading: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 38,
    marginBottom: 27,
  },
  sparklesIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 14,
    color: '#1e1e1e',
    textAlign: 'center',
    marginBottom: 0,
  },
  question: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 13,
    color: '#1e1e1e',
    textAlign: 'center',
    marginBottom: 15,
  },
  detail: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 13,
    color: 'rgba(20,18,24,0.6)',
    textAlign: 'center',
    marginBottom: 27,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  noBtn: {
    flex: 1,
    height: 35,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bcbfff',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBtnText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 13,
    color: '#1e1e1e',
  },
  yesBtn: {
    flex: 1,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#bcbfff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesBtnText: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 13,
    color: '#1e1e1e',
  },
  pressedButton: {
    backgroundColor: '#6F6BC1',
  },
});
