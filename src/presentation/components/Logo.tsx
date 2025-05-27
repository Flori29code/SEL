import React from 'react';
import { getLogoPath } from '../../infrastructure/config/assets';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'dark', 
  size = 'md', 
  showText = true,
  className = '' 
}) => {
  // Configuración de tamaños
  const sizeConfig = {
    sm: { icon: 'w-10 h-10', text: 'text-lg', spacing: 'ml-2' },
    md: { icon: 'w-12 h-12', text: 'text-xl', spacing: 'ml-3' },
    lg: { icon: 'w-14 h-14', text: 'text-xl', spacing: 'ml-3' }
  };

  // Configuración de colores
  const colorConfig = {
    light: {
      text: 'text-white',
      fallback: 'text-white'
    },
    dark: {
      text: 'text-primary',
      fallback: 'text-white'
    }
  };

  const currentSize = sizeConfig[size];
  const currentColor = colorConfig[variant];

  // Intentar cargar el logo, si no existe usar fallback
  const logoPath = variant === 'light' 
    ? getLogoPath('white')
    : getLogoPath('main');

  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo Image o Fallback */}
      <div className={`${currentSize.icon} flex items-center justify-center flex-shrink-0 relative`}>
        <img 
          src={logoPath} 
          alt="BootCamp DevOps con AWS y Azure" 
          className="w-full h-full object-contain"
          onError={(e) => {
            // Fallback si la imagen no carga - mostrar las iniciales
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        
        {/* Fallback - Iniciales (oculto por defecto) */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center`}
          style={{ display: 'none' }}
        >
          <span className={`${currentColor.fallback} font-bold ${currentSize.text}`}>
            BC
          </span>
        </div>
      </div>

      {/* Texto del logo */}
      {showText && (
        <span className={`${currentSize.spacing} font-bold ${currentSize.text} transition-colors ${currentColor.text}`}>
          BootCamp DevOps
        </span>
      )}
    </div>
  );
};

export default Logo; 