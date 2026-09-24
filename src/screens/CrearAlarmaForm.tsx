import { useState } from 'react';
import {
  View, Text, Image, TextInput, Pressable, StyleSheet, ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { TextInput as PaperTextInput } from 'react-native-paper';
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
  const [sound, setSound] = useState<string | null>('rio corriendo');
  const [soundOpen, setSoundOpen] = useState(false);
  const [highlightedSound, setHighlightedSound] = useState<string | null>(null);
  const [devicePhone, setDevicePhone] = useState(false);
  const [deviceWatch, setDeviceWatch] = useState(false);

  const soundOptions = [
    'aves montañeras',
    'pradera tranquila',
    'viento de otoño',
    'fuente corriendo',
    'cascada de verano',
    'brisa tropical',
  ];

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
    nombre.trim()
      && /^(?:[1-9]|1[0-2])$/.test(hour)
      && /^(?:[0-5]?\d)$/.test(minute)
      && sound
      && (devicePhone || deviceWatch),
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 68 }]}>
          <Text style={styles.headerTitle}>Crear alarma</Text>
        </View>

        {/* Nombre input */}
        <View style={[styles.sectionRow, styles.firstSection]}>
          <Text style={styles.nameLabel}>Nombre</Text>
          <PaperTextInput
            mode="outlined"
            dense
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Reunión importante"
            placeholderTextColor="#B3B3B3"
            outlineColor="#828282"
            activeOutlineColor="#6f6bc1"
            outlineStyle={styles.inputOutline}
            contentStyle={styles.inputContent}
          />
        </View>

        {/* Time picker */}
        <View style={[styles.sectionRow, styles.timeSectionRow]}>
          <Text style={styles.label}>Hora</Text>
          <View style={styles.timePickerFrame}>
            <View style={styles.timePicker}>
              <View style={styles.timeColumn}>
                <TextInput
                  style={styles.timeInput}
                  value={hour}
                  onChangeText={setHour}
                  keyboardType="number-pad"
                  maxLength={2}
                />
                <Text style={styles.timeCaption}>Hora</Text>
              </View>
              <Text style={styles.timeSep}>:</Text>
              <View style={styles.timeColumn}>
                <TextInput
                  style={styles.timeInput}
                  value={minute}
                  onChangeText={setMinute}
                  keyboardType="number-pad"
                  maxLength={2}
                />
                <Text style={styles.timeCaption}>Minuto</Text>
              </View>
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
        </View>

        {/* Sound dropdown */}
        <View style={[styles.sectionRow, soundOpen && styles.soundSectionRow]}>
          <Text style={styles.label}>Sonidos</Text>
          <View style={styles.soundFieldWrapper}>
            <Pressable style={styles.dropdown} onPress={() => setSoundOpen((open) => !open)}>
              <Text style={[styles.dropdownText, !sound && styles.placeholderText]}>
                {sound ?? 'rio corriendo'}
              </Text>
              <Svg
                width={17.6}
                height={17.6}
                viewBox="0 0 18 18"
                fill="none"
                style={styles.dropdownChevron}
              >
                <Path
                  d="M4.40002 6.59998L8.80002 11L13.2 6.59998"
                  stroke="#1E1E1E"
                  strokeWidth={1.76}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </Pressable>

            {soundOpen && (
              <View style={styles.dropdownList}>
                {soundOptions.map((option, index) => (
                  <View key={option}>
                    {index > 0 && <View style={styles.dropdownDivider} />}
                    <Pressable
                      style={[styles.soundOption, highlightedSound === option && styles.soundOptionActive]}
                      onPressIn={() => setHighlightedSound(option)}
                      onPress={() => {
                        setSound(option);
                        setHighlightedSound(option);
                        setSoundOpen(false);
                      }}
                    >
                      <Text style={styles.soundOptionText}>{option}</Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </View>
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
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Save button */}
      <View
        style={[
          styles.saveBarWrapper,
          soundOpen && styles.saveBarBehindDropdown,
        ]}
      >
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
          <Text style={[styles.saveBtnText, !canSave && styles.saveBtnTextDisabled]}>
            Guardar
          </Text>
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
  header: { paddingLeft: 64, paddingHorizontal: 20 },
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
  firstSection: { marginTop: 43, paddingHorizontal: 20 },
  timeSectionRow: { marginTop: 26, gap: 0 },
  deviceSection: { marginTop: 43, zIndex: -1, },
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
  nameLabel: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 14,
    color: '#1e1e1e',
    width: 72,
    letterSpacing: -0.7,
  },
  input: {
    backgroundColor: '#fff',
    width: 261.6,
    height: 28.8,
    borderRadius: 8,
  },
  inputOutline: {
    borderRadius: 8,
    borderWidth: 1,
  },
  inputContent: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 16.8,
    lineHeight: 16.8,
    color: '#1e1e1e',
    paddingVertical: 4.8,
    paddingHorizontal: 7,
  },
  placeholderText: {
    color: '#B3B3B3',
    fontFamily: 'Comfortaa-Regular',
    fontSize: 15.4,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 15.4,
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 38.58,
    paddingHorizontal: 9.75,
    gap: 4.87,
  },
  timePickerFrame: {
    width: 133.2,
    height: 49.54,
    borderRadius: 11.37,
    borderWidth: 0.41,
    borderColor: '#000',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  timeColumn: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 2.843,
  },
  timeInput: {
    alignSelf: 'stretch',
    height: 29.239,
    paddingVertical: 3.655,
    // paddingHorizontal: 6.498,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3.249,
    borderWidth: 0.812,
    borderColor: '#F5EFF7',
    backgroundColor: '#F5EFF7',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 18.274,
    fontWeight: '400',
    lineHeight: 21.117,
    color: '#000',
  },
  timeSep: {
    width: 9.746,
    height: 29.239,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Roboto',
    fontSize: 23.148,
    fontWeight: '400',
    lineHeight: 25.99,
    color: '#1D1B20',
  },
  periodToggle: {
    flexDirection: 'column',
    width: 21.117,
    height: 29.239,
    borderRadius: 3.249,
    borderWidth: 0.406,
    borderColor: 'rgba(0, 0, 0, 0.30)',
    backgroundColor: '#ECE6F0',
    overflow: 'hidden',
    marginTop: -3,
  },
  periodBtn: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 3.249,
    paddingHorizontal: 4.061,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4.061,
  },
  periodBtnActive: {
    backgroundColor: '#BCBFFF',
    borderBottomWidth: 0.41,
    borderBottomColor: 'rgba(0, 0, 0, 0.30)',
  },
  periodText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 6.498,
    fontWeight: '700',
    lineHeight: 9.746,
    letterSpacing: 0.061,
    color: '#000',
  },
  periodTextActive: {
    color: '#000',
  },
  timeCaption: {
    alignSelf: 'stretch',
    color: 'var(--M3-sys-light-on-surface-variant, var(--Schemes-On-Surface-Variant, #49454F))',
    fontFamily: 'Roboto',
    fontSize: 4.873,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 6.498,
    letterSpacing: 0.162,
  },
  soundFieldWrapper: {
    position: 'relative',
    width: 240,
  },
  soundSectionRow: {
    zIndex: 2,
    elevation: 2,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8.8,
    borderWidth: 1.1,
    borderColor: '#D9D9D9',
    height: 33,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 8,
    justifyContent: 'space-between',
  },
  dropdownList: {
    position: 'absolute',
    top: 31,
    left: 0,
    width: 240,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    overflow: 'hidden',
    zIndex: 40,
    elevation: 20,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginLeft: 0,
    marginRight: 0,
  },
  soundOption: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    minHeight: 30,
    justifyContent: 'center',
  },
  soundOptionActive: {
    backgroundColor: '#BCBFFF',
  },
  dropdownText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 15.4,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 15.4,
    color: '#1E1E1E',
    marginTop: 5,
    marginLeft: -1,
    flex: 1,
  },
  soundOptionText: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 13,
    fontStyle: 'normal',
    color: '#000',
    fontWeight: '600',
    lineHeight: 19.5,
  },
  dropdownChevron: {
    width: 17.6,
    height: 17.6,
    flexShrink: 0,
    marginTop: 2,
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
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceBtnActive: {
    backgroundColor: '#BCBFFF',
    borderWidth: 2,
    borderColor: '#6F6BC1',
  },
  deviceIcon: { width: 40, height: 40 },
  saveBarWrapper: {
    position: 'absolute',
    bottom: 198,
    left: 47,
    right: 47,
    zIndex: 1,
    elevation: 1,
  },
  saveBarBehindDropdown: {
    zIndex: -1,
    elevation: 0,
  },
  saveBtn: {
    backgroundColor: '#6f6bc1',
    color: '#000000',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: '#bcbcbc',
  },
  saveBtnText: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 19.5,
    color: '#000000',
  },
  saveBtnTextDisabled: {
    color: '#79747E',
  },
  pressedButton: {
    backgroundColor: '#6F6BC1',
  },
});
