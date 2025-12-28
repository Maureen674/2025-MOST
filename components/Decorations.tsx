import React from 'react';
import { Rocket, Cat, Star, Heart, Dog } from 'lucide-react';
import { DecorationType, ThemeType } from '../types';

interface Props {
  type: DecorationType;
  theme: ThemeType;
  className?: string;
  color: string;
}

export const Decoration: React.FC<Props> = ({ type, theme, className, color }) => {
  if (type === DecorationType.NONE) {
    return null;
  }

  const commonProps = {
    className: className,
    style: { color },
  };

  const getIcon = () => {
    switch (type) {
      case DecorationType.ROCKET:
        return <Rocket {...commonProps} strokeWidth={theme === ThemeType.MINIMALIST ? 1 : 2} fill={theme === ThemeType.VINTAGE ? 'currentColor' : 'none'} />;
      case DecorationType.CAT:
        return <Cat {...commonProps} strokeWidth={theme === ThemeType.MINIMALIST ? 1 : 2} fill={theme === ThemeType.VINTAGE ? 'currentColor' : 'none'} />;
      case DecorationType.STAR:
        return <Star {...commonProps} strokeWidth={theme === ThemeType.MINIMALIST ? 1 : 2} fill={theme === ThemeType.VINTAGE ? 'currentColor' : 'none'} />;
      case DecorationType.HEART:
        return <Heart {...commonProps} strokeWidth={theme === ThemeType.MINIMALIST ? 1 : 2} fill={theme === ThemeType.VINTAGE ? 'currentColor' : 'none'} />;
      case DecorationType.DOG:
        return <Dog {...commonProps} strokeWidth={theme === ThemeType.MINIMALIST ? 1 : 2} fill={theme === ThemeType.VINTAGE ? 'currentColor' : 'none'} />;
      default:
        return null;
    }
  };

  return <>{getIcon()}</>;
};