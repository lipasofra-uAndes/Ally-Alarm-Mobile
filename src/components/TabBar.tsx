import { View, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NavigationProp } from '../navigation/types';
import FigmaIcon from './FigmaIcon';

type TabBarProps = {
  activeTab?: 'home' | 'create' | 'profile';
};

export default function TabBar({ activeTab = 'home' }: TabBarProps) {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <FigmaIcon
            source={require('../../assets/images/icon-home.png')}
            width={24}
            height={24}
            opacity={activeTab === 'home' ? 1 : 0.5}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('CrearCategoria')}
          activeOpacity={0.7}
        >
          <FigmaIcon
            source={require('../../assets/images/icon-create.png')}
            width={24}
            height={24}
            opacity={activeTab === 'create' ? 1 : 0.5}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <Image
            source={require('../../assets/images/profile.png')}
            style={[styles.profileIcon, { opacity: activeTab === 'profile' ? 1 : 0.5 }]}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.homeIndicator, { height: insets.bottom }]}>
        {Platform.OS === 'ios' && insets.bottom > 0 && <View style={styles.homeIndicatorBar} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
    }),
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    paddingLeft: 14,
    paddingRight: 13
  },
  tab: {
    width: 48,
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  profileIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  homeIndicator: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  homeIndicatorBar: {
    width: 134,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 100,
  },
});
