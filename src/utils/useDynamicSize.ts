import { Dimensions } from 'react-native';


const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;


const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);


const getMetrics = () => {
  const { width, height, fontScale } = Dimensions.get('window');
  const minSide = Math.min(width, height);
  return {
    width,
    height,
    fontScale,
    minSide,
    isTablet: minSide >= 600,
  };
};


export const wp = (size: number) => {
  const { width, isTablet} = getMetrics();
   const scale = width / BASE_WIDTH
  const scaled = size * scale
  return isTablet
  ? clamp(scaled, size * 4, size * 4)
  : (width * size * 0.9) / 100;
};



export const hp = (size: number) => {
  const { height, isTablet } = getMetrics();
  const scale = height / BASE_HEIGHT
  const scaled = size * scale
  return isTablet
  ? clamp(scaled, size * 3.5, size * 3.5)
  : (height * size * 0.9) / 100;
};

export const sp = (size: number) => {
  const { minSide, isTablet } = getMetrics();

  const scale = minSide / BASE_WIDTH;
  const scaled = size * scale;

  return isTablet
    ? clamp(scaled, size * 0.9, size * 1.35) 
    : clamp(scaled, size * 5, size * 5); 
};


export const fs = (size: number) => {
  const { fontScale } = getMetrics();

  const scaled = sp(size);
  const adjusted = scaled / fontScale;

  return clamp(adjusted, size * 3, size * 3);
};

export const getTabBarHeight = (size: number) => {
  const { isTablet, height } = getMetrics();
  console.log(isTablet,height)

  const basePhone = 10;
  const baseTablet = 60;

  const base = isTablet ? baseTablet : basePhone;


  const adjusted = base * size;


  return clamp(adjusted, 45, 55);
};