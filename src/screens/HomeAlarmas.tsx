import { useEffect } from 'react';
import { View, Text, Image, Pressable, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NavigationProp, RootStackParamList } from '../navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import TabBar from '../components/TabBar';
import FigmaIcon from '../components/FigmaIcon';
import { useAlarms } from '../state/AlarmContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeAlarmas({ route }: Props) {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { alarms } = useAlarms();

  useEffect(() => {
    if (route.params?.openIntegrationModal) {
      navigation.setParams({ openIntegrationModal: undefined });
      navigation.navigate('IntegracionExitosa');
    }
  }, [navigation, route.params?.openIntegrationModal]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 68 }]}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerTitle}>Mis alarmas</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.settingsBtn}
              onPress={() => navigation.navigate('Configuracion')}
              activeOpacity={0.8}
            >
              <FigmaIcon
                source={require('../../assets/images/icon-settings.png')}
                width={18}
                height={18}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Smart suggestion banner */}
        <TouchableOpacity
          style={styles.suggestionCard}
          onPress={() => navigation.navigate('SugerenciaConfirm')}
          activeOpacity={0.9}
        >
          <Image
            source={require('../../assets/images/icon-sparkles.png')}
            style={styles.sparklesIcon}
            resizeMode="contain"
          />
          <View style={styles.suggestionText}>
            <Text style={styles.suggestionTitle}>Sugerencia inteligente</Text>
            <Text style={styles.suggestionBody}>
              Mañana tienes entrenamiento a las 6:00am. ¿Quieres una alarma a las 5:30am?
            </Text>
          </View>
        </TouchableOpacity>

        {/* Alarm list */}
        <View style={styles.alarmList}>
          {alarms.map((alarm) => (
            <View key={alarm.id} style={[styles.alarmCard, { backgroundColor: alarm.color }]}>
              <Image
                source={alarm.image}
                style={[
                  styles.alarmIcon,
                  alarm.rotated && { transform: [{ rotate: '180deg' }] },
                ]}
                resizeMode="cover"
              />
              <View style={styles.alarmInfo}>
                <Text style={styles.alarmName}>{alarm.name}</Text>
                <Text style={styles.alarmTime}>{alarm.time}</Text>
              </View>
              <TouchableOpacity style={styles.alarmMore}>
                <Text style={styles.alarmMoreDots}>•••</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* FAB */}
      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={() => navigation.navigate('CrearCategoria')}
      >
        {({ pressed }) => (pressed ? (
          <View style={styles.pressedFabIcon}>
            <Text style={styles.pressedFabPlus}>+</Text>
          </View>
        ) : (
          <FigmaIcon
            source={require('../../assets/images/fab-add.png')}
            width={92}
            height={92}
          />
        ))}
      </Pressable>

      <TabBar activeTab="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeeff',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 160,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  headerSpacer: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 36,
    color: '#1e1e1e',
    letterSpacing: -0.72,
    textAlign: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
    transform: [{ translateY: -18 }],
    marginTop: -9,
  },
  settingsBtn: {
    backgroundColor: '#6f6bc1',
    borderRadius: 8,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    width: 18,
    height: 18,
  },
  suggestionCard: {
    marginTop: 31,
    marginHorizontal: 56,
    backgroundColor: '#f5eff7',
    borderRadius: 8,
    paddingLeft: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  sparklesIcon: {
    width: 23,
    height: 23,
    marginTop: -5,
    marginRight: 8,
  },
  suggestionText: {
    flex: 1,
  },
  suggestionTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 13,
    color: '#1e1e1e',
    letterSpacing: -0.26,
    marginLeft: -1,
  },
  suggestionBody: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 13,
    lineHeight: 16,
    color: '#1e1e1e',
    letterSpacing: -0.26,
    marginTop: 7,
    marginLeft: -37,
  },
  alarmList: {
    paddingHorizontal: 24,
    marginTop: 38,
    gap: 23,
  },
  alarmCard: {
    paddingTop: 4,
    borderRadius: 8,
    height: 69,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  alarmIcon: {
    width: 26,
    height: 26,
    marginLeft: 17,
  },
  alarmInfo: {
    flex: 1,
    alignItems: 'center',
    marginBottom: -6,
  },
  alarmName: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 13,
    color: '#000',
    letterSpacing: 0.5,
  },
  alarmTime: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 13,
    color: '#000',
    letterSpacing: 0.5,
    marginTop: 8,
  },
  alarmMore: {
    marginRight: 14,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '90deg' }],
  },
  alarmMoreDots: {
    fontSize: 14,
    color: '#000',
    letterSpacing: 0,
    paddingRight: 11,
    paddingBottom: 15,
  },
  fab: {
    position: 'absolute',
    bottom: 91,
    left: 10,
    width: 92,
    height: 92,
  },
  fabIcon: {
    width: 92,
    height: 92,
  },
  fabPressed: {
    borderRadius: 46,
    backgroundColor: '#6F6BC1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedFabIcon: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#6F6BC1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedFabPlus: {
    color: '#000',
    fontFamily: 'Comfortaa-Regular',
    fontSize: 42,
    lineHeight: 46,
  },
});
