import { Image } from 'react-native';
import { SvgUri } from 'react-native-svg';

type FigmaIconProps = {
  source: number;
  width: number;
  height: number;
  opacity?: number;
};

export default function FigmaIcon({ source, width, height, opacity = 1 }: FigmaIconProps) {
  const asset = Image.resolveAssetSource(source);

  return <SvgUri uri={asset.uri} width={width} height={height} opacity={opacity} />;
}