import { Image } from 'react-native';

type FigmaIconProps = {
  source: number;
  width: number;
  height: number;
  opacity?: number;
};

export default function FigmaIcon({ source, width, height, opacity = 1 }: FigmaIconProps) {
  return (
    <Image
      source={source}
      style={{ width, height, opacity }}
      resizeMode="contain"
    />
  );
}