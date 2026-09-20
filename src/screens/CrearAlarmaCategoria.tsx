import { useState } from 'react';
import { View, Text, Image, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NavigationProp } from '../navigation/types';
import TabBar from '../components/TabBar';

type Category = {
  id: string;
  label: string;
  image?: ReturnType<typeof require>;
  dots?: boolean;
  selectedColor: string;
};

const categories: Category[] = [
  { id: 'medicamento', label: 'Medicamento', image: require('../../assets/images/icon-medicine.png'), selectedColor: '#FDEF90' },
  { id: 'entrenamiento', label: 'Entrenamiento', image: require('../../assets/images/icon-gym.png'), selectedColor: '#C2EBBC' },
  { id: 'trabajo', label: 'Estudio / Trabajo', image: require('../../assets/images/icon-laptop.png'), selectedColor: '#FBC3C3' },
  { id: 'reunion', label: 'Reunión', image: require('../../assets/images/icon-calendar2.png'), selectedColor: '#B1CBF2' },
  { id: 'viajes', label: 'Viajes', image: require('../../assets/images/icon-travel.png'), selectedColor: '#98E7D7' },
  { id: 'otro', label: 'Otro', dots: true, selectedColor: '#FDFBD5' },
];

export default function CrearAlarmaCategoria() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    if (id === 'entrenamiento') {
      navigation.navigate('ModalPlantilla');
    }
  };

  const handleNext = () => {
    if (!selected) return;
    if (selected === 'entrenamiento') {
      navigation.navigate('ModalPlantilla');
    } else {
      navigation.navigate('CrearForm', { category: selected });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.headerTitle}>Crear alarma</Text>
        <Text style={styles.headerSubtitle}>¿Qué tipo de alarma quieres crear?</Text>
      </View>

      {/* Category grid */}
      <View style={styles.grid}>
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            style={[
              styles.categoryBtn,
              selected === cat.id && { backgroundColor: cat.selectedColor },
            ]}
            onPress={() => handleSelect(cat.id)}
          >
            {cat.dots ? (
              <Text style={styles.dotsText}>···</Text>
            ) : (
              <Image
                source={cat.image}
                style={[
                  styles.categoryIcon,
                  cat.id === 'entrenamiento' && { transform: [{ rotate: '180deg' }] },
                ]}
                resizeMode="cover"
              />
            )}
            <Text style={styles.categoryLabel}>{cat.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Siguiente button (disabled until selection) */}
      <View style={styles.bottomBar}>
        <Pressable
          style={({ pressed }) => [
            styles.nextBtn,
            !selected && styles.nextBtnDisabled,
            pressed && selected && styles.pressedButton,
          ]}
          onPress={handleNext}
        >
          <Text style={[styles.nextBtnText, !selected && styles.nextBtnTextDisabled]}>
            Siguiente
          </Text>
        </Pressable>
      </View>

      <TabBar activeTab="create" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeeff',
  },
  header: {
    paddingHorizontal: 20,
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
    marginTop: 4,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 50,
    marginTop: 56,
    columnGap: 21,
    rowGap: 14,
  },
  categoryBtn: {
    width: 127,
    backgroundColor: '#f7f2fa',
    borderRadius: 12,
    height: 77,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryBtnSelected: {
    backgroundColor: '#c2ebbc',
  },
  categoryIcon: {
    width: 36,
    height: 36,
  },
  dotsText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 24,
    color: '#1e1e1e',
    letterSpacing: 4,
  },
  categoryLabel: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 13,
    color: '#1e1e1e',
    textAlign: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 198,
    left: 47,
    right: 47,
  },
  nextBtn: {
    backgroundColor: '#6f6bc1',
    borderRadius: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnDisabled: {
    backgroundColor: '#bcbcbc',
  },
  nextBtnText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
    color: '#fff',
  },
  nextBtnTextDisabled: {
    color: '#fff',
  },
  pressedButton: {
    backgroundColor: '#6F6BC1',
  },
});
