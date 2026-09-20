import { useState } from 'react';
import {
  View, Text, Image, TextInput, Pressable, StyleSheet, ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NavigationProp } from '../navigation/types';
import TabBar from '../components/TabBar';
import type { RootStackParamList } from '../navigation/types';
import { useAlarms } from '../state/AlarmContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type FormProps = NativeStackScreenProps<RootStackParamList, 'CrearForm'>;

export default function CrearAlarmaForm() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const route = useRoute<FormProps['route']>();
  const { addAlarm } = useAlarms();
  const [nombre, setNombre] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const [sound, setSound] = useState<string | null>(null);
  const [soundOpen, setSoundOpen] = useState(false);
  const [devicePhone, setDevicePhone] = useState(false);
  const [deviceWatch, setDeviceWatch] = useState(false);

  const category = route.params?.category;
  const categoryAlarms = {
    medicamento: { color: '#FDEF90', image: require('../../assets/images/icon-medicine.png') },
    entrenamiento: { color: '#C2EBBC', image: require('../../assets/images/icon-gym.png'), rotated: true },
    trabajo: { color: '#FBC3C3', image: require('../../assets/images/icon-laptop.png') },
    reunion: { color: '#B1CBF2', image: require('../../assets/images/icon-calendar2.png') },
    viajes: { color: '#98E7D7', image: require('../../assets/images/icon-travel.png') },
    otro: { color: '#FDFBD5', image: require('../../assets/images/icon-sparkles.png') },
  };
  const categoryAlarm = categoryAlarms[category as keyof typeof categoryAlarms] ?? categoryAlarms.otro;
  const canSave = Boolean(
    nombre.trim() && hour.length === 2 && minute.length === 2 && sound && (devicePhone || deviceWatch),
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
          <Text style={styles.headerTitle}>Crear alarma</Text>
        </View>

        {/* Nombre input */}
        <View style={[styles.sectionRow, styles.firstSection]}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre de la alarma"
            placeholderTextColor="rgba(20,18,24,0.4)"
          />
        </View>

        {/* Time picker */}
        <View style={styles.sectionRow}>
          <Text style={styles.label}>Hora</Text>
          <View style={styles.timePicker}>
            <TextInput
              style={styles.timeInput}
              value={hour}
              onChangeText={setHour}
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={styles.timeSep}>:</Text>
            <TextInput
              style={styles.timeInput}
              value={minute}
              onChangeText={setMinute}
              keyboardType="number-pad"
              maxLength={2}
            />
            <View style={styles.periodToggle}>
              <Pressable
                style={[styles.periodBtn, period === 'AM' && styles.periodBtnActive]}
                onPress={() => setPeriod('AM')}
              >
                <Text style={[styles.periodText, period === 'AM' && styles.periodTextActive]}>
                  AM
                </Text>
              </Pressable>
              <Pressable
                style={[styles.periodBtn, period === 'PM' && styles.periodBtnActive]}
                onPress={() => setPeriod('PM')}
              >
                <Text style={[styles.periodText, period === 'PM' && styles.periodTextActive]}>
                  PM
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Sound dropdown */}
        <View style={styles.sectionRow}>
          <Text style={styles.label}>Sonidos</Text>
          <Pressable style={styles.dropdown} onPress={() => setSoundOpen((current) => !current)}>
            <Text style={[styles.dropdownText, !sound && styles.placeholderText]}>
              {sound ?? 'Selecciona un sonido'}
            </Text>
            <Text style={styles.dropdownChevron}>›</Text>
          </Pressable>
          {soundOpen && (
            <View style={styles.soundMenu}>
              {['rio corriendo', 'campanas', 'vibración'].map((option) => (
                <Pressable
                  key={option}
                  style={styles.soundOption}
                  onPress={() => {
                    setSound(option);
                    setSoundOpen(false);
                  }}
                >
                  <Text style={styles.dropdownText}>{option}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Device selection */}
        <View style={styles.deviceSection}>
          <Text style={styles.deviceLabelTitle}>Dispositivos</Text>
          <View style={styles.deviceRow}>
            <Pressable
              style={[styles.deviceBtn, devicePhone && styles.deviceBtnActive]}
              onPress={() => setDevicePhone(!devicePhone)}
            >
              <Image
                source={require('../../assets/images/device-phone.png')}
                style={styles.deviceIcon}
                resizeMode="contain"
              />
              <Text style={styles.deviceLabel}>Teléfono</Text>
            </Pressable>
            <Pressable
              style={[styles.deviceBtn, deviceWatch && styles.deviceBtnActive]}
              onPress={() => setDeviceWatch(!deviceWatch)}
            >
              <Image
                source={require('../../assets/images/device-watch.png')}
                style={styles.deviceIcon}
                resizeMode="contain"
              />
              <Text style={styles.deviceLabel}>Smartwatch</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Save button */}
      <View style={styles.saveBarWrapper}>
        <Pressable
          style={({ pressed }) => [
            styles.saveBtn,
            !canSave && styles.saveBtnDisabled,
            pressed && canSave && styles.pressedButton,
          ]}
          onPress={() => {
            if (!canSave) return;
            addAlarm({
              id: `custom-${Date.now()}`,
              name: nombre,
              time: `${hour}:${minute}${period.toLowerCase()}`,
              color: categoryAlarm.color,
              image: categoryAlarm.image,
              rotated: 'rotated' in categoryAlarm ? categoryAlarm.rotated : undefined,
            });
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.saveBtnText}>Guardar</Text>
        </Pressable>
      </View>

      <TabBar activeTab="create" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ebeeff' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 160 },
  header: { paddingHorizontal: 20 },
  headerTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 36,
    color: '#1e1e1e',
    letterSpacing: -0.72,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    position: 'relative',
  },
  firstSection: { marginTop: 40 },
  deviceSection: { marginTop: 24 },
  deviceLabelTitle: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 14,
    color: '#1e1e1e',
    marginHorizontal: 20,
  },
  label: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 14,
    color: '#1e1e1e',
    width: 72,
  },
  input: {
    backgroundColor: '#f5eff7',
    borderRadius: 10,
    height: 30,
    flex: 1,
    paddingHorizontal: 16,
    fontFamily: 'Comfortaa-Regular',
    fontSize: 14,
    color: '#1e1e1e',
  },
  placeholderText: {
    color: 'rgba(20,18,24,0.4)',
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 134,
    height: 44,
  },
  timeInput: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#79747E',
    width: 48,
    height: 56,
    textAlign: 'center',
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 20,
    color: '#1e1e1e',
  },
  timeSep: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 24,
    color: '#1e1e1e',
  },
  periodToggle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#79747E',
    overflow: 'hidden',
    marginLeft: 2,
  },
  periodBtn: {
    paddingHorizontal: 7,
    paddingVertical: 9,
  },
  periodBtnActive: {
    backgroundColor: '#BCBFFF',
  },
  periodText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 14,
    color: 'rgba(20,18,24,0.5)',
  },
  periodTextActive: {
    color: '#1e1e1e',
    fontFamily: 'Comfortaa-SemiBold',
  },
  dropdown: {
    backgroundColor: '#f5eff7',
    borderRadius: 10,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  soundMenu: {
    position: 'absolute',
    zIndex: 2,
    left: 92,
    right: 20,
    top: 54,
    backgroundColor: '#f5eff7',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  soundOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 14,
    color: '#1e1e1e',
  },
  dropdownChevron: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 20,
    color: '#1e1e1e',
    transform: [{ rotate: '90deg' }],
  },
  deviceRow: {
    flexDirection: 'row',
    gap: 35,
    marginHorizontal: 63,
    marginTop: 20,
  },
  deviceBtn: {
    flex: 1,
    backgroundColor: '#f5eff7',
    borderRadius: 12,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  deviceBtnActive: {
    backgroundColor: '#BCBFFF',
    borderWidth: 2,
    borderColor: '#6F6BC1',
  },
  deviceIcon: { width: 40, height: 40 },
  deviceLabel: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 13,
    color: '#1e1e1e',
  },
  saveBarWrapper: {
    position: 'absolute',
    bottom: 198,
    left: 47,
    right: 47,
  },
  saveBtn: {
    backgroundColor: '#6f6bc1',
    borderRadius: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: '#bcbcbc',
  },
  saveBtnText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
    color: '#fff',
  },
  pressedButton: {
    backgroundColor: '#6F6BC1',
  },
});
