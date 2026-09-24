import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
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
  const { width: screenWidth } = useWindowDimensions();
  const [selected, setSelected] = useState<string | null>(null);
  const gridGap = 16;
  const gridPadding = 24;
  const categoryWidth = Math.max(
    126,
    Math.min(180, (screenWidth - gridPadding * 2 - gridGap) / 2),
  );

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
      <View style={[styles.header, { paddingTop: insets.top + 69 }]}>
        <Text style={styles.headerTitle}>Crear alarma</Text>
        <Text style={styles.headerSubtitle}>¿Para qué es esta alarma?</Text>
      </View>

      {/* Category grid */}
      <View style={[styles.grid, { paddingHorizontal: gridPadding, columnGap: gridGap }]}>
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            style={[
              styles.categoryBtn,
              { width: categoryWidth },
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
    paddingLeft: 17,
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
    marginTop: 11,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 58,
    rowGap: 14,
    justifyContent: 'center',
  },
  categoryBtn: {
    backgroundColor: '#f7f2fa',
    borderRadius: 12,
    height: 76.5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
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
    // marginTop: 5,
    width: 48,
    height: 48,
  },
  dotsText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 24,
    color: '#1e1e1e',
    letterSpacing: 4,
    paddingTop: 19,
  },
  categoryLabel: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 11,
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
    borderRadius: 8,
    width: 280,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 50,
  },
  nextBtnDisabled: {
    backgroundColor: '#bcbcbc',
  },
  nextBtnText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 18,
    color: '#1e1e1e',
    marginLeft: 2,
    includeFontPadding: false,
  },
  nextBtnTextDisabled: {
    color: '#79747E',
  },
  pressedButton: {
    backgroundColor: '#6F6BC1',
  },
});
