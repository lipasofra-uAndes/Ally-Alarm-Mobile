import { SvgUri } from 'react-native-svg';
import { Asset } from 'expo-asset';

type FigmaIconProps = {
  source: number;
  width: number;
  height: number;
  opacity?: number;
};

export default function FigmaIcon({ source, width, height, opacity = 1 }: FigmaIconProps) {
  const asset = Asset.fromModule(source);

  return <SvgUri uri={asset.uri} width={width} height={height} opacity={opacity} />;
}